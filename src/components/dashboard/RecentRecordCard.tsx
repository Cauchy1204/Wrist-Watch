import { formatDateTime } from "@/lib/date";
import { regionLabels, SymptomRecord } from "@/types/symptom";

export function RecentRecordCard({ record }: { record?: SymptomRecord }) {
  return (
    <section className="mt-5">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold text-ink">最近一次症状</h2>
        <span className="text-xs font-medium text-slate-400">Latest</span>
      </div>
      <div className="premium-card mt-3 rounded-2xl p-4">
        {record ? (
          <>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink">{regionLabels[record.region]}</p>
              <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet ring-1 ring-violet/10">
                {record.severity ?? "-"} / 10
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{formatDateTime(record.createdAt)}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-azure to-violet"
                style={{ width: `${Math.min(100, Math.max(0, (record.severity ?? 0) * 10))}%` }}
              />
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{record.rawText}</p>
          </>
        ) : (
          <p className="text-sm leading-6 text-slate-500">还没有症状记录。完成第一次记录后，这里会显示最近的疼痛部位、强度和摘要。</p>
        )}
      </div>
    </section>
  );
}
