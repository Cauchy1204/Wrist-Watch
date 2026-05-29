export function SectionTitle({
  title,
  meta
}: {
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {meta ? <span className="text-xs font-medium text-slate-400">{meta}</span> : null}
    </div>
  );
}
