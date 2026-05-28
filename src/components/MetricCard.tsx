export function MetricCard({
  label,
  value,
  tone = "light"
}: {
  label: string;
  value: string | number;
  tone?: "light" | "dark";
}) {
  return (
    <div className={tone === "dark" ? "rounded-xl bg-ink p-4 text-white" : "glass rounded-xl p-4"}>
      <p className={tone === "dark" ? "text-xs text-white/65" : "text-xs text-slate-500"}>{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
