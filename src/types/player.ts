export type Gender = "M" | "F";

/** Nível de habilidade do jogador: 1 = Ruim, 2 = Médio, 3 = Bom. */
export type Level = 1 | 2 | 3;

export type Player = {
  id: number;
  name: string;
  gender: Gender;
  level: Level;
  memberId?: string;
  /** Jogador fictício de preenchimento, adicionado automaticamente quando o
   * total de jogadores não fecha times do mesmo tamanho. */
  isWildcard?: boolean;
};
