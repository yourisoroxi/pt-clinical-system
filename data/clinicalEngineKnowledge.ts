export type ClinicalEngineItem = {
  title: string;
  content?: string;
  description?: string;
  items?: string[];
  bullets?: string[];
};

export type ClinicalEngineRegion = Record<string, ClinicalEngineItem[]>;

const createRegion = (): ClinicalEngineRegion => ({
    differentials: [],     hepCategories: [],     intakeQuestions: [],     movementImpairments: [],     neurodynamic: [],     neuroScreen: [],     orthopedicTests: [],     outcomeMeasures: [],     progressionLadders: [],     redFlags: [],     returnToFunction: [],     treatmentDirections: [],
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
