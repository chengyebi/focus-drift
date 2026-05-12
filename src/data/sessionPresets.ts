import type { SessionMode, SessionPreset } from "../types/session";
import { deepTimeline, quickTimeline, standardTimeline } from "./sessionTimeline";

export const sessionPresets: Record<SessionMode, SessionPreset> = {
  quick: {
    id: "quick",
    name: "Quick Reset",
    shortLabel: "Quick 20s",
    duration: 20,
    description: "20 seconds for a tiny pause.",
    timeline: quickTimeline,
  },
  standard: {
    id: "standard",
    name: "Standard Drift",
    shortLabel: "Start 90s",
    duration: 90,
    description: "90 seconds for a real visual reset.",
    primary: true,
    timeline: standardTimeline,
  },
  deep: {
    id: "deep",
    name: "Deep Recovery",
    shortLabel: "Deep 3min",
    duration: 180,
    description: "3 minutes after a long coding session.",
    timeline: deepTimeline,
  },
};

export const presetOrder: SessionMode[] = ["standard", "quick", "deep"];
