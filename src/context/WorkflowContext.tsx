import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { WorkflowStep, WorkflowState, SensorData, STEP_ORDER } from '@/types/workflow';

interface WorkflowContextType extends WorkflowState {
  startWorkflow: () => void;
  resetWorkflow: () => void;
  nextStep: () => void;
  setStepProgress: (progress: number) => void;
}

const defaultSensorData: SensorData = {
  lightIntensity: 0,
  voltage: 0,
  current: 0,
  power: 0,
  efficiency: 0
};

export const WorkflowContext = createContext<WorkflowContextType | null>(null);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>(defaultSensorData);
  const [stepProgress, setStepProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Target values to fluctuate around
  const targetValuesRef = useRef<SensorData>(defaultSensorData);

  const animateSensorData = useCallback((step: WorkflowStep) => {
    const targetData: Record<WorkflowStep, Partial<SensorData>> = {
      'idle': defaultSensorData,
      'solar-input': { lightIntensity: 850 },
      'sensors': { lightIntensity: 850, voltage: 5.2, current: 2.1 },
      'arduino': { lightIntensity: 850, voltage: 5.2, current: 2.1, power: 10.92 },
      'output': { lightIntensity: 850, voltage: 5.2, current: 2.1, power: 10.92, efficiency: 87 },
      'analytics': { lightIntensity: 850, voltage: 5.2, current: 2.1, power: 10.92, efficiency: 87 },
      'complete': { lightIntensity: 850, voltage: 5.2, current: 2.1, power: 10.92, efficiency: 87 }
    };

    const stepTarget = { ...defaultSensorData, ...targetData[step] };

    // Only update ref targets that are explicitly set for this step
    if (targetData[step].lightIntensity !== undefined) targetValuesRef.current.lightIntensity = stepTarget.lightIntensity;
    if (targetData[step].voltage !== undefined) targetValuesRef.current.voltage = stepTarget.voltage;
    if (targetData[step].current !== undefined) targetValuesRef.current.current = stepTarget.current;
    if (targetData[step].power !== undefined) targetValuesRef.current.power = stepTarget.power;
    if (targetData[step].efficiency !== undefined) targetValuesRef.current.efficiency = stepTarget.efficiency;

    // Smooth transition to new base values
    let frame = 0;
    const totalFrames = 30;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);

      setSensorData(prev => {
        // Calculate new base values
        const newLight = prev.lightIntensity + ((targetValuesRef.current.lightIntensity - prev.lightIntensity) * eased);
        const newVoltage = prev.voltage + ((targetValuesRef.current.voltage - prev.voltage) * eased);
        const newCurrent = prev.current + ((targetValuesRef.current.current - prev.current) * eased);

        // Recalculate derived values based on new base
        const newPower = newVoltage * newCurrent;
        let newEfficiency = prev.efficiency;
        if (targetData[step].efficiency !== undefined) {
          newEfficiency = prev.efficiency + ((targetValuesRef.current.efficiency - prev.efficiency) * eased);
        }

        return {
          lightIntensity: newLight,
          voltage: newVoltage,
          current: newCurrent,
          power: newPower,
          efficiency: newEfficiency
        };
      });

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  // Real-time fluctuations
  React.useEffect(() => {
    if (currentStep === 'idle') return;

    const interval = setInterval(() => {
      setSensorData(prev => {
        // Only fluctuate if we are near the target values (i.e. not in the middle of a big transition)
        // A simple way is to always apply small noise to whatever the current value is,
        // but clamped to the target region.
        // Better: fluctuate around the *target* values once the step is active.

        // Helper to add noise
        const noise = (magnitude: number) => (Math.random() - 0.5) * magnitude;

        // Base noise on whether the sensor is "active" in the current step
        const isLightActive = ['solar-input', 'sensors', 'arduino', 'output', 'analytics', 'complete'].includes(currentStep);
        const isElecActive = ['sensors', 'arduino', 'output', 'analytics', 'complete'].includes(currentStep);
        const isEffActive = ['output', 'analytics', 'complete'].includes(currentStep);

        if (!isLightActive && !isElecActive) return prev; // No active sensors

        let light = prev.lightIntensity;
        let volt = prev.voltage;
        let curr = prev.current;

        if (isLightActive) light = targetValuesRef.current.lightIntensity + noise(15); // +/- 7.5 lux
        if (isElecActive) {
          volt = targetValuesRef.current.voltage + noise(0.1); // +/- 0.05 V
          curr = targetValuesRef.current.current + noise(0.05); // +/- 0.025 A
        }

        // Recalculate power derived from fluctuating V and I
        const power = volt * curr;

        // Efficiency also fluctuates slightly if active
        let eff = prev.efficiency;
        if (isEffActive) {
          eff = targetValuesRef.current.efficiency + noise(0.5);
        }

        return {
          lightIntensity: Math.max(0, light),
          voltage: Math.max(0, volt),
          current: Math.max(0, curr),
          power: Math.max(0, power),
          efficiency: Math.max(0, Math.min(100, eff))
        };
      });
    }, 500); // Fluctuate every 500ms

    return () => clearInterval(interval);
  }, [currentStep]);

  const runStep = useCallback((stepIndex: number) => {
    if (stepIndex >= STEP_ORDER.length) {
      return;
    }

    const step = STEP_ORDER[stepIndex];
    setCurrentStep(step);
    animateSensorData(step);

    // If complete, set to 100% immediately
    if (step === 'complete') {
      setStepProgress(100);
      // Don't auto-advance or run progress bar for complete step
      return;
    }

    setStepProgress(0);

    // Progress animation - faster than delay to ensure we hit 100%
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 4; // Reads 100% in ~1.25s (well before 2.5s delay)
      setStepProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 50);

    // Move to next step after delay
    // Delay is 2500ms, progress finishes in 1250ms
    const delay = 2500;

    timeoutRef.current = setTimeout(() => {
      clearInterval(progressInterval);
      runStep(stepIndex + 1);
    }, delay);
  }, [animateSensorData]);

  const startWorkflow = useCallback(() => {
    // If restarting
    if (currentStep === 'complete') {
      setSensorData(defaultSensorData);
      targetValuesRef.current = defaultSensorData;
      setCurrentStep('idle');
      setTimeout(() => {
        setIsRunning(true);
        runStep(0);
      }, 100);
      return;
    }

    if (isRunning && currentStep !== 'idle') return;

    setSensorData(defaultSensorData);
    targetValuesRef.current = defaultSensorData;
    setIsRunning(true);
    runStep(0);
  }, [isRunning, runStep, currentStep]);

  const resetWorkflow = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCurrentStep('idle');
    setIsRunning(false);
    setSensorData(defaultSensorData);
    targetValuesRef.current = defaultSensorData;
    setStepProgress(0);
  }, []);

  const nextStep = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      const nextStepValue = STEP_ORDER[currentIndex + 1];
      setCurrentStep(nextStepValue);
      setStepProgress(0);
      animateSensorData(nextStepValue);
    }
  }, [currentStep, animateSensorData]);

  return (
    <WorkflowContext.Provider value={{
      currentStep,
      isRunning,
      sensorData,
      stepProgress,
      startWorkflow,
      resetWorkflow,
      nextStep,
      setStepProgress
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};
export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within WorkflowProvider');
  }
  return context;
};
