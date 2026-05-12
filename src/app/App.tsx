import { useState } from "react";
import { DriftSession } from "../components/DriftSession";
import { EndScreen } from "../components/EndScreen";
import { Landing } from "../components/Landing";
import { SettingsPanel } from "../components/SettingsPanel";
import { sessionPresets } from "../data/sessionPresets";
import { useLocalStats } from "../hooks/useLocalStats";
import type { AppRoute } from "./routes";
import type { SessionMode } from "../types/session";

export function App() {
  const [route, setRoute] = useState<AppRoute>({ name: "landing" });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { recordSession, setPreferredMode, setSoundEnabled, stats } = useLocalStats();

  const startSession = (mode: SessionMode) => {
    setPreferredMode(mode);
    setSettingsOpen(false);
    setRoute({ name: "session", mode });
  };

  if (route.name === "session") {
    const preset = sessionPresets[route.mode];

    return (
      <DriftSession
        preset={preset}
        soundEnabled={stats.soundEnabled}
        onSoundChange={setSoundEnabled}
        onExit={() => setRoute({ name: "landing" })}
        onComplete={() => {
          recordSession(preset.duration);
          setRoute({ name: "finished", mode: route.mode });
        }}
      />
    );
  }

  if (route.name === "finished") {
    return (
      <EndScreen
        mode={route.mode}
        onReturn={() => setRoute({ name: "landing" })}
        onStartAgain={startSession}
      />
    );
  }

  return (
    <>
      <Landing
        stats={stats}
        onStart={startSession}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <SettingsPanel
        open={settingsOpen}
        stats={stats}
        onClose={() => setSettingsOpen(false)}
        onSoundChange={setSoundEnabled}
      />
    </>
  );
}
