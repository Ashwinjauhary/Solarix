import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

interface SensorProps {
  position: [number, number, number];
  label: string;
  type: 'BH1750' | 'INA219';
}

const Sensor: React.FC<SensorProps> = ({ position, label, type }) => {
  const meshRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { currentStep, sensorData } = useWorkflow();

  const isActive = ['sensors', 'arduino', 'output', 'analytics', 'complete'].includes(currentStep);
  const color = type === 'BH1750' ? '#00ff88' : '#00d4ff';

  useFrame((state) => {
    if (glowRef.current && isActive) {
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }
  });

  const displayValue = type === 'BH1750'
    ? `${sensorData.lightIntensity.toFixed(0)} lux`
    : `${sensorData.voltage.toFixed(2)}V`;

  return (
    <group ref={meshRef} position={position}>
      {/* Sensor Body */}
      <mesh castShadow>
        <boxGeometry args={[0.35, 0.12, 0.25]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Sensor Chip */}
      <mesh position={[0, 0.07, 0]} castShadow>
        <boxGeometry args={[0.18, 0.02, 0.12]} />
        <meshStandardMaterial
          color={isActive ? color : "#333344"}
          emissive={isActive ? color : "#000000"}
          emissiveIntensity={isActive ? 0.6 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Pins */}
      {[-0.1, -0.033, 0.033, 0.1].map((x, i) => (
        <mesh key={i} position={[x, -0.08, 0]} castShadow>
          <boxGeometry args={[0.015, 0.08, 0.015]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Glow */}
      {isActive && (
        <mesh ref={glowRef} position={[0, 0.08, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.3]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* HTML Label */}
      <Html
        position={[0, 0.35, 0]}
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
              color: isActive ? color : '#666',
              textShadow: isActive ? `0 0 10px ${color}` : 'none',
              background: 'rgba(0,0,0,0.6)',
            }}
          >
            {label}
          </div>
          {isActive && (
            <div
              className="font-rajdhani text-xs mt-1 px-2 py-0.5 rounded"
              style={{
                color: color,
                background: 'rgba(0,0,0,0.6)',
              }}
            >
              {displayValue}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default Sensor;
