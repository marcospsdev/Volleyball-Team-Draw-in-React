export type TeamColorSwatch = { emoji: string; hex: string };

const TEAM_COLOR_SWATCHES: TeamColorSwatch[] = [
  { emoji: "🔴", hex: "#FF3B30" },
  { emoji: "🔵", hex: "#007AFF" },
  { emoji: "🟡", hex: "#FFCC00" },
  { emoji: "🟢", hex: "#34C759" },
  { emoji: "🟠", hex: "#FF9500" },
  { emoji: "🟣", hex: "#AF52DE" },
  { emoji: "🟤", hex: "#A2845E" },
  { emoji: "⚫", hex: "#3A3A3C" },
  { emoji: "⚪", hex: "#E5E5EA" },
  { emoji: "🌸", hex: "#FF2D55" },
];

/** Cor determinística por índice de time — nunca usa Math.random() no render,
 * evitando que a cor de um time mude a cada re-renderização. */
export function getTeamColor(index: number): TeamColorSwatch {
  if (index < TEAM_COLOR_SWATCHES.length) return TEAM_COLOR_SWATCHES[index];
  const hue = (index * 47) % 360;
  return { emoji: "⚽", hex: `hsl(${hue}, 70%, 55%)` };
}
