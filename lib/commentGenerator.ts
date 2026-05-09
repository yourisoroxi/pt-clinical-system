export function generateComment(params: {
  noteLength: string;
  pattern: string;
  goal: string;
  selectedInterventions: string[];
  selectedCueing: string[];
  selectedCompensation: string[];
  selectedResponse: string[];
  selectedHep: string[];
  fallbackHep: string[];
}) {
  const selectedInterventionText =
    params.selectedInterventions.length > 0 ? params.selectedInterventions.join(", ") : "selected skilled interventions";
  const selectedCueingText =
    params.selectedCueing.length > 0 ? params.selectedCueing.join("; ") : "skilled verbal and tactile cueing";
  const selectedCompensationText =
    params.selectedCompensation.length > 0 ? params.selectedCompensation.join(", ") : "compensatory movement patterns";
  const selectedResponseText =
    params.selectedResponse.length > 0 ? params.selectedResponse.join("; ") : "improved movement quality with reduced compensation";
  const selectedHepText =
    params.selectedHep.length > 0 ? params.selectedHep.join("; ") : params.fallbackHep.slice(0, 3).join("; ");

  if (params.noteLength === "Short") {
    return `Patient demonstrates ${params.pattern.toLowerCase()} affecting ${params.goal.toLowerCase()}. Treatment included ${selectedInterventionText}. Skilled cueing addressed ${selectedCueingText}. Response: ${selectedResponseText}. HEP focus: ${selectedHepText}. Continued skilled PT is indicated to improve functional carryover.`;
  }

  if (params.noteLength === "Detailed") {
    return `Patient demonstrates ${params.pattern.toLowerCase()} contributing to reduced tolerance for ${params.goal.toLowerCase()}. Treatment focused on ${selectedInterventionText} to improve movement quality, functional load tolerance, and task-specific control. Skilled cueing included: ${selectedCueingText}. Therapist monitored ${selectedCompensationText} during task performance and modified loading based on symptom behavior and movement quality. Reassessment demonstrated: ${selectedResponseText}. Suggested home program focus includes: ${selectedHepText}. Continued skilled PT remains medically necessary due to persistent movement impairment, need for skilled cueing, and limited independent carryover during higher-demand functional activity.`;
  }

  return `Patient demonstrates ${params.pattern.toLowerCase()} contributing to reduced tolerance for ${params.goal.toLowerCase()}. Treatment focused on ${selectedInterventionText} to improve movement quality and reduce compensatory loading patterns. Skilled cueing included: ${selectedCueingText}. Therapist monitored ${selectedCompensationText} during task performance. Reassessment demonstrated: ${selectedResponseText}. Suggested HEP focus: ${selectedHepText}. Continued skilled PT remains medically necessary to safely progress functional loading tolerance and improve carryover to patient-specific activity.`;
}
