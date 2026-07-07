import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Member } from "@/types";

interface VtDB extends DBSchema {
  members: {
    key: string;
    value: Member;
    indexes: { "by-name": string };
  };
}

const DB_NAME = "volleyball-db";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<VtDB>> | null = null;

export function getDb(): Promise<IDBPDatabase<VtDB>> {
  if (!dbPromise) {
    dbPromise = openDB<VtDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore("members", { keyPath: "id" });
        store.createIndex("by-name", "name");
      },
    });
  }
  return dbPromise;
}
