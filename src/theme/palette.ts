import type { PaletteMode, PaletteOptions } from "@mui/material";
import { iosColors } from "./tokens";

export function getPalette(mode: PaletteMode): PaletteOptions {
  const isDark = mode === "dark";

  return {
    mode,
    primary: { main: iosColors.blue },
    secondary: { main: iosColors.pink },
    success: { main: iosColors.green },
    warning: { main: iosColors.orange },
    error: { main: iosColors.red },
    info: { main: iosColors.teal },
    background: {
      default: isDark ? "#000000" : "#F2F2F7",
      paper: isDark ? "#1C1C1E" : "#FFFFFF",
    },
    text: {
      primary: isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)",
      secondary: isDark ? "rgba(235,235,245,0.6)" : "rgba(60,60,67,0.6)",
    },
    divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(60,60,67,0.12)",
  };
}
