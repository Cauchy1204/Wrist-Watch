import { AppShell } from "./AppShell";

export function Page({
  children,
  withNav = true
}: {
  children: React.ReactNode;
  withNav?: boolean;
}) {
  return <AppShell withNav={withNav}>{children}</AppShell>;
}
