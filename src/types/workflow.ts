export type WorkflowStep = 
  | 'idle' 
  | 'solar-input' 
  | 'sensors' 
  | 'arduino' 
  | 'output' 
  | 'analytics'
  | 'complete';

export interface SensorData {
  lightIntensity: number;
  voltage: number;
  current: number;
  power: number;
  efficiency: number;
}

export interface WorkflowState {
  currentStep: WorkflowStep;
  isRunning: boolean;
  sensorData: SensorData;
  stepProgress: number;
}

export const STEP_LABELS: Record<WorkflowStep, string> = {
  'idle': 'Ready',
  'solar-input': 'Solar Input',
  'sensors': 'Sensor Reading',
  'arduino': 'Processing',
  'output': 'Display Output',
  'analytics': 'Analytics',
  'complete': 'Complete'
};

export const STEP_ORDER: WorkflowStep[] = [
  'solar-input',
  'sensors',
  'arduino',
  'output',
  'analytics',
  'complete'
];
