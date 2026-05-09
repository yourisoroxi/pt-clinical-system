"use client";

import { useEffect, useMemo, useState } from "react";

type CptCode = "97140" | "97530" | "97110";
type LibraryType = "intervention" | "cueing" | "compensation" | "response";
type VisitStage = "Initial / Early" | "Mid Phase" | "Late Phase" | "Return to Activity" | "Maintenance";
type SessionFocus =
  | "Pain Modulation"
  | "Mobility"
  | "Motor Control"
  | "Strength / Loading"
  | "Functional Retraining"
  | "Return to Run / Sport"
  | "Recovery Session";

type TreatmentItem = {
  text: string;
  tags: string[];
  irritability: string[];
  stage: VisitStage[];
  focus: SessionFocus[];
};

type PatternData = {
  goals: string[];
  interventions: Record<CptCode, TreatmentItem[]>;
  cueing: TreatmentItem[];
  compensation: TreatmentItem[];
  response: TreatmentItem[];
};

type CustomItem = {
  id: string;
  type: LibraryType;
  region: string;
  pattern: string;
  cpt?: CptCode;
  text: string;
  tags: string[];
};

type Preset = {
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
  noteLength: string;
  favorite: boolean;
  source: "Clinic Default" | "My Preset";
  clinicApproved?: boolean;
  category?: string;
};

type SelectableItem = {
  id: string;
  text: string;
  custom: boolean;
  recommended: boolean;
  score: number;
};

const CUSTOM_LIBRARY_KEY = "ptcos-custom-library-v5";
const PRESET_KEY = "ptcos-presets-v5";
const EXPORT_VERSION = "private-clinic-beta-v1";

const allVisitStages: VisitStage[] = [
  "Initial / Early",
  "Mid Phase",
  "Late Phase",
  "Return to Activity",
  "Maintenance",
];

const allSessionFocus: SessionFocus[] = [
  "Pain Modulation",
  "Mobility",
  "Motor Control",
  "Strength / Loading",
  "Functional Retraining",
  "Return to Run / Sport",
  "Recovery Session",
];

const mk = (
  text: string,
  tags: string[] = [],
  irritability = ["High", "Moderate", "Low"],
  stage: VisitStage[] = allVisitStages,
  focus: SessionFocus[] = allSessionFocus
): TreatmentItem => ({ text, tags, irritability, stage, focus });

const cueBase: TreatmentItem[] = [
  mk("Maintain neutral alignment", ["alignment"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining", "Strength / Loading"]),
  mk("Reduce compensatory movement", ["compensation"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Control eccentric phase", ["eccentric"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Strength / Loading", "Return to Run / Sport"]),
  mk("Avoid breath holding", ["breathing"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Motor Control"]),
  mk("Coordinate exhalation with effort", ["breathing"], ["High", "Moderate"], allVisitStages, ["Motor Control", "Strength / Loading"]),
  mk("Use symptom-free range", ["symptom"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Mobility"]),
  mk("Stay below symptom provocation threshold", ["symptom"], ["High"], ["Initial / Early"], ["Pain Modulation", "Recovery Session"]),
  mk("Progress only if symptoms remain stable", ["progression"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Strength / Loading"]),
  mk("Improve self-correction between repetitions", ["carryover"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Motor Control", "Functional Retraining"]),
  mk("Use tactile cueing to improve movement sequencing", ["skilled cueing"], ["High", "Moderate"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Use visual feedback to improve alignment", ["feedback"], ["Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Monitor symptom behavior during task", ["symptom monitoring"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
];

const compBase: TreatmentItem[] = [
  mk("Protective guarding", ["guarding"], ["High"], ["Initial / Early"], ["Pain Modulation", "Recovery Session"]),
  mk("Breath holding", ["breathing"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Motor Control"]),
  mk("Movement avoidance", ["avoidance"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Functional Retraining"]),
  mk("Compensatory momentum", ["momentum"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Strength / Loading", "Return to Run / Sport"]),
  mk("Loss of eccentric control", ["eccentric"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Strength / Loading", "Return to Run / Sport"]),
  mk("Poor load acceptance", ["loading"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading", "Functional Retraining"]),
  mk("Limited self-correction", ["carryover"], ["High", "Moderate"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Inconsistent carryover", ["carryover"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining", "Return to Run / Sport"]),
  mk("Reduced proximal stabilization", ["proximal stability"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
  mk("Poor movement sequencing", ["sequencing"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Reduced control with increased demand", ["demand"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Strength / Loading", "Return to Run / Sport"]),
  mk("Asymmetrical loading", ["loading"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining", "Strength / Loading"]),
];

const responseBase: TreatmentItem[] = [
  mk("Improved movement quality with cueing", ["movement quality"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Reduced compensatory loading pattern", ["compensation"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
  mk("Improved load tolerance during task", ["loading"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Strength / Loading", "Functional Retraining"]),
  mk("Reduced symptom provocation during activity", ["symptom"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
  mk("Improved self-correction ability", ["carryover"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Motor Control", "Functional Retraining"]),
  mk("Reduced cueing dependency", ["cueing"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Functional Retraining", "Return to Run / Sport"]),
  mk("No increase in symptom irritability", ["symptom stability"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Recovery Session"]),
  mk("Improved proximal stabilization", ["proximal stability"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
  mk("Improved symptom stability during task", ["symptom"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
  mk("Improved functional movement efficiency", ["function"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Functional Retraining", "Return to Run / Sport"]),
];

const data: Record<string, Record<string, PatternData>> = {
  Cervical: {
    "Motor Control Deficit": {
      goals: ["Desk tolerance", "Driving rotation", "Overhead reaching", "Sustained posture", "Computer work tolerance", "Phone use tolerance", "Sleeping tolerance", "Military gear tolerance"],
      interventions: {
        "97140": [
          mk("Suboccipital release", ["pain modulation", "soft tissue"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Recovery Session"]),
          mk("Cervicothoracic soft tissue mobilization", ["soft tissue", "mobility"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Mobility"]),
          mk("Upper trapezius soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Mobility"]),
          mk("Levator scapulae soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Mobility"]),
          mk("Scalene soft tissue mobilization", ["soft tissue", "breathing"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation"]),
          mk("Pectoralis minor soft tissue mobilization", ["soft tissue", "posture"], ["Moderate", "Low"], allVisitStages, ["Mobility", "Motor Control"]),
          mk("Thoracic extension mobilization", ["mobility", "thoracic"], ["High", "Moderate", "Low"], allVisitStages, ["Mobility", "Functional Retraining"]),
          mk("Thoracic rotation mobilization", ["mobility", "rotation"], ["Moderate", "Low"], allVisitStages, ["Mobility", "Functional Retraining"]),
          mk("Cervicothoracic junction mobilization", ["joint mobility"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Mobility", "Pain Modulation"]),
          mk("Low-grade cervical traction", ["unloading"], ["High"], ["Initial / Early"], ["Pain Modulation", "Recovery Session"]),
          mk("First rib mobilization", ["mobility", "upper quarter"], ["Moderate"], ["Mid Phase"], ["Mobility"]),
          mk("Manual-assisted cervical rotation", ["rotation"], ["Moderate"], ["Mid Phase"], ["Mobility", "Functional Retraining"]),
        ],
        "97530": [
          mk("Desk posture retraining", ["desk", "function"], ["High", "Moderate", "Low"], allVisitStages, ["Functional Retraining", "Motor Control"]),
          mk("Workstation movement strategy training", ["desk", "education"], ["High", "Moderate"], allVisitStages, ["Functional Retraining"]),
          mk("Functional reaching with cervical control", ["reaching", "function"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining", "Strength / Loading"]),
          mk("Cervical rotation task retraining", ["rotation", "driving"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Driving rotation simulation", ["driving"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining"]),
          mk("Overhead reach task retraining", ["overhead", "function"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining", "Return to Run / Sport"]),
          mk("Carrying task with cervical neutrality", ["carrying", "load"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Strength / Loading", "Functional Retraining"]),
          mk("Forward reach with thoracic initiation", ["thoracic", "reach"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
          mk("Phone-use posture retraining", ["ADL", "posture"], ["High", "Moderate"], allVisitStages, ["Functional Retraining"]),
          mk("HEP carryover strategy training", ["education", "carryover"], ["High", "Moderate", "Low"], allVisitStages, ["Functional Retraining", "Maintenance"]),
        ],
        "97110": [
          mk("Deep cervical flexor activation", ["motor control", "stabilization"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Motor Control"]),
          mk("Chin nod in supine", ["motor control", "low load"], ["High"], ["Initial / Early"], ["Pain Modulation", "Motor Control"]),
          mk("Chin tuck with arm movement", ["motor control", "UE integration"], ["Moderate"], ["Mid Phase"], ["Motor Control", "Functional Retraining"]),
          mk("Quadruped cervical stabilization", ["stabilization"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Motor Control", "Strength / Loading"]),
          mk("Cervical isometric stabilization", ["isometric"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Motor Control"]),
          mk("Scapular retraction strengthening", ["scapular", "strength"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading", "Motor Control"]),
          mk("Serratus wall slide", ["serratus", "scapular"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Motor Control", "Strength / Loading"]),
          mk("Prone Y scapular strengthening", ["lower trap", "strength"], ["Low"], ["Late Phase", "Return to Activity"], ["Strength / Loading", "Return to Run / Sport"]),
          mk("Thoracic extension mobility drill", ["mobility"], ["High", "Moderate", "Low"], allVisitStages, ["Mobility"]),
          mk("Thoracic rotation open book", ["mobility", "rotation"], ["Moderate", "Low"], allVisitStages, ["Mobility"]),
          mk("Band row with cervical neutrality", ["strength", "posture"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Strength / Loading"]),
          mk("Reactive cervical stabilization", ["reactive control"], ["Low"], ["Late Phase", "Return to Activity"], ["Return to Run / Sport"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain neutral cervical alignment", ["cervical"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]), mk("Reduce upper trapezius dominance", ["scapular"], ["Moderate", "Low"], allVisitStages, ["Motor Control"]), mk("Initiate movement from thoracic spine", ["thoracic"], ["Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"])],
      compensation: [...compBase, mk("Upper trapezius dominance", ["cervical"]), mk("Forward head substitution", ["posture"]), mk("Thoracic collapse", ["thoracic"]), mk("Early cervical extension", ["cervical"])],
      response: [...responseBase, mk("Improved cervical control with reduced compensation", ["cervical"]), mk("Reduced neck tension during reaching", ["symptom"]), mk("Improved postural tolerance", ["function"])],
    },
  },
  Lumbar: {
    "Load Intolerance": {
      goals: ["Lifting", "Prolonged sitting", "Walking tolerance", "Sit-to-stand", "Bending tolerance", "Carrying tolerance", "Military fitness task", "Floor transfer"],
      interventions: {
        "97140": [
          mk("Lumbar soft tissue unloading", ["pain modulation"], ["High", "Moderate"], ["Initial / Early"], ["Pain Modulation"]),
          mk("Quadratus lumborum soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Mobility"]),
          mk("Lumbar paraspinal soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]),
          mk("Hip posterior capsule mobilization", ["hip mobility"], ["Moderate", "Low"], allVisitStages, ["Mobility", "Functional Retraining"]),
          mk("Thoracolumbar mobility technique", ["mobility"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Low-grade lumbar mobilization", ["pain modulation"], ["High"], ["Initial / Early"], ["Pain Modulation"]),
          mk("Manual facilitation of hip hinge", ["motor control"], ["Moderate"], ["Mid Phase"], ["Motor Control", "Functional Retraining"]),
        ],
        "97530": [
          mk("Hip hinge retraining", ["hip hinge", "lifting"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
          mk("Functional lifting retraining", ["lifting"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining", "Strength / Loading"]),
          mk("Sit-to-stand retraining", ["functional"], ["High", "Moderate"], allVisitStages, ["Functional Retraining"]),
          mk("Carry mechanics retraining", ["carrying"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Strength / Loading"]),
          mk("Squat mechanics retraining", ["squat"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining", "Strength / Loading"]),
          mk("Floor transfer training", ["floor transfer"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining"]),
          mk("Symptom-guided loading strategy", ["education", "symptom"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
        ],
        "97110": [
          mk("Dead bug progression", ["core", "motor control"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Motor Control"]),
          mk("Posterior chain activation", ["posterior chain"], ["Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
          mk("Bridge progression", ["glute", "strength"], ["High", "Moderate", "Low"], allVisitStages, ["Strength / Loading"]),
          mk("Bird dog stabilization", ["stabilization"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Motor Control"]),
          mk("Anti-rotation Pallof press", ["anti-rotation"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Strength / Loading"]),
          mk("Side plank progression", ["lateral trunk"], ["Low"], ["Late Phase", "Return to Activity"], ["Strength / Loading"]),
          mk("Breathing with rib-pelvis stacking", ["breathing"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Motor Control"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain rib-pelvis control", ["lumbar"]), mk("Reduce lumbar extension compensation", ["lumbar"]), mk("Facilitate posterior chain loading", ["posterior chain"])],
      compensation: [...compBase, mk("Lumbar extension compensation", ["lumbar"]), mk("Rib flare", ["lumbar"]), mk("Trunk shift", ["lumbar"])],
      response: [...responseBase, mk("Improved lumbopelvic control", ["lumbar"]), mk("Improved hip hinge strategy", ["function"])],
    },
  },
  Shoulder: {
    "Scapular Control Deficit": {
      goals: ["Overhead reaching", "Lifting", "Pushing", "Carrying", "Dressing tolerance", "Gym activity", "Push-up preparation"],
      interventions: {
        "97140": [
          mk("Posterior shoulder soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Mobility"]),
          mk("Pectoralis minor soft tissue mobilization", ["soft tissue", "posture"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Thoracic extension mobilization", ["thoracic"], ["Moderate", "Low"], allVisitStages, ["Mobility"]),
          mk("Glenohumeral posterior glide", ["joint mobility"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Glenohumeral inferior glide", ["joint mobility"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Scapular mobility facilitation", ["scapular"], ["High", "Moderate"], allVisitStages, ["Motor Control", "Mobility"]),
        ],
        "97530": [
          mk("Functional reaching retraining", ["reaching"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Overhead task modification", ["overhead"], ["High", "Moderate"], allVisitStages, ["Functional Retraining"]),
          mk("Closed-chain shoulder loading task", ["closed chain"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Strength / Loading"]),
          mk("Push/pull mechanics retraining", ["push pull"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining"]),
          mk("Shelf reach retraining", ["reach"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Return-to-gym shoulder strategy", ["gym"], ["Low"], ["Late Phase", "Return to Activity"], ["Return to Run / Sport"]),
        ],
        "97110": [
          mk("Serratus wall slide", ["serratus"], ["Moderate", "Low"], allVisitStages, ["Motor Control"]),
          mk("Scaption with scapular control", ["scapular"], ["Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
          mk("Rotator cuff external rotation strengthening", ["rotator cuff"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"]),
          mk("Prone Y scapular strengthening", ["lower trap"], ["Low"], ["Late Phase", "Return to Activity"], ["Strength / Loading"]),
          mk("Push-up plus", ["serratus", "closed chain"], ["Low"], ["Late Phase", "Return to Activity"], ["Strength / Loading"]),
          mk("Rhythmic stabilization", ["stability"], ["Moderate", "Low"], allVisitStages, ["Motor Control"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain scapular upward rotation", ["shoulder"]), mk("Reduce upper trapezius dominance", ["shoulder"]), mk("Avoid rib flare during elevation", ["shoulder"])],
      compensation: [...compBase, mk("Upper trapezius dominance", ["shoulder"]), mk("Scapular winging", ["shoulder"]), mk("Anterior humeral glide", ["shoulder"])],
      response: [...responseBase, mk("Improved scapular mechanics during elevation", ["shoulder"]), mk("Improved arm elevation quality", ["shoulder"])],
    },
  },
  Hip: {
    "Single-Limb Control Deficit": {
      goals: ["Walking tolerance", "Squat", "Stair negotiation", "Running preparation", "Single-limb stance", "Return to sport preparation"],
      interventions: {
        "97140": [
          mk("Hip posterior capsule mobilization", ["mobility"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Hip flexor soft tissue mobilization", ["soft tissue"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Gluteal soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]),
          mk("Adductor soft tissue mobilization", ["soft tissue"], ["Moderate"], allVisitStages, ["Mobility"]),
        ],
        "97530": [
          mk("Single-limb loading task", ["single limb"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining", "Strength / Loading"]),
          mk("Step-up with hip control", ["step"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Step-down with hip control", ["step"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Hip hinge retraining", ["hip hinge"], ["High", "Moderate"], allVisitStages, ["Motor Control"]),
          mk("Running preparation drill", ["running"], ["Low"], ["Late Phase", "Return to Activity"], ["Return to Run / Sport"]),
        ],
        "97110": [
          mk("Glute max activation", ["glute"], ["High", "Moderate"], allVisitStages, ["Motor Control"]),
          mk("Glute med activation", ["glute"], ["High", "Moderate"], allVisitStages, ["Motor Control"]),
          mk("Side-lying hip abduction", ["glute med"], ["Moderate"], allVisitStages, ["Strength / Loading"]),
          mk("Bridge progression", ["glute"], ["High", "Moderate", "Low"], allVisitStages, ["Strength / Loading"]),
          mk("Supported single-leg RDL", ["single limb"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Strength / Loading"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain pelvis level", ["hip"]), mk("Reduce hip drop", ["hip"]), mk("Facilitate hip-dominant loading", ["hip"])],
      compensation: [...compBase, mk("Hip drop", ["hip"]), mk("Trunk lean", ["hip"]), mk("Dynamic valgus", ["hip"])],
      response: [...responseBase, mk("Improved pelvic control during single-limb loading", ["hip"]), mk("Improved hip-dominant strategy", ["hip"])],
    },
  },
  Knee: {
    "PFPS Load Intolerance": {
      goals: ["Stair negotiation", "Squat tolerance", "Running preparation", "Single-limb loading", "Kneeling tolerance", "Jump/landing preparation"],
      interventions: {
        "97140": [
          mk("Patellar superior/inferior mobilization", ["patellar"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Mobility"]),
          mk("Distal quadriceps soft tissue mobilization", ["quad"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]),
          mk("Lateral thigh soft tissue mobilization", ["soft tissue"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Posterior knee soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]),
        ],
        "97530": [
          mk("Step-down retraining", ["step down"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Step-up retraining", ["step up"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Stair negotiation retraining", ["stairs"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Functional squat retraining", ["squat"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Running preparation drill", ["running"], ["Low"], ["Late Phase", "Return to Activity"], ["Return to Run / Sport"]),
        ],
        "97110": [
          mk("Quad set without extensor lag", ["quad"], ["High", "Moderate"], ["Initial / Early"], ["Motor Control"]),
          mk("Hip dominant squat drill", ["hip dominant"], ["Moderate", "Low"], allVisitStages, ["Motor Control"]),
          mk("Posterior chain activation", ["posterior chain"], ["Moderate", "Low"], allVisitStages, ["Motor Control"]),
          mk("Lateral hip stabilization", ["hip"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"]),
          mk("Single-leg eccentric control", ["eccentric"], ["Low"], ["Late Phase", "Return to Activity"], ["Strength / Loading"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain neutral knee alignment", ["knee"]), mk("Reduce anterior knee translation", ["knee"]), mk("Improve hip-dominant loading", ["knee"])],
      compensation: [...compBase, mk("Dynamic valgus", ["knee"]), mk("Quad-dominant strategy", ["knee"]), mk("Hip drop", ["knee"])],
      response: [...responseBase, mk("Improved loading symmetry", ["knee"]), mk("Reduced anterior knee stress", ["knee"])],
    },
  },
  "Ankle/Foot": {
    "Instability / Load Control Deficit": {
      goals: ["Walking", "Running preparation", "Balance", "Stair negotiation", "Uneven surface walking", "Push-off tolerance"],
      interventions: {
        "97140": [
          mk("Ankle dorsiflexion mobilization", ["dorsiflexion"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Talocrural posterior glide", ["joint mobility"], ["Moderate"], allVisitStages, ["Mobility"]),
          mk("Calf soft tissue mobilization", ["calf"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]),
          mk("First MTP mobilization", ["hallux"], ["Moderate"], allVisitStages, ["Mobility"]),
        ],
        "97530": [
          mk("Gait retraining", ["gait"], ["High", "Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Step-down ankle control", ["step"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Single-leg balance reach task", ["balance"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"]),
          mk("Return-to-run preparation drill", ["running"], ["Low"], ["Late Phase", "Return to Activity"], ["Return to Run / Sport"]),
        ],
        "97110": [
          mk("Tripod foot activation", ["foot intrinsic"], ["High", "Moderate"], allVisitStages, ["Motor Control"]),
          mk("Short foot exercise", ["intrinsic"], ["High", "Moderate"], allVisitStages, ["Motor Control"]),
          mk("Heel raise progression", ["calf"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"]),
          mk("Peroneal strengthening", ["ankle stability"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain tripod foot contact", ["ankle"]), mk("Reduce medial arch collapse", ["ankle"]), mk("Avoid toe gripping", ["ankle"])],
      compensation: [...compBase, mk("Medial arch collapse", ["ankle"]), mk("Toe gripping", ["ankle"]), mk("Early heel rise", ["ankle"])],
      response: [...responseBase, mk("Improved foot-ankle stability", ["ankle"]), mk("Improved push-off mechanics", ["ankle"])],
    },
  },
  Elbow: {
    "Tendon Load Intolerance": {
      goals: ["Gripping", "Lifting", "Carrying", "Typing tolerance", "Tool use tolerance", "Gym upper-body training"],
      interventions: {
        "97140": [mk("Wrist extensor soft tissue mobilization", ["tendon"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]), mk("Forearm myofascial release", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"])],
        "97530": [mk("Grip task modification training", ["grip"], ["High", "Moderate"], allVisitStages, ["Functional Retraining"]), mk("Lifting mechanics with neutral wrist", ["lifting"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"])],
        "97110": [mk("Eccentric wrist extension", ["eccentric"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"]), mk("Grip endurance drill", ["endurance"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"])],
      },
      cueing: [...cueBase, mk("Maintain neutral wrist during grip", ["elbow"]), mk("Reduce excessive gripping", ["elbow"])],
      compensation: [...compBase, mk("Excessive gripping", ["elbow"]), mk("Wrist extension collapse", ["elbow"])],
      response: [...responseBase, mk("Improved gripping tolerance", ["elbow"]), mk("Reduced elbow symptom provocation", ["elbow"])],
    },
  },
  Wrist: {
    "Wrist / Hand Load Control Deficit": {
      goals: ["Typing", "Writing", "Driving", "Weight-bearing tolerance", "Gripping tolerance", "Fine motor control"],
      interventions: {
        "97140": [mk("Wrist flexor soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]), mk("Carpal mobility technique", ["mobility"], ["Moderate"], allVisitStages, ["Mobility"])],
        "97530": [mk("Typing tolerance retraining", ["typing"], ["High", "Moderate"], allVisitStages, ["Functional Retraining"]), mk("Closed-chain wrist loading task", ["weight bearing"], ["Moderate", "Low"], allVisitStages, ["Functional Retraining"])],
        "97110": [mk("Wrist extension strengthening", ["strength"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"]), mk("Grip endurance drill", ["grip"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading"])],
      },
      cueing: [...cueBase, mk("Maintain neutral wrist alignment", ["wrist"]), mk("Reduce finger over-gripping", ["wrist"])],
      compensation: [...compBase, mk("Finger over-gripping", ["wrist"]), mk("Wrist extension collapse", ["wrist"])],
      response: [...responseBase, mk("Improved wrist loading tolerance", ["wrist"]), mk("Improved grip control", ["wrist"])],
    },
  },
  TMJ: {
    "Jaw Guarding / Cervical Contribution": {
      goals: ["Jaw opening tolerance", "Chewing tolerance", "Speaking tolerance", "Reduced clenching behavior", "Yawning tolerance"],
      interventions: {
        "97140": [mk("Masseter soft tissue mobilization", ["TMJ"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"]), mk("Suboccipital release", ["cervical"], ["High", "Moderate"], allVisitStages, ["Pain Modulation"])],
        "97530": [mk("Jaw opening control retraining", ["jaw control"], ["High", "Moderate"], allVisitStages, ["Motor Control"]), mk("Clenching awareness training", ["education"], ["High", "Moderate"], allVisitStages, ["Functional Retraining"])],
        "97110": [mk("Controlled jaw opening exercise", ["jaw control"], ["High", "Moderate"], allVisitStages, ["Motor Control"]), mk("Tongue-to-palate resting drill", ["jaw resting"], ["High", "Moderate"], allVisitStages, ["Motor Control"])],
      },
      cueing: [...cueBase, mk("Keep tongue resting gently on palate", ["TMJ"]), mk("Reduce clenching strategy", ["TMJ"]), mk("Avoid forced jaw opening", ["TMJ"])],
      compensation: [...compBase, mk("Jaw clenching", ["TMJ"]), mk("Mandibular deviation", ["TMJ"]), mk("Cervical guarding", ["TMJ"])],
      response: [...responseBase, mk("Improved jaw opening control", ["TMJ"]), mk("Reduced jaw guarding", ["TMJ"])],
    },
  },
};

const patternAliases: Record<string, string[]> = {
  Cervical: ["Postural Load Intolerance", "Mobility Deficit", "Headache / Cervicogenic Pattern", "Thoracic Contribution Deficit"],
  Lumbar: ["Lumbopelvic Motor Control Deficit", "Flexion Sensitivity", "Extension Sensitivity", "Hip Hinge / Load Transfer Deficit", "Radicular / Neural Sensitivity Pattern"],
  Shoulder: ["Rotator Cuff Load Intolerance", "Overhead Mobility Deficit", "Shoulder Impingement Pattern", "Post-op Shoulder Progression"],
  Hip: ["Hip Mobility Deficit", "Posterior Chain Deficit", "Lateral Hip Pain / Gluteal Tendinopathy Pattern"],
  Knee: ["Dynamic Valgus / Frontal Plane Control Deficit", "Patellar Tendon Load Intolerance", "Meniscus / Joint Line Irritability Pattern", "Post-op Knee Progression"],
  "Ankle/Foot": ["Dorsiflexion Mobility Deficit", "Calf / Achilles Load Intolerance", "Foot Intrinsic Control Deficit", "Plantar Fascia Load Intolerance"],
  Elbow: ["Lateral Epicondylalgia Pattern", "Medial Epicondylalgia Pattern", "Grip Load Intolerance"],
  Wrist: ["Wrist Weight-Bearing Intolerance", "Grip / Pinch Control Deficit", "Median Nerve Sensitivity Pattern"],
  TMJ: ["Jaw Mobility Deficit", "Jaw Motor Control Deficit", "Clenching / Parafunctional Habit Pattern", "TMJ-Cervical Postural Contribution"],
};

for (const region of Object.keys(patternAliases)) {
  const firstPattern = Object.keys(data[region])[0];
  for (const alias of patternAliases[region]) {
    data[region][alias] = data[region][firstPattern];
  }
}

const clinicPresets: Preset[] = [
  {
    id: "clinic-cervical-motor-basic",
    name: "Cervical Motor Control Basic",
    region: "Cervical",
    pattern: "Motor Control Deficit",
    goal: "Desk tolerance",
    irritability: "Moderate",
    visitStage: "Mid Phase",
    sessionFocus: "Motor Control",
    selectedInterventions: ["Suboccipital release", "Thoracic extension mobilization", "Desk posture retraining", "Deep cervical flexor activation", "Serratus wall slide"],
    selectedCueing: ["Maintain neutral cervical alignment", "Reduce upper trapezius dominance", "Initiate movement from thoracic spine"],
    selectedCompensation: ["Upper trapezius dominance", "Forward head substitution", "Thoracic collapse"],
    selectedResponse: ["Improved cervical control with reduced compensation", "Improved postural tolerance"],
    noteLength: "Standard",
    favorite: true,
    source: "Clinic Default",
    clinicApproved: true,
    category: "Clinic Default",
  },
  {
    id: "clinic-lumbar-load-basic",
    name: "Lumbar Load Intolerance Basic",
    region: "Lumbar",
    pattern: "Load Intolerance",
    goal: "Lifting",
    irritability: "Moderate",
    visitStage: "Mid Phase",
    sessionFocus: "Functional Retraining",
    selectedInterventions: ["Lumbar soft tissue unloading", "Hip hinge retraining", "Functional lifting retraining", "Dead bug progression", "Posterior chain activation"],
    selectedCueing: ["Maintain rib-pelvis control", "Reduce lumbar extension compensation", "Facilitate posterior chain loading"],
    selectedCompensation: ["Lumbar extension compensation", "Rib flare", "Guarded transitional movement"],
    selectedResponse: ["Improved lumbopelvic control", "Improved hip hinge strategy"],
    noteLength: "Standard",
    favorite: true,
    source: "Clinic Default",
    clinicApproved: true,
    category: "Clinic Default",
  },
  {
    id: "clinic-knee-pfps-basic",
    name: "Knee PFPS Dynamic Valgus Basic",
    region: "Knee",
    pattern: "PFPS Load Intolerance",
    goal: "Stair negotiation",
    irritability: "Moderate",
    visitStage: "Mid Phase",
    sessionFocus: "Functional Retraining",
    selectedInterventions: ["Patellar superior/inferior mobilization", "Step-down retraining", "Hip dominant squat drill", "Lateral hip stabilization"],
    selectedCueing: ["Maintain neutral knee alignment", "Reduce anterior knee translation", "Improve hip-dominant loading"],
    selectedCompensation: ["Dynamic valgus", "Quad-dominant strategy", "Hip drop"],
    selectedResponse: ["Improved loading symmetry", "Reduced anterior knee stress"],
    noteLength: "Standard",
    favorite: true,
    source: "Clinic Default",
    clinicApproved: true,
    category: "Clinic Default",
  },
];

export default function Home() {
  const [region, setRegion] = useState("Cervical");
  const [pattern, setPattern] = useState("Motor Control Deficit");
  const [goal, setGoal] = useState("Desk tolerance");
  const [irritability, setIrritability] = useState("Moderate");
  const [visitStage, setVisitStage] = useState<VisitStage>("Mid Phase");
  const [sessionFocus, setSessionFocus] = useState<SessionFocus>("Motor Control");
  const [noteLength, setNoteLength] = useState("Standard");

  const [selectedInterventions, setSelectedInterventions] = useState<string[]>([]);
  const [selectedCueing, setSelectedCueing] = useState<string[]>([]);
  const [selectedCompensation, setSelectedCompensation] = useState<string[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [myPresets, setMyPresets] = useState<Preset[]>([]);
  const [customType, setCustomType] = useState<LibraryType>("intervention");
  const [customCpt, setCustomCpt] = useState<CptCode>("97110");
  const [customText, setCustomText] = useState("");
  const [customTags, setCustomTags] = useState("");
  const [search, setSearch] = useState("");
  const [presetName, setPresetName] = useState("");
  const [importText, setImportText] = useState("");

  const current = data[region][pattern];
  const patterns = Object.keys(data[region]);

  useEffect(() => {
    const savedCustom = window.localStorage.getItem(CUSTOM_LIBRARY_KEY);
    const savedPresets = window.localStorage.getItem(PRESET_KEY);

    if (savedCustom) {
      try { setCustomItems(JSON.parse(savedCustom)); } catch { setCustomItems([]); }
    }

    if (savedPresets) {
      try { setMyPresets(JSON.parse(savedPresets)); } catch { setMyPresets([]); }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CUSTOM_LIBRARY_KEY, JSON.stringify(customItems));
  }, [customItems]);

  useEffect(() => {
    window.localStorage.setItem(PRESET_KEY, JSON.stringify(myPresets));
  }, [myPresets]);

  function resetSelections() {
    setSelectedInterventions([]);
    setSelectedCueing([]);
    setSelectedCompensation([]);
    setSelectedResponse([]);
    setComment("");
  }

  function resetRegion(newRegion: string) {
    const firstPattern = Object.keys(data[newRegion])[0];
    setRegion(newRegion);
    setPattern(firstPattern);
    setGoal(data[newRegion][firstPattern].goals[0]);
    resetSelections();
  }

  function resetPattern(newPattern: string) {
    setPattern(newPattern);
    setGoal(data[region][newPattern].goals[0]);
    resetSelections();
  }

  function toggle(value: string, selected: string[], setter: (v: string[]) => void) {
    setter(selected.includes(value) ? selected.filter((x) => x !== value) : [...selected, value]);
  }

  function scoreItem(item: TreatmentItem) {
    let score = 0;
    if (item.irritability.includes(irritability)) score += 3;
    if (item.stage.includes(visitStage)) score += 3;
    if (item.focus.includes(sessionFocus)) score += 4;
    if (item.text.toLowerCase().includes(search.toLowerCase())) score += search ? 2 : 0;
    return score;
  }

  function recommendedText(list: TreatmentItem[], limit: number) {
    return [...list]
      .map((item) => ({ ...item, score: scoreItem(item) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.text);
  }

  function autoRecommend() {
    const recInterventions = [
      ...recommendedText(current.interventions["97140"], 2),
      ...recommendedText(current.interventions["97530"], 2),
      ...recommendedText(current.interventions["97110"], 3),
    ];
    setSelectedInterventions(recInterventions);
    setSelectedCueing(recommendedText(current.cueing, 3));
    setSelectedCompensation(recommendedText(current.compensation, 3));
    setSelectedResponse(recommendedText(current.response, 2));
    setComment("");
  }

  function addCustomItem() {
    const text = customText.trim();
    if (!text) {
      alert("Enter your custom wording.");
      return;
    }

    const item: CustomItem = {
      id: `custom-${Date.now()}`,
      type: customType,
      region,
      pattern,
      cpt: customType === "intervention" ? customCpt : undefined,
      text,
      tags: customTags.split(",").map((x) => x.trim()).filter(Boolean),
    };

    setCustomItems((prev) => [...prev, item]);
    setCustomText("");
    setCustomTags("");
  }

  function deleteCustomItem(id: string, text: string) {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedInterventions((prev) => prev.filter((x) => x !== text));
    setSelectedCueing((prev) => prev.filter((x) => x !== text));
    setSelectedCompensation((prev) => prev.filter((x) => x !== text));
    setSelectedResponse((prev) => prev.filter((x) => x !== text));
  }

  function getCustom(type: LibraryType, cpt?: CptCode) {
    return customItems.filter((item) => {
      if (item.region !== region || item.pattern !== pattern || item.type !== type) return false;
      if (type === "intervention") return item.cpt === cpt;
      return true;
    });
  }

  function makeItems(list: TreatmentItem[], customList: CustomItem[] = []): SelectableItem[] {
    const filtered = list.filter((item) => !search.trim() || item.text.toLowerCase().includes(search.toLowerCase()));
    const normalItems = filtered
      .map((item) => ({
        id: item.text,
        text: item.text,
        custom: false,
        recommended: scoreItem(item) >= 6,
        score: scoreItem(item),
      }))
      .sort((a, b) => b.score - a.score);

    const customMapped = customList.map((item) => ({
      id: item.id,
      text: item.text,
      custom: true,
      recommended: false,
      score: 0,
    }));

    return [...normalItems, ...customMapped];
  }

  function loadPreset(preset: Preset) {
    setRegion(preset.region);
    setPattern(preset.pattern);
    setGoal(preset.goal);
    setIrritability(preset.irritability);
    setVisitStage(preset.visitStage);
    setSessionFocus(preset.sessionFocus);
    setNoteLength(preset.noteLength);
    setSelectedInterventions(preset.selectedInterventions);
    setSelectedCueing(preset.selectedCueing);
    setSelectedCompensation(preset.selectedCompensation);
    setSelectedResponse(preset.selectedResponse);
    setComment("");
  }

  function saveCurrentPreset() {
    const cleanName = presetName.trim();
    if (!cleanName) {
      alert("Enter a preset name.");
      return;
    }

    const newPreset: Preset = {
      id: `preset-${Date.now()}`,
      name: cleanName,
      region,
      pattern,
      goal,
      irritability,
      visitStage,
      sessionFocus,
      selectedInterventions,
      selectedCueing,
      selectedCompensation,
      selectedResponse,
      noteLength,
      favorite: false,
      source: "My Preset",
      clinicApproved: false,
      category: "Personal",
    };

    setMyPresets((prev) => [...prev, newPreset]);
    setPresetName("");
  }

  function deletePreset(id: string) {
    setMyPresets((prev) => prev.filter((preset) => preset.id !== id));
  }

  function toggleFavorite(id: string) {
    setMyPresets((prev) =>
      prev.map((preset) => preset.id === id ? { ...preset, favorite: !preset.favorite } : preset)
    );
  }

  async function exportMyPresets() {
    const payload = {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      presets: myPresets,
    };
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    alert("My Presets JSON copied to clipboard.");
  }

  function importPresets() {
    try {
      const parsed = JSON.parse(importText);
      const incoming = Array.isArray(parsed) ? parsed : parsed.presets;

      if (!Array.isArray(incoming)) {
        alert("Import failed. Paste exported preset JSON.");
        return;
      }

      const cleaned: Preset[] = incoming.map((preset: Preset) => ({
        ...preset,
        id: `imported-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        source: "My Preset",
        clinicApproved: false,
        category: preset.category || "Imported",
      }));

      setMyPresets((prev) => [...prev, ...cleaned]);
      setImportText("");
      alert("Presets imported.");
    } catch {
      alert("Invalid JSON.");
    }
  }

  const allPresets = [...clinicPresets, ...myPresets];
  const visiblePresets = allPresets.filter(
    (preset) => preset.region === region && preset.pattern === pattern && (!search.trim() || preset.name.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedInterventionText = selectedInterventions.length > 0 ? selectedInterventions.join(", ") : "selected skilled interventions";
  const selectedCueingText = selectedCueing.length > 0 ? selectedCueing.join("; ") : "skilled verbal and tactile cueing";
  const selectedCompensationText = selectedCompensation.length > 0 ? selectedCompensation.join(", ") : "compensatory movement patterns";
  const selectedResponseText = selectedResponse.length > 0 ? selectedResponse.join("; ") : "improved movement quality with reduced compensation";

  const autoComment = useMemo(() => {
    if (noteLength === "Short") {
      return `Patient demonstrates ${pattern.toLowerCase()} affecting ${goal.toLowerCase()}. Treatment included ${selectedInterventionText}. Skilled cueing addressed ${selectedCueingText}. Response: ${selectedResponseText}. Continued skilled PT is indicated to improve functional carryover.`;
    }

    if (noteLength === "Detailed") {
      return `Patient demonstrates ${pattern.toLowerCase()} contributing to reduced tolerance for ${goal.toLowerCase()}. Treatment focused on ${selectedInterventionText} to improve movement quality, functional load tolerance, and task-specific control. Skilled cueing included: ${selectedCueingText}. Therapist monitored ${selectedCompensationText} during task performance and modified loading based on symptom behavior and movement quality. Reassessment demonstrated: ${selectedResponseText}. Continued skilled PT remains medically necessary due to persistent movement impairment, need for skilled cueing, and limited independent carryover during higher-demand functional activity.`;
    }

    return `Patient demonstrates ${pattern.toLowerCase()} contributing to reduced tolerance for ${goal.toLowerCase()}. Treatment focused on ${selectedInterventionText} to improve movement quality and reduce compensatory loading patterns. Skilled cueing included: ${selectedCueingText}. Therapist monitored ${selectedCompensationText} during task performance. Reassessment demonstrated: ${selectedResponseText}. Continued skilled PT remains medically necessary to safely progress functional loading tolerance and improve carryover to patient-specific activity.`;
  }, [pattern, goal, selectedInterventionText, selectedCueingText, selectedCompensationText, selectedResponseText, noteLength]);

  function generateComment() {
    setComment(autoComment);
  }

  async function copyComment() {
    await navigator.clipboard.writeText(comment || autoComment);
    alert("Comment copied.");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-slate-800">PT Clinical Operating System</h1>
          <p className="mt-2 text-slate-600">
            Smart recommendation + one-click preset + manual selection + therapist custom library
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <aside className="space-y-4 rounded-3xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold text-slate-800">Clinical Logic Filter</h2>

            <label className="block text-sm font-semibold">Region</label>
            <select className="w-full rounded-xl border p-3" value={region} onChange={(e) => resetRegion(e.target.value)}>
              {Object.keys(data).map((r) => <option key={r}>{r}</option>)}
            </select>

            <label className="block text-sm font-semibold">Clinical Pattern</label>
            <select className="w-full rounded-xl border p-3" value={pattern} onChange={(e) => resetPattern(e.target.value)}>
              {patterns.map((p) => <option key={p}>{p}</option>)}
            </select>

            <label className="block text-sm font-semibold">Functional Goal</label>
            <select className="w-full rounded-xl border p-3" value={goal} onChange={(e) => setGoal(e.target.value)}>
              {current.goals.map((g) => <option key={g}>{g}</option>)}
            </select>

            <label className="block text-sm font-semibold">Irritability</label>
            <select className="w-full rounded-xl border p-3" value={irritability} onChange={(e) => setIrritability(e.target.value)}>
              <option>High</option>
              <option>Moderate</option>
              <option>Low</option>
            </select>

            <label className="block text-sm font-semibold">Visit Stage</label>
            <select className="w-full rounded-xl border p-3" value={visitStage} onChange={(e) => setVisitStage(e.target.value as VisitStage)}>
              {allVisitStages.map((stage) => <option key={stage}>{stage}</option>)}
            </select>

            <label className="block text-sm font-semibold">Session Focus</label>
            <select className="w-full rounded-xl border p-3" value={sessionFocus} onChange={(e) => setSessionFocus(e.target.value as SessionFocus)}>
              {allSessionFocus.map((focus) => <option key={focus}>{focus}</option>)}
            </select>

            <label className="block text-sm font-semibold">Comment Length</label>
            <select className="w-full rounded-xl border p-3" value={noteLength} onChange={(e) => setNoteLength(e.target.value)}>
              <option>Short</option>
              <option>Standard</option>
              <option>Detailed</option>
            </select>

            <input className="w-full rounded-xl border p-3" placeholder="Search presets/lists..." value={search} onChange={(e) => setSearch(e.target.value)} />

            <button onClick={autoRecommend} className="w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white">
              Auto Recommend
            </button>

            <button onClick={resetSelections} className="w-full rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold">
              Clear Current Selections
            </button>

            <Summary title="Selected Interventions" items={selectedInterventions} />
            <Summary title="Selected Cueing" items={selectedCueing} />
            <Summary title="Selected Compensation" items={selectedCompensation} />
            <Summary title="Selected Response" items={selectedResponse} />
          </aside>

          <section className="space-y-6 lg:col-span-3">
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Quick Presets</h2>
                <div className="flex flex-wrap gap-2">
                  <input value={presetName} onChange={(e) => setPresetName(e.target.value)} placeholder="Preset name" className="rounded-xl border p-2 text-sm" />
                  <button onClick={saveCurrentPreset} className="rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white">
                    Save Current as Preset
                  </button>
                  <button onClick={exportMyPresets} className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white">
                    Export My Presets
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {visiblePresets.map((preset) => (
                  <PresetButton key={preset.id} preset={preset} onLoad={loadPreset} onDelete={deletePreset} onFavorite={toggleFavorite} />
                ))}
              </div>

              {visiblePresets.length === 0 && (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  No presets for this region/pattern yet. Use Auto Recommend or manual selection, then save your own preset.
                </p>
              )}

              <div className="mt-5 rounded-2xl border bg-slate-50 p-4">
                <p className="mb-2 text-sm font-bold text-slate-700">Import Presets JSON</p>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste exported preset JSON here"
                  className="min-h-[90px] w-full rounded-xl border p-3 text-xs"
                />
                <button onClick={importPresets} className="mt-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
                  Import
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-bold">My Custom Library</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                <select value={customType} onChange={(e) => setCustomType(e.target.value as LibraryType)} className="rounded-xl border p-3">
                  <option value="intervention">Intervention</option>
                  <option value="cueing">Cueing</option>
                  <option value="compensation">Compensation</option>
                  <option value="response">Response</option>
                </select>

                <select value={customCpt} onChange={(e) => setCustomCpt(e.target.value as CptCode)} className="rounded-xl border p-3" disabled={customType !== "intervention"}>
                  <option value="97140">97140</option>
                  <option value="97530">97530</option>
                  <option value="97110">97110</option>
                </select>

                <input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Add personal wording" className="rounded-xl border p-3 md:col-span-2" />
                <input value={customTags} onChange={(e) => setCustomTags(e.target.value)} placeholder="Tags, comma separated" className="rounded-xl border p-3" />

                <button onClick={addCustomItem} className="rounded-xl bg-blue-700 px-4 py-2 font-semibold text-white">
                  Add
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-600">Saved only in this browser. No patient information is stored.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(["97140", "97530", "97110"] as CptCode[]).map((code) => (
                <SelectableCard
                  key={code}
                  title={code}
                  items={[
                    ...makeItems(current.interventions[code], getCustom("intervention", code)),
                  ]}
                  selected={selectedInterventions}
                  onToggle={(text) => toggle(text, selectedInterventions, setSelectedInterventions)}
                  onDelete={deleteCustomItem}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <SelectableCard
                title="Cueing"
                items={makeItems(current.cueing, getCustom("cueing"))}
                selected={selectedCueing}
                onToggle={(text) => toggle(text, selectedCueing, setSelectedCueing)}
                onDelete={deleteCustomItem}
              />

              <SelectableCard
                title="Compensation"
                items={makeItems(current.compensation, getCustom("compensation"))}
                selected={selectedCompensation}
                onToggle={(text) => toggle(text, selectedCompensation, setSelectedCompensation)}
                onDelete={deleteCustomItem}
              />

              <SelectableCard
                title="Response"
                items={makeItems(current.response, getCustom("response"))}
                selected={selectedResponse}
                onToggle={(text) => toggle(text, selectedResponse, setSelectedResponse)}
                onDelete={deleteCustomItem}
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-bold">Auto-Generated Audit-Safe Comment</h2>
                <div className="flex gap-2">
                  <button onClick={generateComment} className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
                    Generate
                  </button>
                  <button onClick={copyComment} className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
                    Copy Comment
                  </button>
                </div>
              </div>

              <textarea value={comment || autoComment} onChange={(e) => setComment(e.target.value)} className="min-h-[270px] w-full rounded-2xl border bg-slate-50 p-5 text-sm leading-7" />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function PresetButton({
  preset,
  onLoad,
  onDelete,
  onFavorite,
}: {
  preset: Preset;
  onLoad: (preset: Preset) => void;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <button onClick={() => onLoad(preset)} className="w-full text-left">
        <p className="font-bold text-slate-800">{preset.favorite ? "★ " : ""}{preset.name}</p>
        <p className="mt-1 text-xs text-slate-500">{preset.source} · {preset.goal} · {preset.sessionFocus}</p>
        {preset.clinicApproved && (
          <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
            Clinic Approved
          </span>
        )}
      </button>

      {preset.source === "My Preset" && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => onFavorite(preset.id)} className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
            {preset.favorite ? "Unfavorite" : "Favorite"}
          </button>
          <button onClick={() => onDelete(preset.id)} className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function SelectableCard({
  title,
  items,
  selected,
  onToggle,
  onDelete,
}: {
  title: string;
  items: SelectableItem[];
  selected: string[];
  onToggle: (text: string) => void;
  onDelete: (id: string, text: string) => void;
}) {
  return (
    <div className="max-h-[520px] overflow-y-auto rounded-3xl bg-white p-6 shadow">
      <h3 className="sticky top-0 z-10 mb-4 bg-white pb-2 text-xl font-bold">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const isSelected = selected.includes(item.text);
          return (
            <div key={item.id} className="flex gap-2">
              <button
                onClick={() => onToggle(item.text)}
                className={`w-full rounded-2xl border p-3 text-left text-sm transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-100 font-semibold text-blue-900"
                    : item.recommended
                    ? "border-green-300 bg-green-50 hover:bg-green-100"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {isSelected ? "✓ " : item.recommended ? "★ " : "+ "}
                {item.text}
                {item.custom && <span className="ml-2 rounded-lg bg-purple-100 px-2 py-1 text-xs text-purple-800">My Custom</span>}
                {item.recommended && !isSelected && <span className="ml-2 rounded-lg bg-green-100 px-2 py-1 text-xs text-green-800">Recommended</span>}
              </button>
              {item.custom && (
                <button onClick={() => onDelete(item.id, item.text)} className="rounded-xl border border-red-200 px-3 text-sm font-bold text-red-600 hover:bg-red-50">
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Summary({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-sm">
      <p className="font-bold">{title}</p>
      {items.length === 0 ? (
        <p className="mt-2 text-slate-500">None selected</p>
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}
