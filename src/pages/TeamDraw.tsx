import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Typography, Snackbar, Alert, type AlertColor } from "@mui/material";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { GlassButton } from "@/components/ui/GlassButton";
import { ConfirmSheet } from "@/components/ui/ConfirmSheet";
import { PlayerList } from "@/components/players/PlayerList";
import { MemberPicker } from "@/components/players/MemberPicker";
import { TeamsCaptureArea } from "@/components/teams/TeamsCaptureArea";
import { TeamsShareBar } from "@/components/teams/TeamsShareBar";
import { useMembers } from "@/data/indexedDb/useMembers";
import { useDrawHistory } from "@/hooks/useDrawHistory";
import { buildTeams } from "@/lib/shuffle/teamDraw";
import type { Member, Player, Team } from "@/types";

type TeamDrawProps = {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
};

const PLAYERS_PER_TEAM = 4;
const MIN_PLAYERS = PLAYERS_PER_TEAM * 2;

function TeamDraw({ players, setPlayers, teams, setTeams }: TeamDrawProps) {
  const { members } = useMembers();
  const { history, pushDraw, clearHistory } = useDrawHistory();
  const captureRef = useRef<HTMLDivElement>(null);

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isShuffleOpen, setIsShuffleOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: "", severity: "success" });

  const showSnackbar = (message: string, severity: AlertColor) =>
    setSnackbar({ open: true, message, severity });

  const handleRemovePlayer = (id: number) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleMember = (member: Member) => {
    setPlayers((prev) => {
      const existing = prev.find((p) => p.memberId === member.id);
      if (existing) return prev.filter((p) => p.memberId !== member.id);
      return [
        ...prev,
        {
          id: Date.now(),
          name: member.name.toUpperCase(),
          gender: member.gender,
          memberId: member.id,
        },
      ];
    });
  };

  const handleConfirmReset = () => {
    setPlayers([]);
    setTeams([]);
    clearHistory();
    setIsResetOpen(false);
    showSnackbar("A lista foi resetada com sucesso!", "info");
  };

  const handleShuffle = () => {
    const newTeams = buildTeams({ players, teamSize: PLAYERS_PER_TEAM, history });
    setTeams(newTeams);
    pushDraw(newTeams);
    setIsShuffleOpen(false);
    showSnackbar("Times sorteados com sucesso!", "success");
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6">
      <div className="text-center">
        <Typography variant="largeTitle">Sorteio de Times</Typography>
        <Typography variant="subheadline" color="text.secondary">
          Selecione os membros e sorteie times equilibrados.
        </Typography>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="headline">Membros</Typography>
        <MemberPicker members={members} selectedPlayers={players} onToggle={handleToggleMember} />
      </div>

      {players.length > 0 && <PlayerList players={players} onRemove={handleRemovePlayer} />}

      <div className="flex flex-col items-center gap-3">
        <GlassButton
          variant="contained"
          size="large"
          startIcon={<ShuffleRoundedIcon />}
          onClick={() => setIsShuffleOpen(true)}
          disabled={players.length < MIN_PLAYERS}
        >
          Sortear Times
        </GlassButton>

        {players.length > 0 && (
          <GlassButton
            variant="contained"
            color="error"
            startIcon={<RotateLeftRoundedIcon />}
            onClick={() => setIsResetOpen(true)}
          >
            Resetar Lista
          </GlassButton>
        )}
      </div>

      {teams.length > 0 && (
        <>
          <TeamsCaptureArea ref={captureRef} teams={teams} members={members} />
          <TeamsShareBar teams={teams} captureRef={captureRef} onFeedback={showSnackbar} />
        </>
      )}

      <ConfirmSheet
        open={isShuffleOpen}
        title="Confirmar Sorteio"
        description="Deseja realmente sortear novos times?"
        confirmColor="success"
        onConfirm={handleShuffle}
        onClose={() => setIsShuffleOpen(false)}
      />

      <ConfirmSheet
        open={isResetOpen}
        title="Confirmação de Reset"
        description="Tem certeza que deseja resetar a lista de jogadores e times sorteados?"
        confirmColor="error"
        onConfirm={handleConfirmReset}
        onClose={() => setIsResetOpen(false)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TeamDraw;
