import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

const CloudIcon: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { currentStep } = useWorkflow();
  
  const isActive = currentStep === 'analytics' || currentStep === 'complete';

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Cloud body - main */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#4488ff" : "#334455"}
          emissive={isActive ? "#2266cc" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Cloud puffs */}
      <mesh position={[-0.2, -0.05, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#4488ff" : "#334455"}
          emissive={isActive ? "#2266cc" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <mesh position={[0.2, -0.05, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#4488ff" : "#334455"}
          emissive={isActive ? "#2266cc" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <mesh position={[0.1, 0.1, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#4488ff" : "#334455"}
          emissive={isActive ? "#2266cc" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Connection indicator */}
      {isActive && (
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
        </mesh>
      )}
      
      {/* HTML Label */}
      <Html
        position={[0, 0.5, 0]}
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div 
          className="font-orbitron text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap"
          style={{ 
            color: isActive ? '#4488ff' : '#445566',
            textShadow: isActive ? '0 0 8px #4488ff' : 'none',
            background: 'rgba(0,0,0,0.6)',
          }}
        >
          IoT CLOUD
        </div>
        <div 
          className="font-rajdhani text-[8px] text-center mt-0.5 px-1.5 py-0.5 rounded"
          style={{ 
            color: '#667788',
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          Future Scope
        </div>
      </Html>
    </group>
  );
};

export default CloudIcon;
