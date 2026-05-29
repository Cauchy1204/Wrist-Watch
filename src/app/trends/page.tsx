"use client";

import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { useRecords } from "@/lib/hooks";
import { recentRecords } from "@/lib/summary";

export default function TrendsPage() {
  const records = recentRecords(useRecords()).filter((record) => !record.noSymptom).reverse();
  const max = Math.max(10, ...records.map((record) => record.severity ?? 0));

  return (
    <Page>
      <PageHeader title="趋势统计" kicker="Trends" />
      <section className="premium-card rounded-2xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-ink">最近 14 天强度</h2>
          <span className="text-xs text-slate-500">{records.length} 条症状</span>
        </div>
        {records.length === 0 ? (
          <p className="py-8 text-center text-sm leading-6 text-slate-500">暂无可统计的症状记录。</p>
        ) : (
          <div className="flex h-56 items-end gap-2 border-b border-slate-200/80 px-1">
            {records.map((record) => (
              <div key={record.id} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-azure/85 to-violet shadow-[0_8px_18px_rgba(47,125,255,0.16)]"
                  style={{ height: `${Math.max(8, ((record.severity ?? 0) / max) * 190)}px` }}
                />
                <span className="text-[10px] text-slate-400">{new Date(record.createdAt).getDate()}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-5 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((band) => {
          const labels = ["轻度 1-3", "中度 4-6", "重度 7-10"];
          const count = records.filter((record) => {
            const severity = record.severity ?? 0;
            if (band === 0) return severity >= 1 && severity <= 3;
            if (band === 1) return severity >= 4 && severity <= 6;
            return severity >= 7;
          }).length;
          return (
            <div key={labels[band]} className="premium-card rounded-xl p-4 text-center">
              <p className="text-xs text-slate-500">{labels[band]}</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{count}</p>
            </div>
          );
        })}
      </section>
    </Page>
  );
}
