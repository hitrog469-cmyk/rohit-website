"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleMesh() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { positions, originalPositions } = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    // Create a grid of particles resembling a plate/mesh structure
    const cols = 80;
    const rows = 50;
    const spacingX = 0.12;
    const spacingY = 0.12;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - cols / 2) * spacingX;
      const y = (row - rows / 2) * spacingY;
      // Slight wave for the plate — like a buckled/deformed shape
      const wave = Math.sin(col * 0.3) * Math.cos(row * 0.3) * 0.3;
      const z = wave;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    return { positions, originalPositions };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < posArray.length / 3; i++) {
      const ix = originalPositions[i * 3];
      const iy = originalPositions[i * 3 + 1];

      // Animated buckling wave
      const wave =
        Math.sin(ix * 2 + t * 0.5) * Math.cos(iy * 2 + t * 0.3) * 0.25;

      // Mouse repulsion
      const dx = ix - mouse.x * 4;
      const dy = iy - mouse.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsion = Math.max(0, 1 - dist / 1.5) * 0.4;

      posArray[i * 3 + 2] = originalPositions[i * 3 + 2] + wave + repulsion;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow drift rotation
    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 + 0.15;
    meshRef.current.rotation.y = Math.sin(t * 0.07) * 0.08;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#F59E0B"),
        size: 0.022,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      }),
    []
  );

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

export default function HeroMesh() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <ParticleMesh />
    </Canvas>
  );
}
