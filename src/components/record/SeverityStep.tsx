const severityValues = Array.from({ length: 11 }, (_, index) => index);

export function SeverityStep({
  severity,
  onSeverityChange,
  onNext
}: {
  severity: number | null;
  onSeverityChange: (severity: number) => void;
  onNext: () => void;
}) {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-ink">选择疼痛强度</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">选择 0-10 中最接近本次右腕疼痛的强度。</p>

      <div className="premium-card mt-5 rounded-2xl p-4">
        <div className="grid grid-cols-6 gap-2">
          {severityValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onSeverityChange(value)}
              className={`rounded-xl py-3 text-base font-semibold transition duration-200 ${
                severity === value ? "primary-action text-white" : "bg-white/82 text-slate-600 shadow-[inset_0_0_0_1px_rgba(226,232,240,0.9)]"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs font-semibold text-slate-500">
          <span className="rounded-lg bg-slate-100/80 py-2">0 无痛</span>
          <span className="rounded-lg bg-slate-100/80 py-2">1-3 轻度</span>
          <span className="rounded-lg bg-slate-100/80 py-2">4-6 中度</span>
          <span className="rounded-lg bg-slate-100/80 py-2">7-10 重度</span>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={severity === null}
        className="primary-action mt-5 w-full rounded-xl py-4 font-semibold text-white disabled:opacity-45"
      >
        下一步：选择诱因
      </button>
    </section>
  );
}
