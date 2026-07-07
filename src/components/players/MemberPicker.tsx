import { motion } from "framer-motion";
import { Avatar, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import type { Member, Player } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";

type MemberPickerProps = {
  members: Member[];
  selectedPlayers: Player[];
  onToggle: (member: Member) => void;
};

export function MemberPicker({ members, selectedPlayers, onToggle }: MemberPickerProps) {
  if (members.length === 0) {
    return (
      <EmptyState
        icon={<GroupsRoundedIcon sx={{ fontSize: 40 }} />}
        title="Nenhum membro cadastrado"
        description="Cadastre membros na aba Membros para selecioná-los aqui."
      />
    );
  }

  const isSelected = (member: Member) =>
    selectedPlayers.some((p) => p.memberId === member.id);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {members.map((member) => {
        const selected = isSelected(member);
        const src =
          member.photo?.kind === "upload"
            ? member.photo.dataUrl
            : member.photo?.kind === "url"
              ? member.photo.url
              : undefined;

        return (
          <motion.button
            key={member.id}
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => onToggle(member)}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl"
            style={{
              backgroundColor: selected ? "rgba(0,122,255,0.12)" : "transparent",
            }}
          >
            <div className="relative">
              <Avatar
                src={src}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: member.gender === "M" ? "#007AFF" : "#FF2D55",
                }}
              >
                {member.name.charAt(0).toUpperCase()}
              </Avatar>
              {selected && (
                <CheckCircleRoundedIcon
                  sx={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    fontSize: 18,
                    color: "#007AFF",
                    backgroundColor: "background.paper",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <Typography variant="caption1" noWrap sx={{ maxWidth: 72 }}>
              {member.name.toUpperCase()}
            </Typography>
          </motion.button>
        );
      })}
    </div>
  );
}
