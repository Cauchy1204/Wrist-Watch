"use client";

import Link from "next/link";
import { Check, ChevronLeft, Mic, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { WristSelector } from "@/components/WristSelector";
import { Page } from "@/components/Page";
import { parseSymptomText } from "@/lib/parser";
import { addRecord } from "@/lib/storage";
import { HandView, PainRegion, regionLabels, SymptomRecord } from "@/lib/types";

const placeholder = "今天下午打字久了以后开始疼，拧瓶盖时更明显，隐隐作痛，大概4分左右。";

export default function RecordPage() {
  const [step, setStep] = useState(1);
  const [view, setView] = useState<HandView>("palm");
  const [region, setRegion] = useState<PainRegion>("right_central_wrist");
  const [text, setText] = useState("");
  const [draft, setDraft] = useState<Partial<SymptomRecord> | null>(null);

  const parsed = useMemo(() => parseSymptomText(text || placeholder, region, view), [text, region, view]);

  function goPreview() {
    setDraft(parsed);
    setStep(3);
  }

  function save() {
    addRecord({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      bodyPart: "right_wrist",
      view,
      region,
      rawText: text || placeholder,
      painType: draft?.painType,
      severity: Number(draft?.severity ?? parsed.severity),
      trigger: draft?.trigger,
      aggravatingMotion: normalizeList(draft?.aggravatingMotion),
      relievingFactors: normalizeList(draft?.relievingFactors),
      note: draft?.note ?? text
    });
    setStep(4);
  }

  return (
    <Page withNav={false}>
      <div className="mb-5 flex items-center justify-between pt-2">
        <button onClick={() => (step === 1 ? history.back() : setStep(step - 1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80">
          <ChevronLeft size={22} />
        </button>
        <div className="text-sm font-semibold text-slate-500">Step {step} / 4</div>
      </div>

      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-gradient-to-r from-azure to-violet transition-all" style={{ width: `${step * 25}%` }} />
      </div>

      {step === 1 ? (
        <section>
          <h1 className="text-3xl font-semibold tracking-normal text-ink">选择疼痛部位</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">先固定记录右手，切换掌侧或背侧后点击对应区域。</p>
          <div className="my-5 grid grid-cols-2 rounded-xl bg-white p-1">
            {(["palm", "dorsal"] as HandView[]).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setView(item);
                  setRegion(item === "palm" ? "right_central_wrist" : "right_dorsal_central_wrist");
                }}
                className={`rounded-lg py-3 text-sm font-semibold ${view === item ? "bg-ink text-white" : "text-slate-500"}`}
              >
                {item === "palm" ? "Palm 掌侧" : "Dorsal 背侧"}
              </button>
            ))}
          </div>
          <WristSelector view={view} selected={region} onSelect={setRegion} />
          <button onClick={() => setStep(2)} className="mt-5 w-full rounded-xl bg-ink py-4 font-semibold text-white">
            下一步：描述症状
          </button>
        </section>
      ) : null}

      {step === 2 ? (
        <section>
          <h1 className="text-3xl font-semibold tracking-normal text-ink">描述症状</h1>
          <div className="glass mt-4 rounded-xl p-4">
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
              onChange={(event) => setText(event.target.value)}
              placeholder={placeholder}
              className="min-h-48 w-full resize-none rounded-2xl border border-white bg-white/82 p-4 leading-7 text-ink shadow-soft outline-none focus:ring-2 focus:ring-violet/35"
            />
          </label>
          <button onClick={goPreview} className="mt-5 w-full rounded-xl bg-ink py-4 font-semibold text-white">
            AI 解析预览
          </button>
        </section>
      ) : null}

      {step === 3 && draft ? (
        <section>
          <h1 className="text-3xl font-semibold tracking-normal text-ink">解析结果</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">这是本地规则解析结果，你可以在保存前手动调整。</p>
          <div className="mt-5 space-y-3">
            <Editable label="部位" value={regionLabels[region]} disabled />
            <Editable label="疼痛类型" value={draft.painType ?? ""} onChange={(value) => setDraft({ ...draft, painType: value })} />
            <Editable label="强度 0-10" type="number" value={String(draft.severity ?? "")} onChange={(value) => setDraft({ ...draft, severity: Number(value) })} />
            <Editable label="诱因" value={draft.trigger ?? ""} onChange={(value) => setDraft({ ...draft, trigger: value })} />
            <Editable
              label="加重动作"
              value={(draft.aggravatingMotion ?? []).join("、")}
              onChange={(value) => setDraft({ ...draft, aggravatingMotion: value.split(/[、,，]/).filter(Boolean) })}
            />
            <label className="block rounded-xl bg-white/82 p-4">
              <span className="text-xs font-semibold text-slate-500">备注原文</span>
              <textarea
                value={draft.note ?? ""}
                onChange={(event) => setDraft({ ...draft, note: event.target.value, rawText: event.target.value })}
                className="mt-2 min-h-24 w-full resize-none bg-transparent text-sm leading-6 text-ink outline-none"
              />
            </label>
          </div>
          <button onClick={save} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-4 font-semibold text-white">
            <Save size={18} />
            保存记录
          </button>
        </section>
      ) : null}

      {step === 4 ? (
        <section className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pulse/12 text-pulse">
            <Check size={42} />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-normal text-ink">已保存</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">这条记录已经保存在本机。你可以继续查看时间轴，或回到首页。</p>
          <div className="mt-8 grid w-full grid-cols-2 gap-3">
            <Link href="/timeline" className="rounded-xl bg-white py-4 font-semibold text-ink">
              查看时间轴
            </Link>
            <Link href="/" className="rounded-xl bg-ink py-4 font-semibold text-white">
              回到首页
            </Link>
          </div>
        </section>
      ) : null}
    </Page>
  );
}

function Editable({
  label,
  value,
  onChange,
  type = "text",
  disabled = false
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block rounded-xl bg-white/82 p-4">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        min={type === "number" ? 0 : undefined}
        max={type === "number" ? 10 : undefined}
        onChange={(event) => onChange?.(event.target.value)}
        className="mt-2 w-full bg-transparent text-base font-medium text-ink outline-none disabled:opacity-100"
      />
    </label>
  );
}

function normalizeList(value: unknown) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}
