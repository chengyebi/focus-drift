import { motion } from "framer-motion";
import { Activity, Settings } from "lucide-react";
import { Disclaimer } from "./Disclaimer";
import { ModeSelector } from "./ModeSelector";
import type { LocalStats, SessionMode } from "../types/session";

interface LandingProps {
  stats: LocalStats;
  onStart: (mode: SessionMode) => void;
  onOpenSettings: () => void;
}

export function Landing({ stats, onOpenSettings, onStart }: LandingProps) {
  const minutesToday = Math.round(stats.todayBreakSeconds / 60);

  return (
    <main className="landing-shell">
      <div className="ambient-bg" aria-hidden="true" />
      <nav className="topbar" aria-label="Application">
        <div className="brand-mark">
          <span className="brand-dot" />
          <span>Focus Drift</span>
        </div>
        <button className="icon-button" onClick={onOpenSettings} aria-label="Open settings">
          <Settings size={18} />
        </button>
      </nav>

      <section className="hero">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow">
            <Activity size={15} aria-hidden="true" />
            WebGL eye-break ritual for developers
          </p>
          <h1>Focus Drift</h1>
          <p className="subtitle">A 90-second visual reset for developers.</p>
          <p className="ritual-copy">
            Follow a soft point.
            <br />
            Blink when it breathes.
            <br />
            Look away when the screen fades.
            <br />
            Return to code lighter.
          </p>
          <div className="hero-actions" aria-label="Quick start actions">
            <button className="primary-action" onClick={() => onStart("standard")}>
              Start 90s
            </button>
            <button className="secondary-action" onClick={() => onStart("quick")}>
              Quick 20s
            </button>
            <button className="secondary-action" onClick={() => onStart("deep")}>
              Deep 3min
            </button>
          </div>
          <Disclaimer />
        </motion.div>

        <motion.aside
          className="status-panel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        >
          <div className="orb-preview" aria-hidden="true">
            <span />
          </div>
          <dl className="stats-row">
            <div>
              <dt>Today</dt>
              <dd>{stats.todayCompletedSessions}</dd>
            </div>
            <div>
              <dt>Break time</dt>
              <dd>{minutesToday}m</dd>
            </div>
          </dl>
        </motion.aside>
      </section>

      <ModeSelector onStart={onStart} />
      <p className="page-note">Not medical treatment. Just a better screen break.</p>
    </main>
  );
}
