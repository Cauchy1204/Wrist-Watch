"use client";

import { HandView, PainRegion } from "@/lib/types";

type WristSelectorProps = {
  view: HandView;
  selected?: PainRegion;
  onSelect: (region: PainRegion) => void;
};

type Hotspot = {
  id: PainRegion;
  d: string;
};

const palmHotspots: Hotspot[] = [
  {
    id: "right_radial_wrist",
    d: "M260 908C302 846 372 829 428 862C408 920 406 982 430 1042C363 1065 296 1040 258 984C239 956 239 930 260 908Z"
  },
  {
    id: "right_central_wrist",
    d: "M428 862C494 830 583 831 646 862C680 920 680 992 646 1050C583 1082 494 1081 430 1042C406 982 408 920 428 862Z"
  },
  {
    id: "right_ulnar_wrist",
    d: "M646 862C707 835 775 858 806 916C826 956 813 999 776 1030C738 1062 688 1063 646 1050C680 992 680 920 646 862Z"
  }
];

const dorsalHotspots: Hotspot[] = [
  {
    id: "right_dorsal_radial_wrist",
    d: "M260 910C305 852 373 838 428 866C407 924 407 986 431 1044C367 1064 299 1041 260 986C239 956 239 932 260 910Z"
  },
  {
    id: "right_dorsal_central_wrist",
    d: "M428 866C494 836 584 836 648 866C682 923 682 992 648 1048C584 1080 495 1080 431 1044C407 986 407 924 428 866Z"
  },
  {
    id: "right_dorsal_ulnar_wrist",
    d: "M648 866C709 839 777 861 807 918C828 958 815 1000 778 1030C740 1060 690 1062 648 1048C682 992 682 923 648 866Z"
  },
  {
    id: "anatomical_snuffbox",
    d: "M196 770C232 704 297 686 351 730C340 796 293 852 226 868C188 838 176 804 196 770Z"
  }
];

export function WristSelector({ view, selected, onSelect }: WristSelectorProps) {
  const imageSrc = view === "palm" ? "/assets/palm-right-hand.png" : "/assets/dorsal-right-hand.png";
  const hotspots = view === "palm" ? palmHotspots : dorsalHotspots;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/86 shadow-soft backdrop-blur-2xl">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px]">
        <img
          src={imageSrc}
          alt={view === "palm" ? "Right hand palm view" : "Right hand dorsal view"}
          className="absolute inset-0 h-full w-full object-contain"
          draggable={false}
        />
        <svg
          viewBox="0 0 1024 1536"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={view === "palm" ? "右腕掌侧疼痛区域选择" : "右腕背侧疼痛区域选择"}
        >
          <defs>
            <linearGradient id="selected-zone" x1="250" y1="860" x2="810" y2="1060" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4C9DFF" stopOpacity="0.82" />
              <stop offset="1" stopColor="#7567F6" stopOpacity="0.86" />
            </linearGradient>
            <filter id="zone-glow" x="-30%" y="-45%" width="160%" height="190%">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#7567F6" floodOpacity="0.34" />
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#4C9DFF" floodOpacity="0.28" />
            </filter>
          </defs>
          {hotspots.map((hotspot) => (
            <HotspotPath
              key={hotspot.id}
              hotspot={hotspot}
              selected={selected === hotspot.id}
              onSelect={() => onSelect(hotspot.id)}
            />
          ))}
        </svg>
      </div>
      <style jsx>{`
        :global(.wrist-hotspot:not([data-selected="true"]):hover) {
          fill: rgba(118, 103, 245, 0.1);
          stroke: rgba(255, 255, 255, 0.78);
          filter: drop-shadow(0 0 10px rgba(76, 157, 255, 0.24));
        }
      `}</style>
    </div>
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
