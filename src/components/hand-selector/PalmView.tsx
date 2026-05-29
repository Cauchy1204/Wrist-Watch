import { PainRegion } from "@/types/symptom";
import { HotspotLayer } from "./HotspotLayer";
import { palmHotspots } from "./hotspots";

export function PalmView({
  selected,
  onSelect
}: {
  selected?: PainRegion;
  onSelect: (region: PainRegion) => void;
}) {
  return (
    <>
      <img
        src="/assets/palm-right-hand.png"
        alt="Right hand palm view"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />
      <HotspotLayer hotspots={palmHotspots} selected={selected} onSelect={onSelect} ariaLabel="右腕掌侧疼痛区域选择" />
    </>
  );
}
