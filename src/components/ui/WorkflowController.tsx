import React from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { useWorkflow } from '@/context/WorkflowContext';
import { STEP_ORDER, STEP_LABELS } from '@/types/workflow';
import { cn } from '@/lib/utils';

const WorkflowController: React.FC = () => {
  const { currentStep, isRunning, stepProgress, startWorkflow, resetWorkflow } = useWorkflow();

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="glass-panel p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-sm font-bold tracking-wider neon-text-primary">
          WORKFLOW CONTROL
        </h3>
        <div className={cn(
          "px-2 py-1 rounded text-xs font-orbitron",
          isRunning ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
        )}>
          {isRunning ? 'RUNNING' : 'READY'}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center gap-1 mb-4">
        {STEP_ORDER.slice(0, -1).map((step, index) => {
          const isComplete = currentStepIndex > index;
          const isActive = currentStepIndex === index;
          const isPending = currentStepIndex < index;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center flex-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  isComplete && "bg-secondary text-secondary-foreground shadow-[0_0_10px_hsl(var(--secondary))]",
                  isActive && "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary))] animate-pulse",
                  isPending && "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </div>
                <span className={cn(
                  "text-[10px] mt-1 text-center",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {STEP_LABELS[step]}
                </span>
              </div>
              {index < STEP_ORDER.length - 2 && (
                <div className={cn(
                  "h-0.5 flex-1 transition-all duration-500",
                  isComplete ? "bg-secondary shadow-[0_0_5px_hsl(var(--secondary))]" : "bg-muted"
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{STEP_LABELS[currentStep]}</span>
            <span>{stepProgress}%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={startWorkflow}
          disabled={isRunning}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-orbitron text-sm font-bold transition-all duration-300",
            isRunning 
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:scale-[1.02]"
          )}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              RUNNING...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              START WORKFLOW
            </>
          )}
        </button>
        
        <button
          onClick={resetWorkflow}
          className="p-3 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WorkflowController;
