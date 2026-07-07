import { Typography } from "@mui/material";
import { PlayerChip } from "./PlayerChip";
import type { Player } from "@/types";

type PlayerListProps = {
  players: Player[];
  onRemove: (id: number) => void;
};

export function PlayerList({ players, onRemove }: PlayerListProps) {
  const maleCount = players.filter((p) => p.gender === "M").length;
  const femaleCount = players.filter((p) => p.gender === "F").length;

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="footnote" color="text.secondary">
        Total: {players.length} · Homens: {maleCount} · Mulheres: {femaleCount}
      </Typography>
      <div className="flex flex-wrap gap-2">
        {players.map((player) => (
          <PlayerChip key={player.id} player={player} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}
