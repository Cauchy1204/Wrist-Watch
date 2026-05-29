import { Save } from "lucide-react";
import { PainRegion, regionLabels, SymptomRecord } from "@/types/symptom";
import { EditableField } from "./EditableField";

export function ParsedResultStep({
  region,
  draft,
  onDraftChange,
  onSave
}: {
  region: PainRegion;
  draft: Partial<SymptomRecord>;
  onDraftChange: (draft: Partial<SymptomRecord>) => void;
  onSave: () => void;
}) {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-ink">解析结果</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">这是本地规则解析结果，你可以在保存前手动调整。</p>
      <div className="mt-5 space-y-3">
        <EditableField label="部位" value={regionLabels[region]} disabled />
        <EditableField label="疼痛类型" value={draft.painType ?? ""} onChange={(value) => onDraftChange({ ...draft, painType: value })} />
        <EditableField label="强度 0-10" type="number" value={String(draft.severity ?? "")} onChange={(value) => onDraftChange({ ...draft, severity: Number(value) })} />
        <EditableField label="诱因" value={draft.trigger ?? ""} onChange={(value) => onDraftChange({ ...draft, trigger: value })} />
        <EditableField
          label="加重动作"
          value={(draft.aggravatingMotion ?? []).join("、")}
          onChange={(value) => onDraftChange({ ...draft, aggravatingMotion: value.split(/[、,，]/).filter(Boolean) })}
        />
        <label className="block rounded-xl bg-white/82 p-4">
          <span className="text-xs font-semibold text-slate-500">备注原文</span>
          <textarea
            value={draft.note ?? ""}
            onChange={(event) => onDraftChange({ ...draft, note: event.target.value, rawText: event.target.value })}
            className="mt-2 min-h-24 w-full resize-none bg-transparent text-sm leading-6 text-ink outline-none"
          />
        </label>
      </div>
      <button onClick={onSave} className="primary-action mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white">
        <Save size={18} />
        保存记录
      </button>
    </section>
  );
}
