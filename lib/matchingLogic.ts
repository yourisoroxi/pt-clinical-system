import type { SessionFocus, TreatmentItem, VisitStage } from "@/types/clinical";

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
