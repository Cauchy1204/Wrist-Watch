import { Circle } from "lucide-react";
import { formatDateTime } from "@/lib/date";
import { regionLabels, SymptomRecord } from "@/types/symptom";

export function TimelineRecordCard({
  record,
  onSelect
}: {
  record: SymptomRecord;
  onSelect?: (record: SymptomRecord) => void;
}) {
  const occurrenceTime = record.occurredAt ?? record.createdAt;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(record)}
      className="premium-card w-full rounded-2xl p-4 text-left transition duration-200 active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        <div className={`subtle-ring mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white ${record.noSymptom ? "text-pulse" : "text-violet"}`}>
          <Circle size={15} fill="currentColor" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-ink">{record.noSymptom ? "无症状记录" : regionLabels[record.region]}</p>
            <span className="shrink-0 rounded-full bg-slate-100/80 px-3 py-1 text-xs font-semibold text-slate-600">
              {record.noSymptom ? "0" : record.severity ?? "-"} / 10
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">{formatDateTime(occurrenceTime)}</p>
          {!record.noSymptom ? (
            <p className="mt-2 text-sm text-slate-500">
              {record.trigger ?? "诱因未明确"} · {(record.aggravatingMotion ?? ["动作未明确"]).join("、")}
            </p>
          ) : null}
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{record.rawText}</p>
        </div>
      </div>
    </button>
  );
}
