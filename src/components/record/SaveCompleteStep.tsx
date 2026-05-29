import Link from "next/link";
import { Check } from "lucide-react";

export function SaveCompleteStep() {
  return (
    <section className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
      <div className="subtle-ring flex h-20 w-20 items-center justify-center rounded-full bg-white text-pulse">
        <Check size={42} />
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-ink">已保存</h1>
      <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">这条记录已经保存在本机。你可以继续查看时间轴，或回到首页。</p>
      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        <Link href="/timeline" className="premium-card rounded-xl py-4 font-semibold text-ink">
          查看时间轴
        </Link>
        <Link href="/" className="primary-action rounded-xl py-4 font-semibold text-white">
          回到首页
        </Link>
      </div>
    </section>
  );
}
