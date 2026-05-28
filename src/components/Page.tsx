import { BottomNav } from "./BottomNav";

export function Page({
  children,
  withNav = true
}: {
  children: React.ReactNode;
  withNav?: boolean;
}) {
  return (
    <div className="min-h-dvh px-5 pb-28 pt-safe">
      {children}
      {withNav ? <BottomNav /> : null}
    </div>
  );
}

export function PageHeader({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <header className="mb-5 pt-2">
      {kicker ? <p className="text-sm font-medium text-violet">{kicker}</p> : null}
      <h1 className="mt-1 text-3xl font-semibold tracking-normal text-ink">{title}</h1>
    </header>
  );
}
