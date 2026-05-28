"use client";

import Link from "next/link";
import { Activity, Bell, CalendarDays, ChevronRight, FileText, LineChart, Plus, Settings } from "lucide-react";
import { Page } from "@/components/Page";
import { MetricCard } from "@/components/MetricCard";
import { formatDateTime, isSameDay } from "@/lib/date";
import { addRecord } from "@/lib/storage";
import { useRecords, useSettings } from "@/lib/hooks";
import { regionLabels } from "@/lib/types";

const modules = [
  { href: "/timeline", label: "症状时间轴", icon: CalendarDays },
  { href: "/summary", label: "就诊总结", icon: FileText },
  { href: "/trends", label: "趋势统计", icon: LineChart },
  { href: "/settings", label: "设置", icon: Settings }
];

export default function Dashboard() {
  const records = useRecords();
  const settings = useSettings();
  const todayRecords = records.filter((record) => isSameDay(record.createdAt, new Date()));
  const latest = records.find((record) => !record.noSymptom);

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
      <section className="gradient-panel rounded-b-[2rem] px-5 pb-7 pt-safe text-white shadow-soft -mx-5 -mt-4">
        <div className="flex items-center justify-between pt-3">
          <div>
            <p className="text-sm text-white/75">Rise the Watch</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">晚上好，今天手腕还好吗？</h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/18">
            <Activity size={24} />
          </div>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/16 p-4">
            <p className="text-xs text-white/70">今日记录</p>
            <p className="mt-2 text-3xl font-semibold">{todayRecords.length}</p>
          </div>
          <div className="rounded-xl bg-white/16 p-4">
            <p className="text-xs text-white/70">最近强度</p>
            <p className="mt-2 text-3xl font-semibold">{latest?.severity ?? "-"}</p>
          </div>
        </div>
      </section>

      {todayRecords.length === 0 && settings.reminderEnabled ? (
        <div className="glass mt-5 flex items-start gap-3 rounded-xl p-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet">
            <Bell size={18} />
          </div>
          <div>
            <p className="font-medium text-ink">今天还没有记录，晚上 {settings.reminderTime} 我会提醒你。</p>
            <button onClick={markNoSymptom} className="mt-2 text-sm font-semibold text-violet">
              记录为无症状
            </button>
          </div>
        </div>
      ) : null}

      <Link href="/record" className="mt-5 flex items-center justify-between rounded-2xl bg-ink p-5 text-white shadow-soft">
        <div>
          <p className="text-sm text-white/65">Quick Check-in</p>
          <p className="mt-1 text-xl font-semibold">快速记录右腕症状</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink">
          <Plus size={24} />
        </span>
      </Link>

      <section className="mt-5">
        <h2 className="text-lg font-semibold text-ink">最近一次症状</h2>
        <div className="glass mt-3 rounded-2xl p-4">
          {latest ? (
            <>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-ink">{regionLabels[latest.region]}</p>
                <span className="rounded-full bg-violet/10 px-3 py-1 text-sm font-semibold text-violet">
                  {latest.severity ?? "-"} / 10
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{formatDateTime(latest.createdAt)}</p>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{latest.rawText}</p>
            </>
          ) : (
            <p className="text-sm leading-6 text-slate-500">还没有症状记录。完成第一次记录后，这里会显示最近的疼痛部位、强度和摘要。</p>
          )}
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link key={module.href} href={module.href} className="glass flex min-h-28 flex-col justify-between rounded-xl p-4">
              <Icon className="text-violet" size={22} />
              <div className="flex items-center justify-between">
                <span className="font-medium text-ink">{module.label}</span>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <MetricCard label="本地优先" value="Local" />
        <MetricCard label="提醒时间" value={settings.reminderTime} />
      </section>
    </Page>
  );
}
