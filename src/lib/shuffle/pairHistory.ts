import type { Player, Team } from "@/types";

export type PairCounts = Map<string, number>;

function pairKey(a: Player, b: Player): string {
  return a.id < b.id ? `${a.id}:${b.id}` : `${b.id}:${a.id}`;
}

/** Conta quantas vezes cada dupla de jogadores já jogou junta nos sorteios
 * anteriores da sessão. O sorteio mais recente pesa o dobro, para penalizar
 * mais repetir o time de "agora há pouco" do que um de vários sorteios atrás. */
export function buildPairCounts(history: Team[][]): PairCounts {
  const counts: PairCounts = new Map();

  history.forEach((draw, drawIndex) => {
    const weight = drawIndex === history.length - 1 ? 2 : 1;
    draw.forEach((team) => {
      for (let i = 0; i < team.length; i++) {
        for (let j = i + 1; j < team.length; j++) {
          const key = pairKey(team[i], team[j]);
          counts.set(key, (counts.get(key) ?? 0) + weight);
        }
      }
    });
  });

  return counts;
}

export function pairScore(counts: PairCounts, a: Player, b: Player): number {
  return counts.get(pairKey(a, b)) ?? 0;
}
