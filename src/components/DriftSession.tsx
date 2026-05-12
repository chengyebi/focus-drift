import { useCallback, useEffect, useRef, useState } from "react";
import { DriftCanvas } from "../scene/DriftCanvas";
import type { SessionPreset } from "../types/session";
import { useAudioPulse } from "../hooks/useAudioPulse";
import { useFullscreen } from "../hooks/useFullscreen";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useSessionPhase } from "../hooks/useSessionPhase";
import { useSessionTimer } from "../hooks/useSessionTimer";
import { useVisibilityPause } from "../hooks/useVisibilityPause";
import { SessionOverlay } from "./SessionOverlay";

interface DriftSessionProps {
  preset: SessionPreset;
  soundEnabled: boolean;
  onSoundChange: (enabled: boolean) => void;
  onComplete: () => void;
  onExit: () => void;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DriftSession({
  onComplete,
  onExit,
  onSoundChange,
  preset,
  soundEnabled,
}: DriftSessionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visibilityPaused = useVisibilityPause();
  const [manualPaused, setManualPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const { enter, exit } = useFullscreen();
  const paused = manualPaused || visibilityPaused;

  const handleFinish = useCallback(() => {
    void exit();
    onComplete();
  }, [exit, onComplete]);

  const timer = useSessionTimer({
    active: true,
    duration: preset.duration,
    paused,
    onFinish: handleFinish,
  });
  const phaseState = useSessionPhase(preset, timer.elapsed);

  useAudioPulse(soundEnabled, !paused, phaseState.phase);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    void enter(rootRef.current);
  }, [enter]);

  useKeyboardShortcuts({
    enabled: true,
    onTogglePause: () => setManualPaused((current) => !current),
    onEscape: onExit,
  });

  return (
    <main ref={rootRef} className={phaseState.phase === "lookAway" ? "session-shell dimmed" : "session-shell"}>
      <DriftCanvas phase={paused ? "paused" : phaseState.phase} reducedMotion={reducedMotion} />
      <SessionOverlay
        preset={preset}
        phaseState={phaseState}
        progress={timer.progress}
        paused={paused}
        soundEnabled={soundEnabled}
        onTogglePause={() => setManualPaused((current) => !current)}
        onToggleSound={() => onSoundChange(!soundEnabled)}
        onExit={onExit}
      />
    </main>
  );
}
