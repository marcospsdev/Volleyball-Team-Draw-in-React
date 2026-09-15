import type { Gender, Level } from "./player";

export type MemberPhoto =
  | { kind: "upload"; dataUrl: string }
  | { kind: "url"; url: string };

export type Member = {
  id: string;
  name: string;
  gender: Gender;
  level: Level;
  photo: MemberPhoto | null;
  createdAt: number;
  updatedAt: number;
};
