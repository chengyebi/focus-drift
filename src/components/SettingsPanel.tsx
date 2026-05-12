import { Bell, Volume2, X } from "lucide-react";
import type { LocalStats } from "../types/session";
import { formatTime } from "../utils/time";

interface SettingsPanelProps {
  open: boolean;
  stats: LocalStats;
  onClose: () => void;
  onSoundChange: (enabled: boolean) => void;
}

export function SettingsPanel({ onClose, onSoundChange, open, stats }: SettingsPanelProps) {
  if (!open) {
    return null;
  }

  const enableReminder = async () => {
    if (!("Notification" in window)) {
      return;
    }

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }

    if (Notification.permission === "granted") {
      new Notification("Focus Drift reminder", {
        body: "A calmer screen break is ready when you are.",
        icon: "/focus-drift/icon.svg",
      });
    }
  };

  return (
    <div className="settings-backdrop" role="presentation" onMouseDown={onClose}>
      <aside
        className="settings-panel"
        aria-label="Settings"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <p className="eyebrow">Local settings</p>
            <h2>Quiet defaults</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close settings">
            <X size={18} />
          </button>
        </header>

        <label className="setting-row">
          <span>
            <Volume2 size={18} />
            Gentle audio pulse
          </span>
          <input
            type="checkbox"
            checked={stats.soundEnabled}
            onChange={(event) => onSoundChange(event.target.checked)}
          />
        </label>

        <button className="setting-row button-row" onClick={enableReminder}>
          <span>
            <Bell size={18} />
            Enable a local browser reminder
          </span>
        </button>

        <dl className="settings-stats">
          <div>
            <dt>Sessions today</dt>
            <dd>{stats.todayCompletedSessions}</dd>
          </div>
          <div>
            <dt>Break time today</dt>
            <dd>{formatTime(stats.todayBreakSeconds)}</dd>
          </div>
        </dl>

        <p className="settings-note">
          Stats stay in this browser with LocalStorage. No account. No server. No camera.
        </p>
      </aside>
    </div>
  );
}
