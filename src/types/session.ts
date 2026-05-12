export type SessionPhase =
  | "idle"
  | "settling"
  | "tracking"
  | "blink"
  | "lookAway"
  | "depthDrift"
  | "returning"
  | "finished"
  | "paused";

export type SessionMode = "quick" | "standard" | "deep";

export interface TimelineSegment {
  phase: Exclude<SessionPhase, "idle" | "finished" | "paused">;
  start: number;
  end: number;
}

export interface SessionPreset {
  id: SessionMode;
  name: string;
  duration: number;
  shortLabel: string;
  description: string;
  primary?: boolean;
  timeline: TimelineSegment[];
}

export interface PhaseState {
  phase: SessionPhase;
  phaseElapsed: number;
  phaseDuration: number;
  phaseProgress: number;
  remaining: number;
}

export interface LocalStats {
  todayCompletedSessions: number;
  todayBreakSeconds: number;
  lastSessionAt: string | null;
  soundEnabled: boolean;
  preferredMode: SessionMode;
}
