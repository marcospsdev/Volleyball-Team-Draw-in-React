import { useContext } from "react";
import { ThemeModeContext, type ThemeModeContextValue } from "./themeModeContextBase";

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode deve ser usado dentro de AppThemeProvider");
  }
  return ctx;
}
