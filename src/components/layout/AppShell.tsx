import { BottomNav } from "./BottomNav";

export function AppShell({
  children,
  withNav = true
}: {
  children: React.ReactNode;
  withNav?: boolean;
}) {
  return (
    <main className="phone-shell">
      <div className="min-h-dvh px-5 pb-28 pt-safe">
        {children}
        {withNav ? <BottomNav /> : null}
      </div>
    </main>
  );
}
