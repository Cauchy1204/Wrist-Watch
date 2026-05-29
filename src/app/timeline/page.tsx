"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Page } from "@/components/layout/Page";
import { TimelineRecordDetailSheet } from "@/components/timeline/TimelineRecordDetailSheet";
import { TimelineRecordCard } from "@/components/timeline/TimelineRecordCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatDay } from "@/lib/date";
import { useRecords } from "@/lib/hooks";
import { deleteRecord } from "@/lib/storage";
import { SymptomRecord } from "@/types/symptom";

export default function TimelinePage() {
  const records = useRecords();
  const [selectedRecord, setSelectedRecord] = useState<SymptomRecord | null>(null);
  const sortedRecords = [...records].sort((a, b) => getRecordTime(b).getTime() - getRecordTime(a).getTime());
  const groups = sortedRecords.reduce<Record<string, typeof sortedRecords>>((acc, record) => {
    const key = getRecordTime(record).toDateString();
    acc[key] = acc[key] ? [...acc[key], record] : [record];
    return acc;
  }, {});

  function handleDelete(record: SymptomRecord) {
    deleteRecord(record.id);
    setSelectedRecord(null);
  }

  return (
    <Page>
      <PageHeader title="症状时间轴" kicker="Timeline" />
      {records.length === 0 ? (
        <div className="premium-card rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold text-ink">暂无记录</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">完成一次症状记录或无症状记录后，这里会按日期展示历史。</p>
          <Link href="/record" className="primary-action mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white">
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
                  <TimelineRecordCard key={record.id} record={record} onSelect={setSelectedRecord} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
      <TimelineRecordDetailSheet record={selectedRecord} onClose={() => setSelectedRecord(null)} onDelete={handleDelete} />
    </Page>
  );
}

function getRecordTime(record: { occurredAt?: string; createdAt: string }) {
  return new Date(record.occurredAt ?? record.createdAt);
}
