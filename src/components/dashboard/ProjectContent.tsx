import React, { useState } from 'react';
import {
    Lightbulb,
    Target,
    Globe,
    TrendingUp,
    ShieldCheck,
    Cpu,
    Zap,
    BarChart,
    Rocket,
    CheckCircle2,
    Users,
    Activity,
    AlertTriangle,
    Server,
    Database,
    Wifi,
    Maximize2,
    Minimize2
} from 'lucide-react';
import { PowerTrendChart, EfficiencyBarChart, VoltageCurrentChart } from './DashboardCharts';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import CloudIcon from '../3d/CloudIcon';

interface ContentSectionProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, className = "", children }) => (
    <div className={`glass-panel p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500 ${className}`}>
        <h2 className="font-orbitron text-xl font-bold tracking-wider neon-text-primary mb-6 flex items-center gap-3">
            {title}
        </h2>
        {children}
    </div>
);

export const DashboardView: React.FC = () => (
    <div className="space-y-6 p-6 overflow-y-auto custom-scrollbar h-full">
        {/* Hero Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
                { label: 'Avg Efficiency', value: '88.5%', icon: TrendingUp, color: 'text-green-400' },
                { label: 'Peak Power', value: '12.4W', icon: Zap, color: 'text-yellow-400' },
                { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-blue-400' },
                { label: 'Data Points', value: '14.2k', icon: Database, color: 'text-purple-400' }
            ].map((stat, i) => (
                <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">{stat.label}</p>
                        <p className="text-xl font-bold font-orbitron mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContentSection title="Project Overview">
                <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        The <span className="text-primary font-semibold">Solarix System</span> is an advanced Arduino-based solar monitoring solution.
                        It creates a digital twin of your solar setup, providing real-time insights into performance, efficiency, and environmental conditions.
                        Designed for educational institutions and small-scale solar installations, it bridges the gap between hardware and software.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <h4 className="font-bold text-foreground mb-1 flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary" /> Goal
                            </h4>
                            <p className="text-xs text-muted-foreground">Maximize energy output through precise monitoring.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                            <h4 className="font-bold text-foreground mb-1 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-secondary" /> Impact
                            </h4>
                            <p className="text-xs text-muted-foreground">Sustainable energy management for everyone.</p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            <ContentSection title="Power Generation Trend">
                <PowerTrendChart />
            </ContentSection>
        </div>

        <ContentSection title="Market Potential">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 border-r border-white/5 pr-6">
                    <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" /> Target Audience
                    </h3>
                    <ul className="space-y-2">
                        {['Solar Installers', 'Universities', 'Smart Homes', 'R&D Labs'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-3 h-3 text-green-500" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-2">
                    <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-3">Growth Projection</h3>
                    <div className="w-full bg-muted/20 h-2 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-gradient-to-r from-primary to-accent w-[75%]" />
                    </div>
                    <p className="text-xs text-muted-foreground flex justify-between">
                        <span>Current Market</span>
                        <span className="text-foreground font-bold">2030 Projection</span>
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
                        "Solarix scales from a single prototype to a global network of interconnected solar monitors."
                    </p>
                </div>
            </div>
        </ContentSection>
    </div>
);

export const AnalyticsView: React.FC = () => (
    <div className="space-y-6 p-6 overflow-y-auto custom-scrollbar h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContentSection title="Efficiency Analysis">
                <p className="text-sm text-muted-foreground mb-4">
                    Comparision of theoretical max efficiency vs. actual realized output over time.
                </p>
                <EfficiencyBarChart />
            </ContentSection>

            <ContentSection title="Voltage vs Current">
                <p className="text-sm text-muted-foreground mb-4">
                    Real-time correlation analysis between voltage levels and current draw.
                </p>
                <VoltageCurrentChart />
            </ContentSection>
        </div>

        <ContentSection title="Detailed Metrics Study">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Lightbulb, title: 'Light Intensity', value: '850 lux', desc: 'Optimal range for current panel type.' },
                    { icon: Zap, title: 'Voltage Stability', value: '±0.1V', desc: 'Voltage regulator maintaining high stability.' },
                    { icon: TrendingUp, title: 'Conversion Rate', value: '18.4%', desc: 'Above industry average for this class.' }
                ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-muted/5 border border-white/5 hover:bg-muted/10 transition-colors">
                        <item.icon className="w-6 h-6 text-primary mb-3" />
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-2xl font-orbitron text-accent mb-2">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                ))}
            </div>
        </ContentSection>
    </div>
);

// Simulation of system check
const SystemCheckRow = ({ label, status }: { label: string, status: 'ok' | 'warning' | 'error' }) => (
    <div className="flex items-center justify-between p-3 border-b border-border/50 last:border-0">
        <span className="text-sm text-foreground">{label}</span>
        <div className="flex items-center gap-2">
            <span className={`text-xs uppercase font-bold tracking-wider ${status === 'ok' ? 'text-green-500' : status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                {status === 'ok' ? 'Optimal' : status}
            </span>
            {status === 'ok' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-yellow-500" />}
        </div>
    </div>
);

export const HealthView: React.FC = () => (
    <div className="space-y-6 p-6 overflow-y-auto custom-scrollbar h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContentSection title="System Status" className="h-full">
                <div className="space-y-1">
                    <SystemCheckRow label="BH1750 Sensor Connection" status="ok" />
                    <SystemCheckRow label="INA219 Interface" status="ok" />
                    <SystemCheckRow label="Arduino Serial Bus" status="ok" />
                    <SystemCheckRow label="Power Supply Stability" status="ok" />
                    <SystemCheckRow label="Data Logging Service" status="warning" />
                    <SystemCheckRow label="Network Latency" status="ok" />
                </div>

                <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-4">
                    <Activity className="w-10 h-10 text-green-500 animate-pulse" />
                    <div>
                        <h4 className="font-bold text-green-500">System Healthy</h4>
                        <p className="text-xs text-green-400/70">All critical systems operating within normal parameters.</p>
                    </div>
                </div>
            </ContentSection>

            <ContentSection title="Component Health">
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'CPU Load', value: '12%', icon: Cpu },
                        { label: 'Memory', value: '45MB', icon: Server },
                        { label: 'Signal', value: '-42dBm', icon: Wifi },
                        { label: 'Storage', value: '85%', icon: Database }
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-lg bg-black/20 border border-white/5 flex flex-col items-center text-center">
                            <div className="p-2 rounded-full bg-primary/10 mb-2">
                                <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-2xl font-orbitron font-bold">{item.value}</span>
                            <span className="text-xs text-muted-foreground uppercase mt-1">{item.label}</span>
                        </div>
                    ))}
                </div>
            </ContentSection>
        </div>
    </div>
);

import Roadmap3D from '../3d/Roadmap3D';

export const FutureView: React.FC = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <div className="space-y-6 p-6 overflow-y-auto custom-scrollbar h-full">
            <ContentSection title="Future Expansion & Scalability">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                            The Solarix project is built with modularity in mind. Our roadmap includes integrating IoT capabilities for remote monitoring, AI-driven predictive maintenance, and MPPT (Maximum Power Point Tracking) algorithms to squeeze every watt out of the panels.
                        </p>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: Globe, title: 'IoT Cloud Integration', desc: 'Remote dashboard accessible from anywhere.' },
                                { icon: TrendingUp, title: 'MPPT Algorithm', desc: 'Auto-optimization for maximum efficiency.' },
                                { icon: Cpu, title: 'AI Predictions', desc: 'Weather-based power forecasting.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/5 hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/20 cursor-default">
                                    <div className="p-2 rounded-lg bg-background shadow-sm">
                                        <item.icon className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3D Holographic Visual */}
                    <div className={`
                relative group transition-all duration-500 ease-in-out
                ${isFullScreen
                            ? 'fixed inset-0 z-50 w-screen h-screen bg-black/90'
                            : 'w-full md:w-[500px] h-[350px] rounded-xl overflow-hidden bg-black/40 border border-primary/20'
                        }
            `}>
                        {!isFullScreen && (
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                        )}

                        {/* Controls */}
                        <div className="absolute top-4 right-4 z-50 flex gap-2">
                            <button
                                onClick={() => setIsFullScreen(!isFullScreen)}
                                className="p-2 rounded-lg bg-black/50 border border-white/10 hover:bg-primary/20 hover:border-primary/50 text-white transition-all hover:scale-105"
                                title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
                            >
                                {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="absolute top-4 left-4 z-10 pointer-events-none">
                            <span className="px-3 py-1.5 rounded-md bg-primary/20 border border-primary/30 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-widest shadow-lg">
                                {isFullScreen ? 'IMMERSIVE ROADMAP EXPERIENCE' : 'Interactive Visualization'}
                            </span>
                        </div>

                        <div className="w-full h-full">
                            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                                <OrbitControls enableZoom={true} enablePan={true} minDistance={2} maxDistance={20} />
                                <ambientLight intensity={0.5} />
                                <Roadmap3D />
                            </Canvas>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm text-primary font-orbitron font-bold animate-pulse mb-1">
                                        SYSTEM EVOLUTION PATH
                                    </p>
                                    <p className="text-xs text-muted-foreground max-w-sm">
                                        {isFullScreen
                                            ? "Explore the future milestones of Solarix. Pinch to zoom, drag to rotate."
                                            : "Drag to explore"}
                                    </p>
                                </div>
                                {isFullScreen && (
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest">v2.0 Roadmap</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>
        </div>
    );
};
