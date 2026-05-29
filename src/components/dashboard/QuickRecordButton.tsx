import Link from "next/link";
import { Plus } from "lucide-react";

export function QuickRecordButton() {
  return (
    <Link href="/record" className="primary-action mt-5 flex items-center justify-between rounded-2xl p-5 text-white transition duration-200 active:scale-[0.99]">
      <div>
        <p className="text-xs font-semibold uppercase text-white/54">Quick Check-in</p>
        <p className="mt-1.5 text-xl font-semibold">快速记录右腕症状</p>
      </div>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-ink shadow-lift">
        <Plus size={24} />
      </span>
    </Link>
  );
}
