"use client";

import { Circle, Plus } from "lucide-react";
import Link from "next/link";
import { Page, PageHeader } from "@/components/Page";
import { formatDay, formatDateTime } from "@/lib/date";
import { useRecords } from "@/lib/hooks";
import { regionLabels } from "@/lib/types";

export default function TimelinePage() {
  const records = useRecords();
  const groups = records.reduce<Record<string, typeof records>>((acc, record) => {
    const key = new Date(record.createdAt).toDateString();
    acc[key] = acc[key] ? [...acc[key], record] : [record];
    return acc;
  }, {});

  return (
    <Page>
      <PageHeader title="症状时间轴" kicker="Timeline" />
      {records.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold text-ink">暂无记录</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">完成一次症状记录或无症状记录后，这里会按日期展示历史。</p>
          <Link href="/record" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white">
            <Plus size={18} />
            开始记录
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(groups).map(([day, dayRecords]) => (
            <section key={day}>
              <h2 className="mb-3 text-sm font-semibold text-violet">{formatDay(day)}</h2>
              <div className="space-y-3">
                {dayRecords.map((record) => (
                  <article key={record.id} className="glass rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full ${record.noSymptom ? "bg-pulse/10 text-pulse" : "bg-violet/10 text-violet"}`}>
                        <Circle size={15} fill="currentColor" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-ink">{record.noSymptom ? "无症状记录" : regionLabels[record.region]}</p>
                          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                            {record.noSymptom ? "0" : record.severity ?? "-"} / 10
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{formatDateTime(record.createdAt)}</p>
                        {!record.noSymptom ? (
                          <p className="mt-2 text-sm text-slate-500">
                            {record.trigger ?? "诱因未明确"} · {(record.aggravatingMotion ?? ["动作未明确"]).join("、")}
                          </p>
                        ) : null}
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{record.rawText}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Page>
  );
}
