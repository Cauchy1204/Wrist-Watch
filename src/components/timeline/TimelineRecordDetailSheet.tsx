import { Trash2, X } from "lucide-react";
import { formatDateTime } from "@/lib/date";
import { regionLabels, SymptomRecord } from "@/types/symptom";

export function TimelineRecordDetailSheet({
  record,
  onClose,
  onDelete
}: {
  record: SymptomRecord | null;
  onClose: () => void;
  onDelete: (record: SymptomRecord) => void;
}) {
  if (!record) return null;

  const occurrenceTime = record.occurredAt ?? record.createdAt;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/28 px-4 pb-safe backdrop-blur-sm" role="dialog" aria-modal="true">
      <button type="button" aria-label="关闭详情" className="absolute inset-0 cursor-default" onClick={onClose} />
      <section className="relative z-10 w-full max-w-[430px] rounded-t-[28px] border border-white/80 bg-white p-5 shadow-lift">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-200" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-violet">Record Detail</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">{record.noSymptom ? "无症状记录" : "症状详情"}</h2>
          </div>
          <button type="button" onClick={onClose} className="subtle-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-500">
            <X size={18} />
          </button>
        </div>

        <dl className="mt-5 space-y-4">
          <DetailRow label="记录时间" value={formatDateTime(occurrenceTime)} />
          <DetailRow label="疼痛部位" value={record.noSymptom ? "无症状记录" : getRegionLabel(record)} />
          <DetailRow label="疼痛强度" value={record.noSymptom ? "0 / 10" : formatSeverity(record)} />
          <DetailRow label="疼痛诱因" value={formatTriggers(record)} />
          <DetailRow label="备注" value={record.note || record.rawText || "未记录"} />
          <DetailRow label="创建时间" value={formatDateTime(record.createdAt)} />
        </dl>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border border-violet/10 bg-slate-50 py-3 font-semibold text-ink">
            关闭
          </button>
          <button
            type="button"
            onClick={() => onDelete(record)}
            className="flex items-center justify-center gap-2 rounded-xl bg-rose-50 py-3 font-semibold text-rose-600"
          >
            <Trash2 size={17} />
            删除
          </button>
        </div>
      </section>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold leading-6 text-ink">{value}</dd>
    </div>
  );
}

function getRegionLabel(record: SymptomRecord) {
  return record.region ? regionLabels[record.region] ?? "未记录" : "未记录";
}

function formatSeverity(record: SymptomRecord) {
  return typeof record.severity === "number" ? `${record.severity} / 10` : "未记录";
}

function formatTriggers(record: SymptomRecord) {
  if (record.triggers?.length) return record.triggers.join("、");
  if (record.trigger) return record.trigger;
  return "未记录";
}
