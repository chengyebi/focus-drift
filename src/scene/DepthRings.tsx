import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { SessionPhase } from "../types/session";

interface DepthRingsProps {
  phase: SessionPhase;
  reducedMotion: boolean;
}

export function DepthRings({ phase, reducedMotion }: DepthRingsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    const speed = reducedMotion ? 0.04 : 0.12;
    groupRef.current.rotation.z = Math.sin(t * speed) * 0.04;
    groupRef.current.position.z = phase === "depthDrift" ? Math.sin(t * 0.18) * 0.5 : -0.3;
  });

  const opacity = phase === "lookAway" ? 0.035 : phase === "depthDrift" ? 0.11 : 0.065;

  return (
    <group ref={groupRef} position={[0, 0, -0.4]}>
      {[1.8, 3.1, 4.6].map((radius, index) => (
        <mesh key={radius} rotation={[0, 0, index * 0.42]}>
          <torusGeometry args={[radius, 0.006, 12, 160]} />
          <meshBasicMaterial transparent depthWrite={false} color="#91d9c3" opacity={opacity / (index + 1)} />
        </mesh>
      ))}
    </group>
  );
}
