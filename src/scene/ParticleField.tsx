import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  reducedMotion: boolean;
}

function createPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * radius * 0.7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * radius;
  }

  return positions;
}

export function ParticleField({ reducedMotion }: ParticleFieldProps) {
  const nearRef = useRef<THREE.Points>(null);
  const farRef = useRef<THREE.Points>(null);
  const nearPositions = useMemo(() => createPositions(72, 9), []);
  const farPositions = useMemo(() => createPositions(96, 14), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const multiplier = reducedMotion ? 0.15 : 1;

    if (nearRef.current) {
      nearRef.current.rotation.y = t * 0.012 * multiplier;
      nearRef.current.rotation.x = Math.sin(t * 0.05) * 0.02 * multiplier;
    }

    if (farRef.current) {
      farRef.current.rotation.y = -t * 0.006 * multiplier;
      farRef.current.rotation.z = Math.sin(t * 0.04) * 0.015 * multiplier;
    }
  });

  return (
    <>
      <Points ref={farRef} positions={farPositions} stride={3} frustumCulled>
        <PointMaterial transparent color="#7d91b8" size={0.018} opacity={0.16} depthWrite={false} />
      </Points>
      <Points ref={nearRef} positions={nearPositions} stride={3} frustumCulled>
        <PointMaterial transparent color="#c5f3e4" size={0.014} opacity={0.22} depthWrite={false} />
      </Points>
    </>
  );
}
