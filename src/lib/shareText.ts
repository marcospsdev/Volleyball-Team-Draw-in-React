import type { Team } from "@/types";
import { getTeamColor } from "./teamColors";

export function buildShareText(teams: Team[]): string {
  let text = "🚨 *TIMES SORTEADOS!* 🚨\n\n";

  teams.forEach((team, index) => {
    const { emoji } = getTeamColor(index);
    text += `${emoji} *Time ${index + 1}:*\n`;

    team.forEach((player) => {
      const emoji = player.isWildcard ? "🃏" : player.gender === "M" ? "♂️" : "♀️";
      const stars = player.isWildcard ? "" : ` ${"⭐".repeat(player.level)}`;
      text += `- ${player.name} ${emoji}${stars}\n`;
    });

    text += "\n";
  });

  text += "\nBy Marquinhos & Luquinhas App ©";
  return text;
}
