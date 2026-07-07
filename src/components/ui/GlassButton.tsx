import { Button, type ButtonProps } from "@mui/material";
import { motion } from "framer-motion";

const MotionButton = motion.create(Button);

// onDrag/onAnimation* colidem entre os tipos de evento do DOM e do Framer Motion.
type ConflictingHandlers =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

export type GlassButtonProps = Omit<ButtonProps, ConflictingHandlers>;

export function GlassButton(props: GlassButtonProps) {
  return (
    <MotionButton
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      {...props}
    />
  );
}
