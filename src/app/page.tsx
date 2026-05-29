"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuickActionGrid } from "@/components/dashboard/QuickActionGrid";
import { QuickRecordButton } from "@/components/dashboard/QuickRecordButton";
import { RecentRecordCard } from "@/components/dashboard/RecentRecordCard";
import { TodayStatusCard } from "@/components/dashboard/TodayStatusCard";
import { Page } from "@/components/layout/Page";
import { isSameDay } from "@/lib/date";
import { addRecord } from "@/lib/storage";
import { useRecords, useSettings } from "@/lib/hooks";

export default function Dashboard() {
  const records = useRecords();
  const settings = useSettings();
  const todayRecords = records.filter((record) => isSameDay(record.createdAt, new Date()));
  const latest = records.find((record) => !record.noSymptom);
  const recentTrend = records
    .filter((record) => !record.noSymptom)
    .slice(0, 7)
    .reverse()
    .map((record) => record.severity ?? 0);

  function markNoSymptom() {
    addRecord({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      bodyPart: "right_wrist",
      view: "palm",
      region: "right_central_wrist",
      rawText: "今日无明显右腕症状。",
      note: "无症状记录",
      noSymptom: true
    });
  }

  return (
    <Page>
      <DashboardHeader todayCount={todayRecords.length} latestSeverity={latest?.severity} recentTrend={recentTrend} />
      <TodayStatusCard showReminder={todayRecords.length === 0 && settings.reminderEnabled} reminderTime={settings.reminderTime} onMarkNoSymptom={markNoSymptom} />
      <QuickRecordButton />
      <RecentRecordCard record={latest} />
      <QuickActionGrid reminderTime={settings.reminderTime} />
    </Page>
  );
}
