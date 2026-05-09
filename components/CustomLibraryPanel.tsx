import type { CptCode, LibraryType } from "@/types/clinical";

export function CustomLibraryPanel({
  customType,
  setCustomType,
  customCpt,
  setCustomCpt,
  customText,
  setCustomText,
  customTags,
  setCustomTags,
  onAdd,
}: {
  customType: LibraryType;
  setCustomType: (v: LibraryType) => void;
  customCpt: CptCode;
  setCustomCpt: (v: CptCode) => void;
  customText: string;
  setCustomText: (v: string) => void;
  customTags: string;
  setCustomTags: (v: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">My Custom Library</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
        <select value={customType} onChange={(e) => setCustomType(e.target.value as LibraryType)} className="rounded-xl border p-3">
          <option value="intervention">Intervention</option>
          <option value="cueing">Cueing</option>
          <option value="compensation">Compensation</option>
          <option value="response">Response</option>
        </select>

        <select value={customCpt} onChange={(e) => setCustomCpt(e.target.value as CptCode)} className="rounded-xl border p-3" disabled={customType !== "intervention"}>
          <option value="97140">97140</option>
          <option value="97530">97530</option>
          <option value="97110">97110</option>
        </select>

        <input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Add personal wording" className="rounded-xl border p-3 md:col-span-2" />
        <input value={customTags} onChange={(e) => setCustomTags(e.target.value)} placeholder="Tags, comma separated" className="rounded-xl border p-3" />

        <button onClick={onAdd} className="rounded-xl bg-blue-700 px-4 py-2 font-semibold text-white">
          Add
        </button>
      </div>
      <p className="mt-3 text-sm text-slate-600">Saved only in this browser. No patient information is stored.</p>
    </div>
  );
}
