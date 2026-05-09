import type { ClinicalDetail } from "@/types/clinical";
import { DetailList } from "./DetailList";

export function ClinicalDetailPanel({ detail }: { detail: ClinicalDetail }) {
  return (
    <div className="mt-3 space-y-3 rounded-xl border bg-slate-50 p-3 text-xs leading-5">
      <DetailList title="How to perform" items={detail.howTo} />
      {detail.positiveFindings && <DetailList title="Positive finding" items={detail.positiveFindings} />}
      {detail.clinicalMeaning && <DetailList title="Clinical meaning" items={detail.clinicalMeaning} />}
      {detail.precautions && <DetailList title="Precautions" items={detail.precautions} />}
      {detail.treatmentDirection && <DetailList title="Treatment direction" items={detail.treatmentDirection} />}
      {detail.documentationTip && (
        <div>
          <p className="font-bold text-slate-700">Documentation tip</p>
          <p className="mt-1 rounded-lg bg-white p-2">{detail.documentationTip}</p>
        </div>
      )}
    </div>
  );
}
