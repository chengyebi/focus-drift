import { useEffect } from "react";

interface ShortcutOptions {
  enabled: boolean;
  onTogglePause: () => void;
  onEscape: () => void;
}

export function useKeyboardShortcuts({
  enabled,
  onEscape,
  onTogglePause,
}: ShortcutOptions) {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        onTogglePause();
      }

      if (event.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onEscape, onTogglePause]);
}
