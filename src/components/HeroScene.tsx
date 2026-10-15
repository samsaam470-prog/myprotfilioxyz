import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Check WebGL availability
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Hook for reduced motion preference
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Hook for mouse parallax
function useMouseParallax(containerRef: React.RefObject<HTMLElement | null>) {
  const mouse = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      isHovering.current = true;
    };

    const handleLeave = () => {
      isHovering.current = false;
      mouse.current.x = 0;
      mouse.current.y = 0;
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = el.getBoundingClientRect();
        mouse.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        isHovering.current = true;
      }
    };

    const handleTouchEnd = () => {
      isHovering.current = false;
      mouse.current.x = 0;
      mouse.current.y = 0;
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('touchmove', handleTouch, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('touchmove', handleTouch);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef]);

  return { mouse, isHovering };
}

// Main sculpture group
function Sculpture({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const { mouse } = useMouseParallax(containerRef as React.RefObject<HTMLElement>);
  const { viewport } = useThree();
  const scrollY = useRef(0);

  // Find the hero section container
  useEffect(() => {
    const el = document.getElementById('hero-3d-container');
    if (el) containerRef.current = el;
  }, []);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Smooth mouse follow with lerp
    const targetRotX = mouse.current.y * 0.4;
    const targetRotY = mouse.current.x * 0.4;

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;

    // Idle rotation + scroll interaction
    if (!reduced) {
      groupRef.current.rotation.y += delta * 0.08;
      // Subtle scroll-based tilt
      const scrollInfluence = Math.min(scrollY.current * 0.0003, 0.3);
      groupRef.current.rotation.z += (scrollInfluence - groupRef.current.rotation.z) * 0.02;
    }

    // Subtle breathing scale
    if (!reduced) {
      const breathe = 1 + Math.sin(t * 0.5) * 0.01;
      groupRef.current.scale.setScalar(breathe);
    }
  });

  // Responsive scale
  const scale = Math.min(viewport.width / 6, 1);

  return (
    <group ref={groupRef} scale={scale}>
      <Float
        speed={reduced ? 0 : 1.2}
        rotationIntensity={reduced ? 0 : 0.15}
        floatIntensity={reduced ? 0 : 0.4}
        floatingRange={[-0.05, 0.05]}
      >
        <SculptureContent reduced={reduced} />
      </Float>
    </group>
  );
}

// Inner sculpture content
function SculptureContent({ reduced }: { reduced: boolean }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const smallSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!reduced) {
      // Ring rotations
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x = t * 0.2;
        ring1Ref.current.rotation.z = t * 0.1;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y = t * 0.15;
        ring2Ref.current.rotation.x = Math.PI / 3 + t * 0.08;
      }

      // Sphere orbits
      if (sphere1Ref.current) {
        sphere1Ref.current.position.x = Math.cos(t * 0.3) * 2.2;
        sphere1Ref.current.position.z = Math.sin(t * 0.3) * 2.2;
        sphere1Ref.current.position.y = Math.sin(t * 0.5) * 0.3 + 0.5;
      }
      if (sphere2Ref.current) {
        sphere2Ref.current.position.x = Math.cos(t * 0.25 + Math.PI) * 1.8;
        sphere2Ref.current.position.z = Math.sin(t * 0.25 + Math.PI) * 1.8;
        sphere2Ref.current.position.y = Math.cos(t * 0.4) * 0.4 - 0.3;
      }
      if (smallSphereRef.current) {
        smallSphereRef.current.position.x = Math.cos(t * 0.4 + 2) * 2.5;
        smallSphereRef.current.position.z = Math.sin(t * 0.4 + 2) * 1.5;
        smallSphereRef.current.position.y = Math.sin(t * 0.6) * 0.5;
      }
    }
  });

  return (
    <>
      {/* Central torus knot - gold metallic */}
      <mesh castShadow>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#c9a96e"
          metalness={0.95}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Orbiting ring 1 - thin gold */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshPhysicalMaterial
          color="#e8d5a8"
          metalness={0.9}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>

      {/* Orbiting ring 2 - thinner, different angle */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.9, 0.015, 16, 100]} />
        <meshPhysicalMaterial
          color="#c9a96e"
          metalness={0.85}
          roughness={0.25}
          clearcoat={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Glass sphere 1 - larger */}
      <mesh ref={sphere1Ref} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#f5e6c8"
          metalness={0.0}
          roughness={0.05}
          transmission={0.95}
          thickness={0.5}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1}
          transparent
        />
      </mesh>

      {/* Glass sphere 2 - smaller */}
      <mesh ref={sphere2Ref} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#e8d5a8"
          metalness={0.0}
          roughness={0.05}
          transmission={0.9}
          thickness={0.4}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1}
          transparent
        />
      </mesh>

      {/* Small metallic accent sphere */}
      <mesh ref={smallSphereRef} castShadow>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshPhysicalMaterial
          color="#c9a96e"
          metalness={1}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={2}
        />
      </mesh>

      {/* Subtle icosahedron wireframe in background */}
      <mesh scale={2.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#c9a96e"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </>
  );
}

// Lighting setup
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#fff5e6" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#fff8f0"
        castShadow
      />
      <pointLight
        position={[-3, 2, -2]}
        intensity={0.8}
        color="#c9a96e"
        distance={10}
      />
      <pointLight
        position={[3, -2, 3]}
        intensity={0.4}
        color="#e8d5a8"
        distance={8}
      />
      <pointLight
        position={[0, 3, -3]}
        intensity={0.3}
        color="#ffffff"
        distance={10}
      />
    </>
  );
}

// Fallback for no WebGL
function HeroFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/5 blur-3xl" />
      </div>
      <div className="relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-dark-card via-dark-lighter to-dark border border-accent/10">
        <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-amber-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl font-semibold text-accent/30">
          A
        </div>
      </div>
    </div>
  );
}

// Main exported component
export default function HeroScene() {
  const reduced = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!webglSupported) {
    return <HeroFallback />;
  }

  return (
    <div id="hero-3d-container" className="relative w-full h-full">
      {/* Ambient glow behind canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-500/8 via-transparent to-amber-600/4 blur-3xl" />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <Sculpture reduced={reduced} />
          </Suspense>
        </Canvas>
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-3xl border border-accent/10 pointer-events-none" />
    </div>
  );
}
