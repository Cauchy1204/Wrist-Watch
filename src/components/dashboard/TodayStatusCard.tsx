import { Bell } from "lucide-react";

export function TodayStatusCard({
  showReminder,
  reminderTime,
  onMarkNoSymptom
}: {
  showReminder: boolean;
  reminderTime: string;
  onMarkNoSymptom: () => void;
}) {
  if (!showReminder) return null;

  return (
    <div className="premium-card mt-5 flex items-start gap-3 rounded-2xl p-4">
      <div className="subtle-ring mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-violet">
        <Bell size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold leading-6 text-ink">今天还没有记录，晚上 {reminderTime} 我会提醒你。</p>
        <button onClick={onMarkNoSymptom} className="mt-2 text-sm font-semibold text-violet">
          记录为无症状
        </button>
      </div>
    </div>
  );
}
