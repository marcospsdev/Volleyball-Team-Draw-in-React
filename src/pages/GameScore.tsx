import type { Dispatch, SetStateAction } from "react";
import { ScoreBoard } from "@/components/score/ScoreBoard";
import type { ScoreState } from "@/types";

type GameScoreProps = {
  scores: ScoreState;
  setScores: Dispatch<SetStateAction<ScoreState>>;
};

function GameScore({ scores, setScores }: GameScoreProps) {
  return <ScoreBoard scores={scores} setScores={setScores} />;
}

export default GameScore;
