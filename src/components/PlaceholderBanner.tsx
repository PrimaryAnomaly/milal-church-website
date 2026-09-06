type Props = {
  label: string;
  className?: string;
};

/** Visible cue that nearby copy is not confirmed church fact. */
export function PlaceholderBanner({ label, className = "" }: Props) {
  return (
    <div
      role="note"
      className={`rounded-lg border-2 border-dashed border-accent bg-accent-soft px-3 py-2 text-sm font-semibold text-accent ${className}`}
    >
      {label}
    </div>
  );
}

export function PlaceholderTag({ label }: { label: string }) {
  return (
    <span className="mr-1 inline-block rounded border border-dashed border-accent bg-accent-soft px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-accent">
      {label}
    </span>
  );
}
