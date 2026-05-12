import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { PhaseState, SessionPreset } from "../types/session";
import { formatTime } from "../utils/time";

interface SessionOverlayProps {
  preset: SessionPreset;
  phaseState: PhaseState;
  progress: number;
  paused: boolean;
  soundEnabled: boolean;
  onTogglePause: () => void;
  onToggleSound: () => void;
  onExit: () => void;
}

const phaseCopy = {
  idle: {
    title: "Prepare",
    body: "Let the room get quiet.",
  },
  settling: {
    title: "Drop your shoulders.",
    body: "Let your eyes soften.",
  },
  tracking: {
    title: "Follow softly.",
    body: "No need to focus hard.",
  },
  blink: {
    title: "Blink slowly.",
    body: "Let the point breathe.",
  },
  lookAway: {
    title: "Look at something far away.",
    body: "Window. Wall. Sky.",
  },
  depthDrift: {
    title: "Let the point drift.",
    body: "Stay relaxed.",
  },
  returning: {
    title: "Return gently.",
    body: "Let the session close itself.",
  },
  finished: {
    title: "Done.",
    body: "You gave your eyes a real break.",
  },
  paused: {
    title: "Paused.",
    body: "Press Space to continue.",
  },
};

export function SessionOverlay({
  onExit,
  onTogglePause,
  onToggleSound,
  paused,
  phaseState,
  preset,
  progress,
  soundEnabled,
}: SessionOverlayProps) {
  const copy = phaseCopy[paused ? "paused" : phaseState.phase];
  const isLookAway = phaseState.phase === "lookAway" && !paused;

  return (
    <div className={isLookAway ? "session-overlay look-away" : "session-overlay"}>
      <header className="session-topline">
        <div>
          <span>{preset.name}</span>
          <strong>{formatTime(phaseState.remaining)}</strong>
        </div>
        <div className="session-controls">
          <button className="session-control" onClick={onToggleSound} aria-label="Toggle sound">
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button className="session-control" onClick={onTogglePause} aria-label="Pause or resume">
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
          <button className="text-control" onClick={onExit}>
            Exit
          </button>
        </div>
      </header>

      <section className="phase-copy" aria-live="polite">
        <p className="phase-kicker">
          {isLookAway ? "20 seconds" : `${Math.round(phaseState.phaseProgress * 100)}%`}
        </p>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </section>

      <div className="session-footer" aria-hidden="true">
        <div className="progress-track">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <span>Space pauses. Esc exits.</span>
      </div>
    </div>
  );
}
