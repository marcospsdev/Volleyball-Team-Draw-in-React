import type { Dispatch, SetStateAction } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/ui/PageTransition";
import { useLocalStorageState } from "@/data/localStorage/useLocalStorageState";
import { STORAGE_KEYS } from "@/data/localStorage/storageKeys";
import type { Player, ScoreState, Team } from "@/types";
import TeamDraw from "./pages/TeamDraw";
import GameScore from "./pages/GameScore";
import Members from "./pages/Members";

type AnimatedRoutesProps = {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  scores: ScoreState;
  setScores: Dispatch<SetStateAction<ScoreState>>;
};

function AnimatedRoutes({
  players,
  setPlayers,
  teams,
  setTeams,
  scores,
  setScores,
}: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/team-draw" replace />} />
        <Route
          path="/team-draw"
          element={
            <PageTransition>
              <TeamDraw players={players} setPlayers={setPlayers} teams={teams} setTeams={setTeams} />
            </PageTransition>
          }
        />
        <Route
          path="/game-score"
          element={
            <PageTransition>
              <GameScore scores={scores} setScores={setScores} />
            </PageTransition>
          }
        />
        <Route
          path="/membros"
          element={
            <PageTransition>
              <Members />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const App: React.FC = () => {
  const [players, setPlayers] = useLocalStorageState<Player[]>(STORAGE_KEYS.players, []);
  const [teams, setTeams] = useLocalStorageState<Team[]>(STORAGE_KEYS.teams, []);
  const [scores, setScores] = useLocalStorageState<ScoreState>(STORAGE_KEYS.scores, {
    scoreA: 0,
    scoreB: 0,
  });

  return (
    <Router>
      <AppLayout>
        <AnimatedRoutes
          players={players}
          setPlayers={setPlayers}
          teams={teams}
          setTeams={setTeams}
          scores={scores}
          setScores={setScores}
        />
      </AppLayout>
    </Router>
  );
};

export default App;
