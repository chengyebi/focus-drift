import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { SessionMode } from "../types/session";

interface EndScreenProps {
  mode: SessionMode;
  onReturn: () => void;
  onStartAgain: (mode: SessionMode) => void;
}

export function EndScreen({ mode, onReturn, onStartAgain }: EndScreenProps) {
  return (
    <main className="end-screen">
      <div className="ambient-bg" aria-hidden="true" />
      <motion.section
        className="end-panel"
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="done-orb" aria-hidden="true" />
        <p className="eyebrow">Session complete</p>
        <h1>Done.</h1>
        <p className="end-copy">
          You gave your eyes a real break.
          <br />
          Drink water. Drop your shoulders. Back to code.
        </p>
        <div className="hero-actions">
          <button className="primary-action" onClick={onReturn}>
            <ArrowLeft size={17} />
            Return to Code
          </button>
          <button className="secondary-action" onClick={() => onStartAgain(mode)}>
            <RotateCcw size={17} />
            Start Again
          </button>
        </div>
        <p className="disclaimer">
          Focus Drift is not medical treatment. It simply helps you take calmer screen breaks.
        </p>
      </motion.section>
    </main>
  );
}
