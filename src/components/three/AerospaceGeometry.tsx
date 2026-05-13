"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function TurbineRing({
  radius,
  tubeRadius,
  rotationSpeed,
  phase,
  color = "#D9D9D9",
}: {
  radius: number;
  tubeRadius: number;
  rotationSpeed: number;
  phase: number;
  color?: string;
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
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function CoreGeometry() {
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
      <meshBasicMaterial color="#D9D9D9" wireframe opacity={0.85} transparent />
    </mesh>
  );
}

function GlowPoint({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse =
        0.8 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function GridPlane() {
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
      <lineBasicMaterial color="#5DA9FF" opacity={0.07} transparent />
    </lineSegments>
  );
}

function Scene() {
  return (
    <>
      <CoreGeometry />
      <TurbineRing
        radius={2.8}
        tubeRadius={0.015}
        rotationSpeed={0.06}
        phase={0}
        color="#5DA9FF"
      />
      <TurbineRing
        radius={3.5}
        tubeRadius={0.01}
        rotationSpeed={0.04}
        phase={1.2}
        color="#D9D9D9"
      />
      <TurbineRing
        radius={4.2}
        tubeRadius={0.008}
        rotationSpeed={0.03}
        phase={2.4}
        color="#8B949E"
      />
      <GlowPoint position={[2.1, 0.8, 0.5]} color="#5DA9FF" size={0.06} />
      <GlowPoint position={[-1.8, -0.6, 1.2]} color="#5DA9FF" size={0.04} />
      <GlowPoint position={[0.5, 2.2, -0.8]} color="#D9D9D9" size={0.05} />
      <GridPlane />
      <Stars
        radius={25}
        depth={30}
        count={600}
        factor={1.5}
        saturation={0}
        fade
        speed={0.3}
      />
    </>
  );
}

export default function AerospaceGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 42 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
}
