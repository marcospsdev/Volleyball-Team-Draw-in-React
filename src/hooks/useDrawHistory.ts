import { useCallback, useState } from "react";
import type { Team } from "@/types";

const STORAGE_KEY = "vt.drawHistory";
const MAX_ENTRIES = 10;

type DrawRecord = { teams: Team[]; drawnAt: number };

function isSameDay(a: number, b: number): boolean {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

function readRecords(): DrawRecord[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as DrawRecord[];
  } catch {
    // sessionStorage indisponível
  }
  return [];
}

function writeRecords(records: DrawRecord[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // sessionStorage indisponível
  }
}

/** Descarta o histórico se o último sorteio registrado foi em outro dia —
 * evita que a lógica de "evitar duplas repetidas" vaze de uma sessão de
 * vôlei para outra quando o usuário esquece de apertar "Resetar Lista". */
function dropIfStale(records: DrawRecord[]): DrawRecord[] {
  if (records.length === 0) return records;
  const last = records[records.length - 1];
  return isSameDay(last.drawnAt, Date.now()) ? records : [];
}

/** Histórico de sorteios da sessão atual (sobrevive a reload da aba, some ao
 * fechá-la) — alimenta o algoritmo de sorteio para minimizar duplas repetidas. */
export function useDrawHistory() {
  const [records, setRecords] = useState<DrawRecord[]>(() => {
    const fresh = dropIfStale(readRecords());
    writeRecords(fresh);
    return fresh;
  });

  const pushDraw = useCallback((teams: Team[]) => {
    setRecords((prev) => {
      const base = dropIfStale(prev);
      const next = [...base, { teams, drawnAt: Date.now() }].slice(-MAX_ENTRIES);
      writeRecords(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setRecords([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // sessionStorage indisponível
    }
  }, []);

  const history = records.map((record) => record.teams);

  return { history, pushDraw, clearHistory };
}
