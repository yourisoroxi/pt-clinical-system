import type { PatternData, SelectableItem, SessionFocus, TreatmentItem, VisitStage } from "@/types/clinical";
import type { CustomItem } from "@/types/preset";
import { scoreTreatmentItem } from "./matchingLogic";

export function recommendedText(
  list: TreatmentItem[],
  irritability: string,
  visitStage: VisitStage,
  sessionFocus: SessionFocus,
  search: string,
  limit: number
) {
  return [...list]
    .map((item) => ({ ...item, score: scoreTreatmentItem(item, irritability, visitStage, sessionFocus, search) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.text);
}

export function recommendSession(
  current: PatternData,
  irritability: string,
  visitStage: VisitStage,
  sessionFocus: SessionFocus,
  search: string
) {
  return {
    interventions: [
      ...recommendedText(current.interventions["97140"], irritability, visitStage, sessionFocus, search, 2),
      ...recommendedText(current.interventions["97530"], irritability, visitStage, sessionFocus, search, 2),
      ...recommendedText(current.interventions["97110"], irritability, visitStage, sessionFocus, search, 3),
    ],
    cueing: recommendedText(current.cueing, irritability, visitStage, sessionFocus, search, 3),
    compensation: recommendedText(current.compensation, irritability, visitStage, sessionFocus, search, 3),
    response: recommendedText(current.response, irritability, visitStage, sessionFocus, search, 2),
  };
}

export function makeSelectableItems(
  list: TreatmentItem[],
  customList: CustomItem[],
  irritability: string,
  visitStage: VisitStage,
  sessionFocus: SessionFocus,
  search: string
): SelectableItem[] {
  const filtered = list.filter((item) => !search.trim() || item.text.toLowerCase().includes(search.toLowerCase()));

  const normalItems = filtered
    .map((item) => {
      const score = scoreTreatmentItem(item, irritability, visitStage, sessionFocus, search);
      return {
        id: item.text,
        text: item.text,
        custom: false,
        recommended: score >= 6,
        clinicApproved: item.clinicApproved ?? true,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  const customMapped = customList.map((item) => ({
    id: item.id,
    text: item.text,
    custom: true,
    recommended: false,
    clinicApproved: false,
    score: 0,
  }));

  return [...normalItems, ...customMapped];
}
