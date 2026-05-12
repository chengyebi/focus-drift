import { Canvas } from "@react-three/fiber";
import type { SessionPhase } from "../types/session";
import { DepthRings } from "./DepthRings";
import { GlowOrb } from "./GlowOrb";
import { ParticleField } from "./ParticleField";
import { SceneLighting } from "./SceneLighting";

interface DriftCanvasProps {
  phase: SessionPhase;
  reducedMotion: boolean;
}

export function DriftCanvas({ phase, reducedMotion }: DriftCanvasProps) {
  return (
    <div className="drift-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 44 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <SceneLighting />
        <ParticleField reducedMotion={reducedMotion} />
        <DepthRings phase={phase} reducedMotion={reducedMotion} />
        <GlowOrb phase={phase} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
