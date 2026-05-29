import Link from "next/link";
import { CalendarDays, ChevronRight, FileText, LineChart, Settings } from "lucide-react";
import { MetricCard } from "@/components/ui/StatCard";

const modules = [
  { href: "/timeline", label: "症状时间轴", icon: CalendarDays },
  { href: "/summary", label: "就诊总结", icon: FileText },
  { href: "/trends", label: "趋势统计", icon: LineChart },
  { href: "/settings", label: "设置", icon: Settings }
];

export function QuickActionGrid({ reminderTime }: { reminderTime: string }) {
  return (
    <>
      <section className="mt-5 grid grid-cols-2 gap-3">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link key={module.href} href={module.href} className="premium-card flex min-h-28 flex-col justify-between rounded-xl p-4 transition duration-200 active:scale-[0.99]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 text-violet">
                <Icon size={20} />
              </span>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">{module.label}</span>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <MetricCard label="本地优先" value="Local" />
        <MetricCard label="提醒时间" value={reminderTime} />
      </section>
    </>
  );
}
