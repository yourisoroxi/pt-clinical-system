export function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-bold text-slate-700">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-4">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
