import type { Preset } from "@/types/preset";

function PresetButton({
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
        <p className="font-bold text-slate-800">
          {preset.favorite ? "Favorite: " : ""}
          {preset.name}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {preset.source} - {preset.goal} - {preset.sessionFocus}
        </p>
        {preset.clinicApproved && (
          <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
            Clinic Approved
          </span>
        )}
      </button>

      {preset.source === "My Preset" && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => onFavorite(preset.id)} className="rounded-lg bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
            {preset.favorite ? "Unfavorite" : "Favorite"}
          </button>
          <button onClick={() => onDelete(preset.id)} className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export function PresetPanel({
  visiblePresets,
  presetName,
  setPresetName,
  onSave,
  onExport,
  importText,
  setImportText,
  onImport,
  onLoad,
  onDelete,
  onFavorite,
}: {
  visiblePresets: Preset[];
  presetName: string;
  setPresetName: (v: string) => void;
  onSave: () => void;
  onExport: () => void;
  importText: string;
  setImportText: (v: string) => void;
  onImport: () => void;
  onLoad: (preset: Preset) => void;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Quick Presets</h2>
        <div className="flex flex-wrap gap-2">
          <input value={presetName} onChange={(e) => setPresetName(e.target.value)} placeholder="Preset name" className="rounded-xl border p-2 text-sm" />
          <button onClick={onSave} className="rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white">
            Save Current as Preset
          </button>
          <button onClick={onExport} className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {visiblePresets.map((preset) => (
          <PresetButton key={preset.id} preset={preset} onLoad={onLoad} onDelete={onDelete} onFavorite={onFavorite} />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border bg-slate-50 p-4">
        <p className="mb-2 text-sm font-bold text-slate-700">Import Presets JSON</p>
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste exported preset JSON here"
          className="min-h-[80px] w-full rounded-xl border p-3 text-xs"
        />
        <button onClick={onImport} className="mt-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
          Import
        </button>
      </div>
    </div>
  );
}
