type PageHeaderProps = {
  title: string;
  intro?: string;
};

export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <header className="max-w-[65ch] border-b border-border pb-7 sm:pb-8">
      <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
