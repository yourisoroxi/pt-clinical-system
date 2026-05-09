import type { SessionFocus, VisitStage } from "@/types/clinical";

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

export const regions = [
  "Cervical",
  "Lumbar",
  "Shoulder",
  "Hip",
  "Knee",
  "Ankle/Foot",
  "Elbow",
  "Wrist",
  "TMJ",
];

export const CUSTOM_LIBRARY_KEY = "ptcos-custom-library-phase1";
export const PRESET_KEY = "ptcos-presets-phase1";
export const EXPORT_VERSION = "ptcos-phase1-refactor-v1";
