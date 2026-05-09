import type { HepExercise } from "@/types/exercise";
import { DetailList } from "./DetailList";

export function HepDetail({ exercise }: { exercise: HepExercise }) {
  return (
    <div className="mt-3 space-y-3 rounded-xl border bg-green-50 p-3 text-xs leading-5">
      <div className="flex flex-wrap gap-1">
        <span className="rounded-lg bg-white px-2 py-1 font-semibold">{exercise.category}</span>
        <span className="rounded-lg bg-white px-2 py-1 font-semibold">{exercise.difficulty}</span>
        <span className="rounded-lg bg-white px-2 py-1 font-semibold">Equipment: {exercise.equipment.join(", ")}</span>
      </div>
      <p><strong>Dosage:</strong> {exercise.dosage}</p>
      <p><strong>Frequency:</strong> {exercise.frequency}</p>
      <DetailList title="Instructions" items={exercise.instructions} />
      <DetailList title="Cueing" items={exercise.cueing} />
      <DetailList title="Common errors" items={exercise.commonErrors} />
      <DetailList title="Regression" items={exercise.regression} />
      <DetailList title="Progression" items={exercise.progression} />
      <div>
        <p className="font-bold text-slate-700">Patient-friendly text</p>
        <p className="mt-1 rounded-lg bg-white p-2">{exercise.patientText}</p>
      </div>
    </div>
  );
}
