export type ClinicalTestDetail = {
  name: string;
  howTo: string[];
  positiveFinding: string[];
  clinicalMeaning: string[];
  treatmentDirection: string[];
};

export const clinicalTestDetails: Record<string, ClinicalTestDetail> = {
  "Spurling": {
    name: "Spurling",
    howTo: ["Position cervical spine in extension, side-bending, and rotation toward the involved side.", "Apply gentle axial compression only if appropriate.", "Compare symptom response."],
    positiveFinding: ["Reproduction of familiar radiating symptoms."],
    clinicalMeaning: ["May support cervical nerve root involvement when combined with other findings."],
    treatmentDirection: ["Consider cervical unloading, symptom-modulated neurodynamic work, and thoracic contribution."],
  },
  "Cervical distraction": {
    name: "Cervical distraction",
    howTo: ["Patient supine.", "Apply gentle axial distraction.", "Monitor symptom response."],
    positiveFinding: ["Reduction of radiating symptoms or cervical symptoms."],
    clinicalMeaning: ["May support cervical contribution to symptoms."],
    treatmentDirection: ["Use unloading strategies and low-irritability motor control progression."],
  },
  "ULTT 1 median nerve bias": {
    name: "ULTT 1 median nerve bias",
    howTo: ["Shoulder abduction.", "Wrist and finger extension.", "Forearm supination.", "Elbow extension with symptom monitoring."],
    positiveFinding: ["Reproduction of familiar symptoms with sensitizer response."],
    clinicalMeaning: ["May suggest median nerve mechanosensitivity."],
    treatmentDirection: ["Use symptom-free nerve glide, not aggressive tensioning."],
  },
  "Anterior drawer": {
    name: "Anterior drawer",
    howTo: ["Patient seated or supine.", "Stabilize distal tibia.", "Translate calcaneus/talus anteriorly.", "Compare side to side."],
    positiveFinding: ["Increased anterior translation, soft end-feel, or symptom reproduction."],
    clinicalMeaning: ["May suggest ATFL involvement or mechanical instability."],
    treatmentDirection: ["Prioritize balance, peroneal control, and graded return to loading."],
  },
};
