import { useEffect, useState } from "react";
import type { LocalStats, SessionMode } from "../types/session";
import { loadStats, saveStats } from "../utils/storage";

export function useLocalStats() {
  const [stats, setStats] = useState<LocalStats>(() => loadStats());

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const recordSession = (seconds: number) => {
    setStats((current) => ({
      ...current,
      todayCompletedSessions: current.todayCompletedSessions + 1,
      todayBreakSeconds: current.todayBreakSeconds + seconds,
      lastSessionAt: new Date().toISOString(),
    }));
  };

  const setSoundEnabled = (soundEnabled: boolean) => {
    setStats((current) => ({ ...current, soundEnabled }));
  };

  const setPreferredMode = (preferredMode: SessionMode) => {
    setStats((current) => ({ ...current, preferredMode }));
  };

  return { stats, recordSession, setSoundEnabled, setPreferredMode };
}
