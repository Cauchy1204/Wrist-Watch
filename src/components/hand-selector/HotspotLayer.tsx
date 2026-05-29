import { PainRegion } from "@/types/symptom";
import { Hotspot } from "./hotspots";

export function HotspotLayer({
  hotspots,
  selected,
  onSelect,
  ariaLabel
}: {
  hotspots: Hotspot[];
  selected?: PainRegion;
  onSelect: (region: PainRegion) => void;
  ariaLabel: string;
}) {
  return (
    <svg viewBox="0 0 1024 1536" className="absolute inset-0 h-full w-full" role="img" aria-label={ariaLabel}>
      <defs>
        <linearGradient id="selected-zone" x1="250" y1="860" x2="810" y2="1060" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" stopOpacity="0.76" />
          <stop offset="1" stopColor="#6258E8" stopOpacity="0.82" />
        </linearGradient>
        <filter id="zone-glow" x="-30%" y="-45%" width="160%" height="190%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#6258E8" floodOpacity="0.24" />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#3B82F6" floodOpacity="0.18" />
        </filter>
      </defs>
      {hotspots.map((hotspot) => (
        <HotspotPath key={hotspot.id} hotspot={hotspot} selected={selected === hotspot.id} onSelect={() => onSelect(hotspot.id)} />
      ))}
    </svg>
  );
}

function HotspotPath({
  hotspot,
  selected,
  onSelect
}: {
  hotspot: Hotspot;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <path
      d={hotspot.d}
      role="button"
      tabIndex={0}
      aria-label={hotspot.id}
      data-selected={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect();
      }}
      className="wrist-hotspot cursor-pointer outline-none transition duration-300 ease-out"
      fill={selected ? "url(#selected-zone)" : "rgba(255,255,255,0.01)"}
      stroke={selected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)"}
      strokeWidth={selected ? 7 : 5}
      filter={selected ? "url(#zone-glow)" : undefined}
      opacity={selected ? 1 : 0.98}
      style={{ pointerEvents: "auto" }}
    />
  );
}
