import React from 'react';
import { useWorkflow } from '@/context/WorkflowContext';
import { Zap, Activity, Menu } from 'lucide-react';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { isRunning, sensorData } = useWorkflow();

  return (
    <header className="h-14 md:h-16 glass-panel border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 relative z-30">
      {/* Left - Menu & Title */}
      <div className="flex items-center gap-3 md:gap-4">


        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-accent" />
        </div>
        <div>
          <h1 className="font-orbitron text-xs md:text-base font-bold tracking-wider neon-text-primary leading-tight">
            SOLAR DETECTOR
          </h1>
          <p className="text-[8px] md:text-[10px] text-muted-foreground font-rajdhani tracking-widest uppercase">
            Powered by Team Solarix
          </p>
        </div>
      </div>

      {/* Center - Live Indicator */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-secondary animate-pulse' : 'bg-muted-foreground'}`} />
          <span className={`font-orbitron text-sm ${isRunning ? 'neon-text-secondary' : 'text-muted-foreground'}`}>
            {isRunning ? 'LIVE' : 'STANDBY'}
          </span>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">System Status:</span>
          <span className="font-orbitron text-sm neon-text-primary">OPERATIONAL</span>
        </div>
      </div>

      {/* Right - Efficiency */}
      <div className="hidden md:flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Power Efficiency</p>
          <p className="font-orbitron text-2xl font-bold neon-text-accent">
            {sensorData.efficiency.toFixed(1)}%
          </p>
        </div>
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 progress-ring" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * sensorData.efficiency) / 100}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 6px hsl(var(--accent)))' }}
            />
          </svg>
        </div>
      </div>

      {/* Mobile Live Indicator (Minimal) */}
      <div className="flex md:hidden items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-secondary animate-pulse' : 'bg-muted-foreground'}`} />
        <span className={`font-orbitron text-xs ${isRunning ? 'neon-text-secondary' : 'text-muted-foreground'}`}>
          {isRunning ? 'LIVE' : 'IDLE'}
        </span>
      </div>
    </header>
  );
};

export default Header;
