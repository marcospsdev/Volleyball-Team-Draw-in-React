import type { Member, Player } from "@/types";

export function resolveMemberPhotoSrc(
  player: Player,
  members: Member[],
): string | undefined {
  if (!player.memberId) return undefined;
  const member = members.find((m) => m.id === player.memberId);
  if (!member?.photo) return undefined;
  return member.photo.kind === "upload" ? member.photo.dataUrl : member.photo.url;
}
