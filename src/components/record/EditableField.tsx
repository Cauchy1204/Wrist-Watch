export function EditableField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="premium-card block rounded-xl p-4">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        min={type === "number" ? 0 : undefined}
        max={type === "number" ? 10 : undefined}
        onChange={(event) => onChange?.(event.target.value)}
        className="mt-2 w-full bg-transparent text-base font-medium text-ink outline-none disabled:opacity-100"
      />
    </label>
  );
}
