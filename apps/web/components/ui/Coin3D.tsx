'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Coin() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} rotation={[Math.PI / 8, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.22, 128]} />
        <meshStandardMaterial
          color="#FF5C00"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* Face detail ring */}
      <mesh rotation={[Math.PI / 8, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.24, 64]} />
        <meshStandardMaterial
          color="#CC4200"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function Coin3D() {
  return (
    <div className="w-full h-48 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#FF7020" />
          <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ffffff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            color="#FF5C00"
          />
          <Coin />
        </Suspense>
      </Canvas>
    </div>
  );
}