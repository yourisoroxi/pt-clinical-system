import type { HepExercise } from "@/types/exercise";
import { DetailList } from "./DetailList";

export function ExerciseModal({
  exercise,
  onClose,
}: {
  exercise: HepExercise | null;
  onClose: () => void;
}) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {exercise.region} - {exercise.category}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-200 px-3 py-1 text-sm font-bold"
          >
            Close
          </button>
        </div>

        <div className="mb-4 rounded-2xl bg-slate-50 p-4">
          <h3 className="mb-2 font-bold">Dosage</h3>
          <p className="text-sm">
            {exercise.dosage}, {exercise.frequency}
          </p>
        </div>

        <DetailList title="Instructions" items={exercise.instructions} />
        <DetailList title="Cueing" items={exercise.cueing} />
        <DetailList title="Common errors" items={exercise.commonErrors} />
        <DetailList title="Regression" items={exercise.regression} />
        <DetailList title="Progression" items={exercise.progression} />

        <div className="mt-4 rounded-2xl bg-green-50 p-4">
          <h3 className="mb-2 font-bold">Patient-friendly text</h3>
          <p className="text-sm">{exercise.patientText}</p>
        </div>
      </div>
    </div>
  );
}