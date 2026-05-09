export type ClinicalEngineRegion = {
  intakeQuestions: string[];
  orthopedicTests: string[];
  neuroScreen: string[];
  neurodynamic: string[];
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
