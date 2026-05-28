"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ClipboardList, Home, LineChart, Settings } from "lucide-react";

const items = [
  { href: "/", label: "首页", icon: Home },
  { href: "/timeline", label: "时间轴", icon: ClipboardList },
  { href: "/summary", label: "总结", icon: Activity },
  { href: "/trends", label: "趋势", icon: LineChart },
  { href: "/settings", label: "设置", icon: Settings }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-white/70 bg-white/80 px-3 pb-safe pt-2 backdrop-blur-2xl">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-12 flex-col items-center justify-center rounded-lg text-[11px] transition ${
                active ? "bg-violet/10 text-violet" : "text-slate-500"
              }`}
            >
              <Icon size={19} strokeWidth={active ? 2.6 : 2} />
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
