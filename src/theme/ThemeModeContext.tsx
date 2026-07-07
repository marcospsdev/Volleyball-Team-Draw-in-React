import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider, CssBaseline, type PaletteMode } from "@mui/material";
import { createAppTheme } from "./createAppTheme";
import { ThemeModeContext, type ThemeModeContextValue } from "./themeModeContextBase";

const STORAGE_KEY = "vt.themeMode";

/** O app sempre começa no modo claro por padrão — o modo noturno só é usado
 * depois que o usuário alterna manualmente, e a escolha fica salva a partir daí. */
function getInitialMode(): PaletteMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage indisponível (modo privado, etc.)
  }
  return "light";
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // localStorage indisponível
    }
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      toggleMode: () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
