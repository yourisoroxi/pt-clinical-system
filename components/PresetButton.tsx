import type { Preset } from "@/types/preset";

export function PresetButton({
  preset,
  onLoad,
  onDelete,
  onFavorite,
}: {
  preset: Preset;
  onLoad: (preset: Preset) => void;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <button onClick={() => onLoad(preset)} className="w-full text-left">
        <p className="font-bold text-slate-800">{preset.favorite ? "Favorite: " : ""}{preset.name}</p>
        <p className="mt-1 text-xs text-slate-500">{preset.source} - {preset.goal} - {preset.sessionFocus}</p>
        {preset.clinicApproved && <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">Clinic Approved</span>}
      </button>
      {preset.source === "My Preset" && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => onFavorite(preset.id)} className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">{preset.favorite ? "Unfavorite" : "Favorite"}</button>
          <button onClick={() => onDelete(preset.id)} className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Delete</button>
        </div>
      )}
    </div>
  );
}
