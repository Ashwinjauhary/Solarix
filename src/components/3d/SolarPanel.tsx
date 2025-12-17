import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

const SolarPanel: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { currentStep } = useWorkflow();

  const isActive = ['solar-input', 'sensors', 'arduino', 'output', 'analytics', 'complete'].includes(currentStep);

  useFrame((state) => {
    if (glowRef.current && isActive) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      glowRef.current.scale.set(scale, scale, 1);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={[-0.3, 0, 0]}>
      {/* Panel Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.08, 1.3]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.5}
          roughness={0.5}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Solar Cells Grid */}
      {[-0.55, -0.18, 0.18, 0.55].map((x, i) => (
        [-0.35, 0, 0.35].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.05, z]} castShadow>
            <boxGeometry args={[0.32, 0.02, 0.32]} />
            <meshPhysicalMaterial
              color={isActive ? "#1e4a6f" : "#020408"}
              emissive={isActive ? "#00b4ff" : "#000000"}
              emissiveIntensity={isActive ? 0.5 : 0}
              metalness={0.8}
              roughness={0.2}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
              ior={1.5}
            />
          </mesh>
        ))
      ))}

      {/* Glow Effect */}
      {isActive && (
        <mesh ref={glowRef} position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2, 1.5]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Stand */}
      <mesh position={[0, -0.35, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.58, 0.3]} castShadow>
        <boxGeometry args={[0.6, 0.04, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

export default SolarPanel;
