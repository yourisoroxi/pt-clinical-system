import type { PatternData, TreatmentItem, SessionFocus, VisitStage } from "@/types/clinical";
import { allSessionFocus, allVisitStages } from "./constants";

export const mk = (
  text: string,
  tags: string[] = [],
  irritability = ["High", "Moderate", "Low"],
  stage: VisitStage[] = allVisitStages,
  focus: SessionFocus[] = allSessionFocus
): TreatmentItem => ({
  text,
  tags,
  irritability,
  stage,
  focus,
  clinicApproved: true,
});

const cueBase: TreatmentItem[] = [
  mk("Maintain neutral alignment", ["alignment"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Reduce compensatory movement", ["compensation"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Use symptom-free range", ["symptom"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Mobility"]),
  mk("Use tactile cueing to improve movement sequencing", ["skilled cueing"], ["High", "Moderate"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Monitor symptom behavior during task", ["symptom monitoring"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
];

const compBase: TreatmentItem[] = [
  mk("Protective guarding", ["guarding"], ["High"], ["Initial / Early"], ["Pain Modulation", "Recovery Session"]),
  mk("Breath holding", ["breathing"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Motor Control"]),
  mk("Poor load acceptance", ["loading"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading", "Functional Retraining"]),
  mk("Reduced proximal stabilization", ["proximal stability"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
  mk("Poor movement sequencing", ["sequencing"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
];

const responseBase: TreatmentItem[] = [
  mk("Improved movement quality with cueing", ["movement quality"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Reduced compensatory loading pattern", ["compensation"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
  mk("Reduced symptom provocation during activity", ["symptom"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
  mk("No increase in symptom irritability", ["symptom stability"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Recovery Session"]),
];

export const clinicalLibrary: Record<string, Record<string, PatternData>> = {
  Cervical: {
    "Motor Control Deficit": {
      goals: ["Desk tolerance", "Driving rotation", "Overhead reaching", "Computer work tolerance", "Phone use tolerance", "Sleeping tolerance", "Military gear tolerance"],
      interventions: {
        "97140": [
          mk("Suboccipital release", ["pain modulation", "soft tissue"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Recovery Session"]),
          mk("Cervicothoracic soft tissue mobilization", ["soft tissue", "mobility"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Mobility"]),
          mk("Thoracic extension mobilization", ["mobility", "thoracic"], ["High", "Moderate", "Low"], allVisitStages, ["Mobility", "Functional Retraining"]),
          mk("Low-grade cervical traction", ["unloading"], ["High"], ["Initial / Early"], ["Pain Modulation", "Recovery Session"]),
        ],
        "97530": [
          mk("Desk posture retraining", ["desk", "function"], ["High", "Moderate", "Low"], allVisitStages, ["Functional Retraining", "Motor Control"]),
          mk("Functional reaching with cervical control", ["reaching", "function"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining", "Strength / Loading"]),
          mk("Forward reach with thoracic initiation", ["thoracic", "reach"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
          mk("HEP carryover strategy training", ["education", "carryover"], ["High", "Moderate", "Low"], allVisitStages, ["Functional Retraining", "Recovery Session"]),
        ],
        "97110": [
          mk("Deep cervical flexor activation", ["motor control", "stabilization"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Motor Control"]),
          mk("Chin nod in supine", ["motor control", "low load"], ["High"], ["Initial / Early"], ["Pain Modulation", "Motor Control"]),
          mk("Cervical isometric stabilization", ["isometric"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Motor Control"]),
          mk("Serratus wall slide", ["serratus", "scapular"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Motor Control", "Strength / Loading"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain neutral cervical alignment"), mk("Reduce upper trapezius dominance"), mk("Initiate movement from thoracic spine")],
      compensation: [...compBase, mk("Upper trapezius dominance"), mk("Forward head substitution"), mk("Thoracic collapse")],
      response: [...responseBase, mk("Improved cervical control with reduced compensation"), mk("Improved postural tolerance")],
    },
  },
  Lumbar: {
    "Load Intolerance": {
      goals: ["Lifting", "Prolonged sitting", "Walking tolerance", "Sit-to-stand", "Bending tolerance", "Carrying tolerance", "Military fitness task"],
      interventions: {
        "97140": [
          mk("Lumbar soft tissue unloading", ["pain modulation"], ["High", "Moderate"], ["Initial / Early"], ["Pain Modulation"]),
          mk("Quadratus lumborum soft tissue mobilization", ["soft tissue"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Mobility"]),
          mk("Hip posterior capsule mobilization", ["hip mobility"], ["Moderate", "Low"], allVisitStages, ["Mobility", "Functional Retraining"]),
        ],
        "97530": [
          mk("Hip hinge retraining", ["hip hinge", "lifting"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
          mk("Functional lifting retraining", ["lifting"], ["Moderate", "Low"], ["Mid Phase", "Late Phase"], ["Functional Retraining", "Strength / Loading"]),
          mk("Symptom-guided loading strategy", ["education", "symptom"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
        ],
        "97110": [
          mk("Dead bug progression", ["core", "motor control"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Motor Control"]),
          mk("Bridge progression", ["glute", "strength"], ["High", "Moderate", "Low"], allVisitStages, ["Strength / Loading"]),
          mk("Breathing with rib-pelvis stacking", ["breathing"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Motor Control"]),
        ],
      },
      cueing: [...cueBase, mk("Maintain rib-pelvis control"), mk("Reduce lumbar extension compensation"), mk("Facilitate posterior chain loading")],
      compensation: [...compBase, mk("Lumbar extension compensation"), mk("Rib flare"), mk("Trunk shift")],
      response: [...responseBase, mk("Improved lumbopelvic control"), mk("Improved hip hinge strategy")],
    },
  },
  Knee: {
    "PFPS Load Intolerance": {
      goals: ["Stair negotiation", "Squat tolerance", "Running preparation", "Single-limb loading", "Kneeling tolerance", "Jump/landing preparation"],
      interventions: {
        "97140": [
          mk("Patellar superior/inferior mobilization"),
          mk("Distal quadriceps soft tissue mobilization"),
          mk("Posterior knee soft tissue mobilization"),
        ],
        "97530": [
          mk("Step-down retraining"),
          mk("Step-up retraining"),
          mk("Stair negotiation retraining"),
          mk("Functional squat retraining"),
          mk("Running preparation drill"),
        ],
        "97110": [
          mk("Quad set without extensor lag"),
          mk("Hip dominant squat drill"),
          mk("Posterior chain activation"),
          mk("Lateral hip stabilization"),
          mk("Single-leg eccentric control"),
        ],
      },
      cueing: [...cueBase, mk("Maintain neutral knee alignment"), mk("Reduce anterior knee translation"), mk("Improve hip-dominant loading")],
      compensation: [...compBase, mk("Dynamic valgus"), mk("Quad-dominant strategy"), mk("Hip drop")],
      response: [...responseBase, mk("Improved loading symmetry"), mk("Reduced anterior knee stress")],
    },
  },
};

const patternAliases: Record<string, string[]> = {
  Cervical: ["Postural Load Intolerance", "Mobility Deficit", "Headache / Cervicogenic Pattern", "Thoracic Contribution Deficit", "Neural Sensitivity"],
  Lumbar: ["Lumbopelvic Motor Control Deficit", "Flexion Sensitivity", "Extension Sensitivity", "Hip Hinge / Load Transfer Deficit", "Radicular / Neural Sensitivity Pattern"],
  Knee: ["Dynamic Valgus / Frontal Plane Control Deficit", "Patellar Tendon Load Intolerance", "Meniscus / Joint Line Irritability Pattern", "Post-op Knee Progression"],
};

for (const region of Object.keys(patternAliases)) {
  const firstPattern = Object.keys(clinicalLibrary[region])[0];
  for (const alias of patternAliases[region]) {
    clinicalLibrary[region][alias] = clinicalLibrary[region][firstPattern];
  }
}
