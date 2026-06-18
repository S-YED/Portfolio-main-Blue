"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

type CloudSceneProps = {
  isDark: boolean;
  isMobile: boolean;
  mouseRef: MutableRefObject<{ x: number; y: number }>;
};

function CloudScene({ isDark, isMobile, mouseRef }: CloudSceneProps) {
  const cloudGroupRef = useRef<THREE.Group>(null);
  const reduceMotion = useReducedMotion();
  // Tuned values, previously exposed via the Leva debug panel
  // (removed so the dev tool doesn't ship in the production bundle).
  const segments = 42;
  const volume = 9;
  const opacity = 0.65;
  const fade = 10;
  const growth = 6.5;
  const speed = 0.08;

  const colors = isDark
    ? ["#d6e6fb", "#c4d8f4", "#cfe0f6", "#bcd2f0", "#d2e2f8"]
    : ["#cfe6ff", "#bcdcfb", "#d9edff", "#aed4f7", "#c6e3ff"];

  const cloudConfig = {
    segments: isMobile ? 22 : segments,
    volume,
    opacity: isDark ? opacity : Math.min(opacity + 0.1, 0.8),
    fade,
    growth,
    speed,
  };

  useFrame((state) => {
    if (!cloudGroupRef.current || reduceMotion) return;
    const targetY =
      Math.cos(state.clock.elapsedTime / 4) / 6 + mouseRef.current.x * 0.15;
    const targetX =
      Math.sin(state.clock.elapsedTime / 8) / 18 + mouseRef.current.y * 0.08;

    cloudGroupRef.current.rotation.y +=
      (targetY - cloudGroupRef.current.rotation.y) * 0.03;
    cloudGroupRef.current.rotation.x +=
      (targetX - cloudGroupRef.current.rotation.x) * 0.03;
  });

  return (
    <>
      <ambientLight intensity={isDark ? Math.PI / 1.35 : Math.PI / 1.8} />
      <spotLight
        position={[0, 40, 0]}
        decay={0}
        distance={45}
        penumbra={1}
        intensity={isDark ? 120 : 70}
      />
      <spotLight
        position={[-24, -4, 12]}
        color={isDark ? "#6ca8e0" : "#bcd9f5"}
        angle={0.2}
        decay={0}
        penumbra={0.8}
        intensity={isDark ? 18 : 8}
      />
      <group ref={cloudGroupRef}>
        <Clouds material={THREE.MeshLambertMaterial} limit={700}>
          <Cloud {...cloudConfig} bounds={[8, 1.6, 1.6]} color={colors[0]} />
          <Cloud
            {...cloudConfig}
            bounds={[8, 1.6, 1.6]}
            color={colors[1]}
            seed={2}
            position={[15, 0, 0]}
          />
          <Cloud
            {...cloudConfig}
            bounds={[8, 1.6, 1.6]}
            color={colors[2]}
            seed={3}
            position={[-15, 0, 0]}
          />
          <Cloud
            {...cloudConfig}
            bounds={[8, 1.6, 1.6]}
            color={colors[3]}
            seed={4}
            position={[0, 0, -12]}
          />
          <Cloud
            {...cloudConfig}
            bounds={[8, 1.6, 1.6]}
            color={colors[4]}
            seed={5}
            position={[0, 0, 12]}
          />
          <Cloud
            concentrate="outside"
            growth={90}
            color={isDark ? "#c9d8ee" : "#dcefff"}
            opacity={isDark ? 0.4 : 0.45}
            seed={0.3}
            bounds={200}
            volume={180}
          />
        </Clouds>
      </group>
    </>
  );
}

export default function CloudBackgroundScene() {
  const { resolvedTheme } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isDark = isMounted && resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      };
    };

    handleChange();
    window.addEventListener("mousemove", handleMouseMove);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: isDark ? 0.6 : 0.82,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Canvas
          camera={{ position: [0, -10, 10], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true }}
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <CloudScene isDark={isDark} isMobile={isMobile} mouseRef={mouseRef} />
        </Canvas>
      </div>
    </>
  );
}
