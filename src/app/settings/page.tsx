"use client";

import { Bell, Trash2 } from "lucide-react";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/ui/PageHeader";
import { loadSettings, saveRecords, saveSettings } from "@/lib/storage";
import { useRecords, useSettings } from "@/lib/hooks";

export default function SettingsPage() {
  const settings = useSettings();
  const records = useRecords();

  function update(next: Partial<typeof settings>) {
    saveSettings({ ...loadSettings(), ...next });
  }

  function clearRecords() {
    if (confirm("确认清空本机所有记录？")) saveRecords([]);
  }

  return (
    <Page>
      <PageHeader title="设置" kicker="Settings" />
      <section className="premium-card rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <div className="subtle-ring flex h-11 w-11 items-center justify-center rounded-full bg-white text-violet">
            <Bell size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-ink">晚间提醒</h2>
            <p className="text-sm text-slate-500">前端模拟提醒逻辑</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">开启提醒</span>
          <button
            onClick={() => update({ reminderEnabled: !settings.reminderEnabled })}
            className={`relative h-8 w-14 rounded-full transition ${settings.reminderEnabled ? "bg-gradient-to-r from-azure to-violet" : "bg-slate-300"}`}
            aria-label="切换晚间提醒"
          >
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${settings.reminderEnabled ? "left-7" : "left-1"}`} />
          </button>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium text-slate-600">提醒时间</span>
          <input
            type="time"
            value={settings.reminderTime}
            onChange={(event) => update({ reminderTime: event.target.value })}
            className="premium-card mt-2 w-full rounded-xl px-4 py-3 text-lg font-semibold text-ink outline-none focus:ring-2 focus:ring-violet/25"
          />
        </label>
      </section>

      <section className="premium-card mt-5 rounded-2xl p-5">
        <h2 className="font-semibold text-ink">本地数据</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">当前浏览器中保存了 {records.length} 条记录。原型阶段所有数据都留在本机。</p>
        <button onClick={clearRecords} className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600">
          <Trash2 size={18} />
          清空记录
        </button>
      </section>
    </Page>
  );
}
