import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

const Arduino: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);
  const chipRef = useRef<THREE.Mesh>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const { currentStep } = useWorkflow();

  const isActive = ['arduino', 'output', 'analytics', 'complete'].includes(currentStep);
  const isProcessing = currentStep === 'arduino';

  useFrame((state) => {
    if (chipRef.current && isProcessing) {
      const intensity = 0.4 + Math.sin(state.clock.elapsedTime * 10) * 0.4;
      (chipRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
    if (ledRef.current && isActive) {
      const intensity = 0.6 + Math.sin(state.clock.elapsedTime * 5) * 0.4;
      (ledRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main PCB Board */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.06, 0.65]} />
        <meshPhysicalMaterial
          color="#0066aa"
          metalness={0.1}
          roughness={0.5}
          clearcoat={0.8}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* ATmega Chip */}
      <mesh ref={chipRef} position={[0.05, 0.05, 0]} castShadow>
        <boxGeometry args={[0.3, 0.06, 0.2]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          emissive={isActive ? "#00ffaa" : "#000000"}
          emissiveIntensity={isActive ? 0.4 : 0}
          metalness={0.4}
          roughness={0.3}
          clearcoat={0.5}
        />
      </mesh>

      {/* USB Port */}
      <mesh position={[-0.45, 0.05, 0]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.16]} />
        <meshPhysicalMaterial
          color="#aaaaaa"
          metalness={1.0}
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>

      {/* Power Jack */}
      <mesh position={[-0.45, 0.05, 0.22]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        <meshPhysicalMaterial color="#111111" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Pin Headers - Digital */}
      {[...Array(12)].map((_, i) => (
        <mesh key={`digital-${i}`} position={[0.4 - i * 0.06, 0.06, -0.28]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.02]} />
          <meshStandardMaterial color="#ffcc00" metalness={1.0} roughness={0.1} />
        </mesh>
      ))}

      {/* Pin Headers - Analog */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`analog-${i}`} position={[0.2 - i * 0.08, 0.06, 0.28]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.02]} />
          <meshStandardMaterial color="#ffcc00" metalness={1.0} roughness={0.1} />
        </mesh>
      ))}

      {/* Power LED (Green) */}
      <mesh ref={ledRef} position={[0.35, 0.05, 0.08]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial
          color="#00ff00"
          transparent
          opacity={isActive ? 1 : 0.2}
        />
      </mesh>

      {/* TX LED (Orange) */}
      <mesh position={[0.35, 0.05, 0.12]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial
          color={isProcessing ? "#ff8800" : "#442200"}
          transparent
          opacity={isProcessing ? 0.9 : 0.3}
        />
      </mesh>

      {/* Reset Button */}
      <mesh position={[0.38, 0.06, -0.12]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 16]} />
        <meshStandardMaterial color="#ff4444" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Crystal */}
      <mesh position={[-0.1, 0.05, 0.12]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.04]} />
        <meshPhysicalMaterial
          color="#e0e0e0"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
        />
      </mesh>

      {/* HTML Label */}
      <Html
        position={[0, 0.4, 0]}
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div className="text-center whitespace-nowrap">
          <div
            className="font-orbitron text-xs font-bold px-2 py-1 rounded"
            style={{
              color: isActive ? '#00ffaa' : '#666',
              textShadow: isActive ? '0 0 10px #00ffaa' : 'none',
              background: 'rgba(0,0,0,0.6)',
            }}
          >
            ARDUINO UNO
          </div>
          {isProcessing && (
            <div
              className="font-rajdhani text-xs mt-1 px-2 py-0.5 rounded animate-pulse"
              style={{
                color: '#ffaa00',
                background: 'rgba(0,0,0,0.6)',
              }}
            >
              Processing...
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default Arduino;
