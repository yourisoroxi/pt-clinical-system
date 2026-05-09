import { useState } from "react";
import { hepByName } from "@/data/hepDatabase";
import type { ClinicalSupport } from "@/types/clinical";
import { HepDetail } from "./HepDetail";
import { SupportSection } from "./SupportSection";

export function ClinicalSidebar({
  support,
  selectedHep,
  setSelectedHep,
  region,
  pattern,
}: {
  support: ClinicalSupport;
  selectedHep: string[];
  setSelectedHep: (items: string[]) => void;
  region: string;
  pattern: string;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  function toggleHep(item: string) {
    setSelectedHep(selectedHep.includes(item) ? selectedHep.filter((x) => x !== item) : [...selectedHep, item]);
  }

  return (
    <aside className="space-y-4 rounded-3xl bg-white p-6 shadow xl:col-span-1">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Clinical Intelligence</h2>
        <p className="mt-1 text-xs text-slate-500">{region} - {pattern}</p>
      </div>

      <SupportSection title="Suggested Tests" items={support.suggestedTests} openItem={openItem} setOpenItem={setOpenItem} />
      <SupportSection title="Neuro Screen" items={support.neuroScreen} openItem={openItem} setOpenItem={setOpenItem} />
      <SupportSection title="Neurodynamic Suggestions" items={support.neurodynamic} openItem={openItem} setOpenItem={setOpenItem} />
      <SupportSection title="Differential Considerations" items={support.differentials} openItem={openItem} setOpenItem={setOpenItem} />
      <SupportSection title="Red Flags / Refer If Present" items={support.redFlags} openItem={openItem} setOpenItem={setOpenItem} alert />
      <SupportSection title="Treatment Direction" items={support.treatmentDirection} openItem={openItem} setOpenItem={setOpenItem} />

      <div className="rounded-2xl border bg-slate-50 p-4">
        <h3 className="mb-3 font-bold">Suggested HEP</h3>
        <p className="mb-3 text-xs text-slate-500">Click an exercise name to view instructions, dosage, cueing, common errors, regression, and progression.</p>
        <div className="space-y-2">
          {support.hep.map((item) => {
            const selected = selectedHep.includes(item);
            const exercise = hepByName[item];
            const open = openItem === `HEP:${item}`;
            return (
              <div key={item} className="rounded-xl border bg-white p-2">
                <button
                  onClick={() => toggleHep(item)}
                  className={`w-full rounded-lg p-2 text-left text-xs ${selected ? "bg-green-100 font-semibold text-green-900" : "hover:bg-slate-100"}`}
                >
                  {selected ? "Selected: " : "+ "}
                  {item}
                </button>
                <button
                  onClick={() => setOpenItem(open ? null : `HEP:${item}`)}
                  className="mt-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
                >
                  {open ? "Hide how-to" : "Show how-to"}
                </button>
                {open && exercise && <HepDetail exercise={exercise} />}
              </div>
            );
          })}
        </div>
      </div>

      <SupportSection title="Progression Ideas" items={support.progression} openItem={openItem} setOpenItem={setOpenItem} />
    </aside>
  );
}
