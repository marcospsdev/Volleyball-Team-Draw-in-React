import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  type SlideProps,
} from "@mui/material";
import { forwardRef } from "react";
import { GlassButton } from "./GlassButton";

const SlideUpTransition = forwardRef(function SlideUpTransition(
  props: SlideProps,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ConfirmSheetProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "primary" | "error" | "success";
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmSheet({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmColor = "primary",
  onConfirm,
  onClose,
}: ConfirmSheetProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            borderRadius: "24px 24px 0 0",
          },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: "calc(1rem + env(safe-area-inset-bottom))", px: 3 }}>
        <GlassButton onClick={onClose} color="inherit">
          {cancelLabel}
        </GlassButton>
        <GlassButton onClick={onConfirm} color={confirmColor} variant="contained" autoFocus>
          {confirmLabel}
        </GlassButton>
      </DialogActions>
    </Dialog>
  );
}
