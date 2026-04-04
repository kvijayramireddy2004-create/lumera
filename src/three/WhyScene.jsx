import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function FloatingShape({ geometry, position, color, speed = 1, distort = 0.3 }) {
  const mesh = useRef()

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime() * speed
    mesh.current.rotation.x = t * 0.38
    mesh.current.rotation.y = t * 0.52
  })

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} castShadow>
        {geometry}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.2}
          distort={distort}
          speed={3}
        />
      </mesh>
    </Float>
  )
}

function EnergyOrb() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.12
    }
  })

  const positions = useMemo(() => {
    const count = 180
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 3.8 + Math.random() * 0.6
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={180} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#F97316" transparent opacity={0.55} sizeAttenuation />
      </points>
    </group>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#FFF7ED']} />
      <ambientLight intensity={1.0} color="#FFF5E0" />
      <pointLight position={[4, 4, 4]}   intensity={3.5} color="#F97316" />
      <pointLight position={[-4, -3, 2]} intensity={2.5} color="#F59E0B" />
      <pointLight position={[0, 6, -2]}  intensity={1.5} color="#FCD34D" />

      {/* Three floating 3D shapes */}
      <FloatingShape
        geometry={<octahedronGeometry args={[1.2]} />}
        position={[-2.8, 0.4, 0]}
        color="#F97316"
        speed={0.8}
        distort={0.25}
      />
      <FloatingShape
        geometry={<torusGeometry args={[1.0, 0.38, 20, 48]} />}
        position={[0, -0.5, -0.8]}
        color="#F59E0B"
        speed={1.1}
        distort={0.15}
      />
      <FloatingShape
        geometry={<icosahedronGeometry args={[1.15]} />}
        position={[2.8, 0.4, 0]}
        color="#EA580C"
        speed={0.9}
        distort={0.3}
      />

      <EnergyOrb />

      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={1.8} radius={0.85} />
      </EffectComposer>
    </>
  )
}

export default function WhyScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
