import { Save } from "lucide-react";
import { formatDateTime } from "@/lib/date";
import { PainRegion, regionLabels } from "@/types/symptom";

export function ReviewSaveStep({
  region,
  severity,
  triggers,
  note,
  occurredAt,
  onSave
}: {
  region: PainRegion;
  severity: number | null;
  triggers: string[];
  note: string;
  occurredAt: string;
  onSave: () => void;
}) {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-ink">检查记录</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">确认无误后保存到本机。</p>

      <div className="premium-card mt-5 rounded-2xl p-4">
        <dl className="space-y-4">
          <PreviewRow label="发生时间" value={formatDateTime(occurredAt)} />
          <PreviewRow label="部位" value={regionLabels[region]} />
          <PreviewRow label="疼痛强度" value={severity === null ? "未选择" : `${severity} / 10`} />
          <PreviewRow label="疼痛诱因" value={triggers.length ? triggers.join("、") : "未选择"} />
          <PreviewRow label="备注" value={note.trim() || "无"} />
        </dl>
      </div>

      <button onClick={onSave} className="primary-action mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white">
        <Save size={18} />
        保存记录
      </button>
    </section>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold leading-6 text-ink">{value}</dd>
    </div>
  );
}
