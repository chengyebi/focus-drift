import { useEffect, useRef, useState } from "react";

interface SessionTimerOptions {
  duration: number;
  active: boolean;
  paused: boolean;
  onFinish: () => void;
}

export function useSessionTimer({
  duration,
  active,
  paused,
  onFinish,
}: SessionTimerOptions) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    setElapsed(0);
    elapsedRef.current = 0;
    lastTickRef.current = null;
    finishedRef.current = false;
  }, [duration, active]);

  useEffect(() => {
    if (!active || finishedRef.current) {
      return undefined;
    }

    let frame = 0;

    const tick = (now: number) => {
      if (!paused) {
        if (lastTickRef.current === null) {
          lastTickRef.current = now;
        }

        const delta = (now - lastTickRef.current) / 1000;
        lastTickRef.current = now;
        const nextElapsed = Math.min(duration, elapsedRef.current + delta);
        elapsedRef.current = nextElapsed;
        setElapsed(nextElapsed);

        if (nextElapsed >= duration && !finishedRef.current) {
          finishedRef.current = true;
          onFinish();
          return;
        }
      } else {
        lastTickRef.current = null;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, onFinish, paused]);

  return {
    elapsed,
    progress: duration > 0 ? Math.min(1, elapsed / duration) : 0,
    reset: () => {
      elapsedRef.current = 0;
      lastTickRef.current = null;
      finishedRef.current = false;
      setElapsed(0);
    },
  };
}
