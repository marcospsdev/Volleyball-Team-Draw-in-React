import { Chip } from "@mui/material";
import type { Player } from "@/types";

type PlayerChipProps = {
  player: Player;
  onRemove: (id: number) => void;
};

export function PlayerChip({ player, onRemove }: PlayerChipProps) {
  return (
    <Chip
      label={`${player.name} ${"⭐".repeat(player.level)}`}
      onDelete={() => onRemove(player.id)}
      color={player.gender === "M" ? "primary" : "secondary"}
    />
  );
}
