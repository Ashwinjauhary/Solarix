import React from 'react';
import { useWorkflow } from '@/context/WorkflowContext';
import { Zap, Sun, Gauge, TrendingUp, ThermometerSun, Battery } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  color: 'primary' | 'accent' | 'secondary';
  progress?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, unit, color, progress }) => {
  const colorClasses = {
    primary: 'text-primary border-primary/30 bg-primary/5',
    accent: 'text-accent border-accent/30 bg-accent/5',
    secondary: 'text-secondary border-secondary/30 bg-secondary/5'
  };

  const glowClasses = {
    primary: 'shadow-[0_0_15px_hsl(var(--primary)/0.3)]',
    accent: 'shadow-[0_0_15px_hsl(var(--accent)/0.3)]',
    secondary: 'shadow-[0_0_15px_hsl(var(--secondary)/0.3)]'
  };

  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all duration-500",
      colorClasses[color],
      progress && progress > 0 && glowClasses[color]
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-orbitron font-bold">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      {progress !== undefined && (
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              color === 'primary' && "bg-primary",
              color === 'accent' && "bg-accent",
              color === 'secondary' && "bg-secondary"
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

const AnalyticsPanel: React.FC = () => {
  const { sensorData, currentStep } = useWorkflow();
  const isActive = currentStep !== 'idle';

  return (
    <div className="space-y-4">
      {/* Real-time Metrics */}
      <div className="glass-panel p-4 rounded-xl">
        <h3 className="font-orbitron text-sm font-bold tracking-wider neon-text-primary mb-4">
          REAL-TIME METRICS
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={Sun}
            label="Light Intensity"
            value={sensorData.lightIntensity.toFixed(0)}
            unit="lux"
            color="accent"
            progress={sensorData.lightIntensity / 10}
          />
          <MetricCard
            icon={Zap}
            label="Voltage"
            value={sensorData.voltage.toFixed(2)}
            unit="V"
            color="primary"
            progress={sensorData.voltage * 15}
          />
          <MetricCard
            icon={Gauge}
            label="Current"
            value={sensorData.current.toFixed(2)}
            unit="A"
            color="secondary"
            progress={sensorData.current * 30}
          />
          <MetricCard
            icon={Battery}
            label="Power"
            value={sensorData.power.toFixed(2)}
            unit="W"
            color="primary"
            progress={sensorData.power * 7}
          />
        </div>
      </div>

      {/* Efficiency Gauge */}
      <div className="glass-panel p-4 rounded-xl">
        <h3 className="font-orbitron text-sm font-bold tracking-wider neon-text-primary mb-4">
          EFFICIENCY ANALYSIS
        </h3>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="w-32 h-32 progress-ring" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#efficiencyGradient)"
                strokeWidth="10"
                strokeDasharray="251"
                strokeDashoffset={251 - (251 * sensorData.efficiency) / 100}
                strokeLinecap="round"
                style={{
                  filter: isActive ? 'drop-shadow(0 0 10px hsl(var(--secondary)))' : 'none',
                  transition: 'stroke-dashoffset 1s ease-out'
                }}
              />
              <defs>
                <linearGradient id="efficiencyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-orbitron font-bold neon-text-secondary">
                {sensorData.efficiency.toFixed(0)}%
              </span>
              <span className="text-xs text-muted-foreground">Efficiency</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded bg-muted/30">
            <p className="text-lg font-orbitron font-bold text-primary">
              {(sensorData.power * 0.87).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Output (W)</p>
          </div>
          <div className="p-2 rounded bg-muted/30">
            <p className="text-lg font-orbitron font-bold text-accent">
              {(sensorData.power * 0.13).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Loss (W)</p>
          </div>
          <div className="p-2 rounded bg-muted/30">
            <p className="text-lg font-orbitron font-bold text-secondary">
              {(sensorData.power * 24).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground">Daily (Wh)</p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="glass-panel p-4 rounded-xl">
        <h3 className="font-orbitron text-sm font-bold tracking-wider neon-text-primary mb-4">
          SYSTEM STATUS
        </h3>
        <div className="space-y-3">
          {[
            { label: 'BH1750 Sensor', status: isActive, value: 'Active' },
            { label: 'INA219 Sensor', status: isActive, value: 'Active' },
            { label: 'Arduino UNO', status: isActive, value: 'Processing' },
            { label: 'LCD Display', status: isActive, value: 'Displaying' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  item.status ? "bg-secondary animate-pulse" : "bg-muted-foreground"
                )} />
                <span className={cn(
                  "text-xs font-medium",
                  item.status ? "text-secondary" : "text-muted-foreground"
                )}>
                  {item.status ? item.value : 'Standby'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
