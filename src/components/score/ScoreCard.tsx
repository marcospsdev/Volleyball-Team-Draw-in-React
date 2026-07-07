import type { MouseEvent } from "react";
import { Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const MotionCard = motion.create(Card);

type ScoreCardProps = {
  label: string;
  score: number;
  gradient: string;
  onTap: (direction: "increment" | "decrement") => void;
};

export function ScoreCard({ label, score, gradient, onTap }: ScoreCardProps) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const isRight = e.clientX - left > width / 2;
    onTap(isRight ? "increment" : "decrement");
  };

  return (
    <MotionCard
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      sx={{
        flex: 1,
        minWidth: 0,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "24px",
        background: gradient,
        color: "white",
        cursor: "pointer",
        userSelect: "none",
        border: "none",
      }}
    >
      <Typography
        variant="footnote"
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 700,
          opacity: 0.85,
        }}
      >
        {label}
      </Typography>
      <div className="flex items-center gap-2 landscape:gap-3 mt-2">
        <RemoveRoundedIcon
          className="text-[clamp(20px,9vw,40px)] landscape:text-[clamp(16px,5vw,32px)]"
          sx={{ opacity: 0.55 }}
        />
        <motion.span
          key={score}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="text-[clamp(3rem,18vw,4.5rem)] landscape:text-[clamp(1.75rem,9vw,3.5rem)] font-extrabold leading-none"
        >
          {score}
        </motion.span>
        <AddRoundedIcon
          className="text-[clamp(20px,9vw,40px)] landscape:text-[clamp(16px,5vw,32px)]"
          sx={{ opacity: 0.55 }}
        />
      </div>
    </MotionCard>
  );
}
