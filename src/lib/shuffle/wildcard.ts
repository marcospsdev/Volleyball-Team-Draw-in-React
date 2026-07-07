import type { Player } from "@/types";

/** Jogadores fictícios usados para completar times quando o total real de
 * jogadores não é múltiplo do tamanho do time — assim nenhum time fica com
 * menos gente que os outros. IDs negativos nunca colidem com os reais
 * (gerados via Date.now()). */
export function createWildcardPlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, i) => ({
    id: -(i + 1),
    name: count === 1 ? "CORINGA" : `CORINGA ${i + 1}`,
    gender: "M",
    isWildcard: true,
  }));
}
