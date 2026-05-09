import type { SelectableItem } from "@/types/clinical";

export function SelectableCard({
  title,
  items,
  selected,
  onToggle,
  onDelete,
}: {
  title: string;
  items: SelectableItem[];
  selected: string[];
  onToggle: (text: string) => void;
  onDelete: (id: string, text: string) => void;
}) {
  return (
    <div className="max-h-[520px] overflow-y-auto rounded-3xl bg-white p-6 shadow">
      <h3 className="sticky top-0 z-10 mb-4 bg-white pb-2 text-xl font-bold">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const isSelected = selected.includes(item.text);
          return (
            <div key={item.id} className="flex gap-2">
              <button
                onClick={() => onToggle(item.text)}
                className={`w-full rounded-2xl border p-3 text-left text-sm transition ${
                  isSelected ? "border-blue-500 bg-blue-100 font-semibold text-blue-900" : item.recommended ? "border-green-300 bg-green-50 hover:bg-green-100" : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {isSelected ? "Selected: " : item.recommended ? "Recommended: " : "+ "}
                {item.text}
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.clinicApproved && <span className="rounded-lg bg-green-100 px-2 py-1 text-xs text-green-800">Clinic Approved</span>}
                  {item.custom && <span className="rounded-lg bg-purple-100 px-2 py-1 text-xs text-purple-800">My Custom</span>}
                  {item.recommended && !isSelected && <span className="rounded-lg bg-blue-100 px-2 py-1 text-xs text-blue-800">Recommended</span>}
                </div>
              </button>
              {item.custom && <button onClick={() => onDelete(item.id, item.text)} className="rounded-xl border border-red-200 px-3 text-sm font-bold text-red-600 hover:bg-red-50">x</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
