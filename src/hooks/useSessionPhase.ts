import type { PhaseState, SessionPreset } from "../types/session";

export function useSessionPhase(preset: SessionPreset, elapsed: number): PhaseState {
  if (elapsed >= preset.duration) {
    return {
      phase: "finished",
      phaseElapsed: 0,
      phaseDuration: 0,
      phaseProgress: 1,
      remaining: 0,
    };
  }

  const segment = preset.timeline.find(
    (item) => elapsed >= item.start && elapsed < item.end,
  );

  if (!segment) {
    return {
      phase: "idle",
      phaseElapsed: 0,
      phaseDuration: preset.duration,
      phaseProgress: 0,
      remaining: preset.duration,
    };
  }

  const phaseDuration = segment.end - segment.start;
  const phaseElapsed = elapsed - segment.start;

  return {
    phase: segment.phase,
    phaseElapsed,
    phaseDuration,
    phaseProgress: phaseDuration > 0 ? phaseElapsed / phaseDuration : 0,
    remaining: Math.max(0, preset.duration - elapsed),
  };
}
