"use client";

import { Download, FileText } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Page, PageHeader } from "@/components/Page";
import { useRecords } from "@/lib/hooks";
import { summarize } from "@/lib/summary";

export default function SummaryPage() {
  const records = useRecords();
  const result = summarize(records);

  return (
    <Page>
      <PageHeader title="就诊总结" kicker="Pre-visit Summary" />
      <section className="gradient-panel rounded-2xl p-5 text-white shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/18">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-sm text-white/70">最近 14 天</p>
            <h2 className="text-xl font-semibold">医生可读摘要</h2>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-white/90">{result.doctorText}</p>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <MetricCard label="症状出现次数" value={result.symptomCount} />
        <MetricCard label="无症状天数" value={result.noSymptomDays} />
        <MetricCard label="最高强度" value={`${result.highestSeverity}/10`} tone="dark" />
        <MetricCard label="平均强度" value={`${result.averageSeverity}/10`} />
      </section>

      <section className="glass mt-5 rounded-2xl p-4">
        <dl className="space-y-4">
          <Row label="最常见部位" value={result.mostCommonRegion} />
          <Row label="常见诱因" value={result.commonTrigger} />
          <Row label="常见加重动作" value={result.commonMotion} />
        </dl>
      </section>

      <button
        onClick={() => alert("原型阶段：PDF 导出将在后续接入。")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-4 font-semibold text-white"
      >
        <Download size={18} />
        导出 PDF
      </button>
    </Page>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-ink">{value}</dd>
    </div>
  );
}
