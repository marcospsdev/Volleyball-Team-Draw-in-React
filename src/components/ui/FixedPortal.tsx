import { createPortal } from "react-dom";
import type { ReactNode } from "react";

/** Portala para #fixed-portal-root (definido em AppLayout) em vez de
 * document.body — mantém o elemento dentro da árvore React (para o MUI Modal
 * gerenciar aria-hidden corretamente) enquanto evita ancestrais com
 * transform que quebrariam position:fixed. */
export function FixedPortal({ children }: { children: ReactNode }) {
  const root = document.getElementById("fixed-portal-root");
  if (!root) return null;
  return createPortal(children, root);
}
