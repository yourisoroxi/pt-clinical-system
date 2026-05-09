export type ClinicalEngineModule = {
  title: string;
  items: ClinicalEngineItem[];
};

export type ClinicalEngineItem = {
  name: string;
  whyItMatters?: string;
  howToUse?: string[];
  positiveFindings?: string[];
  clinicalMeaning?: string[];
  treatmentImplication?: string[];
  documentationTip?: string;
  precautions?: string[];
  progressionCriteria?: string[];
  regressionCriteria?: string[];
  tags?: string[];
};

export type RegionClinicalEngine = {
  intakeQuestions: ClinicalEngineItem[];
  orthopedicTests: ClinicalEngineItem[];
  neuroScreen: ClinicalEngineItem[];
  neurodynamic: ClinicalEngineItem[];
  movementImpairments: ClinicalEngineItem[];
  differentials: ClinicalEngineItem[];
  redFlags: ClinicalEngineItem[];
  treatmentDirections: ClinicalEngineItem[];
  progressionLadders: ClinicalEngineItem[];
  outcomeMeasures: ClinicalEngineItem[];
  returnToFunction: ClinicalEngineItem[];
  hepCategories: ClinicalEngineItem[];
};
