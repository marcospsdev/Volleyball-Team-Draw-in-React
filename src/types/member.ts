import type { Gender } from "./player";

export type MemberPhoto =
  | { kind: "upload"; dataUrl: string }
  | { kind: "url"; url: string };

export type Member = {
  id: string;
  name: string;
  gender: Gender;
  photo: MemberPhoto | null;
  createdAt: number;
  updatedAt: number;
};
