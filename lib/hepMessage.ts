import { hepByName } from "@/data/hepDatabase";

export function buildHepMessage(selectedHep: string[], fallbackHep: string[]) {
  const exercises = selectedHep.length > 0 ? selectedHep : fallbackHep.slice(0, 3);
  return `Home Exercise Program\n\n${exercises
    .map((name, index) => {
      const exercise = hepByName[name];
      if (!exercise) return `${index + 1}. ${name}`;
      return `${index + 1}. ${exercise.name}\nDosage: ${exercise.dosage}\nFrequency: ${exercise.frequency}\nInstructions:\n- ${exercise.instructions.join("\n- ")}\nCueing:\n- ${exercise.cueing.join("\n- ")}\nCommon errors to avoid:\n- ${exercise.commonErrors.join("\n- ")}`;
    })
    .join("\n\n")}\n\nPlease perform only within a comfortable symptom range and stop if symptoms significantly worsen.`;
}
