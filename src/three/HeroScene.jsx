import { useRef, useMemo, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ══════════════════════════════════════
   SUN — Core sphere + corona rings + glow
══════════════════════════════════════ */
function Sun() {
  const groupRef = useRef()
  const r1 = useRef(), r2 = useRef(), r3 = useRef(), r4 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.rotation.y = t * 0.05
    if (r1.current) { r1.current.rotation.z = t * 0.20; r1.current.rotation.x = Math.PI / 3.2 }
    if (r2.current) { r2.current.rotation.x = Math.PI / 2 + t * 0.13; r2.current.rotation.y = t * 0.09 }
    if (r3.current) { r3.current.rotation.z = -t * 0.16; r3.current.rotation.y = t * 0.07 }
    if (r4.current) { r4.current.rotation.x = t * 0.08; r4.current.rotation.z = t * 0.11 }
  })

  return (
    <group ref={groupRef} position={[6, 7, -11]}>
      {/* ── Core sun sphere ── */}
      <mesh>
        <sphereGeometry args={[3.0, 64, 64]} />
        <meshStandardMaterial
          color="#FFFDE0"
          emissive="#FFA500"
          emissiveIntensity={6.0}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* ── Bright inner glow ── */}
      <mesh scale={1.12}>
        <sphereGeometry args={[3.0, 32, 32]} />
        <meshStandardMaterial
          color="#FFE040"
          emissive="#FF8C00"
          emissiveIntensity={3.5}
          transparent
          opacity={0.30}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Atmospheric haze layer ── */}
      <mesh scale={1.28}>
        <sphereGeometry args={[3.0, 32, 32]} />
        <meshStandardMaterial
          color="#FFD000"
          emissive="#FF7000"
          emissiveIntensity={2.0}
          transparent
          opacity={0.14}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Outer haze ── */}
      <mesh scale={1.55}>
        <sphereGeometry args={[3.0, 32, 32]} />
        <meshStandardMaterial
          color="#FF9500"
          emissive="#FF5500"
          emissiveIntensity={1.0}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Corona ring 1 (inner tight) ── */}
      <mesh ref={r1}>
        <torusGeometry args={[3.95, 0.14, 8, 100]} />
        <meshStandardMaterial
          color="#FFB000"
          emissive="#FF6800"
          emissiveIntensity={4.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* ── Corona ring 2 (mid) ── */}
      <mesh ref={r2}>
        <torusGeometry args={[5.0, 0.10, 8, 100]} />
        <meshStandardMaterial
          color="#FFCA00"
          emissive="#FF8800"
          emissiveIntensity={3.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* ── Corona ring 3 (outer) ── */}
      <mesh ref={r3}>
        <torusGeometry args={[6.3, 0.07, 8, 100]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA000"
          emissiveIntensity={2.2}
          transparent
          opacity={0.40}
        />
      </mesh>

      {/* ── Largest faint ring ── */}
      <mesh ref={r4}>
        <torusGeometry args={[8.0, 0.05, 8, 100]} />
        <meshStandardMaterial
          color="#FFE840"
          emissive="#FFB000"
          emissiveIntensity={1.4}
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  )
}

/* ══════════════════════════════════════
   SOLAR PANEL FIELD — Instanced mesh
══════════════════════════════════════ */
const PANEL_ROWS = 11
const PANEL_COLS = 18
const PANEL_COUNT = PANEL_ROWS * PANEL_COLS

function SolarPanelField() {
  const frameRef  = useRef()
  const glassRef  = useRef()
  const gridRef   = useRef()
  const dummy     = useMemo(() => new THREE.Object3D(), [])

  const basePositions = useMemo(() => {
    const pos = []
    for (let r = 0; r < PANEL_ROWS; r++) {
      for (let c = 0; c < PANEL_COLS; c++) {
        pos.push({
          x: (c - PANEL_COLS / 2) * 1.72 + (Math.random() - 0.5) * 0.1,
          z: (r - PANEL_ROWS / 2) * 1.35 + (Math.random() - 0.5) * 0.1,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }
    return pos
  }, [])

  // Initial matrix set
  useEffect(() => {
    [frameRef, glassRef, gridRef].forEach((ref) => {
      if (!ref.current) return
      basePositions.forEach(({ x, z }, i) => {
        dummy.position.set(x, 0, z)
        dummy.rotation.x = -Math.PI / 4.8
        dummy.updateMatrix()
        ref.current.setMatrixAt(i, dummy.matrix)
      })
      ref.current.instanceMatrix.needsUpdate = true
    })
  }, [basePositions, dummy])

  useFrame(({ clock }) => {
    if (!frameRef.current) return
    const t = clock.getElapsedTime()
    basePositions.forEach(({ x, z, phase }, i) => {
      const wave = Math.sin(t * 0.45 + phase) * 0.022
      dummy.position.set(x, wave, z)
      dummy.rotation.x = -(Math.PI / 4.8) + wave * 0.35
      dummy.updateMatrix()
      frameRef.current.setMatrixAt(i, dummy.matrix)
      if (glassRef.current) glassRef.current.setMatrixAt(i, dummy.matrix)
      if (gridRef.current)  gridRef.current.setMatrixAt(i, dummy.matrix)
    })
    frameRef.current.instanceMatrix.needsUpdate = true
    if (glassRef.current) glassRef.current.instanceMatrix.needsUpdate = true
    if (gridRef.current)  gridRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={[0, -2.8, 0]}>
      {/* Frame (thin box) */}
      <instancedMesh ref={frameRef} args={[undefined, undefined, PANEL_COUNT]} castShadow>
        <boxGeometry args={[1.62, 0.045, 1.05]} />
        <meshStandardMaterial color="#2A3A50" metalness={0.92} roughness={0.12} />
      </instancedMesh>

      {/* Glass face */}
      <instancedMesh ref={glassRef} args={[undefined, undefined, PANEL_COUNT]}>
        <boxGeometry args={[1.55, 0.048, 0.98]} />
        <meshStandardMaterial
          color="#0C2D5A"
          emissive="#0A2244"
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.04}
          envMapIntensity={3.5}
        />
      </instancedMesh>

      {/* Cell grid lines */}
      <instancedMesh ref={gridRef} args={[undefined, undefined, PANEL_COUNT]}>
        <planeGeometry args={[1.52, 0.96, 6, 4]} />
        <meshBasicMaterial color="#3A7BFF" wireframe transparent opacity={0.45} />
      </instancedMesh>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
        <planeGeometry args={[90, 65]} />
        <meshStandardMaterial color="#9B8B6E" roughness={0.97} metalness={0.0} />
      </mesh>
    </group>
  )
}

/* ══════════════════════════════════════
   DUST / LIGHT PARTICLES
══════════════════════════════════════ */
function LightParticles() {
  const ref = useRef()
  const COUNT = 300

  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT)
    const col = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 42
      pos[i * 3 + 1] = Math.random() * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
      spd[i]         = Math.random() * 0.007 + 0.002
      const t        = Math.random()
      col[i * 3]     = 1.0
      col[i * 3 + 1] = 0.72 + t * 0.26
      col[i * 3 + 2] = 0.05 + t * 0.2
    }
    return [pos, spd, col]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i]
      if (arr[i * 3 + 1] > 18) arr[i * 3 + 1] = 0
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.075} vertexColors transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ══════════════════════════════════════
   LENS FLARE / LIGHT RAYS  (procedural)
══════════════════════════════════════ */
function SunRays() {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.z = clock.getElapsedTime() * 0.04
  })

  const rays = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * Math.PI * 2,
      length: 4.5 + Math.random() * 5,
      width:  0.07 + Math.random() * 0.10,
      opacity: 0.14 + Math.random() * 0.18,
    }))
  }, [])

  return (
    <group ref={groupRef} position={[6, 7, -11]}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(ray.angle) * (2.5 + ray.length / 2),
            Math.sin(ray.angle) * (2.5 + ray.length / 2),
            0
          ]}
          rotation={[0, 0, ray.angle]}
        >
          <planeGeometry args={[ray.length, ray.width]} />
          <meshBasicMaterial
            color="#FFE000"
            transparent
            opacity={ray.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ══════════════════════════════════════
   CAMERA RIG — Mouse parallax
══════════════════════════════════════ */
function CameraRig() {
  const { camera } = useThree()
  const mouse   = useRef({ x: 0, y: 0 })
  const smooth  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.032
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.032
    camera.position.x = smooth.current.x * 2.8
    camera.position.y = 3 + smooth.current.y * -1.6
    camera.lookAt(0, -0.5, 0)
  })

  return null
}

/* ══════════════════════════════════════
   SCENE COMPOSITION
══════════════════════════════════════ */
function Scene() {
  return (
    <>
      {/* Atmospheric sky — golden hour look */}
      <Sky
        distance={4500}
        sunPosition={[6, 0.55, -11]}
        inclination={0.52}
        azimuth={0.23}
        turbidity={3.5}
        rayleigh={0.5}
        mieCoefficient={0.004}
        mieDirectionalG={0.90}
      />

      {/* Lighting */}
      <ambientLight intensity={1.1} color="#FFF5E0" />
      <hemisphereLight skyColor="#87CEEB" groundColor="#A08050" intensity={1.3} />
      <directionalLight
        position={[6, 14, -11]}
        intensity={7.5}
        color="#FFD060"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Fill light to illuminate panel fronts */}
      <directionalLight position={[0, 6, 18]} intensity={2.5} color="#C8E8FF" />
      <pointLight position={[-8, 5, 5]} intensity={1.5} color="#7FC8FF" />
      <pointLight position={[8, 3, 8]}  intensity={1.2} color="#FFB860" />

      {/* 3D Elements */}
      <SunRays />
      <Sun />
      <SolarPanelField />
      <LightParticles />
      <CameraRig />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.32}
          luminanceSmoothing={0.75}
          intensity={3.5}
          radius={0.95}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

/* ══════════════════════════════════════
   EXPORTED CANVAS
══════════════════════════════════════ */
export default function HeroScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 15], fov: 54, near: 0.1, far: 600 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.55,
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
