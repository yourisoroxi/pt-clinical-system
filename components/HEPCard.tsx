import type { HepExercise } from "@/types/exercise";

export function HEPCard({
  exercise,
  selected,
  onToggle,
  onOpen,
}: {
  exercise: HepExercise;
  selected: boolean;
  onToggle: (name: string) => void;
  onOpen: (exercise: HepExercise) => void;
}) {
  return (
    <div className={`rounded-xl border p-3 ${selected ? "border-green-500 bg-green-50" : "bg-white"}`}>
      <button onClick={() => onToggle(exercise.name)} className="w-full text-left text-sm font-semibold">
        {selected ? "Selected: " : "+ "}
        {exercise.name}
      </button>

      <div className="mt-2 flex flex-wrap gap-1">
        <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">{exercise.category}</span>
        <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">{exercise.difficulty}</span>
        <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs">{exercise.dosage}</span>
      </div>

      <button
        onClick={() => onOpen(exercise)}
        className="mt-3 rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"
      >
        Show how-to
      </button>
    </div>
  );
}