import type { PaletteMode } from "@mui/material";
import type { CSSProperties } from "react";

export type GlassElevation = "regular" | "thick";

const THICK_BLUR = 28;

/** "thick" tem backdrop-filter de verdade (usado só em AppBar/BottomNavigation,
 * que ficam fixos sobre conteúdo rolável — o efeito iOS genuíno).
 * "regular" (Card/Dialog) NÃO usa blur: esses componentes não ficam sobre nada
 * que role por baixo, e o backdrop-filter causa artefatos de "fantasma"/
 * duplicação ao exportar a tela como imagem via html-to-image. */
export function getGlassSurface(
  mode: PaletteMode,
  elevation: GlassElevation = "regular",
): CSSProperties & { WebkitBackdropFilter?: string } {
  const isDark = mode === "dark";

  if (elevation === "thick") {
    return {
      backgroundColor: isDark
        ? "rgba(28, 28, 30, 0.6)"
        : "rgba(255, 255, 255, 0.65)",
      backdropFilter: `blur(${THICK_BLUR}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${THICK_BLUR}px) saturate(180%)`,
      border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.4)"}`,
      boxShadow: isDark
        ? "0 8px 30px rgba(0, 0, 0, 0.45)"
        : "0 8px 30px rgba(15, 23, 42, 0.12)",
    };
  }

  return {
    backgroundColor: isDark ? "rgba(28, 28, 30, 0.92)" : "rgba(255, 255, 255, 0.92)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)"}`,
    boxShadow: isDark
      ? "0 8px 30px rgba(0, 0, 0, 0.45)"
      : "0 8px 30px rgba(15, 23, 42, 0.12)",
  };
}
