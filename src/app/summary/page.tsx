"use client";

import { FileText } from "lucide-react";
import { Page } from "@/components/layout/Page";
import { PainDistributionMap } from "@/components/summary/PainDistributionMap";
import { SummaryPdfExportButton } from "@/components/summary/SummaryPdfExportButton";
import { SummaryRow } from "@/components/summary/SummaryRow";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/StatCard";
import { useRecords } from "@/lib/hooks";
import { summarize } from "@/lib/summary";

export default function SummaryPage() {
  const records = useRecords();
  const result = summarize(records);

  return (
    <Page>
      <PageHeader title="就诊总结" kicker="Pre-visit Summary" />
      <section className="gradient-panel rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/14 backdrop-blur-xl">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-sm text-white/62">最近 14 天</p>
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

      <section className="premium-card mt-5 rounded-2xl p-4">
        <dl className="space-y-4">
          <SummaryRow label="最常见部位" value={result.mostCommonRegion} />
          <SummaryRow label="常见诱因" value={result.commonTrigger} />
          <SummaryRow label="常见加重动作" value={result.commonMotion} />
        </dl>
      </section>

      <PainDistributionMap records={records} />

      <SummaryPdfExportButton records={records} summary={result} />
    </Page>
  );
}
