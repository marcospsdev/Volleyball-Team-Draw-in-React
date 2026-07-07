import { useState, type Dispatch, type SetStateAction } from "react";
import { Typography, Snackbar, Alert } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import type { ScoreState } from "@/types";
import { ScoreCard } from "./ScoreCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { ConfirmSheet } from "@/components/ui/ConfirmSheet";

type ScoreBoardProps = {
  scores: ScoreState;
  setScores: Dispatch<SetStateAction<ScoreState>>;
};

export function ScoreBoard({ scores, setScores }: ScoreBoardProps) {
  const [resetOpen, setResetOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const adjust = (team: "A" | "B", direction: "increment" | "decrement") => {
    setScores((prev) => {
      const key = team === "A" ? "scoreA" : "scoreB";
      const delta = direction === "increment" ? 1 : -1;
      return { ...prev, [key]: Math.max(prev[key] + delta, 0) };
    });
  };

  const handleReset = () => {
    setScores({ scoreA: 0, scoreB: 0 });
    setResetOpen(false);
    setSnackbarOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      <Typography variant="largeTitle">Placar da Partida</Typography>

      <div className="flex flex-col landscape:flex-row gap-3 landscape:gap-6 w-full max-w-3xl">
        <ScoreCard
          label="Time A"
          score={scores.scoreA}
          gradient="linear-gradient(135deg, #3B82F6, #1E40AF)"
          onTap={(dir) => adjust("A", dir)}
        />
        <ScoreCard
          label="Time B"
          score={scores.scoreB}
          gradient="linear-gradient(135deg, #EF4444, #7F1D1D)"
          onTap={(dir) => adjust("B", dir)}
        />
      </div>

      <GlassButton
        variant="contained"
        color="secondary"
        startIcon={<RefreshRoundedIcon />}
        onClick={() => setResetOpen(true)}
      >
        Resetar Placar
      </GlassButton>

      <ConfirmSheet
        open={resetOpen}
        title="Confirmação de Reset"
        description="Tem certeza que deseja resetar o placar da partida?"
        confirmColor="error"
        onConfirm={handleReset}
        onClose={() => setResetOpen(false)}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }} onClose={() => setSnackbarOpen(false)}>
          O placar foi resetado com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}
