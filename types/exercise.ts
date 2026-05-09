export type ExerciseCategory =
  | "mobility"
  | "motor-control"
  | "strength"
  | "balance"
  | "neurodynamic"
  | "breathing"
  | "return-to-sport"
  | "functional";

export type Exercise = {
  id: string;
  name: string;
  region: string[];
  category: ExerciseCategory;
  irritability: string[];
  stage: string[];
  goals: string[];
  equipment: string[];
  dosage: {
    sets: string;
    reps: string;
    frequency: string;
  };
  instructions: string[];
  cueing: string[];
  commonErrors: string[];
  regression: string[];
  progression: string[];
  indications: string[];
  precautions: string[];
  tags: string[];
  videoUrl?: string;
};
