export function CommentBuilder({
  comment,
  autoComment,
  setComment,
  onGenerate,
  onCopy,
  onCopyHep,
}: {
  comment: string;
  autoComment: string;
  setComment: (v: string) => void;
  onGenerate: () => void;
  onCopy: () => void;
  onCopyHep: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Auto-Generated Audit-Safe Comment</h2>
        <div className="flex gap-2">
          <button onClick={onGenerate} className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
            Generate
          </button>
          <button onClick={onCopy} className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
            Copy Comment
          </button>
          <button onClick={onCopyHep} className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white">
            Copy HEP
          </button>
        </div>
      </div>

      <textarea
        value={comment || autoComment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[270px] w-full rounded-2xl border bg-slate-50 p-5 text-sm leading-7"
      />
    </div>
  );
}
