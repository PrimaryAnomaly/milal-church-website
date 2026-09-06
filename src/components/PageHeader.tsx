type PageHeaderProps = {
  title: string;
  intro?: string;
};

export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <header className="max-w-[65ch]">
      <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-3 text-base text-muted sm:text-lg">{intro}</p>
      ) : null}
    </header>
  );
}
