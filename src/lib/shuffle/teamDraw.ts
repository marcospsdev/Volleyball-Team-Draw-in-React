import type { Player, Team } from "@/types";
import { shuffleArray } from "./random";
import { buildPairCounts, pairScore, type PairCounts } from "./pairHistory";
import { createWildcardPlayers } from "./wildcard";

const DEFAULT_TEAM_SIZE = 4;
const RESTARTS = 8;
const ITERATIONS_PER_RESTART = 300;
// Peso do desnível de estrelas na mesma ordem de grandeza da repetição de
// dupla, pra nenhum dos dois objetivos dominar o outro sozinho
const LEVEL_BALANCE_WEIGHT = 1;

export type BuildTeamsOptions = {
  players: Player[];
  teamSize?: number;
  /** Todos os sorteios anteriores da sessão atual (para minimizar repetição de duplas). */
  history?: Team[][];
};

function teamLevelSum(team: Player[]): number {
  return team.reduce((sum, p) => sum + p.level, 0);
}

function sumPairScore(counts: PairCounts, team: Player[], candidate: Player): number {
  let score = 0;
  for (const p of team) score += pairScore(counts, p, candidate);
  return score;
}

function partitionScore(counts: PairCounts, teams: Team[]): number {
  let total = 0;
  for (const team of teams) {
    for (let i = 0; i < team.length; i++) {
      for (let j = i + 1; j < team.length; j++) {
        total += pairScore(counts, team[i], team[j]);
      }
    }
  }
  return total;
}

/** Placar combinado de um particionamento: repetição de dupla + desnível de
 * estrelas em relação à média ideal (soma de nível por time bem próxima
 * entre todos). Usado pra comparar partições inteiras entre reinícios. */
function combinedPartitionScore(counts: PairCounts, teams: Team[], idealAvgLevel: number): number {
  const pairPart = partitionScore(counts, teams);
  const levelPart = teams.reduce(
    (acc, team) => acc + (teamLevelSum(team) - idealAvgLevel) ** 2,
    0,
  );
  return pairPart + LEVEL_BALANCE_WEIGHT * levelPart;
}

function computeTargetSizes(
  total: number,
  numTeams: number,
  teamOrder: number[],
): (teamIndex: number) => number {
  const base = Math.floor(total / numTeams);
  const remainder = total % numTeams;
  const bonusTeams = new Set(teamOrder.slice(0, remainder));
  return (teamIndex: number) => base + (bonusTeams.has(teamIndex) ? 1 : 0);
}

/** Aloca cada jogador no time (dentre os que ainda têm vaga) que está mais
 * fraco em soma de nível até agora; em caso de empate, escolhe quem minimiza
 * a repetição de dupla com quem já está lá. Empates remanescentes são
 * resolvidos aleatoriamente entre os times empatados (nunca sempre o primeiro). */
function placeGreedy(
  pool: Player[],
  teams: Team[],
  teamOrder: number[],
  targetSize: (teamIndex: number) => number,
  counts: PairCounts,
) {
  for (const player of pool) {
    let bestTeams: number[] = [];
    let bestLevelSum = Infinity;
    let bestPairScore = Infinity;

    for (const teamIndex of teamOrder) {
      const team = teams[teamIndex];
      if (team.length >= targetSize(teamIndex)) continue;
      const levelSum = teamLevelSum(team);
      const candidatePairScore = sumPairScore(counts, team, player);

      if (
        levelSum < bestLevelSum ||
        (levelSum === bestLevelSum && candidatePairScore < bestPairScore)
      ) {
        bestLevelSum = levelSum;
        bestPairScore = candidatePairScore;
        bestTeams = [teamIndex];
      } else if (levelSum === bestLevelSum && candidatePairScore === bestPairScore) {
        bestTeams.push(teamIndex);
      }
    }

    if (bestTeams.length === 0) {
      let minIdx = 0;
      for (let i = 1; i < teams.length; i++) {
        if (teams[i].length < teams[minIdx].length) minIdx = i;
      }
      teams[minIdx].push(player);
      continue;
    }

    const chosen = bestTeams[Math.floor(Math.random() * bestTeams.length)];
    teams[chosen].push(player);
  }
}

function buildInitialPartition(players: Player[], teamSize: number, counts: PairCounts): Team[] {
  const numTeams = Math.max(1, Math.ceil(players.length / teamSize));
  const teams: Team[] = Array.from({ length: numTeams }, () => []);
  const teamOrder = shuffleArray(teams.map((_, i) => i));

  const women = shuffleArray(players.filter((p) => p.gender === "F"));
  const men = shuffleArray(players.filter((p) => p.gender === "M"));

  const overallTarget = computeTargetSizes(players.length, numTeams, teamOrder);
  const womenQuota = computeTargetSizes(women.length, numTeams, teamOrder);
  // nunca deixa a quota de mulheres exceder a capacidade total do time
  const womenTarget = (i: number) => Math.min(womenQuota(i), overallTarget(i));

  placeGreedy(women, teams, teamOrder, womenTarget, counts);
  placeGreedy(men, teams, teamOrder, overallTarget, counts);

  return teams;
}

/** Busca local: troca 2 jogadores do MESMO gênero entre times diferentes
 * sempre que a troca reduz o placar combinado (repetição de dupla + desnível
 * de estrelas). A troca same-gender preserva a contagem de gênero por time
 * automaticamente. */
function refinePartition(initial: Team[], counts: PairCounts, idealAvgLevel: number): Team[] {
  let best = initial.map((t) => [...t]);
  let bestScore = combinedPartitionScore(counts, best, idealAvgLevel);

  for (let restart = 0; restart < RESTARTS; restart++) {
    const candidate = best.map((t) => [...t]);
    let candidateScore = bestScore;

    for (let iter = 0; iter < ITERATIONS_PER_RESTART; iter++) {
      if (candidate.length < 2) break;
      const teamAIndex = Math.floor(Math.random() * candidate.length);
      let teamBIndex = Math.floor(Math.random() * candidate.length);
      if (teamAIndex === teamBIndex) teamBIndex = (teamBIndex + 1) % candidate.length;

      const teamA = candidate[teamAIndex];
      const teamB = candidate[teamBIndex];
      if (teamA.length === 0 || teamB.length === 0) continue;

      const idxA = Math.floor(Math.random() * teamA.length);
      const playerA = teamA[idxA];
      const sameGenderInB = teamB
        .map((p, i) => ({ p, i }))
        .filter(({ p }) => p.gender === playerA.gender);
      if (sameGenderInB.length === 0) continue;

      const { p: playerB, i: idxB } =
        sameGenderInB[Math.floor(Math.random() * sameGenderInB.length)];

      const restA = teamA.filter((_, i) => i !== idxA);
      const restB = teamB.filter((_, i) => i !== idxB);

      const pairBefore = sumPairScore(counts, restA, playerA) + sumPairScore(counts, restB, playerB);
      const pairAfter = sumPairScore(counts, restA, playerB) + sumPairScore(counts, restB, playerA);

      const sumABefore = teamLevelSum(teamA);
      const sumBBefore = teamLevelSum(teamB);
      const sumAAfter = sumABefore - playerA.level + playerB.level;
      const sumBAfter = sumBBefore - playerB.level + playerA.level;
      const levelBefore = (sumABefore - idealAvgLevel) ** 2 + (sumBBefore - idealAvgLevel) ** 2;
      const levelAfter = (sumAAfter - idealAvgLevel) ** 2 + (sumBAfter - idealAvgLevel) ** 2;

      const before = pairBefore + LEVEL_BALANCE_WEIGHT * levelBefore;
      const after = pairAfter + LEVEL_BALANCE_WEIGHT * levelAfter;

      if (after < before) {
        teamA[idxA] = playerB;
        teamB[idxB] = playerA;
        candidateScore += after - before;
      }
    }

    if (candidateScore < bestScore) {
      bestScore = candidateScore;
      best = candidate;
    }
  }

  return best;
}

export function buildTeams({ players, teamSize = DEFAULT_TEAM_SIZE, history = [] }: BuildTeamsOptions): Team[] {
  if (players.length === 0) return [];

  // completa com jogador(es) "Coringa" para nenhum time ficar menor que os outros
  const remainder = players.length % teamSize;
  const missing = remainder === 0 ? 0 : teamSize - remainder;
  const playersToDraw = missing > 0 ? [...players, ...createWildcardPlayers(missing)] : players;

  const numTeams = Math.max(1, Math.ceil(playersToDraw.length / teamSize));
  const idealAvgLevel = teamLevelSum(playersToDraw) / numTeams;

  const counts = buildPairCounts(history);
  const initial = buildInitialPartition(playersToDraw, teamSize, counts);
  return refinePartition(initial, counts, idealAvgLevel);
}
