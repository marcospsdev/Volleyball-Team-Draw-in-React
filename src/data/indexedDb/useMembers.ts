import { useCallback, useEffect, useState } from "react";
import type { Member } from "@/types";
import { deleteMember, listMembers, upsertMember } from "./membersRepo";
import { generateId } from "@/lib/id";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listMembers()
      .then((loaded) => {
        if (!cancelled) setMembers(loaded);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const addMember = useCallback(
    async (input: Pick<Member, "name" | "gender" | "photo">) => {
      const now = Date.now();
      const member: Member = {
        id: generateId(),
        name: input.name,
        gender: input.gender,
        photo: input.photo,
        createdAt: now,
        updatedAt: now,
      };
      await upsertMember(member);
      setMembers((prev) =>
        [...prev, member].sort((a, b) => a.name.localeCompare(b.name)),
      );
      return member;
    },
    [],
  );

  const updateMember = useCallback(
    async (id: string, input: Pick<Member, "name" | "gender" | "photo">) => {
      const existing = members.find((m) => m.id === id);
      if (!existing) return;
      const updated: Member = {
        ...existing,
        ...input,
        updatedAt: Date.now(),
      };
      await upsertMember(updated);
      setMembers((prev) =>
        prev
          .map((m) => (m.id === id ? updated : m))
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
    },
    [members],
  );

  const removeMember = useCallback(async (id: string) => {
    await deleteMember(id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return { members, loading, addMember, updateMember, removeMember };
}
