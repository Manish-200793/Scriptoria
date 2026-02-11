// Types for script analysis data

export interface Character {
  name: string;
  role: string;
  description: string;
  scenes: number[];
}

export interface Prop {
  name: string;
  category: string;
  scenes: number[];
}

export interface Location {
  name: string;
  type: string;
  timeOfDay: string;
  scenes: number[];
}

export interface Scene {
  number: number;
  heading: string;
  summary: string;
  characters: string[];
  estimatedDuration: string;
}

export interface ScheduleDay {
  day: number;
  location: string;
  scenes: number[];
  estimatedHours: number;
  notes: string;
}

export interface BudgetLineItem {
  category: string;
  description: string;
  amount: number;
}

export interface Budget {
  totalEstimate: number;
  currency: string;
  lineItems: BudgetLineItem[];
}

export interface Storyboard {
  sceneNumber: number;
  shotDescription: string;
  cameraAngle: string;
  mood: string;
}

export interface ScriptAnalysis {
  title: string;
  characters: Character[];
  props: Prop[];
  locations: Location[];
  scenes: Scene[];
  schedule: ScheduleDay[];
  budget: Budget;
  storyboards: Storyboard[];
}
