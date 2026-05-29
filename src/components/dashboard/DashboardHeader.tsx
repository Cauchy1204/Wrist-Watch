import { Activity } from "lucide-react";
import { DashboardSparkline } from "./DashboardSparkline";

export function DashboardHeader({
  todayCount,
  latestSeverity,
  recentTrend
}: {
  todayCount: number;
  latestSeverity?: number;
  recentTrend: number[];
}) {
  const greeting = getGreetingByHour(new Date().getHours());

  return (
    <section className="gradient-panel rounded-b-[2rem] px-5 pb-6 pt-safe text-white -mx-5 -mt-4">
      <div className="flex items-center justify-between pt-3">
        <div className="min-w-0 pr-4">
          <p className="text-xs font-semibold uppercase text-white/58">Rise the Watch</p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[1.08]">{greeting}，今天手腕还好吗？</h1>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl">
          <Activity size={24} />
        </div>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/14 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl">
          <p className="text-xs font-medium text-white/58">今日记录</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{todayCount}</p>
        </div>
        <div className="rounded-xl border border-white/14 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl">
          <p className="text-xs font-medium text-white/58">最近强度</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{latestSeverity ?? "-"}</p>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-white/12 bg-white/[0.09] p-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-white/58">近期趋势</p>
          <p className="text-xs text-white/44">0-10</p>
        </div>
        <DashboardSparkline values={recentTrend} />
      </div>
    </section>
  );
}

function getGreetingByHour(hour: number) {
  if (hour >= 5 && hour < 12) return "早上好";
  if (hour >= 12 && hour < 14) return "中午好";
  if (hour >= 14 && hour < 18) return "下午好";
  if (hour >= 18) return "晚上好";
  return "夜深了";
}
