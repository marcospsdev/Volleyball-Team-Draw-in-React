import type { Member } from "@/types";
import { getDb } from "./db";

export async function listMembers(): Promise<Member[]> {
  const db = await getDb();
  const members = await db.getAllFromIndex("members", "by-name");
  return members;
}

export async function upsertMember(member: Member): Promise<void> {
  const db = await getDb();
  await db.put("members", member);
}

export async function deleteMember(id: string): Promise<void> {
  const db = await getDb();
  await db.delete("members", id);
}
