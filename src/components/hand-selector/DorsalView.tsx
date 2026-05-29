import { PainRegion } from "@/types/symptom";
import { HotspotLayer } from "./HotspotLayer";
import { dorsalHotspots } from "./hotspots";

export function DorsalView({
  selected,
  onSelect
}: {
  selected?: PainRegion;
  onSelect: (region: PainRegion) => void;
}) {
  return (
    <>
      <img
        src="/assets/dorsal-right-hand.png"
        alt="Right hand dorsal view"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />
      <HotspotLayer hotspots={dorsalHotspots} selected={selected} onSelect={onSelect} ariaLabel="右腕背侧疼痛区域选择" />
    </>
  );
}
