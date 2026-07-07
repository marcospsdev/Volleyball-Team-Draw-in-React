import type { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    largeTitle: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    headline: React.CSSProperties;
    body: React.CSSProperties;
    callout: React.CSSProperties;
    subheadline: React.CSSProperties;
    footnote: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    largeTitle?: React.CSSProperties;
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    title3?: React.CSSProperties;
    headline?: React.CSSProperties;
    body?: React.CSSProperties;
    callout?: React.CSSProperties;
    subheadline?: React.CSSProperties;
    footnote?: React.CSSProperties;
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    largeTitle: true;
    title1: true;
    title2: true;
    title3: true;
    headline: true;
    body: true;
    callout: true;
    subheadline: true;
    footnote: true;
    caption1: true;
    caption2: true;
  }
}

const fontFamily = [
  "-apple-system",
  "BlinkMacSystemFont",
  '"SF Pro Display"',
  '"SF Pro Text"',
  '"Segoe UI"',
  "Roboto",
  "system-ui",
  "sans-serif",
].join(",");

export function getTypography(): ThemeOptions["typography"] {
  return {
    fontFamily,
    largeTitle: {
      fontSize: "2.125rem",
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    title1: {
      fontSize: "1.75rem",
      lineHeight: 1.22,
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    title2: { fontSize: "1.375rem", lineHeight: 1.27, fontWeight: 700 },
    title3: { fontSize: "1.25rem", lineHeight: 1.25, fontWeight: 600 },
    headline: { fontSize: "1.0625rem", lineHeight: 1.3, fontWeight: 600 },
    body: { fontSize: "1.0625rem", lineHeight: 1.3, fontWeight: 400 },
    callout: { fontSize: "1rem", lineHeight: 1.3, fontWeight: 400 },
    subheadline: { fontSize: "0.9375rem", lineHeight: 1.3, fontWeight: 400 },
    footnote: { fontSize: "0.8125rem", lineHeight: 1.35, fontWeight: 400 },
    caption1: { fontSize: "0.75rem", lineHeight: 1.35, fontWeight: 400 },
    caption2: {
      fontSize: "0.6875rem",
      lineHeight: 1.2,
      fontWeight: 500,
      letterSpacing: "0.02em",
    },
  };
}
