"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type GeometryPalette = {
  core: string;
  ringPrimary: string;
  ringSecondary: string;
  ringTertiary: string;
  node: string;
  grid: string;
};

const DEFAULT_PALETTE: GeometryPalette = {
  core: "#101619",
  ringPrimary: "#6590B6",
  ringSecondary: "#34473F",
  ringTertiary: "#AFC4BA",
  node: "#6590B6",
  grid: "#CCD4CD",
};

function TurbineRing({
  radius,
  tubeRadius,
  rotationSpeed,
  phase,
  color,
  opacity = 0.9,
}: {
  radius: number;
  tubeRadius: number;
  rotationSpeed: number;
  phase: number;
  color: string;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * rotationSpeed + phase) * 0.4;
      meshRef.current.rotation.y =
        state.clock.elapsedTime * rotationSpeed * 0.7;
      meshRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * rotationSpeed * 0.5 + phase) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, tubeRadius, 4, 64]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function CoreGeometry({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.4, 0.38, 180, 24, 2, 3]} />
      <meshBasicMaterial color={color} wireframe opacity={0.42} transparent />
    </mesh>
  );
}

function NodePoint({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function GridPlane({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const size = 8;
    const divisions = 12;
    const step = (size * 2) / divisions;

    for (let i = 0; i <= divisions; i++) {
      const x = -size + i * step;
      vertices.push(x, -3.5, -size, x, -3.5, size);
    }
    for (let i = 0; i <= divisions; i++) {
      const z = -size + i * step;
      vertices.push(-size, -3.5, z, size, -3.5, z);
    }

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} opacity={0.6} transparent />
    </lineSegments>
  );
}

function Scene({ palette }: { palette: GeometryPalette }) {
  return (
    <>
      <CoreGeometry color={palette.core} />
      <TurbineRing
        radius={2.8}
        tubeRadius={0.015}
        rotationSpeed={0.06}
        phase={0}
        color={palette.ringPrimary}
      />
      <TurbineRing
        radius={3.5}
        tubeRadius={0.01}
        rotationSpeed={0.04}
        phase={1.2}
        color={palette.ringSecondary}
        opacity={0.7}
      />
      <TurbineRing
        radius={4.2}
        tubeRadius={0.008}
        rotationSpeed={0.03}
        phase={2.4}
        color={palette.ringTertiary}
        opacity={0.7}
      />
      <NodePoint position={[2.1, 0.8, 0.5]} color={palette.node} size={0.06} />
      <NodePoint position={[-1.8, -0.6, 1.2]} color={palette.node} size={0.04} />
      <NodePoint position={[0.5, 2.2, -0.8]} color={palette.node} size={0.05} />
      <GridPlane color={palette.grid} />
    </>
  );
}

export default function AerospaceGeometry({
  palette = DEFAULT_PALETTE,
}: {
  palette?: GeometryPalette;
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 8.4], fov: 42 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene palette={palette} />
    </Canvas>
  );
}
