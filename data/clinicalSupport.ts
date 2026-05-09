import type { ClinicalSupport } from "@/types/clinical";
import { differentials } from "./differentials";
import { neuroScreens } from "./neuroScreens";
import { redFlags } from "./redFlags";

export const clinicalSupport: Record<string, ClinicalSupport> = {
  Cervical: {
    suggestedTests: ["Spurling", "Cervical distraction", "ULTT 1 median nerve bias", "Cervical rotation ROM", "Deep neck flexor endurance"],
    neuroScreen: neuroScreens.Cervical,
    neurodynamic: ["Median nerve bias", "Radial nerve bias", "Ulnar nerve bias", "Compare cervical side-bending response and symptom location"],
    differentials: differentials.Cervical,
    redFlags: redFlags.Cervical,
    treatmentDirection: ["Cervical unloading if high irritability", "Thoracic contribution and mobility", "Deep neck flexor control", "Neural mobility within symptom-free range"],
    hep: ["Chin nod in supine", "Thoracic extension over towel"],
    progression: ["Increase postural hold time", "Add arm movement while maintaining cervical control", "Progress from supine to standing"],
  },
  Lumbar: {
    suggestedTests: ["Repeated movement testing", "SLR", "Slump", "Prone instability test", "Hip screen"],
    neuroScreen: neuroScreens.Lumbar,
    neurodynamic: ["Slump test with cervical differentiation", "SLR with ankle/cervical sensitizer", "Femoral nerve tension if anterior thigh symptoms"],
    differentials: differentials.Lumbar,
    redFlags: redFlags.Lumbar,
    treatmentDirection: ["Match direction to symptom behavior", "Hip hinge and load transfer retraining", "Graded exposure to bending/lifting", "Core endurance and breathing integration"],
    hep: ["Dead bug progression", "Bridge progression", "Hip hinge practice"],
    progression: ["Increase load gradually", "Progress from supported hinge to loaded hinge", "Add carry task"],
  },
  Knee: {
    suggestedTests: ["Step-down observation", "Single-leg squat", "Patellar mobility", "Thessaly", "McMurray", "Lachman"],
    neuroScreen: neuroScreens.Knee,
    neurodynamic: ["Slump/SLR if radiating symptoms", "Femoral nerve tension if anterior thigh symptoms"],
    differentials: differentials.Knee,
    redFlags: redFlags.Knee,
    treatmentDirection: ["Hip-dominant loading", "Frontal plane control", "Eccentric control", "Stair/squat retraining"],
    hep: ["Step-down control", "Hip dominant squat drill", "Lateral hip stabilization"],
    progression: ["Increase step height", "Add external load", "Progress to single-leg eccentric control"],
  },
};
