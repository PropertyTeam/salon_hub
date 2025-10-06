'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  Sphere,
  Box,
  Cylinder,
  Torus,
  RoundedBox,
  SpotLight,
  useHelper
} from '@react-three/drei'
import * as THREE from 'three'

// Procedural texture generators
function createWoodTexture(baseColor: string, grainColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 512, 512)

  ctx.strokeStyle = grainColor
  ctx.lineWidth = 1
  for (let i = 0; i < 80; i++) {
    ctx.globalAlpha = Math.random() * 0.3 + 0.1
    ctx.beginPath()
    const y = Math.random() * 512
    ctx.moveTo(0, y)
    ctx.bezierCurveTo(
      128 + Math.random() * 50, y + Math.random() * 20 - 10,
      384 + Math.random() * 50, y + Math.random() * 20 - 10,
      512, y
    )
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

function createMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#f8f8f8'
  ctx.fillRect(0, 0, 512, 512)

  for (let i = 0; i < 100; i++) {
    ctx.strokeStyle = `rgba(200, 200, 200, ${Math.random() * 0.4})`
    ctx.lineWidth = Math.random() * 2 + 0.5
    ctx.beginPath()
    ctx.moveTo(Math.random() * 512, Math.random() * 512)
    ctx.quadraticCurveTo(
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512
    )
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

function createLeatherTexture(color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = color
  ctx.fillRect(0, 0, 256, 256)

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const size = Math.random() * 2
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`
    ctx.fillRect(x, y, size, size)
  }

  return new THREE.CanvasTexture(canvas)
}

// Ultra-realistic salon chair with leather texturing
function UltraRealisticSalonChair({ position, chairColor = "#2D2424" }: { position: [number, number, number], chairColor?: string }) {
  const chairRef = useRef<THREE.Group>(null)
  const leatherTexture = useMemo(() => createLeatherTexture(chairColor), [chairColor])

  useFrame((state) => {
    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.002
    }
  })

  const leatherMaterial = useMemo(() => (
    <meshPhysicalMaterial
      map={leatherTexture}
      color={chairColor}
      roughness={0.5}
      metalness={0.05}
      clearcoat={0.1}
      clearcoatRoughness={0.3}
      normalScale={new THREE.Vector2(0.5, 0.5)}
    />
  ), [leatherTexture, chairColor])

  return (
    <group ref={chairRef} position={position} castShadow receiveShadow>
      {/* Premium leather seat with tufted design */}
      <RoundedBox args={[1.7, 0.25, 1.5]} radius={0.1} position={[0, 1.35, 0]}>
        {leatherMaterial}
      </RoundedBox>

      {/* Tufted buttons on seat */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 0.5
        const z = Math.sin(angle) * 0.5
        return (
          <Sphere key={i} args={[0.08]} position={[x, 1.36, z]} scale={[1, 0.3, 1]}>
            {leatherMaterial}
          </Sphere>
        )
      })}

      {/* High backrest with tufted design */}
      <RoundedBox args={[1.7, 2.3, 0.3]} radius={0.1} position={[0, 2.5, -0.6]}>
        {leatherMaterial}
      </RoundedBox>

      {/* Tufted pattern on backrest */}
      {Array.from({ length: 9 }, (_, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const x = -0.5 + col * 0.5
        const y = 1.5 + row * 0.7
        return (
          <Sphere key={i} args={[0.04]} position={[x, y, -0.45]} scale={[1, 1, 0.3]}>
            {leatherMaterial}
          </Sphere>
        )
      })}

      {/* Adjustable headrest */}
      <RoundedBox args={[1.1, 0.6, 0.35]} radius={0.05} position={[0, 3.7, -0.55]}>
        {leatherMaterial}
      </RoundedBox>

      {/* Premium chrome hydraulic base */}
      <Cylinder args={[0.12, 0.18, 1.3]} position={[0, 0.65, 0]}>
        <meshPhysicalMaterial
          color="#D0D0D0"
          roughness={0.08}
          metalness={0.95}
          reflectivity={1.0}
          clearcoat={1.0}
        />
      </Cylinder>

      {/* 5-star chrome base */}
      <Cylinder args={[0.7, 0.7, 0.15]} position={[0, 0.075, 0]}>
        <meshPhysicalMaterial color="#D0D0D0" roughness={0.08} metalness={0.95} />
      </Cylinder>

      {/* Star legs with wheels */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const x = Math.cos(angle) * 0.5
        const z = Math.sin(angle) * 0.5
        return (
          <group key={i}>
            <Cylinder args={[0.1, 0.05, 0.3]} position={[x, 0.15, z]} rotation={[0, angle, Math.PI/6]}>
              <meshPhysicalMaterial color="#D0D0D0" roughness={0.08} metalness={0.95} />
            </Cylinder>
            <Sphere args={[0.04]} position={[x * 1.1, 0.02, z * 1.1]}>
              <meshPhysicalMaterial color="#2C2C2C" roughness={0.6} metalness={0.1} />
            </Sphere>
          </group>
        )
      })}

      {/* Chrome armrest supports */}
      {[-0.9, 0.9].forEach(xPos => (
        <group key={xPos}>
          <Cylinder args={[0.04, 0.04, 0.9]} position={[xPos, 1.8, 0]}>
            <meshPhysicalMaterial color="#D0D0D0" roughness={0.08} metalness={0.95} />
          </Cylinder>
          <RoundedBox args={[0.15, 0.08, 1.1]} radius={0.04} position={[xPos, 2.25, 0]}>
            {leatherMaterial}
          </RoundedBox>
        </group>
      ))}
    </group>
  )
}

// Professional shampoo station with realistic plumbing
function ProfessionalShampooStation({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} castShadow receiveShadow>
      {/* Wood cabinet base */}
      <RoundedBox args={[1.3, 0.9, 0.9]} radius={0.05} position={[0, 0.45, 0]}>
        <meshPhysicalMaterial
          color="#4A3A2A"
          roughness={0.4}
          metalness={0.1}
          clearcoat={0.3}
        />
      </RoundedBox>

      {/* Granite countertop */}
      <RoundedBox args={[1.4, 0.08, 1.0]} radius={0.02} position={[0, 0.94, 0]}>
        <meshPhysicalMaterial
          color="#1A1A1A"
          roughness={0.15}
          metalness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Ceramic shampoo bowl */}
      <Sphere args={[0.45]} position={[0, 0.98, 0]} scale={[1, 0.5, 1]}>
        <meshPhysicalMaterial
          color="#F0F0F0"
          roughness={0.1}
          metalness={0.4}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </Sphere>

      {/* Professional faucet system */}
      <group position={[0, 1.35, -0.35]}>
        <Cylinder args={[0.035, 0.035, 0.15]}>
          <meshPhysicalMaterial color="#D5D5D5" roughness={0.05} metalness={0.95} />
        </Cylinder>
        <Cylinder args={[0.03, 0.03, 0.4]} position={[0, 0.15, 0]} rotation={[Math.PI/4, 0, 0]}>
          <meshPhysicalMaterial color="#D5D5D5" roughness={0.05} metalness={0.95} />
        </Cylinder>
        <Cylinder args={[0.025, 0.03, 0.2]} position={[0, 0.1, 0.25]} rotation={[Math.PI/2, 0, 0]}>
          <meshPhysicalMaterial color="#D5D5D5" roughness={0.05} metalness={0.95} />
        </Cylinder>

        {/* Temperature control handles */}
        {[-0.1, 0.1].forEach(offset => (
          <Sphere key={offset} args={[0.05]} position={[offset, 0.13, -0.03]} scale={[1, 0.5, 1]}>
            <meshPhysicalMaterial color="#D5D5D5" roughness={0.05} metalness={0.95} />
          </Sphere>
        ))}
      </group>

      {/* Cabinet doors */}
      <RoundedBox args={[0.6, 0.7, 0.03]} radius={0.02} position={[-0.3, 0.45, 0.465]}>
        <meshPhysicalMaterial color="#4A3A2A" roughness={0.4} metalness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.6, 0.7, 0.03]} radius={0.02} position={[0.3, 0.45, 0.465]}>
        <meshPhysicalMaterial color="#4A3A2A" roughness={0.4} metalness={0.1} />
      </RoundedBox>

      {/* Cabinet handles */}
      {[-0.3, 0.3].forEach(x => (
        <Sphere key={x} args={[0.03]} position={[x, 0.45, 0.5]}>
          <meshPhysicalMaterial color="#B8860B" roughness={0.2} metalness={0.85} />
        </Sphere>
      ))}
    </group>
  )
}

// Designer mirror with LED lighting
function DesignerMirror({ position, frameColor = "#D4AF37" }: { position: [number, number, number], frameColor?: string }) {
  const ledRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ledRef.current) {
      const intensity = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ledRef.current.children.forEach((child: any) => {
        if (child.material?.emissiveIntensity !== undefined) {
          child.material.emissiveIntensity = intensity
        }
      })
    }
  })

  return (
    <group position={position} castShadow receiveShadow>
      {/* Ornate outer frame */}
      <RoundedBox args={[2.8, 3.4, 0.15]} radius={0.05} position={[0, 3.7, 0]}>
        <meshPhysicalMaterial
          color={frameColor}
          roughness={0.18}
          metalness={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Inner bevel */}
      <RoundedBox args={[2.65, 3.25, 0.08]} radius={0.03} position={[0, 3.7, 0.04]}>
        <meshPhysicalMaterial
          color={frameColor === "#D4AF37" ? "#E6C14A" : "#404040"}
          roughness={0.25}
          metalness={0.7}
        />
      </RoundedBox>

      {/* High-quality mirror surface */}
      <Box args={[2.4, 3.0, 0.02]} position={[0, 3.7, 0.08]}>
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.02}
          metalness={0.98}
          reflectivity={1.0}
          transparent={true}
          opacity={0.95}
        />
      </Box>

      {/* LED light strips */}
      <group ref={ledRef}>
        {/* Top LED strip */}
        <RoundedBox args={[2.8, 0.06, 0.06]} radius={0.02} position={[0, 5.4, 0.12]}>
          <meshPhysicalMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.4}
            roughness={0.15}
          />
        </RoundedBox>

        {/* Bottom LED strip */}
        <RoundedBox args={[2.8, 0.06, 0.06]} radius={0.02} position={[0, 2.0, 0.12]}>
          <meshPhysicalMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.4}
            roughness={0.15}
          />
        </RoundedBox>

        {/* Side LED strips */}
        <RoundedBox args={[0.06, 3.4, 0.06]} radius={0.02} position={[-1.4, 3.7, 0.12]}>
          <meshPhysicalMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.4}
            roughness={0.15}
          />
        </RoundedBox>
        <RoundedBox args={[0.06, 3.4, 0.06]} radius={0.02} position={[1.4, 3.7, 0.12]}>
          <meshPhysicalMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.4}
            roughness={0.15}
          />
        </RoundedBox>
      </group>

      {/* Black glass counter */}
      <RoundedBox args={[2.6, 0.08, 0.3]} radius={0.02} position={[0, 1.85, 0.2]}>
        <meshPhysicalMaterial
          color="#1A1A1A"
          roughness={0.2}
          metalness={0.5}
          clearcoat={0.8}
        />
      </RoundedBox>

      {/* Professional salon tools on counter */}
      {[-0.8, -0.4, 0, 0.4, 0.8].forEach((x, i) => (
        <Cylinder key={i} args={[0.04, 0.04, 0.25]} position={[x, 2.02, 0.2]}>
          <meshPhysicalMaterial color="#1A1A1A" roughness={0.5} metalness={0.2} />
        </Cylinder>
      ))}
    </group>
  )
}

// Luxury wooden reception desk
function LuxuryReceptionDesk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} castShadow receiveShadow>
      {/* Main desk structure */}
      <RoundedBox args={[5.5, 1.2, 1.3]} radius={0.1} position={[0, 0.6, 0]}>
        <meshPhysicalMaterial
          color="#6B5544"
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* Premium wood top */}
      <RoundedBox args={[5.8, 0.1, 1.5]} radius={0.05} position={[0, 1.25, 0]}>
        <meshPhysicalMaterial
          color="#7A6453"
          roughness={0.2}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Gold accent panel */}
      <RoundedBox args={[5.5, 0.5, 0.05]} radius={0.02} position={[0, 0.85, -0.625]}>
        <meshPhysicalMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1.0}
        />
      </RoundedBox>

      {/* Reception accessories */}
      <group position={[0, 1.35, 0]}>
        {/* Computer monitor */}
        <RoundedBox args={[0.6, 0.4, 0.05]} radius={0.02} position={[-1.5, 0.2, 0]}>
          <meshPhysicalMaterial color="#1A1A1A" roughness={0.1} metalness={0.3} />
        </RoundedBox>

        {/* Phone */}
        <RoundedBox args={[0.25, 0.15, 0.08]} radius={0.02} position={[1.5, 0.04, 0.2]}>
          <meshPhysicalMaterial color="#2C2C2C" roughness={0.3} metalness={0.2} />
        </RoundedBox>

        {/* Decorative vase */}
        <Cylinder args={[0.15, 0.12, 0.4]} position={[0, 0.2, 0]}>
          <meshPhysicalMaterial
            color="#D4AF37"
            roughness={0.2}
            metalness={0.5}
            clearcoat={0.8}
          />
        </Cylinder>

        {/* Artificial flowers */}
        {Array.from({ length: 5 }, (_, i) => (
          <group key={i}>
            <Cylinder args={[0.01, 0.01, 0.4]} position={[(Math.random()-0.5)*0.2, 0.6, (Math.random()-0.5)*0.2]} rotation={[0, 0, (Math.random()-0.5)*0.3]}>
              <meshPhysicalMaterial color="#2D5016" roughness={0.8} />
            </Cylinder>
            <Sphere args={[0.05]} position={[(Math.random()-0.5)*0.2, 0.8, (Math.random()-0.5)*0.2]}>
              <meshPhysicalMaterial color={i % 2 === 0 ? "#FF69B4" : "#FFA500"} roughness={0.4} />
            </Sphere>
          </group>
        ))}
      </group>
    </group>
  )
}

// Premium leather waiting sofa
function PremiumWaitingSofa({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} castShadow receiveShadow>
      {/* Sofa frame */}
      <RoundedBox args={[2.6, 0.6, 1.3]} radius={0.1} position={[0, 0.3, 0]}>
        <meshPhysicalMaterial color="#1A1A1A" roughness={0.4} metalness={0.1} />
      </RoundedBox>

      {/* Premium leather seat */}
      <RoundedBox args={[2.5, 0.45, 1.2]} radius={0.1} position={[0, 0.825, 0]}>
        <meshPhysicalMaterial
          color="#34495E"
          roughness={0.5}
          metalness={0.05}
          clearcoat={0.2}
        />
      </RoundedBox>

      {/* High backrest */}
      <RoundedBox args={[2.5, 0.9, 0.3]} radius={0.1} position={[0, 1.3, -0.5]}>
        <meshPhysicalMaterial color="#34495E" roughness={0.5} metalness={0.05} />
      </RoundedBox>

      {/* Armrests */}
      {[-1.375, 1.375].forEach(x => (
        <RoundedBox key={x} args={[0.25, 0.6, 1.3]} radius={0.05} position={[x, 0.9, 0]}>
          <meshPhysicalMaterial color="#34495E" roughness={0.5} metalness={0.05} />
        </RoundedBox>
      ))}
    </group>
  )
}

// Modern salon plant
function ModernSalonPlant({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]} castShadow>
      {/* Modern ceramic pot */}
      <Cylinder args={[0.4, 0.5, 0.7]} position={[0, 0.35, 0]}>
        <meshPhysicalMaterial
          color="#3A3A3A"
          roughness={0.6}
          metalness={0.15}
          clearcoat={0.3}
        />
      </Cylinder>

      {/* Decorative rim */}
      <Torus args={[0.41, 0.03]} position={[0, 0.7, 0]} rotation={[Math.PI/2, 0, 0]}>
        <meshPhysicalMaterial color="#3A3A3A" roughness={0.6} metalness={0.15} />
      </Torus>

      {/* Soil */}
      <Cylinder args={[0.38, 0.38, 0.06]} position={[0, 0.73, 0]}>
        <meshPhysicalMaterial color="#4A3422" roughness={0.95} />
      </Cylinder>

      {/* Tree trunk */}
      <Cylinder args={[0.1, 0.12, 1.4]} position={[0, 1.45, 0]}>
        <meshPhysicalMaterial color="#5D4E37" roughness={0.85} />
      </Cylinder>

      {/* Layered foliage */}
      {[
        { y: 1.7, size: 0.7 },
        { y: 1.95, size: 0.6 },
        { y: 2.15, size: 0.5 },
        { y: 2.3, size: 0.35 }
      ].map((level, i) => (
        <group key={i}>
          <Sphere args={[level.size]} position={[0, level.y, 0]} scale={[1, 1.4, 1]}>
            <meshPhysicalMaterial color="#2D5016" roughness={0.75} />
          </Sphere>
          {Array.from({ length: 8 }, (_, j) => {
            const angle = (j / 8) * Math.PI * 2
            const x = Math.cos(angle) * level.size * 0.6
            const z = Math.sin(angle) * level.size * 0.6
            return (
              <Sphere
                key={j}
                args={[level.size * 0.4]}
                position={[x, level.y, z]}
                scale={[1.5, 0.3, 1]}
                rotation={[0, angle, 0]}
              >
                <meshPhysicalMaterial color="#2D5016" roughness={0.75} />
              </Sphere>
            )
          })}
        </group>
      ))}
    </group>
  )
}

// Premium marble flooring
function PremiumFlooring() {
  const marbleTexture = useMemo(() => {
    const texture = createMarbleTexture()
    texture.repeat.set(3, 3)
    return texture
  }, [])

  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[22, 26]} />
        <meshPhysicalMaterial
          map={marbleTexture}
          color="#FFFFFF"
          roughness={0.12}
          metalness={0.05}
          reflectivity={0.6}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Elegant rug in center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshPhysicalMaterial
          color="#8B4513"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Rug border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[8.3, 5.3]} />
        <meshPhysicalMaterial
          color="#6B3410"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Baseboards */}
      {[
        { pos: [0, 0.075, -13], rot: 0, size: [22, 0.15, 0.1] },
        { pos: [0, 0.075, 13], rot: 0, size: [22, 0.15, 0.1] },
        { pos: [-11, 0.075, 0], rot: Math.PI/2, size: [26, 0.15, 0.1] },
        { pos: [11, 0.075, 0], rot: Math.PI/2, size: [26, 0.15, 0.1] }
      ].map((baseboard, i) => (
        <RoundedBox
          key={i}
          args={baseboard.size as [number, number, number]}
          radius={0.02}
          position={baseboard.pos as [number, number, number]}
          rotation={[0, baseboard.rot, 0]}
        >
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.4} metalness={0.1} />
        </RoundedBox>
      ))}
    </group>
  )
}

// Textured salon walls
function SalonWalls() {
  const wallMaterial = (
    <meshPhysicalMaterial
      color="#EBE8E4"
      roughness={0.85}
      metalness={0.0}
      clearcoat={0.1}
    />
  )

  return (
    <group>
      {/* Back wall */}
      <Box args={[22, 9, 0.3]} position={[0, 4.5, -13]} receiveShadow>
        {wallMaterial}
      </Box>

      {/* Side walls */}
      <Box args={[0.3, 9, 26]} position={[-11, 4.5, 0]} receiveShadow>
        {wallMaterial}
      </Box>
      <Box args={[0.3, 9, 26]} position={[11, 4.5, 0]} receiveShadow>
        {wallMaterial}
      </Box>

      {/* Decorative molding */}
      {[1.5, 4.5, 7.5].map(height => (
        <RoundedBox
          key={height}
          args={[22, 0.2, 0.15]}
          radius={0.02}
          position={[0, height, -12.85]}
        >
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
        </RoundedBox>
      ))}
    </group>
  )
}

// Professional ceiling with LED panels
function ProfessionalCeiling() {
  return (
    <group>
      {/* Main ceiling */}
      <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 9, 0]} receiveShadow>
        <planeGeometry args={[22, 26]} />
        <meshPhysicalMaterial color="#F5F5F5" roughness={0.9} />
      </mesh>

      {/* LED light panels */}
      {[
        { x: -5, z: -5 }, { x: 0, z: -5 }, { x: 5, z: -5 },
        { x: -5, z: 2 }, { x: 0, z: 2 }, { x: 5, z: 2 }
      ].map((pos, i) => (
        <RoundedBox
          key={i}
          args={[1.2, 0.05, 1.2]}
          radius={0.02}
          position={[pos.x, 8.95, pos.z]}
        >
          <meshPhysicalMaterial
            color="#FFFFFF"
            emissive="#FFFFCC"
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </RoundedBox>
      ))}
    </group>
  )
}

// Advanced professional lighting system
function AdvancedLightingSystem() {
  const spotLightRef1 = useRef<THREE.SpotLight>(null)
  const spotLightRef2 = useRef<THREE.SpotLight>(null)
  const spotLightRef3 = useRef<THREE.SpotLight>(null)

  useFrame((state) => {
    const intensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    if (spotLightRef1.current) spotLightRef1.current.intensity = intensity * 1.5
    if (spotLightRef2.current) spotLightRef2.current.intensity = intensity * 1.6
    if (spotLightRef3.current) spotLightRef3.current.intensity = intensity * 1.5
  })

  return (
    <>
      {/* High-quality ambient lighting */}
      <ambientLight intensity={0.7} color="#FFF8E7" />

      {/* Main directional light with shadows */}
      <directionalLight
        position={[20, 30, 15]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0003}
        color="#FFF8E7"
      />

      {/* Fill and rim lighting */}
      <directionalLight position={[-20, 15, -10]} intensity={0.5} color="#B8D4FF" />
      <directionalLight position={[10, 12, -25]} intensity={0.6} color="#FFD4A3" />

      {/* Professional salon spotlights */}
      <spotLight
        ref={spotLightRef1}
        position={[-5, 8, -7]}
        intensity={1.5}
        angle={Math.PI/4.5}
        penumbra={0.3}
        decay={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#FFF5E6"
      />

      <spotLight
        ref={spotLightRef2}
        position={[0, 8, -7]}
        intensity={1.6}
        angle={Math.PI/4.5}
        penumbra={0.3}
        decay={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#FFF5E6"
      />

      <spotLight
        ref={spotLightRef3}
        position={[5, 8, -7]}
        intensity={1.5}
        angle={Math.PI/4.5}
        penumbra={0.3}
        decay={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#FFF5E6"
      />

      {/* Accent lighting for ambiance */}
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#FFB6C1" />
      <pointLight position={[-4, 2, 0]} intensity={0.3} color="#E6E6FA" />
      <pointLight position={[4, 2, 0]} intensity={0.3} color="#E6E6FA" />
      <pointLight position={[0, 2.5, -2]} intensity={0.5} color="#F8F8FF" />
    </>
  )
}

// Wood product cabinet with shelves and products
function WoodProductCabinet({ position }: { position: [number, number, number] }) {
  const woodTexture = useMemo(() => createWoodTexture('#3a2a1a', '#2a1a0a'), [])

  const cabinetMaterial = useMemo(() => (
    <meshPhysicalMaterial
      map={woodTexture}
      color="#3A2A1A"
      roughness={0.35}
      metalness={0.1}
      clearcoat={0.3}
    />
  ), [woodTexture])

  return (
    <group position={position} castShadow receiveShadow>
      {/* Main cabinet structure */}
      <RoundedBox args={[3.5, 2.8, 0.5]} radius={0.05} position={[0, 3.4, 0]}>
        {cabinetMaterial}
      </RoundedBox>

      {/* Shelves */}
      {Array.from({ length: 5 }, (_, i) => (
        <RoundedBox key={i} args={[3.4, 0.04, 0.48]} radius={0.02} position={[0, 2.2 + i * 0.6, 0]}>
          {cabinetMaterial}
        </RoundedBox>
      ))}

      {/* Cabinet doors */}
      {Array.from({ length: 8 }, (_, i) => {
        const row = Math.floor(i / 2)
        const col = i % 2
        return (
          <group key={i}>
            <RoundedBox args={[1.6, 0.55, 0.05]} radius={0.02} position={[-0.8 + col * 1.65, 2.35 + row * 0.6, 0.27]}>
              {cabinetMaterial}
            </RoundedBox>
            <Sphere args={[0.03]} position={[-0.2 + col * 1.65, 2.35 + row * 0.6, 0.32]}>
              <meshPhysicalMaterial color="#B8860B" roughness={0.2} metalness={0.85} />
            </Sphere>
          </group>
        )
      })}

      {/* Beauty products */}
      {Array.from({ length: 18 }, (_, i) => {
        const row = Math.floor(i / 6)
        const col = i % 6
        const productColors = ['#FFB6C1', '#98D8C8', '#F7DC6F', '#E8DAEF', '#D5F4E6']
        const color = productColors[Math.floor(Math.random() * productColors.length)]

        return (
          <group key={i}>
            <Cylinder args={[0.09, 0.09, 0.28]} position={[-1.5 + col * 0.55, 2.6 + row * 0.6, 0.23]}>
              <meshPhysicalMaterial
                color={color}
                roughness={0.3}
                metalness={0.2}
                transparent
                opacity={0.8}
              />
            </Cylinder>
            <Cylinder args={[0.095, 0.095, 0.08]} position={[-1.5 + col * 0.55, 2.88 + row * 0.6, 0.23]}>
              <meshPhysicalMaterial color="#1A1A1A" roughness={0.2} metalness={0.6} />
            </Cylinder>
          </group>
        )
      })}
    </group>
  )
}

// Wall artwork with frames
function WallArtwork({ position, rotation, size }: { position: [number, number, number], rotation: [number, number, number], size: [number, number] }) {
  const woodTexture = useMemo(() => createWoodTexture('#2a1a0a', '#1a0a00'), [])

  return (
    <group position={position} rotation={rotation} castShadow>
      {/* Wooden frame */}
      <RoundedBox args={[size[0], size[1], 0.1]} radius={0.02}>
        <meshPhysicalMaterial
          map={woodTexture}
          color="#2A1A0A"
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.5}
        />
      </RoundedBox>

      {/* Mat */}
      <Box args={[size[0] - 0.3, size[1] - 0.3, 0.02]} position={[0, 0, 0.06]}>
        <meshPhysicalMaterial color="#F5F5DC" roughness={0.9} />
      </Box>

      {/* Canvas */}
      <Box args={[size[0] - 0.5, size[1] - 0.5, 0.01]} position={[0, 0, 0.07]}>
        <meshPhysicalMaterial
          color={["#D4AF37", "#8B7355", "#2C3E50", "#95A5A6"][Math.floor(Math.random() * 4)]}
          roughness={0.7}
        />
      </Box>
    </group>
  )
}

// Salon window with outdoor view
function SalonWindow({ position }: { position: [number, number, number] }) {
  const woodTexture = useMemo(() => createWoodTexture('#4a3a2a', '#3a2a1a'), [])

  const frameMaterial = useMemo(() => (
    <meshPhysicalMaterial
      map={woodTexture}
      color="#4A3A2A"
      roughness={0.4}
      metalness={0.1}
      clearcoat={0.3}
    />
  ), [woodTexture])

  return (
    <group position={position}>
      {/* Window frame */}
      <RoundedBox args={[0.18, 7.5, 0.18]} radius={0.02} position={[0, 4.75, -3.5]}>
        {frameMaterial}
      </RoundedBox>
      <RoundedBox args={[0.18, 7.5, 0.18]} radius={0.02} position={[0, 4.75, 3.5]}>
        {frameMaterial}
      </RoundedBox>
      <RoundedBox args={[0.18, 0.18, 7]} radius={0.02} position={[0, 8.5, 0]}>
        {frameMaterial}
      </RoundedBox>
      <RoundedBox args={[0.18, 0.18, 7]} radius={0.02} position={[0, 1, 0]}>
        {frameMaterial}
      </RoundedBox>

      {/* Cross mullions */}
      <RoundedBox args={[0.12, 7.2, 0.12]} radius={0.02} position={[0, 4.75, 0]}>
        {frameMaterial}
      </RoundedBox>
      <RoundedBox args={[0.12, 0.12, 6.7]} radius={0.02} position={[0, 4.75, 0]}>
        {frameMaterial}
      </RoundedBox>

      {/* Glass panes */}
      <Box args={[0.02, 6.7, 6.7]} position={[-0.09, 4.75, 0]}>
        <meshPhysicalMaterial
          color="#ADD8E6"
          transparent
          opacity={0.2}
          roughness={0.03}
          metalness={0.1}
          transmission={0.85}
          thickness={0.5}
        />
      </Box>

      {/* Outdoor sky background */}
      <Box args={[1, 40, 40]} position={[8, 12, 0]}>
        <meshBasicMaterial color="#87CEEB" />
      </Box>

      {/* Clouds */}
      {Array.from({ length: 5 }, (_, i) => (
        <Sphere
          key={i}
          args={[2]}
          position={[15 + Math.random() * 10, 15 + Math.random() * 8, -10 + Math.random() * 20]}
          scale={[1 + Math.random(), 0.6, 1 + Math.random()]}
        >
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
        </Sphere>
      ))}

      {/* Distant building */}
      <Box args={[10, 25, 15]} position={[28, 12.5, 8]}>
        <meshPhysicalMaterial color="#8B8B8B" roughness={0.75} />
      </Box>

      {/* Building windows */}
      {Array.from({ length: 24 }, (_, i) => {
        const row = Math.floor(i / 4)
        const col = i % 4
        return (
          <Box
            key={i}
            args={[0.1, 1.8, 2.2]}
            position={[22.95, 3 + row * 3.8, 1.5 + col * 4]}
          >
            <meshBasicMaterial color={Math.random() > 0.25 ? "#FFFFDD" : "#505050"} />
          </Box>
        )
      })}
    </group>
  )
}

// Coffee table for waiting area
function CoffeeTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} castShadow receiveShadow>
      {/* Glass top */}
      <Cylinder args={[0.9, 0.9, 0.1]} position={[0, 0.65, 0]}>
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.02}
          metalness={0.05}
          transmission={0.95}
          thickness={0.1}
          transparent={true}
          opacity={0.1}
        />
      </Cylinder>

      {/* Wood base */}
      <Cylinder args={[0.1, 0.25, 0.65]} position={[0, 0.325, 0]}>
        <meshPhysicalMaterial
          color="#8B7355"
          roughness={0.2}
          metalness={0.05}
          clearcoat={0.6}
        />
      </Cylinder>

      {/* Magazines */}
      {Array.from({ length: 3 }, (_, i) => (
        <RoundedBox
          key={i}
          args={[0.25, 0.03, 0.35]}
          radius={0.01}
          position={[0.3 + i * 0.15, 0.71 + i * 0.03, 0]}
          rotation={[0, Math.random() * 0.3 - 0.15, 0]}
        >
          <meshPhysicalMaterial
            color={["#E8DAEF", "#D5F4E6", "#FCF3CF"][i]}
            roughness={0.6}
          />
        </RoundedBox>
      ))}
    </group>
  )
}

// Ultra-realistic rectangular side table at chair height
function SalonSideTable({ position }: { position: [number, number, number] }) {
  const woodTexture = useMemo(() => createWoodTexture('#2a1a0a', '#1a0a00'), [])
  const marbleTexture = useMemo(() => createMarbleTexture(), [])

  return (
    <group position={position} castShadow receiveShadow>
      {/* Premium rectangular marble top at chair seat height */}
      <RoundedBox args={[0.8, 0.08, 0.5]} radius={0.02} position={[0, 1.35, 0]}>
        <meshPhysicalMaterial
          map={marbleTexture}
          color="#F8F8F8"
          roughness={0.08}
          metalness={0.15}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>

      {/* Beveled edge molding */}
      <RoundedBox args={[0.82, 0.03, 0.52]} radius={0.015} position={[0, 1.32, 0]}>
        <meshPhysicalMaterial
          color="#E8E8E8"
          roughness={0.1}
          metalness={0.2}
          clearcoat={0.8}
        />
      </RoundedBox>

      {/* Elegant rectangular wooden base */}
      <RoundedBox args={[0.6, 1.25, 0.3]} radius={0.05} position={[0, 0.625, 0]}>
        <meshPhysicalMaterial
          map={woodTexture}
          color="#2A1A0A"
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.7}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* Decorative gold strips */}
      <RoundedBox args={[0.62, 0.02, 0.32]} radius={0.01} position={[0, 1.1, 0]}>
        <meshPhysicalMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1.0}
        />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.02, 0.32]} radius={0.01} position={[0, 0.15, 0]}>
        <meshPhysicalMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1.0}
        />
      </RoundedBox>

      {/* Heavy rectangular base with ornate details */}
      <RoundedBox args={[0.9, 0.12, 0.6]} radius={0.06} position={[0, 0.06, 0]}>
        <meshPhysicalMaterial
          map={woodTexture}
          color="#2A1A0A"
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.6}
        />
      </RoundedBox>

      {/* Gold accent base trim */}
      <RoundedBox args={[0.92, 0.025, 0.62]} radius={0.01} position={[0, 0.125, 0]}>
        <meshPhysicalMaterial
          color="#D4AF37"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
        />
      </RoundedBox>

      {/* Professional salon items on rectangular table */}
      <group position={[0, 1.42, 0]}>
        {/* Premium hair product bottle */}
        <Cylinder args={[0.045, 0.045, 0.2]} position={[0.25, 0.1, 0.15]}>
          <meshPhysicalMaterial
            color="#FF69B4"
            roughness={0.25}
            metalness={0.1}
            transparent
            opacity={0.85}
            clearcoat={0.8}
          />
        </Cylinder>

        {/* Gold pump dispenser */}
        <Cylinder args={[0.015, 0.02, 0.05]} position={[0.25, 0.225, 0.15]}>
          <meshPhysicalMaterial
            color="#D4AF37"
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
          />
        </Cylinder>

        {/* Luxury towel with embossed texture */}
        <RoundedBox args={[0.3, 0.03, 0.15]} radius={0.015} position={[-0.15, 0.015, -0.1]}>
          <meshPhysicalMaterial
            color="#F0F8FF"
            roughness={0.75}
            metalness={0.0}
            clearcoat={0.1}
          />
        </RoundedBox>

        {/* Professional hair clips arranged in line */}
        {Array.from({ length: 4 }, (_, i) => (
          <RoundedBox
            key={i}
            args={[0.08, 0.012, 0.012]}
            radius={0.006}
            position={[-0.15 + i * 0.1, 0.006, 0.18]}
            rotation={[0, Math.random() * 0.3 - 0.15, 0]}
          >
            <meshPhysicalMaterial
              color={["#FF1493", "#32CD32", "#FFD700", "#9370DB"][i]}
              roughness={0.2}
              metalness={0.3}
              clearcoat={0.6}
            />
          </RoundedBox>
        ))}

        {/* Elegant small succulent in ceramic pot */}
        <group position={[-0.25, 0, -0.15]}>
          <Cylinder args={[0.06, 0.07, 0.1]} position={[0, 0.05, 0]}>
            <meshPhysicalMaterial
              color="#F5F5F5"
              roughness={0.15}
              metalness={0.05}
              clearcoat={0.7}
            />
          </Cylinder>
          <Sphere args={[0.05]} position={[0, 0.13, 0]} scale={[1, 0.8, 1]}>
            <meshPhysicalMaterial
              color="#228B22"
              roughness={0.6}
              metalness={0.0}
            />
          </Sphere>
          {/* Small succulent details */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const x = Math.cos(angle) * 0.03
            const z = Math.sin(angle) * 0.03
            return (
              <RoundedBox
                key={i}
                args={[0.015, 0.04, 0.01]}
                radius={0.005}
                position={[x, 0.13, z]}
                rotation={[0, angle, Math.PI/8]}
              >
                <meshPhysicalMaterial
                  color="#32CD32"
                  roughness={0.5}
                  metalness={0.0}
                />
              </RoundedBox>
            )
          })}
        </group>

        {/* Crystal accent piece */}
        <Box args={[0.04, 0.08, 0.04]} position={[0.3, 0.04, -0.15]} rotation={[0, Math.PI/4, 0]}>
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.0}
            metalness={0.0}
            transmission={0.95}
            thickness={0.5}
            transparent
            opacity={0.1}
          />
        </Box>

        {/* Additional beauty tools for rectangular surface */}
        <RoundedBox args={[0.12, 0.02, 0.02]} radius={0.01} position={[0.1, 0.01, 0.05]}>
          <meshPhysicalMaterial
            color="#1A1A1A"
            roughness={0.3}
            metalness={0.2}
          />
        </RoundedBox>

        <Cylinder args={[0.02, 0.02, 0.15]} position={[0, 0.075, 0.05]} rotation={[0, 0, Math.PI/8]}>
          <meshPhysicalMaterial
            color="#32CD32"
            roughness={0.4}
            metalness={0.1}
          />
        </Cylinder>
      </group>
    </group>
  )
}

// Styling cart for hairdresser tools
function StylingCart({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} castShadow receiveShadow>
      {/* Cart base with wheels */}
      <RoundedBox args={[0.6, 0.8, 0.4]} radius={0.05} position={[0, 0.4, 0]}>
        <meshPhysicalMaterial color="#F5F5F5" roughness={0.3} metalness={0.1} />
      </RoundedBox>

      {/* Top surface */}
      <RoundedBox args={[0.65, 0.05, 0.45]} radius={0.02} position={[0, 0.825, 0]}>
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} clearcoat={0.3} />
      </RoundedBox>

      {/* Wheels */}
      {[-0.25, 0.25].forEach(x =>
        [-0.15, 0.15].forEach(z => (
          <Cylinder key={`${x}-${z}`} args={[0.04, 0.04, 0.02]} position={[x, 0.04, z]} rotation={[Math.PI/2, 0, 0]}>
            <meshPhysicalMaterial color="#2C2C2C" roughness={0.6} metalness={0.2} />
          </Cylinder>
        ))
      )}

      {/* Hair tools on cart */}
      <Cylinder args={[0.02, 0.02, 0.25]} position={[-0.2, 1.0, 0.1]} rotation={[0, 0, Math.PI/6]}>
        <meshPhysicalMaterial color="#1A1A1A" roughness={0.3} metalness={0.2} />
      </Cylinder>

      <Cylinder args={[0.015, 0.015, 0.2]} position={[0.1, 0.95, -0.1]} rotation={[0, 0, -Math.PI/8]}>
        <meshPhysicalMaterial color="#FF69B4" roughness={0.4} metalness={0.1} />
      </Cylinder>

      <RoundedBox args={[0.08, 0.12, 0.03]} radius={0.01} position={[0.15, 0.9, 0.1]}>
        <meshPhysicalMaterial color="#32CD32" roughness={0.5} metalness={0.2} />
      </RoundedBox>

      {/* Small towels */}
      <RoundedBox args={[0.25, 0.02, 0.15]} radius={0.01} position={[0, 0.88, 0.1]}>
        <meshPhysicalMaterial color="#F0F8FF" roughness={0.8} metalness={0.0} />
      </RoundedBox>
    </group>
  )
}

// Salon accessories and decorative items
function SalonAccessories() {
  return (
    <group>
      {/* Reception desk vase with flowers */}
      <group position={[-6.5, 1.5, 10.5]}>
        <Cylinder args={[0.15, 0.12, 0.4]}>
          <meshPhysicalMaterial
            color="#D4AF37"
            roughness={0.2}
            metalness={0.5}
            clearcoat={0.8}
          />
        </Cylinder>

        {/* Flowers */}
        {Array.from({ length: 5 }, (_, i) => (
          <group key={i}>
            <Cylinder args={[0.01, 0.01, 0.4]} position={[(Math.random()-0.5)*0.2, 0.4, (Math.random()-0.5)*0.2]} rotation={[0, 0, (Math.random()-0.5)*0.3]}>
              <meshPhysicalMaterial color="#2D5016" roughness={0.8} />
            </Cylinder>
            <Sphere args={[0.05]} position={[(Math.random()-0.5)*0.2, 0.6, (Math.random()-0.5)*0.2]}>
              <meshPhysicalMaterial color={["#FF69B4", "#FFA500", "#FFFF00"][Math.floor(Math.random() * 3)]} roughness={0.4} />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Table magazines */}
      {Array.from({ length: 3 }, (_, i) => (
        <RoundedBox
          key={i}
          args={[0.25, 0.03, 0.35]}
          radius={0.01}
          position={[5.3 + i * 0.15, 0.71 + i * 0.03, 8.5]}
          rotation={[0, Math.random() * 0.3 - 0.15, 0]}
        >
          <meshPhysicalMaterial color="#E8DAEF" roughness={0.6} />
        </RoundedBox>
      ))}

      {/* Wall-mounted product displays */}
      <group position={[-10.8, 3, 4]}>
        <RoundedBox args={[0.1, 1.5, 0.8]} radius={0.02}>
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
        </RoundedBox>
        {Array.from({ length: 6 }, (_, i) => (
          <Cylinder key={i} args={[0.06, 0.06, 0.2]} position={[0.1, 0.3 + i * 0.2, -0.3 + (i % 2) * 0.6]}>
            <meshPhysicalMaterial
              color={["#FF69B4", "#32CD32", "#FFD700"][i % 3]}
              roughness={0.3}
              metalness={0.2}
              transparent
              opacity={0.8}
            />
          </Cylinder>
        ))}
      </group>

      {/* Floor decorative elements */}
      <group position={[0, 0.02, -2]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2, 2.2, 32]} />
          <meshPhysicalMaterial color="#8B4513" roughness={0.9} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  )
}

// Main ultra-realistic salon scene
function UltraRealisticSalonScene() {
  return (
    <>
      {/* Advanced lighting system */}
      <AdvancedLightingSystem />

      {/* Professional environment */}
      <Environment preset="studio" />

      {/* Architecture */}
      <PremiumFlooring />
      <SalonWalls />
      <ProfessionalCeiling />

      {/* Ultra-realistic salon chairs - facing mirrors */}
      <group rotation={[0, Math.PI, 0]}>
        <UltraRealisticSalonChair position={[5.5, 0, 5]} chairColor="#2D2424" />
        <UltraRealisticSalonChair position={[0, 0, 5]} chairColor="#1A1A1A" />
        <UltraRealisticSalonChair position={[-5.5, 0, 5]} chairColor="#2D2424" />
      </group>

      {/* Styling carts behind chairs */}
      <StylingCart position={[-5.5, 0, 7]} />
      <StylingCart position={[0, 0, 7]} />
      <StylingCart position={[5.5, 0, 7]} />

      {/* Side tables next to chairs */}
      <SalonSideTable position={[-7.5, 0, -5]} />
      <SalonSideTable position={[-2, 0, -5]} />
      <SalonSideTable position={[3.5, 0, -5]} />
      <SalonSideTable position={[-3.5, 0, -5]} />
      <SalonSideTable position={[2, 0, -5]} />
      <SalonSideTable position={[7.5, 0, -5]} />

      {/* Professional shampoo stations */}
      <ProfessionalShampooStation position={[-8, 0, 6]} />
      <ProfessionalShampooStation position={[-8, 0, 3]} />

      {/* Designer mirrors with LED lighting */}
      <DesignerMirror position={[-5.5, 0, -12.7]} frameColor="#D4AF37" />
      <DesignerMirror position={[0, 0, -12.7]} frameColor="#2A2A2A" />
      <DesignerMirror position={[5.5, 0, -12.7]} frameColor="#D4AF37" />

      {/* Luxury furniture */}
      <LuxuryReceptionDesk position={[-6.5, 0, 10.5]} />
      <PremiumWaitingSofa position={[3.5, 0, 10.5]} />
      <PremiumWaitingSofa position={[7.5, 0, 10.5]} />
      <CoffeeTable position={[5.5, 0, 8.5]} />

      {/* Modern plants */}
      <ModernSalonPlant position={[-9.5, 0, 9]} scale={1.3} />
      <ModernSalonPlant position={[9.5, 0, 9]} scale={1.1} />
      <ModernSalonPlant position={[-9.5, 0, -1]} scale={1.0} />
      <ModernSalonPlant position={[9.5, 0, -1]} scale={1.2} />

      {/* Wood product cabinet */}
      <WoodProductCabinet position={[-8, 0, -10.5]} />

      {/* Wall artwork */}
      <WallArtwork position={[-10.7, 5.5, 6]} rotation={[0, Math.PI/2, 0]} size={[1.4, 1.8]} />
      <WallArtwork position={[-10.7, 5.5, 0]} rotation={[0, Math.PI/2, 0]} size={[1.2, 1.6]} />
      <WallArtwork position={[10.7, 5.5, 6]} rotation={[0, -Math.PI/2, 0]} size={[1.6, 2.0]} />
      <WallArtwork position={[10.7, 5.5, 0]} rotation={[0, -Math.PI/2, 0]} size={[1.3, 1.7]} />

      {/* Salon window with view */}
      <SalonWindow position={[10.91, 0, 0]} />

      {/* Accessories and decorative items */}
      <SalonAccessories />

      {/* Professional camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.1}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        minDistance={12}
        maxDistance={35}
      />

      <PerspectiveCamera makeDefault position={[6, 4, 8]} fov={50} />
    </>
  )
}

// Enhanced loading fallback
function EnhancedLoadingFallback() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial
          color="#F3F4F6"
          transparent
          opacity={0.3}
          roughness={0.5}
        />
      </mesh>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
    </group>
  )
}

// HTML loading component with salon branding
function SalonLoadingComponent() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      color: '#64748b',
      fontSize: '16px',
      fontWeight: '600',
      opacity: 0.8,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div style={{
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>
          💇‍♀️
        </div>
        プレミアムサロンを準備中...
        <div style={{
          marginTop: '0.5rem',
          fontSize: '12px',
          opacity: 0.7
        }}>
          Ultra-Realistic 3D Experience
        </div>
      </div>
    </div>
  )
}

// Interactive 3D Salon Model Component
export function SalonModel() {
  return (
    <div style={{
      width: '100%',
      height: '450px',
      borderRadius: '16px',
      overflow: 'hidden',
      opacity: 0.95,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}>
      <Suspense fallback={<SalonLoadingComponent />}>
        <Canvas
          shadows="soft"
          camera={{ position: [6, 4, 8], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            outputColorSpace: "srgb",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
            physicallyCorrectLights: true
          }}
        >
          <Suspense fallback={<EnhancedLoadingFallback />}>
            <UltraRealisticSalonScene />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

// Background version for subtle integration
export function SalonBackgroundModel() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '55%',
      height: '100%',
      opacity: 0.3,
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [8, 5, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<EnhancedLoadingFallback />}>
            <UltraRealisticSalonScene />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}