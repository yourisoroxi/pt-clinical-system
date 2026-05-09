export function generateComment(params: {
  noteLength: string;
  pattern: string;
  goal: string;
  selectedInterventions: string[];
  selectedCueing: string[];
  selectedCompensation: string[];
  selectedResponse: string[];
  selectedHep: string[];
}) {
  const interventionText =
    params.selectedInterventions.length > 0 ? params.selectedInterventions.join(", ") : "selected skilled interventions";
  const cueingText =
    params.selectedCueing.length > 0 ? params.selectedCueing.join("; ") : "skilled verbal and tactile cueing";
  const compensationText =
    params.selectedCompensation.length > 0 ? params.selectedCompensation.join(", ") : "compensatory movement patterns";
  const responseText =
    params.selectedResponse.length > 0 ? params.selectedResponse.join("; ") : "improved movement quality with reduced compensation";
  const hepText =
    params.selectedHep.length > 0 ? params.selectedHep.join("; ") : "home program progression based on current tolerance";

  if (params.noteLength === "Short") {
    return `Patient demonstrates ${params.pattern.toLowerCase()} affecting ${params.goal.toLowerCase()}. Treatment included ${interventionText}. Skilled cueing addressed ${cueingText}. Response: ${responseText}. HEP focus: ${hepText}. Continued skilled PT is indicated to improve functional carryover.`;
  }

  if (params.noteLength === "Detailed") {
    return `Patient demonstrates ${params.pattern.toLowerCase()} contributing to reduced tolerance for ${params.goal.toLowerCase()}. Treatment focused on ${interventionText} to improve movement quality, functional load tolerance, and task-specific control. Skilled cueing included: ${cueingText}. Therapist monitored ${compensationText} during task performance and modified loading based on symptom behavior and movement quality. Reassessment demonstrated: ${responseText}. Suggested home program focus includes: ${hepText}. Continued skilled PT remains medically necessary due to persistent movement impairment, need for skilled cueing, and limited independent carryover during higher-demand functional activity.`;
  }

  return `Patient demonstrates ${params.pattern.toLowerCase()} contributing to reduced tolerance for ${params.goal.toLowerCase()}. Treatment focused on ${interventionText} to improve movement quality and reduce compensatory loading patterns. Skilled cueing included: ${cueingText}. Therapist monitored ${compensationText} during task performance. Reassessment demonstrated: ${responseText}. Suggested HEP focus: ${hepText}. Continued skilled PT remains medically necessary to safely progress functional loading tolerance and improve carryover to patient-specific activity.`;
}
