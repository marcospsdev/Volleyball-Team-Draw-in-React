import { Avatar, Typography } from "@mui/material";
import { motion } from "framer-motion";
import type { Member } from "@/types";

type MemberCardProps = {
  member: Member;
  onClick: () => void;
};

export function MemberCard({ member, onClick }: MemberCardProps) {
  const src =
    member.photo?.kind === "upload"
      ? member.photo.dataUrl
      : member.photo?.kind === "url"
        ? member.photo.url
        : undefined;

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl"
    >
      <Avatar
        src={src}
        sx={{ width: 64, height: 64, bgcolor: member.gender === "M" ? "#007AFF" : "#FF2D55" }}
      >
        {member.name.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="footnote" noWrap sx={{ maxWidth: 88, fontWeight: 600 }}>
        {member.name.toUpperCase()}
      </Typography>
    </motion.button>
  );
}
