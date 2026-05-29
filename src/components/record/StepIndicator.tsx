import { ChevronLeft } from "lucide-react";

export function StepIndicator({
  step,
  totalSteps = 4,
  onBack
}: {
  step: number;
  totalSteps?: number;
  onBack: () => void;
}) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between pt-2">
        <button onClick={onBack} className="subtle-ring flex h-10 w-10 items-center justify-center rounded-full bg-white/86">
          <ChevronLeft size={22} />
        </button>
        <div className="text-sm font-semibold text-slate-500">Step {step} / {totalSteps}</div>
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/70 shadow-inner">
        <div className="h-full rounded-full bg-gradient-to-r from-azure to-violet transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>
    </>
  );
}
