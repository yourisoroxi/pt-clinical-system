export type ExerciseDifficulty = "Easy" | "Moderate" | "Advanced";

export type Exercise = {
  id: string;
  name: string;
  region: string;
  category: string;
  difficulty: ExerciseDifficulty;
  irritability: string[];
  equipment: string[];
  dosage: string;
  frequency: string;
  instructions: string[];
  cueing: string[];
  commonErrors: string[];
  regression: string[];
  progression: string[];
  patientText: string;
};
