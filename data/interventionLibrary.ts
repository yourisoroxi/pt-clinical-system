import type { PatternData, TreatmentItem, SessionFocus, VisitStage } from "@/types/clinical";

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
  mk("Use symptom-free range", ["symptom"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Mobility"]),
  mk("Stay below symptom provocation threshold", ["symptom"], ["High"], ["Initial / Early"], ["Pain Modulation", "Recovery Session"]),
  mk("Use tactile cueing to improve movement sequencing", ["skilled cueing"], ["High", "Moderate"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Use visual feedback to improve alignment", ["feedback"], ["Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Monitor symptom behavior during task", ["symptom monitoring"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Functional Retraining"]),
];

const compBase: TreatmentItem[] = [
  mk("Protective guarding", ["guarding"], ["High"], ["Initial / Early"], ["Pain Modulation", "Recovery Session"]),
  mk("Breath holding", ["breathing"], ["High", "Moderate"], allVisitStages, ["Pain Modulation", "Motor Control"]),
  mk("Movement avoidance", ["avoidance"], ["High", "Moderate"], ["Initial / Early", "Mid Phase"], ["Pain Modulation", "Functional Retraining"]),
  mk("Loss of eccentric control", ["eccentric"], ["Moderate", "Low"], ["Mid Phase", "Late Phase", "Return to Activity"], ["Strength / Loading", "Return to Run / Sport"]),
  mk("Poor load acceptance", ["loading"], ["Moderate", "Low"], allVisitStages, ["Strength / Loading", "Functional Retraining"]),
  mk("Limited self-correction", ["carryover"], ["High", "Moderate"], allVisitStages, ["Motor Control", "Functional Retraining"]),
  mk("Reduced proximal stabilization", ["proximal stability"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Strength / Loading"]),
  mk("Poor movement sequencing", ["sequencing"], ["High", "Moderate", "Low"], allVisitStages, ["Motor Control", "Functional Retraining"]),
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
];

function orthoData(region: string, pattern: string, goals: string[], manual: string[], ta: string[], te: string[], cue: string[], comp: string[], resp: string[]): Record<string, PatternData> {
  return {
    [pattern]: {
      goals,
      interventions: {
        "97140": manual.map((x) => mk(x)),
        "97530": ta.map((x) => mk(x)),
        "97110": te.map((x) => mk(x)),
      },
      cueing: [...cueBase, ...cue.map((x) => mk(x))],
      compensation: [...compBase, ...comp.map((x) => mk(x))],
      response: [...responseBase, ...resp.map((x) => mk(x))],
    },
  };
}

export const clinicalLibrary: Record<string, Record<string, PatternData>> = {
  Cervical: orthoData(
    "Cervical",
    "Motor Control Deficit",
    ["Desk tolerance", "Driving rotation", "Overhead reaching", "Computer work tolerance", "Phone use tolerance", "Sleeping tolerance", "Military gear tolerance"],
    ["Suboccipital release", "Cervicothoracic soft tissue mobilization", "Upper trapezius soft tissue mobilization", "Thoracic extension mobilization", "Thoracic rotation mobilization", "Low-grade cervical traction"],
    ["Desk posture retraining", "Workstation movement strategy training", "Functional reaching with cervical control", "Cervical rotation task retraining", "Forward reach with thoracic initiation", "HEP carryover strategy training"],
    ["Deep cervical flexor activation", "Chin nod in supine", "Cervical isometric stabilization", "Serratus wall slide", "Thoracic extension mobility drill", "Reactive cervical stabilization"],
    ["Maintain neutral cervical alignment", "Reduce upper trapezius dominance", "Initiate movement from thoracic spine"],
    ["Upper trapezius dominance", "Forward head substitution", "Thoracic collapse", "Early cervical extension"],
    ["Improved cervical control with reduced compensation", "Reduced neck tension during reaching", "Improved postural tolerance"]
  ),
  Lumbar: orthoData(
    "Lumbar",
    "Load Intolerance",
    ["Lifting", "Prolonged sitting", "Walking tolerance", "Sit-to-stand", "Bending tolerance", "Carrying tolerance", "Military fitness task", "Floor transfer"],
    ["Lumbar soft tissue unloading", "Quadratus lumborum soft tissue mobilization", "Lumbar paraspinal soft tissue mobilization", "Hip posterior capsule mobilization", "Low-grade lumbar mobilization"],
    ["Hip hinge retraining", "Functional lifting retraining", "Sit-to-stand retraining", "Carry mechanics retraining", "Symptom-guided loading strategy"],
    ["Dead bug progression", "Posterior chain activation", "Bridge progression", "Bird dog stabilization", "Breathing with rib-pelvis stacking"],
    ["Maintain rib-pelvis control", "Reduce lumbar extension compensation", "Facilitate posterior chain loading"],
    ["Lumbar extension compensation", "Rib flare", "Trunk shift"],
    ["Improved lumbopelvic control", "Improved hip hinge strategy"]
  ),
  Shoulder: orthoData(
    "Shoulder",
    "Scapular Control Deficit",
    ["Overhead reaching", "Lifting", "Pushing", "Carrying", "Dressing tolerance", "Gym activity", "Push-up preparation"],
    ["Posterior shoulder soft tissue mobilization", "Pectoralis minor soft tissue mobilization", "Thoracic extension mobilization", "Glenohumeral posterior glide", "Scapular mobility facilitation"],
    ["Functional reaching retraining", "Overhead task modification", "Closed-chain shoulder loading task", "Push/pull mechanics retraining", "Return-to-gym shoulder strategy"],
    ["Serratus wall slide", "Scaption with scapular control", "Rotator cuff external rotation strengthening", "Prone Y scapular strengthening", "Rhythmic stabilization"],
    ["Maintain scapular upward rotation", "Reduce upper trapezius dominance", "Avoid rib flare during elevation"],
    ["Upper trapezius dominance", "Scapular winging", "Anterior humeral glide"],
    ["Improved scapular mechanics during elevation", "Improved arm elevation quality"]
  ),
  Hip: orthoData(
    "Hip",
    "Single-Limb Control Deficit",
    ["Walking tolerance", "Squat", "Stair negotiation", "Running preparation", "Single-limb stance", "Return to sport preparation"],
    ["Hip posterior capsule mobilization", "Hip flexor soft tissue mobilization", "Gluteal soft tissue mobilization", "Adductor soft tissue mobilization"],
    ["Single-limb loading task", "Step-up with hip control", "Step-down with hip control", "Hip hinge retraining", "Running preparation drill"],
    ["Glute max activation", "Glute med activation", "Side-lying hip abduction", "Bridge progression", "Supported single-leg RDL"],
    ["Maintain pelvis level", "Reduce hip drop", "Facilitate hip-dominant loading"],
    ["Hip drop", "Trunk lean", "Dynamic valgus"],
    ["Improved pelvic control during single-limb loading", "Improved hip-dominant strategy"]
  ),
  Knee: orthoData(
    "Knee",
    "PFPS Load Intolerance",
    ["Stair negotiation", "Squat tolerance", "Running preparation", "Single-limb loading", "Kneeling tolerance", "Jump/landing preparation"],
    ["Patellar superior/inferior mobilization", "Distal quadriceps soft tissue mobilization", "Lateral thigh soft tissue mobilization", "Posterior knee soft tissue mobilization"],
    ["Step-down retraining", "Step-up retraining", "Stair negotiation retraining", "Functional squat retraining", "Running preparation drill"],
    ["Quad set without extensor lag", "Hip dominant squat drill", "Posterior chain activation", "Lateral hip stabilization", "Single-leg eccentric control"],
    ["Maintain neutral knee alignment", "Reduce anterior knee translation", "Improve hip-dominant loading"],
    ["Dynamic valgus", "Quad-dominant strategy", "Hip drop"],
    ["Improved loading symmetry", "Reduced anterior knee stress"]
  ),
  "Ankle/Foot": orthoData(
    "Ankle/Foot",
    "Instability / Load Control Deficit",
    ["Walking", "Running preparation", "Balance", "Stair negotiation", "Uneven surface walking", "Push-off tolerance"],
    ["Ankle dorsiflexion mobilization", "Talocrural posterior glide", "Calf soft tissue mobilization", "First MTP mobilization"],
    ["Gait retraining", "Step-down ankle control", "Single-leg balance reach task", "Return-to-run preparation drill"],
    ["Tripod foot activation", "Short foot exercise", "Heel raise progression", "Peroneal strengthening"],
    ["Maintain tripod foot contact", "Reduce medial arch collapse", "Avoid toe gripping"],
    ["Medial arch collapse", "Toe gripping", "Early heel rise"],
    ["Improved foot-ankle stability", "Improved push-off mechanics"]
  ),
  Elbow: orthoData(
    "Elbow",
    "Tendon Load Intolerance",
    ["Gripping", "Lifting", "Carrying", "Typing tolerance", "Tool use tolerance", "Gym upper-body training"],
    ["Wrist extensor soft tissue mobilization", "Forearm myofascial release"],
    ["Grip task modification training", "Lifting mechanics with neutral wrist"],
    ["Eccentric wrist extension", "Grip endurance drill"],
    ["Maintain neutral wrist during grip", "Reduce excessive gripping"],
    ["Excessive gripping", "Wrist extension collapse"],
    ["Improved gripping tolerance", "Reduced elbow symptom provocation"]
  ),
  Wrist: orthoData(
    "Wrist",
    "Wrist / Hand Load Control Deficit",
    ["Typing", "Writing", "Driving", "Weight-bearing tolerance", "Gripping tolerance", "Fine motor control"],
    ["Wrist flexor soft tissue mobilization", "Carpal mobility technique"],
    ["Typing tolerance retraining", "Closed-chain wrist loading task"],
    ["Wrist extension strengthening", "Grip endurance drill"],
    ["Maintain neutral wrist alignment", "Reduce finger over-gripping"],
    ["Finger over-gripping", "Wrist extension collapse"],
    ["Improved wrist loading tolerance", "Improved grip control"]
  ),
  TMJ: orthoData(
    "TMJ",
    "Jaw Guarding / Cervical Contribution",
    ["Jaw opening tolerance", "Chewing tolerance", "Speaking tolerance", "Reduced clenching behavior", "Yawning tolerance"],
    ["Masseter soft tissue mobilization", "Suboccipital release"],
    ["Jaw opening control retraining", "Clenching awareness training"],
    ["Controlled jaw opening exercise", "Tongue-to-palate resting drill"],
    ["Keep tongue resting gently on palate", "Reduce clenching strategy", "Avoid forced jaw opening"],
    ["Jaw clenching", "Mandibular deviation", "Cervical guarding"],
    ["Improved jaw opening control", "Reduced jaw guarding"]
  ),
};

const patternAliases: Record<string, string[]> = {
  Cervical: ["Postural Load Intolerance", "Mobility Deficit", "Headache / Cervicogenic Pattern", "Thoracic Contribution Deficit", "Neural Sensitivity"],
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
  const firstPattern = Object.keys(clinicalLibrary[region])[0];
  for (const alias of patternAliases[region]) clinicalLibrary[region][alias] = clinicalLibrary[region][firstPattern];
}

