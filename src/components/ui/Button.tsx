import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "primary-action text-white",
    secondary: "premium-card text-ink",
    ghost: "text-violet"
  };

  return (
    <button
      className={cn("inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold transition duration-200 active:scale-[0.99]", variants[variant], className)}
      {...props}
    />
  );
}
