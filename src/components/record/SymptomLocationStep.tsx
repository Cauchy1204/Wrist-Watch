import { WristSelector } from "@/components/hand-selector/WristSelector";
import { HandView, PainRegion } from "@/types/symptom";

export function SymptomLocationStep({
  view,
  region,
  onViewChange,
  onRegionChange,
  onNext
}: {
  view: HandView;
  region: PainRegion;
  onViewChange: (view: HandView) => void;
  onRegionChange: (region: PainRegion) => void;
  onNext: () => void;
}) {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-ink">选择疼痛部位</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">先固定记录右手，切换掌侧或背侧后点击对应区域。</p>
      <div className="premium-card my-5 grid grid-cols-2 rounded-xl p-1">
        {(["palm", "dorsal"] as HandView[]).map((item) => (
          <button
            key={item}
            onClick={() => {
              onViewChange(item);
              onRegionChange(item === "palm" ? "right_central_wrist" : "right_dorsal_central_wrist");
            }}
            className={`rounded-lg py-3 text-sm font-semibold transition duration-200 ${view === item ? "primary-action text-white" : "text-slate-500 hover:bg-white/70"}`}
          >
            {item === "palm" ? "Palm 掌侧" : "Dorsal 背侧"}
          </button>
        ))}
      </div>
      <WristSelector view={view} selected={region} onSelect={onRegionChange} />
      <button onClick={onNext} className="primary-action mt-5 w-full rounded-xl py-4 font-semibold text-white">
        下一步：选择强度
      </button>
    </section>
  );
}
