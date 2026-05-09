"use client";

import { useState } from "react";
import type { ClinicalDetail, ClinicalSupport } from "@/types/clinical";
import type { Exercise } from "@/types/exercise";
import { clinicalDetails } from "@/data/clinicalDetails";
import { HEPCard } from "./HEPCard";

export function ClinicalSidebar({
  support,
  selectedHep,
  setSelectedHep,
  region,
  pattern,
  recommendedExercises,
  onOpenExercise,
}: {
  support: ClinicalSupport;
  selectedHep: string[];
  setSelectedHep: (items: string[]) => void;
  region: string;
  pattern: string;
  recommendedExercises: Exercise[];
  onOpenExercise: (exercise: Exercise) => void;
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
        <h3 className="mb-1 font-bold">Suggested HEP</h3>
        <p className="mb-3 text-xs text-slate-500">Click an exercise name to select it or show details.</p>
        <div className="space-y-2">
          {recommendedExercises.map((exercise) => (
            <HEPCard key={exercise.id} exercise={exercise} selected={selectedHep.includes(exercise.name)} onToggle={toggleHep} onOpen={onOpenExercise} />
          ))}
        </div>
      </div>

      <SupportSection title="Progression Ideas" items={support.progression} openItem={openItem} setOpenItem={setOpenItem} />
    </aside>
  );
}

function SupportSection({ title, items, openItem, setOpenItem, alert = false }: { title: string; items: string[]; openItem: string | null; setOpenItem: (item: string | null) => void; alert?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${alert ? "border-red-200 bg-red-50" : "bg-slate-50"}`}>
      <h3 className={`mb-3 font-bold ${alert ? "text-red-800" : "text-slate-800"}`}>{title}</h3>
      <ul className="space-y-2 text-xs leading-5">
        {items.map((item) => {
          const detail = clinicalDetails[item];
          const open = openItem === item;
          return (
            <li key={item} className="rounded-xl bg-white p-2">
              <button onClick={() => setOpenItem(open ? null : item)} className="w-full text-left font-medium text-slate-800">{item}</button>
              {detail && (
                <button onClick={() => setOpenItem(open ? null : item)} className="mt-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  {open ? "Hide how-to" : "Show how-to"}
                </button>
              )}
              {open && detail && <ClinicalDetailPanel detail={detail} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ClinicalDetailPanel({ detail }: { detail: ClinicalDetail }) {
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

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-bold text-slate-700">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-4">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
