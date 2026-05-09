import type { SessionFocus, VisitStage } from "@/types/clinical";

export const CUSTOM_LIBRARY_KEY = "ptcos-custom-library-clinical-intelligence-v1";
export const PRESET_KEY = "ptcos-presets-clinical-intelligence-v1";
export const EXPORT_VERSION = "clinical-intelligence-phase1c-full-restore";

export const allVisitStages: VisitStage[] = [
  "Initial / Early",
  "Mid Phase",
  "Late Phase",
  "Return to Activity",
  "Recovery Session",
];

export const allSessionFocus: SessionFocus[] = [
  "Pain Modulation",
  "Mobility",
  "Motor Control",
  "Strength / Loading",
  "Functional Retraining",
  "Return to Run / Sport",
  "Recovery Session",
];
