import type { LocalStats, SessionMode } from "../types/session";
import { todayKey } from "./time";

const STORAGE_KEY = "focus-drift:stats";

interface StoredStats extends LocalStats {
  day: string;
}

const defaultStats: StoredStats = {
  day: todayKey(),
  todayCompletedSessions: 0,
  todayBreakSeconds: 0,
  lastSessionAt: null,
  soundEnabled: false,
  preferredMode: "standard",
};

function isSessionMode(value: unknown): value is SessionMode {
  return value === "quick" || value === "standard" || value === "deep";
}

export function loadStats(): LocalStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<StoredStats>) : {};
    const currentDay = todayKey();
    const sameDay = parsed.day === currentDay;

    return {
      todayCompletedSessions: sameDay ? parsed.todayCompletedSessions ?? 0 : 0,
      todayBreakSeconds: sameDay ? parsed.todayBreakSeconds ?? 0 : 0,
      lastSessionAt: parsed.lastSessionAt ?? null,
      soundEnabled: Boolean(parsed.soundEnabled),
      preferredMode: isSessionMode(parsed.preferredMode)
        ? parsed.preferredMode
        : "standard",
    };
  } catch {
    return defaultStats;
  }
}

export function saveStats(stats: LocalStats): void {
  const payload: StoredStats = {
    ...stats,
    day: todayKey(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
