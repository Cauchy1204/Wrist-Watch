export function DashboardSparkline({ values }: { values: number[] }) {
  const data = values.length > 1 ? values : [0, 0, 0, 0, 0, 0, values[0] ?? 0];
  const width = 260;
  const height = 52;
  const points = data
    .map((value, index) => {
      const x = (index / Math.max(1, data.length - 1)) * width;
      const y = height - 7 - (Math.min(10, Math.max(0, value)) / 10) * 36;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${height - 6} ${points} ${width},${height - 6}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-14 w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="dashboard-line" x1="0" x2={width} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A9D2FF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#D1CEFF" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="dashboard-area" x1="0" x2="0" y1="0" y2={height} gradientUnits="userSpaceOnUse">
          <stop stopColor="#C8DCFF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points="0,45 260,45" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <polygon points={area} fill="url(#dashboard-area)" />
      <polyline points={points} fill="none" stroke="url(#dashboard-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}
