import type { ClinicalEngineItem } from "@/types/engine";

export function EngineExpansionSection({
  title,
  items,
  openItem,
  setOpenItem,
}: {
  title: string;
  items: ClinicalEngineItem[];
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <h3 className="mb-3 font-bold text-slate-800">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => {
          const key = `${title}:${item.name}`;
          const open = openItem === key;
          return (
            <div key={key} className="rounded-xl bg-white p-2 text-xs leading-5">
              <button onClick={() => setOpenItem(open ? null : key)} className="w-full text-left font-semibold text-slate-800">
                {item.name}
              </button>
              <button onClick={() => setOpenItem(open ? null : key)} className="mt-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                {open ? "Hide details" : "Show details"}
              </button>
              {open && <EngineItemDetail item={item} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EngineItemDetail({ item }: { item: ClinicalEngineItem }) {
  return (
    <div className="mt-3 space-y-3 rounded-xl border bg-slate-50 p-3">
      {item.whyItMatters && (
        <div>
          <p className="font-bold">Why it matters</p>
          <p className="mt-1 rounded-lg bg-white p-2">{item.whyItMatters}</p>
        </div>
      )}
      {item.howToUse && <Detail title="How to use" items={item.howToUse} />}
      {item.positiveFindings && <Detail title="Positive findings" items={item.positiveFindings} />}
      {item.clinicalMeaning && <Detail title="Clinical meaning" items={item.clinicalMeaning} />}
      {item.treatmentImplication && <Detail title="Treatment implication" items={item.treatmentImplication} />}
      {item.precautions && <Detail title="Precautions" items={item.precautions} />}
      {item.progressionCriteria && <Detail title="Progression criteria" items={item.progressionCriteria} />}
      {item.regressionCriteria && <Detail title="Regression criteria" items={item.regressionCriteria} />}
      {item.documentationTip && (
        <div>
          <p className="font-bold">Documentation tip</p>
          <p className="mt-1 rounded-lg bg-white p-2">{item.documentationTip}</p>
        </div>
      )}
    </div>
  );
}

function Detail({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-bold">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-4">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
