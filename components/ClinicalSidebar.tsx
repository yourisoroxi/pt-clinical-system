import type { ClinicalSupport } from "@/types/clinical";
import type { Exercise } from "@/types/exercise";
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
  function toggleHep(item: string) {
    setSelectedHep(selectedHep.includes(item) ? selectedHep.filter((x) => x !== item) : [...selectedHep, item]);
  }

  return (
    <aside className="space-y-4 rounded-3xl bg-white p-6 shadow xl:col-span-1">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Clinical Intelligence</h2>
        <p className="mt-1 text-xs text-slate-500">
          {region} - {pattern}
        </p>
      </div>

      <SupportSection title="Suggested Tests" items={support.suggestedTests} />
      <SupportSection title="Neuro Screen" items={support.neuroScreen} />
      <SupportSection title="Neurodynamic Suggestions" items={support.neurodynamic} />
      <SupportSection title="Differential Considerations" items={support.differentials} />
      <SupportSection title="Red Flags / Refer If Present" items={support.redFlags} alert />
      <SupportSection title="Treatment Direction" items={support.treatmentDirection} />

      <div className="rounded-2xl border bg-slate-50 p-4">
        <h3 className="mb-1 font-bold">Suggested HEP</h3>
        <p className="mb-3 text-xs text-slate-500">Click an exercise name to select it or show details.</p>
        <div className="space-y-2">
          {recommendedExercises.map((exercise) => (
            <HEPCard
              key={exercise.id}
              exercise={exercise}
              selected={selectedHep.includes(exercise.name)}
              onToggle={toggleHep}
              onOpen={onOpenExercise}
            />
          ))}
        </div>
      </div>

      <SupportSection title="Progression Ideas" items={support.progression} />
    </aside>
  );
}

function SupportSection({ title, items, alert = false }: { title: string; items: string[]; alert?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${alert ? "border-red-200 bg-red-50" : "bg-slate-50"}`}>
      <h3 className={`mb-3 font-bold ${alert ? "text-red-800" : "text-slate-800"}`}>{title}</h3>
      <ul className="space-y-2 text-xs leading-5">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-white p-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
