import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SessionPhase } from "../types/session";
import { easeInOutSine, lerp } from "../utils/easing";

interface GlowOrbProps {
  phase: SessionPhase;
  reducedMotion: boolean;
}

export function GlowOrb({ phase, reducedMotion }: GlowOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  const colors = useMemo(
    () => ({
      core: new THREE.Color("#f7fbff"),
      halo: new THREE.Color("#a8e6cf"),
      blue: new THREE.Color("#80b8ff"),
    }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const group = groupRef.current;
    const core = coreRef.current;
    const halo = haloRef.current;

    if (!group || !core || !halo) {
      return;
    }

    const phaseSlowdown = phase === "lookAway" || phase === "returning" ? 0.45 : 1;
    const motion = reducedMotion ? 0.22 : phaseSlowdown;
    const depth = Math.sin(t * 0.11 * motion);
    const easedDepth = easeInOutSine((depth + 1) / 2);
    const scale = lerp(0.72, 1.35, easedDepth);
    const opacity = lerp(0.58, 0.92, easedDepth);
    const x = Math.sin(t * 0.28 * motion) * 2.2;
    const y = Math.sin(t * 0.17 * motion + 1.2) * 1.1;
    const z = depth * 0.8;

    group.position.set(x, y, z);
    group.scale.setScalar(scale);

    const blinkBreath = phase === "blink" ? 1 + Math.sin(t * 1.5) * 0.08 : 1;
    halo.scale.setScalar(2.8 * blinkBreath);

    const coreMaterial = core.material as THREE.MeshBasicMaterial;
    const haloMaterial = halo.material as THREE.MeshBasicMaterial;
    coreMaterial.opacity = phase === "lookAway" ? 0.22 : opacity;
    haloMaterial.opacity = phase === "lookAway" ? 0.12 : opacity * 0.24;
    haloMaterial.color.copy(phase === "depthDrift" ? colors.blue : colors.halo);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <meshBasicMaterial transparent depthWrite={false} color="#a8e6cf" opacity={0.22} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.14, 40, 40]} />
        <meshBasicMaterial transparent depthWrite={false} color="#f7fbff" opacity={0.9} />
      </mesh>
    </group>
  );
}
