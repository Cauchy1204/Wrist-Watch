const notePlaceholder = "可补充具体场景，例如：下午连续打字两小时后出现，拧瓶盖时更明显。";

export function NoteStep({
  note,
  occurredDate,
  occurredTime,
  onNoteChange,
  onOccurredDateChange,
  onOccurredTimeChange,
  onNext
}: {
  note: string;
  occurredDate: string;
  occurredTime: string;
  onNoteChange: (note: string) => void;
  onOccurredDateChange: (date: string) => void;
  onOccurredTimeChange: (time: string) => void;
  onNext: () => void;
}) {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-ink">补充备注</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">备注是可选的，用来记录更具体的场景。</p>

      <div className="premium-card mt-5 rounded-2xl p-4">
        <p className="text-sm font-semibold text-slate-600">症状发生时间</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label>
            <span className="mb-2 block text-xs font-semibold text-slate-400">日期</span>
            <input
              type="date"
              value={occurredDate}
              onChange={(event) => onOccurredDateChange(event.target.value)}
              className="w-full rounded-xl border border-violet/10 bg-white px-3 py-3 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-violet/25"
            />
          </label>
          <label>
            <span className="mb-2 block text-xs font-semibold text-slate-400">时间</span>
            <input
              type="time"
              value={occurredTime}
              onChange={(event) => onOccurredTimeChange(event.target.value)}
              className="w-full rounded-xl border border-violet/10 bg-white px-3 py-3 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-violet/25"
            />
          </label>
        </div>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-600">备注</span>
        <textarea
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder={notePlaceholder}
          className="premium-card min-h-48 w-full resize-none rounded-2xl p-4 leading-7 text-ink outline-none focus:ring-2 focus:ring-violet/25"
        />
      </label>

      <button onClick={onNext} className="primary-action mt-5 w-full rounded-xl py-4 font-semibold text-white">
        下一步：检查并保存
      </button>
    </section>
  );
}
