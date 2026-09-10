type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

/** Same width and side padding as the header, footer, and home. */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={`mx-auto max-w-5xl px-4 py-10 sm:py-12 md:py-16 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
