export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const durations = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;

export const springs = {
  snappy: { type: "spring", stiffness: 520, damping: 32 },
  gentle: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 420, damping: 22 },
} as const;

export const iosColors = {
  blue: "#007AFF",
  green: "#34C759",
  red: "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFCC00",
  pink: "#FF2D55",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  indigo: "#5856D6",
  brown: "#A2845E",
  gray: "#8E8E93",
} as const;
