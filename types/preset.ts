import type { SessionFocus, VisitStage } from "./clinical";

export type CustomItem = {
  id: string;
  type: "intervention" | "cueing" | "compensation" | "response";
  region: string;
  pattern: string;
  cpt?: "97140" | "97530" | "97110";
  text: string;
  tags: string[];
};

export type Preset = {
  id: string;
  name: string;
  region: string;
  pattern: string;
  goal: string;
  irritability: string;
  visitStage: VisitStage;
  sessionFocus: SessionFocus;
  selectedInterventions: string[];
  selectedCueing: string[];
  selectedCompensation: string[];
  selectedResponse: string[];
  selectedHep?: string[];
  noteLength: string;
  favorite: boolean;
  source: "Clinic Default" | "My Preset";
  clinicApproved?: boolean;
  category?: string;
};
