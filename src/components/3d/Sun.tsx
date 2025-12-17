import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

const Sun: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const { currentStep } = useWorkflow();

  const isActive = ['solar-input', 'sensors', 'arduino', 'output', 'analytics', 'complete'].includes(currentStep);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (raysRef.current && isActive) {
      raysRef.current.rotation.z += 0.008;
    }
    if (outerGlowRef.current) {
      const scale = isActive ? 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15 : 1;
      outerGlowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Sun Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ffcc00"
          emissive="#ff8800"
          emissiveIntensity={isActive ? 2.5 : 0.8}
        />
      </mesh>

      {/* Inner Glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={isActive ? 0.5 : 0.2}
        />
      </mesh>

      {/* Outer Glow */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color="#ffdd44"
          transparent
          opacity={isActive ? 0.2 : 0.08}
        />
      </mesh>

      {/* Light Rays */}
      {isActive && (
        <group ref={raysRef}>
          {[...Array(12)].map((_, i) => (
            <mesh
              key={i}
              position={[0, 0, 0]}
              rotation={[0, 0, (i * Math.PI) / 6]}
            >
              <boxGeometry args={[1.8, 0.02, 0.02]} />
              <meshBasicMaterial
                color="#ffcc00"
                transparent
                opacity={0.5}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Point Light */}
      <pointLight
        color="#ffaa00"
        intensity={isActive ? 4 : 1.5}
        distance={12}
        decay={2}
      />
    </group>
  );
};

export default Sun;
