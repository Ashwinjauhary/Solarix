import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { useWorkflow } from '@/context/WorkflowContext';
import * as THREE from 'three';

const ConnectionLines: React.FC = () => {
  const { currentStep } = useWorkflow();

  const lines = useMemo(() => [
    // Sun to Solar Panel
    {
      points: [
        new THREE.Vector3(2.2, 1.4, 0),
        new THREE.Vector3(1.8, 0.8, 0),
        new THREE.Vector3(1.3, 0.2, 0)
      ],
      activeSteps: ['solar-input', 'sensors', 'arduino', 'output', 'analytics', 'complete'],
      color: '#ffaa00'
    },
    // Solar Panel to BH1750
    {
      points: [
        new THREE.Vector3(1, -0.1, 0),
        new THREE.Vector3(0.6, -0.3, -0.35),
        new THREE.Vector3(0.2, -0.6, -0.7)
      ],
      activeSteps: ['sensors', 'arduino', 'output', 'analytics', 'complete'],
      color: '#00ff88'
    },
    // Solar Panel to INA219
    {
      points: [
        new THREE.Vector3(1, -0.1, 0),
        new THREE.Vector3(0.6, -0.3, 0.35),
        new THREE.Vector3(0.2, -0.6, 0.7)
      ],
      activeSteps: ['sensors', 'arduino', 'output', 'analytics', 'complete'],
      color: '#00d4ff'
    },
    // BH1750 to Arduino
    {
      points: [
        new THREE.Vector3(0, -0.6, -0.7),
        new THREE.Vector3(-0.4, -0.6, -0.35),
        new THREE.Vector3(-0.8, -0.6, 0)
      ],
      activeSteps: ['arduino', 'output', 'analytics', 'complete'],
      color: '#00ffaa'
    },
    // INA219 to Arduino
    {
      points: [
        new THREE.Vector3(0, -0.6, 0.7),
        new THREE.Vector3(-0.4, -0.6, 0.35),
        new THREE.Vector3(-0.8, -0.6, 0)
      ],
      activeSteps: ['arduino', 'output', 'analytics', 'complete'],
      color: '#00ffaa'
    },
    // Arduino to LCD
    {
      points: [
        new THREE.Vector3(-1.5, -0.6, 0),
        new THREE.Vector3(-2, -0.4, 0),
        new THREE.Vector3(-2.6, -0.1, 0)
      ],
      activeSteps: ['output', 'analytics', 'complete'],
      color: '#00ff88'
    },
    // LCD to Cloud (Future)
    {
      points: [
        new THREE.Vector3(-2.6, 0.2, 0),
        new THREE.Vector3(-2.9, 0.8, 0),
        new THREE.Vector3(-3.2, 1.2, 0)
      ],
      activeSteps: ['analytics', 'complete'],
      color: '#4488ff'
    }
  ], []);

  return (
    <group>
      {lines.map((line, index) => {
        const isActive = line.activeSteps.includes(currentStep);
        return (
          <Line
            key={index}
            points={line.points}
            color={isActive ? line.color : '#222233'}
            lineWidth={isActive ? 2.5 : 1}
            transparent
            opacity={isActive ? 0.9 : 0.2}
            dashed={!isActive}
            dashSize={0.08}
            gapSize={0.04}
          />
        );
      })}
    </group>
  );
};

export default ConnectionLines;
