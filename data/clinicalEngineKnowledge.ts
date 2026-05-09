import type { ClinicalEngineItem } from "@/types";

export type ClinicalEngineRegion = {
  intakeQuestions: ClinicalEngineItem[];
  orthopedicTests: ClinicalEngineItem[];
  neuroScreen: ClinicalEngineItem[];
  neurodynamic: ClinicalEngineItem[];
};

const createRegion = (): ClinicalEngineRegion => ({
  intakeQuestions: [],
  orthopedicTests: [],
  neuroScreen: [],
  neurodynamic: [],
});

export const clinicalEngineKnowledge: Record<string, ClinicalEngineRegion> = {
  Cervical: createRegion(),
  Shoulder: createRegion(),
  Lumbar: createRegion(),
  Hip: createRegion(),
  Knee: createRegion(),
  Ankle: createRegion(),
  Foot: createRegion(),
  Wrist: createRegion(),
  Elbow: createRegion(),
  Pediatric: createRegion(),
};
