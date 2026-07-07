import { forwardRef } from "react";
import { Avatar, Typography } from "@mui/material";
import type { Member, Team } from "@/types";
import { TeamsGrid } from "./TeamsGrid";

const MARQUINHOS_AVATAR = "/avatars/marcos.jpg";
const LUQUINHAS_AVATAR = "/avatars/lucas.png";

type TeamsCaptureAreaProps = {
  teams: Team[];
  members: Member[];
};

export const TeamsCaptureArea = forwardRef<HTMLDivElement, TeamsCaptureAreaProps>(
  function TeamsCaptureArea({ teams, members }, ref) {
    return (
      <div ref={ref} className="p-4 rounded-3xl">
        <Typography variant="title2" sx={{ textAlign: "center", mb: 2 }}>
          Times Sorteados 🏐
        </Typography>
        <TeamsGrid teams={teams} members={members} />
        <div className="flex items-center justify-center gap-2 mt-6 opacity-80">
          <Avatar alt="Marquinhos" src={MARQUINHOS_AVATAR} sx={{ width: 24, height: 24 }} />
          <Typography variant="footnote" sx={{ fontWeight: 600 }}>
            By Marquinhos &amp; Luquinhas App ©
          </Typography>
          <Avatar alt="Luquinhas" src={LUQUINHAS_AVATAR} sx={{ width: 24, height: 24 }} />
        </div>
      </div>
    );
  },
);
