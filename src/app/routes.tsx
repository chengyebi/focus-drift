import type { SessionMode } from "../types/session";

export type AppRoute =
  | { name: "landing" }
  | { name: "session"; mode: SessionMode }
  | { name: "finished"; mode: SessionMode };
