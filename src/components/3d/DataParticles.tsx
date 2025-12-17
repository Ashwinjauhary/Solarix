import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

interface ParticleFlowProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  active: boolean;
  speed?: number;
}

const ParticleFlow: React.FC<ParticleFlowProps> = ({ start, end, color, active, speed = 0.4 }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 6;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      pos[i * 3] = start[0] + (end[0] - start[0]) * t;
      pos[i * 3 + 1] = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 0.1;
      pos[i * 3 + 2] = start[2] + (end[2] - start[2]) * t;
    }
    return pos;
  }, [start, end]);

  useFrame((state) => {
    if (particlesRef.current && active) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < count; i++) {
        const baseT = ((i / count) + time * speed) % 1;

        positions[i * 3] = start[0] + (end[0] - start[0]) * baseT;
        positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * baseT + Math.sin(baseT * Math.PI) * 0.08;
        positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * baseT;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.95}
        sizeAttenuation
      />
    </points>
  );
};

const DataParticles: React.FC = () => {
  const { currentStep } = useWorkflow();

  const flows = [
    // Sun to Panel
    {
      start: [2.2, 1.4, 0] as [number, number, number],
      end: [1.3, 0.2, 0] as [number, number, number],
      color: '#ffcc00',
      activeSteps: ['solar-input', 'sensors', 'arduino', 'output', 'analytics', 'complete'],
      speed: 0.5
    },
    // Panel to BH1750
    {
      start: [1, -0.1, 0] as [number, number, number],
      end: [0.2, -0.6, -0.7] as [number, number, number],
      color: '#00ff88',
      activeSteps: ['sensors', 'arduino', 'output', 'analytics', 'complete'],
      speed: 0.45
    },
    // Panel to INA219
    {
      start: [1, -0.1, 0] as [number, number, number],
      end: [0.2, -0.6, 0.7] as [number, number, number],
      color: '#00d4ff',
      activeSteps: ['sensors', 'arduino', 'output', 'analytics', 'complete'],
      speed: 0.45
    },
    // BH1750 to Arduino
    {
      start: [0, -0.6, -0.7] as [number, number, number],
      end: [-0.8, -0.6, 0] as [number, number, number],
      color: '#00ffaa',
      activeSteps: ['arduino', 'output', 'analytics', 'complete'],
      speed: 0.4
    },
    // INA219 to Arduino
    {
      start: [0, -0.6, 0.7] as [number, number, number],
      end: [-0.8, -0.6, 0] as [number, number, number],
      color: '#00ffaa',
      activeSteps: ['arduino', 'output', 'analytics', 'complete'],
      speed: 0.4
    },
    // Arduino to LCD
    {
      start: [-1.5, -0.6, 0] as [number, number, number],
      end: [-2.6, -0.1, 0] as [number, number, number],
      color: '#00ff88',
      activeSteps: ['output', 'analytics', 'complete'],
      speed: 0.35
    },
    // LCD to Cloud
    {
      start: [-2.6, 0.2, 0] as [number, number, number],
      end: [-3.2, 1.2, 0] as [number, number, number],
      color: '#4488ff',
      activeSteps: ['analytics', 'complete'],
      speed: 0.3
    }
  ];

  return (
    <group>
      {flows.map((flow, index) => (
        <ParticleFlow
          key={index}
          start={flow.start}
          end={flow.end}
          color={flow.color}
          active={flow.activeSteps.includes(currentStep)}
          speed={flow.speed}
        />
      ))}
    </group>
  );
};

export default DataParticles;
