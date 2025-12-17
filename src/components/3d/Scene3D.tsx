import React, { Suspense, useContext } from 'react'; // Added useContext
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { WorkflowContext } from '@/context/WorkflowContext'; // Added import

// ... imports ...
import SolarPanel from './SolarPanel';
import Sun from './Sun';
import Sensor from './Sensor';
import Arduino from './Arduino';
import LCD from './LCD';
import DataParticles from './DataParticles';
import ConnectionLines from './ConnectionLines';
import CloudIcon from './CloudIcon';

// Loading fallback
const Loader = () => (
  <mesh>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshBasicMaterial color="#00d4ff" wireframe />
  </mesh>
);

const SceneContent: React.FC = () => {
  // ... existing SceneContent code ...
  return (
    <>
      {/* Grid Floor */}
      <gridHelper args={[20, 40, '#1a4a5a', '#0a2a3a']} position={[0, -1.2, 0]} />

      {/* Platform */}
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4.5, 64]} />
        <meshStandardMaterial
          color="#0a1a2a"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Platform Ring */}
      <mesh position={[0, -1.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.3, 4.5, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>

      {/* 3D Components - Adjusted positions for better visibility */}
      <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
        <Sun position={[2.2, 1.8, 0]} />
      </Float>

      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.15}>
        <SolarPanel position={[1.3, -0.2, 0]} />
      </Float>

      <Float speed={2} rotationIntensity={0} floatIntensity={0.12}>
        <Sensor position={[0.2, -0.6, -0.7]} label="Light" type="BH1750" />
      </Float>

      <Float speed={2} rotationIntensity={0} floatIntensity={0.12}>
        <Sensor position={[0.2, -0.6, 0.7]} label="Power" type="INA219" />
      </Float>

      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.08}>
        <Arduino position={[-1, -0.6, 0]} />
      </Float>

      <Float speed={1.3} rotationIntensity={0} floatIntensity={0.15}>
        <LCD position={[-2.6, -0.1, 0]} />
      </Float>

      {/* Future: Cloud Icon */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <CloudIcon position={[-3.2, 1.5, 0]} />
      </Float>

      {/* Data Flow */}
      <ConnectionLines />
      <DataParticles />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
    </>
  );
};

const Scene3D: React.FC = () => {
  const workflowContext = useContext(WorkflowContext);

  return (
    <div className="canvas-container w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "default", preserveDrawingBuffer: true }}
        performance={{ min: 0.5 }}
      >
        <WorkflowContext.Provider value={workflowContext}>
          <PerspectiveCamera makeDefault position={[0.5, 2, 5.5]} fov={55} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 + 0.1}
            target={[-0.3, 0, 0]}
          />

          {/* Lighting & Environment */}
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[512, 512]} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00d4ff" />
          <pointLight position={[3, 3, 0]} intensity={0.5} color="#ffaa00" />

          {/* Background */}
          <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />
          <color attach="background" args={['#030810']} />
          <fog attach="fog" args={['#030810', 10, 30]} />

          <Suspense fallback={<Loader />}>
            <SceneContent />
          </Suspense>
        </WorkflowContext.Provider>
      </Canvas>
    </div>
  );
};
export default Scene3D;
