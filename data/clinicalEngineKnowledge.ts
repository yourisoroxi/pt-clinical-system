import { advancedInterventionBank } from "./advancedInterventionBank";
import type { ClinicalEngineItem, RegionClinicalEngine } from "@/types/engine";

const commonRedFlags: ClinicalEngineItem[] = [
  {
    name: "Progressive neurological deficit",
    whyItMatters: "Progressive weakness, sensory loss, reflex change, or worsening coordination may require medical review.",
    howToUse: ["Compare current neuro status with prior findings.", "Document change in strength, sensation, reflexes, or gait quality.", "Avoid progressing load if neurological status is worsening."],
    treatmentImplication: ["Hold aggressive progression.", "Communicate concern to the appropriate medical provider when indicated."],
    documentationTip: "Document the observed change, patient report, and action taken. Avoid making a medical diagnosis.",
  },
  {
    name: "Systemic or unexplained symptoms",
    whyItMatters: "Fever, unexplained weight loss, night sweats, severe unrelenting night pain, or non-mechanical symptoms may not be appropriate for routine PT progression.",
    howToUse: ["Screen symptom behavior and non-mechanical presentation.", "Clarify whether symptoms change with position, loading, or rest."],
    treatmentImplication: ["Do not force treatment progression.", "Consider referral communication when findings are outside expected MSK behavior."],
  },
];

export const clinicalEngineKnowledge: Record<string, RegionClinicalEngine> = {
  Cervical: {
    intakeQuestions: [
      { name: "Symptom distribution", howToUse: ["Clarify neck-only vs arm symptoms.", "Ask whether symptoms travel below elbow.", "Ask about numbness, tingling, weakness, headache, dizziness."], treatmentImplication: ["Below-elbow symptoms increase need for neuro screen and neurodynamic differentiation."] },
      { name: "Postural load behavior", howToUse: ["Ask sitting, computer, phone, driving, sleep tolerance.", "Identify time-to-symptom threshold and recovery time."], treatmentImplication: ["Match HEP to postural tolerance and irritability."], documentationTip: "Link symptoms to functional tolerance rather than only pain intensity." },
    ],
    orthopedicTests: [
      { name: "Spurling", howToUse: ["Seated position.", "Guide extension, side-bending, and rotation toward involved side as tolerated.", "Apply gentle compression only when appropriate."], positiveFindings: ["Familiar radiating arm symptoms."], clinicalMeaning: ["Supports cervical radicular contribution when clustered with neuro findings."], precautions: ["Avoid aggressive compression in high irritability, dizziness, instability concern, or red-flag presentation."], treatmentImplication: ["Consider unloading, thoracic contribution, DNF control, and symptom-free neural mobility."] },
      { name: "Cervical distraction", howToUse: ["Support occiput.", "Apply gentle axial unloading.", "Monitor neck and arm symptom response."], positiveFindings: ["Reduction of neck or arm symptoms."], clinicalMeaning: ["May suggest unloading-responsive cervical contribution."], treatmentImplication: ["Use unloading strategies and graded reloading." ] },
      { name: "Deep neck flexor endurance", howToUse: ["Use low-load cranio-cervical flexion position.", "Observe substitution by SCM, jaw, breath holding, or cervical extension."], positiveFindings: ["Poor endurance or compensation."], clinicalMeaning: ["Supports motor control and postural load tolerance deficit."], treatmentImplication: ["Progress chin nod, DNF holds, and upright carryover." ] },
    ],
    neuroScreen: [
      { name: "C5", howToUse: ["Dermatome: lateral shoulder.", "Myotome: shoulder abduction.", "Reflex: biceps."], clinicalMeaning: ["Use for cervical radicular pattern differentiation." ] },
      { name: "C6", howToUse: ["Dermatome: thumb/radial forearm.", "Myotome: wrist extension.", "Reflex: brachioradialis."], clinicalMeaning: ["Differentiate from radial nerve contribution when indicated." ] },
      { name: "C7", howToUse: ["Dermatome: middle finger.", "Myotome: triceps/wrist flexion.", "Reflex: triceps."], clinicalMeaning: ["Consider C7 pattern if triceps/reflex/sensory findings align." ] },
      { name: "C8/T1", howToUse: ["C8: ring/small finger, finger flexion.", "T1: medial forearm, finger abduction."], clinicalMeaning: ["Differentiate lower cervical vs ulnar nerve pattern." ] },
    ],
    neurodynamic: [
      { name: "Median nerve bias", howToUse: ["Shoulder abduction, wrist/finger extension, forearm supination, elbow extension as tolerated.", "Use cervical side-bending to differentiate."], precautions: ["Use gliding, not aggressive tensioning, for high irritability."], treatmentImplication: ["Add symptom-free median nerve glide and reduce sustained compression positions." ] },
      { name: "Radial nerve bias", howToUse: ["Shoulder depression/internal rotation, elbow extension, wrist/finger flexion.", "Differentiate with cervical side-bending or wrist release."], treatmentImplication: ["Consider radial nerve glide, scapular control, and grip load modification." ] },
      { name: "Ulnar nerve bias", howToUse: ["Shoulder abduction/external rotation, elbow flexion, wrist extension.", "Differentiate from C8/T1 pattern."], treatmentImplication: ["Avoid prolonged elbow flexion compression and progress symptom-free mobility." ] },
    ],
    movementImpairments: [
      { name: "Upper trapezius dominance", whyItMatters: "Often limits efficient scapular upward rotation and increases cervical load.", howToUse: ["Observe shoulder elevation during reaching or wall slide.", "Monitor cervical tension during task."], treatmentImplication: ["Use serratus/lower trap cueing, thoracic mobility, and reduced load."], documentationTip: "Document compensation and response to cueing." },
      { name: "Forward head substitution", howToUse: ["Observe during desk posture, reaching, or DNF task."], treatmentImplication: ["Use DNF control, thoracic extension, and task-specific postural retraining." ] },
      { name: "Thoracic extension limitation", howToUse: ["Observe reaching and cervical rotation contribution.", "Compare thoracic extension/rotation mobility."], treatmentImplication: ["Add thoracic mobility and reaching retraining." ] },
    ],
    differentials: [
      { name: "Cervical radiculopathy", howToUse: ["Cluster neuro screen, Spurling/distraction/ULTT, symptom distribution."], treatmentImplication: ["Prioritize symptom modulation, neurodynamic glide, cervical/thoracic unloading, and graded exposure." ] },
      { name: "Thoracic outlet contribution", howToUse: ["Consider if symptoms relate to overhead position, load carriage, or sustained shoulder girdle position."], treatmentImplication: ["Address scapular position, breathing, anterior chest mobility, and load management." ] },
      { name: "Peripheral nerve entrapment", howToUse: ["Differentiate symptom location, local compression sensitivity, and neurodynamic response."], treatmentImplication: ["Modify compression positions and dose neural mobility." ] },
    ],
    redFlags: commonRedFlags.concat([
      { name: "Cervical arterial or central signs", whyItMatters: "May indicate non-musculoskeletal or central involvement requiring further medical review.", howToUse: ["Screen for severe dizziness, drop attack, diplopia, dysarthria, dysphagia, ataxia, cranial nerve signs."], treatmentImplication: ["Do not proceed with cervical loading/manipulative techniques. Refer as appropriate."], documentationTip: "Use neutral wording: findings may require further medical review." },
      { name: "Bilateral neurological symptoms", whyItMatters: "May indicate central, spinal cord, or multi-level neurological involvement requiring further review.", howToUse: ["Clarify bilateral UE/LE symptoms, gait change, hand clumsiness, coordination decline."], treatmentImplication: ["Hold routine progression and consider medical communication." ] },
    ]),
    treatmentDirections: [
      { name: "Cervical unloading first", howToUse: ["Use low-irritability manual unloading, supported positioning, and symptom-free ROM."], progressionCriteria: ["Symptoms centralize or remain stable.", "No increase in arm symptoms after session." ] },
      { name: "Thoracic contribution", howToUse: ["Use thoracic extension/rotation mobility and reaching retraining."], treatmentImplication: ["Reduce excessive cervical compensation during functional tasks." ] },
      { name: "Deep neck flexor control", howToUse: ["Begin supine, progress to seated, standing, and task carryover."], progressionCriteria: ["Reduced SCM substitution and improved postural tolerance." ] },
    ],
    progressionLadders: [
      { name: "Cervical motor control ladder", howToUse: ["Supine chin nod", "DNF hold", "Seated postural control", "Standing reach with cervical control", "Loaded carry/desk simulation"], regressionCriteria: ["Arm symptoms increase", "Headache worsens", "Substitution increases"], progressionCriteria: ["Stable symptoms", "Less cueing", "Improved tolerance time" ] },
    ],
    outcomeMeasures: [
      { name: "NDI", whyItMatters: "Common patient-reported neck disability measure.", howToUse: ["Use for baseline and progress comparison."] },
      { name: "PSFS", whyItMatters: "Patient-specific functional measure useful for desk, driving, sleep, lifting goals." },
      { name: "Cervical rotation ROM", whyItMatters: "Useful for driving and scanning tolerance." },
    ],
    returnToFunction: [
      { name: "Desk worker pathway", howToUse: ["Supported posture", "Microbreak plan", "Thoracic mobility", "DNF/scapular endurance", "Workstation simulation" ] },
      { name: "Military load carriage pathway", howToUse: ["Postural endurance", "Scapular control", "Gradual vest/load exposure", "Carry tolerance monitoring" ] },
    ],
    hepCategories: [
      { name: "Deep neck flexor", howToUse: ["Chin nod", "DNF hold", "Seated control"], progressionCriteria: ["No SCM dominance", "No headache increase" ] },
      { name: "Thoracic mobility", howToUse: ["Thoracic extension", "Open book", "Reach rotation" ] },
      { name: "Neural mobility", precautions: ["Avoid aggressive tensioning."], howToUse: ["Median/radial/ulnar glide within symptom-free range." ] },
    ],
  },
  Shoulder: {
    intakeQuestions: [
      { name: "Overhead and load behavior", howToUse: ["Ask overhead reach, dressing, pushing, pulling, gym, sleep side."], treatmentImplication: ["Select scapular, cuff, mobility, or load-capacity pathway." ] },
    ],
    orthopedicTests: [
      { name: "Hawkins-Kennedy", howToUse: ["Flex shoulder and elbow to 90 degrees.", "Internally rotate shoulder gently."], positiveFindings: ["Familiar anterior/lateral shoulder symptoms."], clinicalMeaning: ["May support subacromial pain pattern in context." ] },
      { name: "ER lag", howToUse: ["Position shoulder in ER, ask patient to hold position."], positiveFindings: ["Unable to maintain ER position."], clinicalMeaning: ["May suggest rotator cuff integrity concern when traumatic/acute weakness is present." ] },
      { name: "Scapular assist test", howToUse: ["Assist scapular upward rotation/posterior tilt during elevation."], positiveFindings: ["Improved symptoms or range."], treatmentImplication: ["Prioritize scapular mechanics and serratus/lower trap control." ] },
    ],
    neuroScreen: [
      { name: "C5-T1 screen", howToUse: ["Use if symptoms radiate past elbow or weakness/numbness is reported." ] },
      { name: "Axillary nerve screen", howToUse: ["Assess lateral shoulder sensation and deltoid function when indicated." ] },
    ],
    neurodynamic: [
      { name: "Median/radial/ulnar screen", howToUse: ["Use if distal symptoms or cervical contribution suspected." ] },
    ],
    movementImpairments: [
      { name: "Scapular winging", treatmentImplication: ["Serratus activation, closed-chain loading, gradual overhead progression." ] },
      { name: "Rib flare during elevation", treatmentImplication: ["Rib-pelvis control, thoracic mobility, reduced load." ] },
      { name: "Anterior humeral glide", treatmentImplication: ["Posterior cuff capacity, GH control, range modification." ] },
    ],
    differentials: [
      { name: "Rotator cuff load intolerance" }, { name: "Subacromial pain syndrome" }, { name: "Adhesive capsular pattern" }, { name: "Instability" }, { name: "Cervical referral" }, { name: "AC joint contribution" }
    ],
    redFlags: commonRedFlags.concat([{ name: "Acute traumatic weakness", whyItMatters: "New, marked weakness after trauma may indicate serious soft tissue, joint, or neurologic injury that needs prompt evaluation.", howToUse: ["Ask whether strength loss occurred suddenly after injury and if it is disproportionate to pain.", "Compare strength and function to the uninjured side and look for associated sensory or movement changes."], treatmentImplication: ["Do not treat as routine soreness. Consider medical review if marked loss of strength follows trauma."] }]),
    treatmentDirections: [
      { name: "Scapular upward rotation and posterior tilt" }, { name: "Rotator cuff capacity" }, { name: "Thoracic mobility" }, { name: "Overhead graded exposure" }
    ],
    progressionLadders: [
      { name: "Overhead progression ladder", howToUse: ["Pain-modulated AAROM", "Wall slide", "Scaption", "Loaded reach", "Overhead carry", "Pressing progression" ] }
    ],
    outcomeMeasures: [{ name: "DASH / QuickDASH" }, { name: "PSFS" }, { name: "Shoulder AROM" }],
    returnToFunction: [{ name: "Return-to-gym upper body pathway" }, { name: "Overhead work pathway" }],
    hepCategories: [{ name: "Serratus control" }, { name: "Rotator cuff loading" }, { name: "Thoracic mobility" }],
  },
  Lumbar: {
    intakeQuestions: [{ name: "Directional and load behavior", howToUse: ["Ask flexion, extension, sitting, standing, walking, lifting, cough/sneeze, morning stiffness." ] }],
    orthopedicTests: [
      { name: "Repeated movement testing", howToUse: ["Assess symptom response to repeated flexion/extension or lateral movement."], clinicalMeaning: ["Helps identify directional preference or load sensitivity." ] },
      { name: "SLR", howToUse: ["Raise straight leg and use sensitizers if appropriate."], positiveFindings: ["Familiar radiating symptoms modified by sensitizers." ] },
      { name: "Slump", howToUse: ["Sequential spinal flexion, knee extension, ankle dorsiflexion with sensitizers."], treatmentImplication: ["Dose neural mobility according to irritability." ] },
      { name: "Prone instability test", clinicalMeaning: ["May support motor control/stabilization subgroup in context." ] },
    ],
    neuroScreen: [
      { name: "L2-L3", howToUse: ["Hip flexion and knee extension patterns." ] },
      { name: "L4", howToUse: ["Medial leg sensation, ankle dorsiflexion, patellar reflex." ] },
      { name: "L5", howToUse: ["Dorsum foot sensation, great toe extension." ] },
      { name: "S1", howToUse: ["Lateral foot sensation, plantarflexion, Achilles reflex." ] },
    ],
    neurodynamic: [{ name: "Slump differentiation" }, { name: "SLR with sensitizers" }, { name: "Femoral nerve tension" }],
    movementImpairments: [{ name: "Lumbar extension compensation" }, { name: "Rib flare" }, { name: "Hip hinge deficit" }, { name: "Protective guarding" }],
    differentials: [{ name: "Lumbar radiculopathy" }, { name: "Discogenic sensitivity" }, { name: "Facet/extension sensitivity" }, { name: "Hip referral" }, { name: "SIJ contribution" }],
    redFlags: commonRedFlags.concat([{ name: "Cauda equina concern", whyItMatters: "Saddle anesthesia, bowel/bladder changes, or rapidly worsening neurologic deficits may indicate cauda equina compression requiring urgent medical review.", howToUse: ["Screen saddle anesthesia, bowel/bladder changes, severe progressive neuro deficits."], treatmentImplication: ["Urgent medical review when suspected."] }]),
    treatmentDirections: [{ name: "Directional preference strategy" }, { name: "Hip hinge and load transfer" }, { name: "Graded exposure to bending/lifting" }, { name: "Posterior chain loading" }],
    progressionLadders: [{ name: "Lumbar load ladder", howToUse: ["Supine control", "Bridge/dead bug", "Hip hinge", "Loaded hinge", "Carry", "Floor transfer/lift" ] }],
    outcomeMeasures: [{ name: "ODI" }, { name: "PSFS" }, { name: "5xSTS" }, { name: "Walking tolerance" }],
    returnToFunction: [{ name: "Lifting pathway" }, { name: "Desk-to-gym pathway" }, { name: "Military fitness pathway" }],
    hepCategories: [{ name: "Lumbopelvic control" }, { name: "Posterior chain" }, { name: "Walking dosage" }, { name: "Neural mobility" }],
  },
  Hip: {
    intakeQuestions: [{ name: "Single-limb and gait behavior" }],
    orthopedicTests: [{ name: "FABER" }, { name: "FADIR" }, { name: "Trendelenburg" }, { name: "Single-leg squat" }, { name: "Step-down observation" }],
    neuroScreen: [{ name: "Femoral nerve / L2-L4 screen" }, { name: "L4-S1 screen if radiating symptoms" }],
    neurodynamic: [{ name: "Femoral nerve tension" }, { name: "SLR if posterior thigh symptoms" }],
    movementImpairments: [{ name: "Hip drop" }, { name: "Trunk lean" }, { name: "Dynamic valgus" }, { name: "Hip strategy deficit" }],
    differentials: [{ name: "Hip mobility deficit" }, { name: "Gluteal tendinopathy pattern" }, { name: "FAI/anterior hip pain" }, { name: "Lumbar referral" }],
    redFlags: commonRedFlags.concat([{ name: "Inability to bear weight after trauma", whyItMatters: "Inability to bear weight after acute trauma can signal fracture, joint disruption, or severe soft tissue injury needing prompt assessment.", howToUse: ["Clarify whether weight-bearing inability began immediately after trauma and whether it is accompanied by severe pain or instability." ] }]),
    treatmentDirections: [{ name: "Hip mobility restoration" }, { name: "Gluteal loading" }, { name: "Single-limb stability" }, { name: "Return-to-run load progression" }],
    progressionLadders: [{ name: "Single-limb ladder", howToUse: ["Bridge", "Side-lying abduction", "Split squat", "Step-down", "Single-leg RDL", "Run prep" ] }],
    outcomeMeasures: [{ name: "LEFS" }, { name: "PSFS" }, { name: "Single-leg squat quality" }],
    returnToFunction: [{ name: "Running pathway" }, { name: "Stair pathway" }],
    hepCategories: [{ name: "Glute med/max" }, { name: "Hip mobility" }, { name: "Single-limb loading" }],
  },
  Knee: {
    intakeQuestions: [{ name: "Stair, squat, running and swelling behavior" }],
    orthopedicTests: [{ name: "Step-down observation" }, { name: "Single-leg squat" }, { name: "Thessaly" }, { name: "McMurray" }, { name: "Lachman" }, { name: "Valgus/varus stress" }],
    neuroScreen: [{ name: "L3/L4 knee extension" }, { name: "L4 patellar reflex" }, { name: "L5/S1 distal screen" }],
    neurodynamic: [{ name: "Slump/SLR if radiating symptoms" }, { name: "Femoral nerve tension if anterior thigh symptoms" }],
    movementImpairments: [{ name: "Dynamic valgus" }, { name: "Quad-dominant strategy" }, { name: "Hip drop" }, { name: "Poor eccentric control" }],
    differentials: [{ name: "PFPS load intolerance" }, { name: "Patellar tendon load intolerance" }, { name: "Meniscus irritability" }, { name: "Ligamentous instability" }, { name: "Hip/ankle contribution" }],
    redFlags: commonRedFlags.concat([
      { name: "Acute traumatic swelling", whyItMatters: "Rapid swelling after injury may indicate joint effusion, fracture, or ligament rupture requiring careful evaluation.", howToUse: ["Ask when swelling began after the injury and observe whether it develops quickly." ] },
      { name: "Locked knee", whyItMatters: "Mechanical locking suggests a potential meniscal tear or intra-articular block that may need referral.", howToUse: ["Ask whether the knee catches or locks during bending or straightening and observe active range of motion." ] },
      { name: "Inability to bear weight", whyItMatters: "Immediate inability to weight-bear after a knee injury may indicate fracture, dislocation, or severe ligament damage.", howToUse: ["Note whether the patient can take even a single step and whether weight-bearing increases pain significantly." ] },
      { name: "Progressive calf swelling", whyItMatters: "Increasing calf swelling may reflect worsening injury or a vascular concern such as deep vein thrombosis.", howToUse: ["Monitor calf circumference, warmth, and tenderness over time, especially if swelling progresses." ] }
    ]),
    treatmentDirections: [{ name: "Hip-dominant loading" }, { name: "Frontal plane control" }, { name: "Eccentric control" }, { name: "Running load progression" }],
    progressionLadders: [{ name: "PFPS / single-leg ladder", howToUse: ["Isometric", "DL squat", "Split squat", "Step-down", "Single-leg squat", "Landing", "Run progression" ] }],
    outcomeMeasures: [{ name: "LEFS" }, { name: "KOOS" }, { name: "PSFS" }, { name: "Single-leg step-down quality" }],
    returnToFunction: [{ name: "Stair pathway" }, { name: "Return-to-run pathway" }, { name: "Jump/landing pathway" }],
    hepCategories: [{ name: "Quad capacity" }, { name: "Hip control" }, { name: "Eccentric step control" }, { name: "Landing mechanics" }],
  },
  "Ankle/Foot": {
    intakeQuestions: [{ name: "Weight-bearing, swelling, instability, and push-off behavior" }],
    orthopedicTests: [{ name: "Anterior drawer" }, { name: "Talar tilt" }, { name: "Dorsiflexion lunge test" }, { name: "Single-leg balance" }, { name: "Windlass test" }, { name: "Navicular drop" }],
    neuroScreen: [{ name: "L4 dorsiflexion" }, { name: "L5 great toe extension" }, { name: "S1 plantarflexion/Achilles reflex" }, { name: "Peroneal nerve screen" }],
    neurodynamic: [{ name: "SLR/tibial nerve bias if plantar symptoms" }, { name: "Peroneal nerve bias if dorsolateral symptoms" }],
    movementImpairments: [{ name: "Medial arch collapse" }, { name: "Toe gripping" }, { name: "Early heel rise" }, { name: "Poor push-off" }],
    differentials: [{ name: "Ankle instability" }, { name: "Achilles load intolerance" }, { name: "Plantar fascia load intolerance" }, { name: "Dorsiflexion mobility deficit" }, { name: "Foot intrinsic control deficit" }],
    redFlags: commonRedFlags.concat([
      { name: "Unable to bear weight after trauma", whyItMatters: "Unable to bear weight after acute ankle/foot trauma can indicate fracture or severe joint injury needing timely assessment.", howToUse: ["Ask whether the patient could step down after injury and whether pain or instability prevents weight-bearing." ] },
      { name: "Severe swelling/bruising", whyItMatters: "Marked swelling or bruising after trauma may signal fracture, significant soft tissue injury, or vascular compromise.", howToUse: ["Inspect the extent of swelling and ecchymosis and compare with the opposite limb." ] },
      { name: "Calf swelling/redness/warmth", whyItMatters: "Calf swelling with redness or warmth may indicate deep vein thrombosis or other acute vascular concern.", howToUse: ["Assess calf tenderness, skin changes, and ask about risk factors for thrombosis." ] }
    ]),
    treatmentDirections: [{ name: "Dorsiflexion mobility" }, { name: "Tripod foot control" }, { name: "Calf capacity" }, { name: "Balance progression" }, { name: "Gait push-off retraining" }],
    progressionLadders: [{ name: "Ankle stability ladder", howToUse: ["Tripod foot", "DL heel raise", "SL balance", "Reach task", "Foam/head turns", "Hopping prep", "Return-to-run" ] }],
    outcomeMeasures: [{ name: "FAAM" }, { name: "LEFS" }, { name: "Dorsiflexion lunge" }, { name: "Single-leg balance time" }],
    returnToFunction: [{ name: "Return-to-run pathway" }, { name: "Uneven surface walking pathway" }, { name: "Jump/hop pathway" }],
    hepCategories: [{ name: "Foot intrinsic" }, { name: "Calf capacity" }, { name: "Balance/proprioception" }, { name: "Push-off mechanics" }],
  },
  Elbow: {
    intakeQuestions: [{ name: "Grip, lifting, tool use, and typing behavior" }],
    orthopedicTests: [{ name: "Cozen" }, { name: "Mill" }, { name: "Maudsley" }, { name: "Grip dynamometry" }, { name: "Varus/valgus stress" }],
    neuroScreen: [{ name: "C6/C7 screen" }, { name: "Radial nerve sensory distribution" }, { name: "Median/ulnar screen" }],
    neurodynamic: [{ name: "Radial nerve differentiation" }, { name: "Median nerve screen" }, { name: "Ulnar nerve screen" }],
    movementImpairments: [{ name: "Excessive gripping" }, { name: "Wrist extension collapse" }, { name: "Shoulder/scapular contribution" }],
    differentials: [{ name: "Lateral epicondylalgia" }, { name: "Medial epicondylalgia" }, { name: "Radial tunnel contribution" }, { name: "Cervical referral" }],
    redFlags: commonRedFlags.concat([
      { name: "Acute traumatic deformity", whyItMatters: "Apparent deformity after elbow trauma may indicate fracture or dislocation requiring urgent evaluation.", howToUse: ["Compare elbow alignment and contour to the other side and ask if appearance changed immediately after injury." ] },
      { name: "Progressive weakness/numbness", whyItMatters: "Worsening weakness or numbness can suggest nerve injury or compartment involvement that needs further review.", howToUse: ["Clarify whether symptoms are increasing, spreading, or associated with specific arm positions." ] }
    ]),
    treatmentDirections: [{ name: "Grip load modification" }, { name: "Eccentric tendon loading" }, { name: "Neutral wrist strategy" }],
    progressionLadders: [{ name: "Elbow tendon ladder", howToUse: ["Isometric", "Eccentric", "Concentric", "Grip endurance", "Carry", "Return to gym/tool use" ] }],
    outcomeMeasures: [{ name: "QuickDASH" }, { name: "Grip dynamometry" }, { name: "PSFS" }],
    returnToFunction: [{ name: "Grip and lift pathway" }, { name: "Tool use pathway" }],
    hepCategories: [{ name: "Wrist extensor loading" }, { name: "Grip endurance" }, { name: "Neural mobility" }],
  },
  Wrist: {
    intakeQuestions: [{ name: "Typing, writing, driving, gripping, and weight-bearing behavior" }],
    orthopedicTests: [{ name: "Grip/pinch assessment" }, { name: "Phalen/Tinel" }, { name: "Finkelstein" }, { name: "Weight-bearing wrist tolerance" }],
    neuroScreen: [{ name: "Median nerve sensory distribution" }, { name: "Ulnar nerve sensory distribution" }, { name: "Radial sensory distribution" }, { name: "C8/T1 screen" }],
    neurodynamic: [{ name: "Median nerve glide" }, { name: "Ulnar nerve glide" }, { name: "Radial nerve glide" }],
    movementImpairments: [{ name: "Finger over-gripping" }, { name: "Wrist extension collapse" }, { name: "Poor closed-chain tolerance" }],
    differentials: [{ name: "Wrist load intolerance" }, { name: "Median nerve sensitivity" }, { name: "Grip/pinch control deficit" }, { name: "De Quervain pattern" }, { name: "Cervical referral" }],
    redFlags: commonRedFlags.concat([
      { name: "Acute traumatic deformity", whyItMatters: "Wrist deformity after trauma often suggests fracture or dislocation that requires imaging or referral.", howToUse: ["Inspect wrist alignment, swelling, and deformity immediately after injury." ] },
      { name: "Possible fracture signs", whyItMatters: "Focal tenderness, severe pain, or functional loss after trauma may indicate a fracture.", howToUse: ["Palpate the distal radius/ulna and carpus for point tenderness and observe motion limitation." ] }
    ]),
    treatmentDirections: [{ name: "Neutral wrist loading" }, { name: "Grip dosage control" }, { name: "Closed-chain progression" }],
    progressionLadders: [{ name: "Wrist loading ladder", howToUse: ["ROM", "Isometric", "Grip endurance", "Quadruped rocking", "Incline push-up", "Floor push-up modification" ] }],
    outcomeMeasures: [{ name: "QuickDASH" }, { name: "Grip/pinch" }, { name: "PSFS" }],
    returnToFunction: [{ name: "Typing/writing pathway" }, { name: "Push-up pathway" }],
    hepCategories: [{ name: "Wrist strength" }, { name: "Median nerve" }, { name: "Closed-chain loading" }],
  },
  TMJ: {
    intakeQuestions: [{ name: "Chewing, yawning, speaking, clenching, headache, and cervical behavior" }],
    orthopedicTests: [{ name: "Jaw opening measurement" }, { name: "Deviation tracking" }, { name: "Cervical screen" }, { name: "Masseter/temporalis palpation" }],
    neuroScreen: [{ name: "Cranial nerve symptoms if atypical" }, { name: "Cervical neuro screen if radiating symptoms" }],
    neurodynamic: [{ name: "Not primary unless cervical/upper limb symptoms are present" }],
    movementImpairments: [{ name: "Jaw clenching" }, { name: "Mandibular deviation" }, { name: "Cervical guarding" }],
    differentials: [{ name: "Jaw guarding" }, { name: "Clenching/parafunctional habit" }, { name: "Cervical contribution" }, { name: "Disc displacement pattern" }],
    redFlags: commonRedFlags.concat([
      { name: "Unexplained facial numbness", whyItMatters: "Facial numbness without clear local cause may signal neurologic or vascular involvement needing prompt review.", howToUse: ["Clarify onset, distribution, and whether symptoms change with jaw motion or posture." ] },
      { name: "Progressive cranial nerve signs", whyItMatters: "Worsening cranial nerve findings may indicate central or serious neurologic pathology that should be evaluated urgently.", howToUse: ["Screen for diplopia, facial asymmetry, swallowing difficulty, or speech changes." ] }
    ]),
    treatmentDirections: [{ name: "Jaw relaxation" }, { name: "Tongue resting position" }, { name: "Controlled opening" }, { name: "Cervical contribution management" }],
    progressionLadders: [{ name: "TMJ control ladder", howToUse: ["Tongue rest", "Controlled opening", "Chewing exposure", "Cervical-jaw coordination" ] }],
    outcomeMeasures: [{ name: "Jaw opening measurement" }, { name: "PSFS" }, { name: "Headache frequency tracking" }],
    returnToFunction: [{ name: "Chewing pathway" }, { name: "Speaking/yawning pathway" }],
    hepCategories: [{ name: "Jaw motor control" }, { name: "Cervical-jaw coordination" }, { name: "Breathing/relaxation" }],
  },
};

