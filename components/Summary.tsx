export function Summary({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-sm">
      <p className="font-bold">{title}</p>
      {items.length === 0 ? (
        <p className="mt-2 text-slate-500">None selected</p>
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}
