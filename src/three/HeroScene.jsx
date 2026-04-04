import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, GodRays } from "@react-three/postprocessing";
import * as THREE from "three";

// ============================================================
// PREMIUM SUN — Multi-layer emissive sphere with realistic corona
// ============================================================
function Sun() {
  const sunGroup = useRef();
  const coronaRef = useRef();

  useFrame(({ clock }) => {
    if (sunGroup.current) {
      sunGroup.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.02;
      coronaRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={sunGroup} position={[7, 5.5, -14]}>
      {/* Core — intense bright sphere */}
      <mesh>
        <sphereGeometry args={[2.4, 128, 128]} />
        <meshStandardMaterial
          color="#FFF8E7"
          emissive="#FF6600"
          emissiveIntensity={4.2}
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Inner glow layer */}
      <mesh scale={1.08}>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshStandardMaterial
          color="#FFE0A0"
          emissive="#FF4400"
          emissiveIntensity={2.8}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Mid atmosphere */}
      <mesh scale={1.22}>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshStandardMaterial
          color="#FFCC80"
          emissive="#FF3300"
          emissiveIntensity={1.6}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer haze */}
      <mesh scale={1.45}>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshStandardMaterial
          color="#FFAA55"
          emissive="#FF2200"
          emissiveIntensity={0.8}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Corona glow sprite */}
      <mesh ref={coronaRef} scale={1.6}>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial
          color="#FF8822"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Animated corona rings */}
      <CoronaRing
        radius={3.2}
        width={0.12}
        color="#FF9922"
        intensity={3.5}
        speed={0.25}
        tilt={0.5}
      />
      <CoronaRing
        radius={4.1}
        width={0.08}
        color="#FFBB44"
        intensity={2.2}
        speed={0.18}
        tilt={0.3}
      />
      <CoronaRing
        radius={5.3}
        width={0.06}
        color="#FFCC66"
        intensity={1.2}
        speed={0.12}
        tilt={0.7}
      />
      <CoronaRing
        radius={6.8}
        width={0.04}
        color="#FFDD88"
        intensity={0.7}
        speed={0.08}
        tilt={0.4}
      />
    </group>
  );
}

function CoronaRing({ radius, width, color, intensity, speed, tilt }) {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * speed;
      ringRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.5) * tilt;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, width, 64, 200]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        transparent
        opacity={0.7 - radius / 10}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ============================================================
// PREMIUM SOLAR PANEL — Detailed cell structure with reflections
// ============================================================
function PremiumSolarPanel({ position, rotation, index }) {
  const panelRef = useRef();
  const glassRef = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (panelRef.current && glassRef.current) {
      const microWobble =
        Math.sin(clock.getElapsedTime() * 0.8 + phase) * 0.003;
      panelRef.current.position.y = position[1] + microWobble;
      glassRef.current.position.y = position[1] + microWobble;
      panelRef.current.rotation.x = rotation[0] + microWobble * 0.5;
      glassRef.current.rotation.x = rotation[0] + microWobble * 0.5;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Aluminum frame */}
      <mesh ref={panelRef} castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.038, 1.05]} />
        <meshStandardMaterial
          color="#C0C8D0"
          metalness={0.85}
          roughness={0.25}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Backsheet */}
      <mesh position={[0, -0.022, 0]}>
        <boxGeometry args={[1.62, 0.012, 0.99]} />
        <meshStandardMaterial color="#2A3A4A" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Solar cells grid — 6x10 cells */}
      <group position={[0, 0.012, 0]}>
        {Array.from({ length: 60 }).map((_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const x = (col - 4.5) * 0.156;
          const z = (row - 2.5) * 0.158;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <boxGeometry args={[0.144, 0.008, 0.146]} />
              <meshStandardMaterial
                color="#0A2A5A"
                emissive="#1A4A8A"
                emissiveIntensity={0.15 + Math.random() * 0.08}
                metalness={0.7}
                roughness={0.15}
              />
            </mesh>
          );
        })}

        {/* Cell grid lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh
            key={`grid-h-${i}`}
            position={[0, 0.005, (i - 3) * 0.315]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[1.58, 0.008]} />
            <meshBasicMaterial color="#88BBFF" transparent opacity={0.35} />
          </mesh>
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <mesh
            key={`grid-v-${i}`}
            position={[(i - 5) * 0.285, 0.005, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <planeGeometry args={[0.95, 0.008]} />
            <meshBasicMaterial color="#88BBFF" transparent opacity={0.35} />
          </mesh>
        ))}
      </group>

      {/* Anti-reflective glass coating */}
      <mesh ref={glassRef} position={[0, 0.025, 0]}>
        <boxGeometry args={[1.62, 0.008, 0.99]} />
        <meshStandardMaterial
          color="#88AACC"
          metalness={0.95}
          roughness={0.08}
          transparent
          opacity={0.45}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Blue reflection shimmer */}
      <mesh position={[0, 0.032, 0]}>
        <boxGeometry args={[1.58, 0.002, 0.96]} />
        <meshStandardMaterial
          color="#4488FF"
          emissive="#2266CC"
          emissiveIntensity={0.12}
          transparent
          opacity={0.2}
          metalness={0.98}
        />
      </mesh>
    </group>
  );
}

function SolarPanelField() {
  const panels = useMemo(() => {
    const arr = [];
    const rows = 14;
    const cols = 24;
    const spacingX = 1.78;
    const spacingZ = 1.12;
    const startX = (-(cols - 1) * spacingX) / 2;
    const startZ = (-(rows - 1) * spacingZ) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacingX + (Math.random() - 0.5) * 0.04;
        const z = startZ + r * spacingZ + (Math.random() - 0.5) * 0.04;
        const tilt = -Math.PI / 4.6 + (Math.random() - 0.5) * 0.03;
        arr.push({
          position: [x, -2.6 + (Math.random() - 0.5) * 0.03, z],
          rotation: [tilt, 0, 0],
        });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {/* Ground with desert texture feel */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.85, 0]}
        receiveShadow
      >
        <planeGeometry args={[65, 48]} />
        <meshStandardMaterial
          color="#8B7A5E"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Gravel/pebble detail */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.82, 0]}
        receiveShadow
      >
        <planeGeometry args={[64, 47]} />
        <meshStandardMaterial
          color="#7A6A50"
          roughness={0.92}
          metalness={0.02}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Support structures (simple beams) */}
      {panels.slice(0, 200).map((panel, i) => (
        <group
          key={`mount-${i}`}
          position={panel.position}
          rotation={panel.rotation}
        >
          <mesh position={[-0.55, -0.15, 0.35]}>
            <boxGeometry args={[0.06, 0.32, 0.06]} />
            <meshStandardMaterial
              color="#8898A8"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.55, -0.15, 0.35]}>
            <boxGeometry args={[0.06, 0.32, 0.06]} />
            <meshStandardMaterial
              color="#8898A8"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[-0.55, -0.15, -0.35]}>
            <boxGeometry args={[0.06, 0.32, 0.06]} />
            <meshStandardMaterial
              color="#8898A8"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.55, -0.15, -0.35]}>
            <boxGeometry args={[0.06, 0.32, 0.06]} />
            <meshStandardMaterial
              color="#8898A8"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Solar panels */}
      {panels.map((panel, i) => (
        <PremiumSolarPanel
          key={i}
          position={panel.position}
          rotation={panel.rotation}
          index={i}
        />
      ))}
    </group>
  );
}

// ============================================================
// ATMOSPHERIC EFFECTS
// ============================================================
function SunGlowRays() {
  const raysRef = useRef();

  useFrame(({ clock }) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = clock.getElapsedTime() * 0.015;
    }
  });

  const rays = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      length: 6 + Math.random() * 4,
      width: 0.045 + Math.random() * 0.06,
      opacity: 0.08 + Math.random() * 0.1,
    }));
  }, []);

  return (
    <group ref={raysRef} position={[7, 5.5, -14]}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(ray.angle) * (2.8 + ray.length / 2),
            Math.sin(ray.angle) * (2.8 + ray.length / 2),
            0,
          ]}
          rotation={[0, 0, ray.angle]}
        >
          <planeGeometry args={[ray.length, ray.width]} />
          <meshBasicMaterial
            color="#FFCC66"
            transparent
            opacity={ray.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function DustParticles() {
  const count = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 55;
      arr[i * 3 + 1] = Math.random() * 14 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    return arr;
  }, []);

  return (
    <Sparkles
      count={count}
      scale={[55, 15, 45]}
      size={0.04}
      color="#FFD080"
      opacity={0.4}
      speed={0.3}
    />
  );
}

function LightOrbs() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 45,
          Math.random() * 12 - 2,
          (Math.random() - 0.5) * 38 - 8,
        ],
        speed: 0.002 + Math.random() * 0.008,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  const refs = useRef([]);

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        const y =
          positions[i].position[1] +
          Math.sin(clock.getElapsedTime() * 0.8 + positions[i].phase) * 0.08;
        mesh.position.y = y;
      }
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={pos.position}
        >
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial
            color="#FFAA55"
            emissive="#FF6622"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </>
  );
}

// ============================================================
// CAMERA WITH SMOOTH PARALLAX
// ============================================================
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2.2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 1.2;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.04;
    target.current.y += (mouse.current.y - target.current.y) * 0.04;

    camera.position.x = target.current.x * 2.2;
    camera.position.y = 3.5 + target.current.y * -1.2;
    camera.lookAt(0, -0.8, -2);
  });

  return null;
}

// ============================================================
// MAIN SCENE
// ============================================================
function Scene() {
  return (
    <>
      <Sky
        distance={4500}
        sunPosition={[7, 0.8, -14]}
        inclination={0.55}
        azimuth={0.2}
        turbidity={2.8}
        rayleigh={0.6}
        mieCoefficient={0.008}
        mieDirectionalG={0.88}
      />

      <ambientLight intensity={0.65} color="#FFF0D0" />
      <hemisphereLight
        skyColor="#7AB8E8"
        groundColor="#8B7355"
        intensity={0.9}
      />

      {/* Main directional light from sun */}
      <directionalLight
        position={[7, 12, -12]}
        intensity={6.2}
        color="#FFD890"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0001}
      />

      {/* Fill lights */}
      <directionalLight
        position={[-3, 5, 12]}
        intensity={1.8}
        color="#88AAFF"
      />
      <pointLight position={[-8, 6, 5]} intensity={1.2} color="#FF9966" />
      <pointLight position={[12, 4, -5]} intensity={0.8} color="#FFCC88" />
      <pointLight position={[0, 8, -8]} intensity={0.6} color="#FFAA66" />

      {/* Scene objects */}
      <SunGlowRays />
      <Sun />
      <SolarPanelField />
      <DustParticles />
      <LightOrbs />
      <CameraRig />

      {/* Post-processing bloom */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.25}
          luminanceSmoothing={0.7}
          intensity={2.2}
          radius={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ============================================================
// EXPORT
// ============================================================
export default function HeroScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 4.2, 16], fov: 52, near: 0.2, far: 100 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.45,
        alpha: false,
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
