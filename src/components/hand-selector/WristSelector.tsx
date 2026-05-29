"use client";

import { HandView, PainRegion } from "@/types/symptom";
import { DorsalView } from "./DorsalView";
import { PalmView } from "./PalmView";

type WristSelectorProps = {
  view: HandView;
  selected?: PainRegion;
  onSelect: (region: PainRegion) => void;
};

export function WristSelector({ view, selected, onSelect }: WristSelectorProps) {
  return (
    <div className="premium-card overflow-hidden rounded-2xl bg-white/86 backdrop-blur-2xl">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[332px]">
        {view === "palm" ? (
          <PalmView selected={selected} onSelect={onSelect} />
        ) : (
          <DorsalView selected={selected} onSelect={onSelect} />
        )}
      </div>
      <style jsx>{`
        :global(.wrist-hotspot:not([data-selected="true"]):hover) {
          fill: rgba(47, 125, 255, 0.08);
          stroke: rgba(255, 255, 255, 0.72);
          filter: drop-shadow(0 0 8px rgba(47, 125, 255, 0.18));
        }
      `}</style>
    </div>
  );
}
