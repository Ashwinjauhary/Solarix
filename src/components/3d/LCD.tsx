import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

const LCD: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const { currentStep, sensorData } = useWorkflow();

  const isActive = ['output', 'analytics', 'complete'].includes(currentStep);

  useFrame((state) => {
    if (screenRef.current && isActive) {
      const flicker = 0.92 + Math.random() * 0.08;
      (screenRef.current.material as THREE.MeshBasicMaterial).opacity = flicker;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* LCD Frame */}
      <mesh castShadow>
        <boxGeometry args={[1, 0.5, 0.12]} />
        <meshStandardMaterial
          color="#1a2a3a"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Screen Bezel */}
      <mesh position={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.88, 0.4, 0.01]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.065]}>
        <boxGeometry args={[0.82, 0.35, 0.005]} />
        <meshBasicMaterial
          color={isActive ? "#003828" : "#001a11"}
          transparent
          opacity={1}
        />
      </mesh>

      {/* I2C Module */}
      <mesh position={[0.25, -0.18, -0.08]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.04]} />
        <meshStandardMaterial color="#0066aa" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* HTML Display Content */}
      <Html
        position={[0, 0, 0.08]}
        center
        transform
        occlude
        style={{
          width: '160px',
          height: '70px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className="w-full h-full flex flex-col justify-center px-2 font-mono text-xs"
          style={{
            color: isActive ? '#00ff88' : '#004422',
            textShadow: isActive ? '0 0 5px #00ff88' : 'none',
            letterSpacing: '0.5px',
          }}
        >
          {isActive ? (
            <>
              <div className="flex justify-between">
                <span>Light:</span>
                <span>{sensorData.lightIntensity.toFixed(0)} lux</span>
              </div>
              <div className="flex justify-between">
                <span>Volt:</span>
                <span>{sensorData.voltage.toFixed(2)} V</span>
              </div>
              <div className="flex justify-between">
                <span>Power:</span>
                <span>{sensorData.power.toFixed(2)} W</span>
              </div>
              <div className="flex justify-between text-yellow-400" style={{ color: '#ffaa00' }}>
                <span>Eff:</span>
                <span>{sensorData.efficiency.toFixed(0)}%</span>
              </div>
            </>
          ) : (
            <div className="text-center">STANDBY</div>
          )}
        </div>
      </Html>

      {/* Label */}
      <Html
        position={[0, 0.42, 0]}
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className="font-orbitron text-xs font-bold px-2 py-1 rounded whitespace-nowrap"
          style={{
            color: isActive ? '#00ff88' : '#666',
            textShadow: isActive ? '0 0 10px #00ff88' : 'none',
            background: 'rgba(0,0,0,0.6)',
          }}
        >
          LCD DISPLAY
        </div>
      </Html>
    </group>
  );
};

export default LCD;
