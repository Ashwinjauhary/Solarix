import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, Float, Sphere, Line, Sparkles, Environment, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface RoadmapNodeProps {
    position: [number, number, number];
    label: string;
    color: string;
    delay?: number;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ position, label, color, delay = 0 }) => {
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                {/* Core Sphere - Glassy */}
                <mesh castShadow receiveShadow>
                    <icosahedronGeometry args={[0.4, 4]} />
                    <meshPhysicalMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.5}
                        metalness={0.1}
                        roughness={0.1}
                        transmission={0.6}
                        thickness={2.0}
                        clearcoat={1.0}
                        clearcoatRoughness={0.1}
                    />
                </mesh>

                {/* Inner Light */}
                <pointLight color={color} distance={3} intensity={3} />

                {/* Outer Ring - Metallic */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.6, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>

                {/* Floating Particles specific to node */}
                <Sparkles color={color} count={20} scale={1.5} size={2} speed={1} opacity={0.5} />
            </Float>

            <Html position={[0, 0.8, 0]} center transform sprite zIndexRange={[100, 0]}>
                <div className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <p className="text-[12px] font-orbitron font-bold text-white whitespace-nowrap tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                        {label}
                    </p>
                </div>
            </Html>
        </group>
    );
};

const ConnectionPath: React.FC<{ points: [number, number, number][] }> = ({ points }) => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    }, [points]);

    return (
        <>
            <Line points={points} color="#ffffff" opacity={0.1} transparent lineWidth={1} dashed dashScale={2} />
            <MovingParticles curve={curve} count={40} color="#00d4ff" />
        </>
    );
};

const MovingParticles: React.FC<{ curve: THREE.CatmullRomCurve3, count: number, color: string }> = ({ curve, count, color }) => {
    const particles = useMemo(() => {
        return new Float32Array(count * 3);
    }, [count]);

    const particleRef = useRef<THREE.Points>(null);

    // Store individual progress for each particle
    const progress = useMemo(() => {
        return Array.from({ length: count }, (_, i) => Math.random());
    }, [count]);

    useFrame((state, delta) => {
        if (!particleRef.current) return;

        for (let i = 0; i < count; i++) {
            progress[i] = (progress[i] + delta * 0.1) % 1; // Slower speed
            const point = curve.getPointAt(progress[i]);
            particles[i * 3] = point.x;
            particles[i * 3 + 1] = point.y;
            particles[i * 3 + 2] = point.z;
        }

        particleRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particleRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.08} color={color} transparent opacity={0.8} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
};

const Roadmap3D: React.FC = () => {
    const nodes = [
        { pos: [-4, -1, 2], label: "CURRENT GEN", color: "#ffaa00" },
        { pos: [-2, 0, 0], label: "DATA LOGGING", color: "#00ff88" },
        { pos: [0, -1, -2], label: "IOT / WIFI", color: "#00d4ff" },
        { pos: [2, 0.5, 0], label: "CLOUD DB", color: "#aa00ff" },
        { pos: [4, 2, 2], label: "AI PREDICTION", color: "#ff00aa" },
    ] as const;

    const points = nodes.map(n => n.pos as [number, number, number]);

    return (
        <>
            <group>
                {nodes.map((node, i) => (
                    <RoadmapNode
                        key={i}
                        position={node.pos as [number, number, number]}
                        label={node.label}
                        color={node.color}
                    />
                ))}
                <ConnectionPath points={points} />
            </group>

            {/* Atmospheric Effects */}
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#ffffff" />

            {/* Post Processing */}
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
            </EffectComposer>
        </>
    );
};

export default Roadmap3D;
