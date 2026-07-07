import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { MemberCard } from "./MemberCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Member } from "@/types";

type MembersListProps = {
  members: Member[];
  onSelect: (member: Member) => void;
};

export function MembersList({ members, onSelect }: MembersListProps) {
  if (members.length === 0) {
    return (
      <EmptyState
        icon={<GroupsRoundedIcon sx={{ fontSize: 40 }} />}
        title="Nenhum membro cadastrado"
        description="Toque no botão + para adicionar o primeiro membro do vôlei."
      />
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} onClick={() => onSelect(member)} />
      ))}
    </div>
  );
}
