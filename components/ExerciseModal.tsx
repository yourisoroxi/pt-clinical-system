import type { Exercise } from "@/types/exercise";

export function ExerciseModal({ exercise, onClose }: { exercise: Exercise | null; onClose: () => void }) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{exercise.region} - {exercise.category} - {exercise.difficulty}</p>
          </div>
          <button onClick={onClose} className="rounded-xl bg-slate-200 px-3 py-1 text-sm font-bold">Close</button>
        </div>

        <Detail title="Dosage" items={[`${exercise.dosage}, ${exercise.frequency}`]} />
        <Detail title="Patient explanation" items={[exercise.patientText]} />
        <Detail title="How to perform" items={exercise.instructions} />
        <Detail title="Cueing" items={exercise.cueing} />
        <Detail title="Common errors" items={exercise.commonErrors} />
        <Detail title="Regression" items={exercise.regression} />
        <Detail title="Progression" items={exercise.progression} />
      </div>
    </div>
  );
}

function Detail({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-4 rounded-2xl bg-slate-50 p-4">
      <h3 className="mb-2 font-bold">{title}</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
