import { useCallback, useEffect, useState } from "react";

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  useEffect(() => {
    const update = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const enter = useCallback(async (element: HTMLElement | null) => {
    if (!element || document.fullscreenElement || !element.requestFullscreen) {
      return;
    }

    try {
      await element.requestFullscreen();
    } catch {
      setIsFullscreen(false);
    }
  }, []);

  const exit = useCallback(async () => {
    if (!document.fullscreenElement || !document.exitFullscreen) {
      return;
    }

    try {
      await document.exitFullscreen();
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  }, []);

  return { isFullscreen, enter, exit };
}
