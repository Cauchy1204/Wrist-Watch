import { Mic } from "lucide-react";
import { PainRegion, regionLabels } from "@/types/symptom";

export function SymptomTextStep({
  region,
  text,
  placeholder,
  onTextChange,
  onPreview
}: {
  region: PainRegion;
  text: string;
  placeholder: string;
  onTextChange: (text: string) => void;
  onPreview: () => void;
}) {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-ink">描述症状</h1>
      <div className="premium-card mt-4 rounded-xl p-4">
        <p className="text-sm text-slate-500">已选部位</p>
        <p className="mt-1 text-xl font-semibold text-ink">{regionLabels[region]}</p>
      </div>
      <label className="mt-5 block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Mic size={17} className="text-violet" />
          模拟语音输入结果
        </span>
        <textarea
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder={placeholder}
          className="premium-card min-h-48 w-full resize-none rounded-2xl p-4 leading-7 text-ink outline-none focus:ring-2 focus:ring-violet/25"
        />
      </label>
      <button onClick={onPreview} className="primary-action mt-5 w-full rounded-xl py-4 font-semibold text-white">
        AI 解析预览
      </button>
    </section>
  );
}
