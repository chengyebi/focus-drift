import type { TimelineSegment } from "../types/session";

export const quickTimeline: TimelineSegment[] = [
  { phase: "settling", start: 0, end: 4 },
  { phase: "tracking", start: 4, end: 10 },
  { phase: "lookAway", start: 10, end: 16 },
  { phase: "returning", start: 16, end: 20 },
];

export const standardTimeline: TimelineSegment[] = [
  { phase: "settling", start: 0, end: 8 },
  { phase: "tracking", start: 8, end: 28 },
  { phase: "blink", start: 28, end: 38 },
  { phase: "lookAway", start: 38, end: 60 },
  { phase: "depthDrift", start: 60, end: 82 },
  { phase: "returning", start: 82, end: 90 },
];

export const deepTimeline: TimelineSegment[] = [
  { phase: "settling", start: 0, end: 15 },
  { phase: "tracking", start: 15, end: 55 },
  { phase: "blink", start: 55, end: 75 },
  { phase: "lookAway", start: 75, end: 120 },
  { phase: "depthDrift", start: 120, end: 165 },
  { phase: "returning", start: 165, end: 180 },
];
