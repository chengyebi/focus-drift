import { Clock3, Moon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { SessionMode } from "../types/session";
import { presetOrder, sessionPresets } from "../data/sessionPresets";

interface ModeSelectorProps {
  onStart: (mode: SessionMode) => void;
}

const icons: Record<SessionMode, JSX.Element> = {
  quick: <Sparkles size={18} aria-hidden="true" />,
  standard: <Clock3 size={18} aria-hidden="true" />,
  deep: <Moon size={18} aria-hidden="true" />,
};

export function ModeSelector({ onStart }: ModeSelectorProps) {
  return (
    <section className="mode-grid" aria-label="Session modes">
      {presetOrder.map((mode) => {
        const preset = sessionPresets[mode];
        return (
          <motion.button
            className={preset.primary ? "mode-card primary" : "mode-card"}
            key={preset.id}
            onClick={() => onStart(preset.id)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.985 }}
          >
            <span className="mode-icon">{icons[preset.id]}</span>
            <span className="mode-copy">
              <strong>{preset.name}</strong>
              <span>{preset.description}</span>
            </span>
          </motion.button>
        );
      })}
    </section>
  );
}
