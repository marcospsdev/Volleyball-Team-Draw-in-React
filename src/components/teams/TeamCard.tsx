import { Avatar, Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import type { Member, Team } from "@/types";
import { getTeamColor } from "@/lib/teamColors";
import { resolveMemberPhotoSrc } from "@/lib/memberPhoto";
import { IconCircle } from "@/components/ui/IconCircle";

type TeamCardProps = {
  team: Team;
  index: number;
  members: Member[];
};

export function TeamCard({ team, index, members }: TeamCardProps) {
  const color = getTeamColor(index);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 28 }}
    >
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <IconCircle emoji={color.emoji} color={color.hex} size={22} />
            <Typography variant="headline">Time {index + 1}</Typography>
          </div>
          <List dense disablePadding>
            {team.map((player) => {
              const photoSrc = resolveMemberPhotoSrc(player, members);
              return (
                <ListItem key={player.id} disablePadding sx={{ py: 0.4, gap: 1 }}>
                  {player.isWildcard ? (
                    <span className="flex-shrink-0" aria-hidden>
                      🃏
                    </span>
                  ) : photoSrc ? (
                    <Avatar src={photoSrc} sx={{ width: 22, height: 22, flexShrink: 0 }} />
                  ) : (
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: player.gender === "M" ? "#007AFF" : "#FF2D55" }}
                    />
                  )}
                  <ListItemText
                    primary={
                      player.isWildcard
                        ? player.name
                        : `${player.name} ${"⭐".repeat(player.level)}`
                    }
                    slotProps={{
                      primary: player.isWildcard ? { sx: { fontStyle: "italic", opacity: 0.75 } } : undefined,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  );
}
