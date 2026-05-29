import { cn } from "@/lib/cn";

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  className = ""
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("premium-card grid rounded-xl p-1", className)} style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-lg py-3 text-sm font-semibold transition duration-200",
            value === option.value ? "primary-action text-white" : "text-slate-500 hover:bg-white/70"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
