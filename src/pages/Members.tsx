import { useState } from "react";
import { Fab, Typography, Snackbar, Alert } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { motion } from "framer-motion";
import { useMembers } from "@/data/indexedDb/useMembers";
import { MembersList } from "@/components/members/MembersList";
import { MemberForm } from "@/components/members/MemberForm";
import { ConfirmSheet } from "@/components/ui/ConfirmSheet";
import { FixedPortal } from "@/components/ui/FixedPortal";
import type { Gender, Member, MemberPhoto } from "@/types";

const MotionFab = motion.create(Fab);

function Members() {
  const { members, loading, addMember, updateMember, removeMember } = useMembers();
  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const openNewMemberForm = () => {
    setEditingMember(null);
    setFormOpen(true);
  };

  const openEditMemberForm = (member: Member) => {
    setEditingMember(member);
    setFormOpen(true);
  };

  const handleSave = async (input: { name: string; gender: Gender; photo: MemberPhoto | null }) => {
    if (editingMember) {
      await updateMember(editingMember.id, input);
    } else {
      await addMember(input);
    }
    setFormOpen(false);
    setSnackbarOpen(true);
  };

  const handleRequestDelete = () => {
    if (editingMember) {
      setDeleteTarget(editingMember);
      setFormOpen(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await removeMember(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6 relative">
      <div className="text-center">
        <Typography variant="largeTitle">Membros</Typography>
        <Typography variant="subheadline" color="text.secondary">
          Cadastre o pessoal do vôlei uma vez e monte a lista com um toque.
        </Typography>
      </div>

      {!loading && <MembersList members={members} onSelect={openEditMemberForm} />}

      <FixedPortal>
        <MotionFab
          color="primary"
          onClick={openNewMemberForm}
          whileTap={{ scale: 0.9 }}
          sx={{
            position: "fixed",
            bottom: "calc(88px + env(safe-area-inset-bottom))",
            right: 24,
            zIndex: (theme) => theme.zIndex.fab,
          }}
        >
          <AddRoundedIcon />
        </MotionFab>
      </FixedPortal>

      <MemberForm
        open={formOpen}
        member={editingMember}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        onDelete={editingMember ? handleRequestDelete : undefined}
      />

      <ConfirmSheet
        open={deleteTarget !== null}
        title="Excluir membro"
        description={`Tem certeza que deseja excluir ${deleteTarget?.name ?? ""}?`}
        confirmColor="error"
        confirmLabel="Excluir"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }} onClose={() => setSnackbarOpen(false)}>
          Membro salvo com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Members;
