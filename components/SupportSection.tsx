import { clinicalDetails } from "@/data/clinicalDetails";
import { ClinicalDetailPanel } from "./ClinicalDetailPanel";

export function SupportSection({
  title,
  items,
  openItem,
  setOpenItem,
  alert = false,
}: {
  title: string;
  items: string[];
  openItem: string | null;
  setOpenItem: (item: string | null) => void;
  alert?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${alert ? "border-red-200 bg-red-50" : "bg-slate-50"}`}>
      <h3 className={`mb-3 font-bold ${alert ? "text-red-800" : "text-slate-800"}`}>{title}</h3>
      <ul className="space-y-2 text-xs leading-5">
        {items.map((item) => {
          const detail = clinicalDetails[item];
          const open = openItem === item;
          return (
            <li key={item} className="rounded-xl bg-white p-2">
              <button onClick={() => setOpenItem(open ? null : item)} className="w-full text-left font-medium text-slate-800">
                {item}
              </button>
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
