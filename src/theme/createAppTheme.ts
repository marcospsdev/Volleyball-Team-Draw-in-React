import { createTheme, type PaletteMode, type Theme } from "@mui/material/styles";
import { getPalette } from "./palette";
import { getTypography } from "./typography";
import { getGlassSurface } from "./glass";
import { radii, durations } from "./tokens";

export function createAppTheme(mode: PaletteMode): Theme {
  const palette = getPalette(mode);
  const glassRegular = getGlassSurface(mode, "regular");
  const glassThick = getGlassSurface(mode, "thick");

  return createTheme({
    palette,
    typography: getTypography(),
    shape: { borderRadius: radii.md },
    transitions: {
      duration: {
        shortest: durations.fast * 1000,
        shorter: durations.fast * 1000,
        short: durations.fast * 1000,
        standard: durations.base * 1000,
        complex: durations.slow * 1000,
        enteringScreen: durations.base * 1000,
        leavingScreen: durations.fast * 1000,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background?.default,
            transition: `background-color ${durations.base}s ease`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { ...glassThick, color: palette.text?.primary },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            ...glassThick,
            borderRadius: `${radii.xl}px ${radii.xl}px 0 0`,
            height: 64,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { ...glassRegular, borderRadius: radii.lg },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { ...glassRegular, borderRadius: radii.lg },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: radii.pill,
            textTransform: "none",
            fontWeight: 600,
          },
          contained: {
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: radii.pill, fontWeight: 600 },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            largeTitle: "h1",
            title1: "h2",
            title2: "h3",
            title3: "h4",
            headline: "h5",
            body: "p",
            callout: "p",
            subheadline: "p",
            footnote: "span",
            caption1: "span",
            caption2: "span",
          },
        },
      },
    },
  });
}
