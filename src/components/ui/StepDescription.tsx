import React from 'react';
import { useWorkflow } from '@/context/WorkflowContext';
import { STEP_LABELS, WorkflowStep } from '@/types/workflow';
import { Sun, Radio, Cpu, Monitor, BarChart3, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const stepInfo: Record<WorkflowStep, { icon: React.ElementType; description: string; details: string[] }> = {
  'idle': {
    icon: Sun,
    description: 'System Ready',
    details: ['Press Start to begin the workflow demonstration', 'All components initialized', 'Sensors calibrated']
  },
  'solar-input': {
    icon: Sun,
    description: 'Solar Energy Collection',
    details: ['Sunlight hits solar panel surface', 'Photons converted to electrical energy', 'Light intensity measured: 850 lux']
  },
  'sensors': {
    icon: Radio,
    description: 'Sensor Data Acquisition',
    details: ['BH1750 measuring light intensity', 'INA219 measuring voltage & current', 'Data transmitted via I2C protocol']
  },
  'arduino': {
    icon: Cpu,
    description: 'Data Processing',
    details: ['Raw data received from sensors', 'Power calculation: P = V × I', 'Efficiency analysis in progress']
  },
  'output': {
    icon: Monitor,
    description: 'Display Output',
    details: ['LCD displaying real-time values', 'Voltage, Current, Power shown', 'Efficiency percentage calculated']
  },
  'analytics': {
    icon: BarChart3,
    description: 'Analytics Generation',
    details: ['Historical data comparison', 'Performance trends analyzed', 'Optimization suggestions ready']
  },
  'complete': {
    icon: CheckCircle,
    description: 'Workflow Complete',
    details: ['All data processed successfully', 'System operating at 87% efficiency', 'Ready for next cycle']
  }
};

const StepDescription: React.FC = () => {
  const { currentStep, isRunning } = useWorkflow();
  const info = stepInfo[currentStep];
  const Icon = info.icon;

  return (
    <div className="glass-panel p-4 rounded-xl animated-border">
      <div className="flex items-center gap-3 mb-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500",
          isRunning ? "bg-primary/20" : "bg-muted"
        )}>
          <Icon className={cn(
            "w-5 h-5 transition-all",
            isRunning ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" : "text-muted-foreground"
          )} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Step</p>
          <h3 className={cn(
            "font-orbitron font-bold tracking-wide",
            isRunning ? "neon-text-primary" : "text-foreground"
          )}>
            {STEP_LABELS[currentStep]}
          </h3>
        </div>
      </div>
      
      <p className="text-sm text-foreground mb-3">{info.description}</p>
      
      <ul className="space-y-1.5">
        {info.details.map((detail, index) => (
          <li 
            key={index}
            className="flex items-center gap-2 text-xs text-muted-foreground"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: isRunning ? 'fade-in 0.3s ease-out forwards' : 'none'
            }}
          >
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              isRunning ? "bg-secondary" : "bg-muted-foreground"
            )} />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepDescription;
