import { forwardRef, useEffect, useState, type Ref } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  TextField,
  Rating,
  Typography,
  type SlideProps,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { GlassButton } from "@/components/ui/GlassButton";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { PhotoPicker } from "./PhotoPicker";
import type { Gender, Level, Member, MemberPhoto } from "@/types";

const LEVEL_LABELS: Record<Level, string> = {
  1: "Ruim",
  2: "Médio",
  3: "Bom",
};

const SlideUpTransition = forwardRef(function SlideUpTransition(
  props: SlideProps,
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type MemberFormProps = {
  open: boolean;
  member: Member | null;
  onClose: () => void;
  onSave: (input: { name: string; gender: Gender; level: Level; photo: MemberPhoto | null }) => void;
  onDelete?: () => void;
};

export function MemberForm({ open, member, onClose, onSave, onDelete }: MemberFormProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("M");
  const [level, setLevel] = useState<Level | null>(null);
  const [photo, setPhoto] = useState<MemberPhoto | null>(null);

  useEffect(() => {
    if (open) {
      setName(member?.name ?? "");
      setGender(member?.gender ?? "M");
      setLevel(member?.level ?? null);
      setPhoto(member?.photo ?? null);
    }
  }, [open, member]);

  const handleSave = () => {
    if (name.trim() === "" || level === null) return;
    onSave({ name: name.trim().toUpperCase(), gender, level, photo });
  };

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
      <DialogTitle>{member ? "Editar Membro" : "Novo Membro"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
        <PhotoPicker
          photo={photo}
          onChange={setPhoto}
          fallbackLetter={name.charAt(0).toUpperCase() || "?"}
        />
        <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth autoFocus />
        <SegmentedControl
          segments={[
            { value: "M", label: "Homem" },
            { value: "F", label: "Mulher" },
          ]}
          value={gender}
          onChange={setGender}
        />
        <div className="flex flex-col items-center gap-1">
          <Typography variant="footnote" color="text.secondary">
            Nível *
          </Typography>
          <Rating
            value={level}
            max={3}
            size="large"
            onChange={(_, newValue) => setLevel(newValue as Level | null)}
          />
          {level !== null && (
            <Typography variant="caption1" color="text.secondary">
              {LEVEL_LABELS[level]}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions sx={{ pb: "calc(1rem + env(safe-area-inset-bottom))", px: 3 }}>
        {member && onDelete && (
          <GlassButton onClick={onDelete} color="error" startIcon={<DeleteRoundedIcon />} sx={{ mr: "auto" }}>
            Excluir
          </GlassButton>
        )}
        <GlassButton onClick={onClose} color="inherit">
          Cancelar
        </GlassButton>
        <GlassButton
          onClick={handleSave}
          variant="contained"
          disabled={name.trim() === "" || level === null}
        >
          Salvar
        </GlassButton>
      </DialogActions>
    </Dialog>
  );
}
