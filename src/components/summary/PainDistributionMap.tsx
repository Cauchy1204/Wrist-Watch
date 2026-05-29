"use client";

import { useMemo, useState } from "react";
import { dorsalHotspots, Hotspot, palmHotspots } from "@/components/hand-selector/hotspots";
import { HandView, PainRegion, SymptomRecord } from "@/types/symptom";

type RegionStats = {
  count: number;
  averageSeverity: number;
};

const views: { id: HandView; label: string; image: string; hotspots: Hotspot[] }[] = [
  {
    id: "palm",
    label: "Palm",
    image: "/assets/palm-right-hand.png",
    hotspots: palmHotspots
  },
  {
    id: "dorsal",
    label: "Dorsal",
    image: "/assets/dorsal-right-hand.png",
    hotspots: dorsalHotspots
  }
];

export function PainDistributionMap({ records }: { records: SymptomRecord[] }) {
  const [view, setView] = useState<HandView>("palm");
  const activeView = views.find((item) => item.id === view) ?? views[0];
  const statsByRegion = useMemo(() => buildRegionStats(records), [records]);
  const maxCount = Math.max(1, ...Object.values(statsByRegion).map((stats) => stats.count));
  const hasData = Object.keys(statsByRegion).length > 0;

  return (
    <section className="premium-card mt-5 overflow-hidden rounded-2xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-violet">Pain Map</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">疼痛分布</h2>
        </div>
        <div className="grid grid-cols-2 rounded-full bg-slate-100/80 p-1 text-xs font-semibold text-slate-500">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={`rounded-full px-3 py-1.5 transition duration-200 ${view === item.id ? "bg-white text-violet shadow-sm" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-4 aspect-[2/3] w-full max-w-[310px]">
        <img src={activeView.image} alt="" className="absolute inset-0 h-full w-full object-contain" draggable={false} />
        <svg viewBox="0 0 1024 1536" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <filter id="pain-glow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="24" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {activeView.hotspots.map((hotspot) => {
            const stats = statsByRegion[hotspot.id];
            if (!stats) return null;

            const center = getHotspotCenter(hotspot);
            const radius = getCircleRadius(stats.count, maxCount);
            const color = getSeverityColor(stats.averageSeverity);

            return (
              <g key={hotspot.id}>
                <circle cx={center.x} cy={center.y} r={radius * 1.95} fill={color.glow} opacity="0.18" filter="url(#pain-glow)" />
                <circle cx={center.x} cy={center.y} r={radius * 1.28} fill={color.fill} opacity="0.18" />
                <circle cx={center.x} cy={center.y} r={radius * 0.72} fill={color.core} opacity="0.72" />
              </g>
            );
          })}
        </svg>

        {!hasData ? (
          <div className="absolute inset-x-3 bottom-4 rounded-2xl border border-white/80 bg-white/88 px-4 py-3 text-center text-sm font-semibold leading-6 text-slate-500 shadow-lift backdrop-blur-xl">
            暂无足够数据生成疼痛热力图
          </div>
        ) : null}
      </div>
    </section>
  );
}

function buildRegionStats(records: SymptomRecord[]) {
  const grouped = records.reduce<Record<string, { count: number; severityTotal: number; severityCount: number }>>((acc, record) => {
    if (record.noSymptom) return acc;
    const current = acc[record.region] ?? { count: 0, severityTotal: 0, severityCount: 0 };
    current.count += 1;

    if (typeof record.severity === "number") {
      current.severityTotal += record.severity;
      current.severityCount += 1;
    }

    acc[record.region] = current;
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(grouped).map(([region, stats]) => [
      region,
      {
        count: stats.count,
        averageSeverity: stats.severityCount ? stats.severityTotal / stats.severityCount : 0
      }
    ])
  ) as Partial<Record<PainRegion, RegionStats>>;
}

function getHotspotCenter(hotspot: Hotspot) {
  const values = [...hotspot.d.matchAll(/-?\d+(?:\.\d+)?/g)].map((match) => Number(match[0]));
  const points = [];

  for (let index = 0; index < values.length - 1; index += 2) {
    points.push({ x: values[index], y: values[index + 1] });
  }

  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);

  return {
    x: (Math.min(...xs) + Math.max(...xs)) / 2,
    y: (Math.min(...ys) + Math.max(...ys)) / 2
  };
}

function getCircleRadius(count: number, maxCount: number) {
  return 30 + (count / maxCount) * 46;
}

function getSeverityColor(averageSeverity: number) {
  if (averageSeverity >= 7) {
    return { core: "#7F1D1D", fill: "#DC2626", glow: "#F87171" };
  }

  if (averageSeverity >= 4) {
    return { core: "#B91C1C", fill: "#EF4444", glow: "#FCA5A5" };
  }

  return { core: "#E11D48", fill: "#FB7185", glow: "#FFE4E6" };
}
