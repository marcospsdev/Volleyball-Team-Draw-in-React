export type Gender = "M" | "F";

export type Player = {
  id: number;
  name: string;
  gender: Gender;
  memberId?: string;
  /** Jogador fictício de preenchimento, adicionado automaticamente quando o
   * total de jogadores não fecha times do mesmo tamanho. */
  isWildcard?: boolean;
};
