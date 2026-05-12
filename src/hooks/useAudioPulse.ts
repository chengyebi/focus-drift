import { useEffect, useRef } from "react";
import type { SessionPhase } from "../types/session";

export function useAudioPulse(enabled: boolean, active: boolean, phase: SessionPhase) {
  const contextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !active || document.hidden) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return undefined;
    }

    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) {
      return undefined;
    }

    const playPulse = () => {
      const context = contextRef.current ?? new AudioContextConstructor();
      contextRef.current = context;

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(phase === "lookAway" ? 392 : 329.63, context.currentTime);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.7);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.72);
    };

    playPulse();
    intervalRef.current = window.setInterval(playPulse, phase === "lookAway" ? 5200 : 6800);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active, enabled, phase]);
}
