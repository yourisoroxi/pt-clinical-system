export type CptCode = "97140" | "97530" | "97110";

export type LibraryType = "intervention" | "cueing" | "compensation" | "response";

export type VisitStage =
  | "Initial / Early"
  | "Mid Phase"
  | "Late Phase"
  | "Return to Activity"
  | "Recovery Session";

export type SessionFocus =
  | "Pain Modulation"
  | "Mobility"
  | "Motor Control"
  | "Strength / Loading"
  | "Functional Retraining"
  | "Return to Run / Sport"
  | "Recovery Session";

export type TreatmentItem = {
  text: string;
  tags: string[];
  irritability: string[];
  stage: VisitStage[];
  focus: SessionFocus[];
  clinicApproved?: boolean;
};

export type PatternData = {
  goals: string[];
  interventions: Record<CptCode, TreatmentItem[]>;
  cueing: TreatmentItem[];
  compensation: TreatmentItem[];
  response: TreatmentItem[];
};

export type SelectableItem = {
  id: string;
  text: string;
  custom: boolean;
  recommended: boolean;
  clinicApproved: boolean;
  score: number;
};

export type ClinicalSupport = {
  suggestedTests: string[];
  neuroScreen: string[];
  neurodynamic: string[];
  differentials: string[];
  redFlags: string[];
  treatmentDirection: string[];
  hep: string[];
  progression: string[];
};

export type ClinicalDetail = {
  title: string;
  howTo: string[];
  positiveFindings?: string[];
  clinicalMeaning?: string[];
  precautions?: string[];
  treatmentDirection?: string[];
  documentationTip?: string;
};
