export function PageHeader({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <header className="mb-6 pt-2">
      {kicker ? <p className="text-xs font-semibold uppercase text-violet">{kicker}</p> : null}
      <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink">{title}</h1>
    </header>
  );
}
