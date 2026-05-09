import type { TreatmentItem, VisitStage, SessionFocus } from "@/types/clinical";
import type { Exercise } from "@/types/exercise";

export function scoreTreatmentItem(
  item: TreatmentItem,
  irritability: string,
  visitStage: VisitStage,
  sessionFocus: SessionFocus,
  search: string
) {
  let score = 0;
  if (item.irritability.includes(irritability)) score += 3;
  if (item.stage.includes(visitStage)) score += 3;
  if (item.focus.includes(sessionFocus)) score += 4;
  if (search && item.text.toLowerCase().includes(search.toLowerCase())) score += 2;
  return score;
}

export function scoreExercise(
  exercise: Exercise,
  region: string,
  irritability: string,
  visitStage: string,
  goal: string,
  search: string
) {
  let score = 0;
  if (exercise.region.includes(region)) score += 5;
  if (exercise.irritability.includes(irritability)) score += 4;
  if (exercise.stage.includes(visitStage)) score += 3;
  if (exercise.goals.some((g) => g.toLowerCase().includes(goal.toLowerCase()))) score += 3;
  if (search && exercise.name.toLowerCase().includes(search.toLowerCase())) score += 2;
  return score;
}
