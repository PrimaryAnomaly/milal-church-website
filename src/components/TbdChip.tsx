type TbdChipProps = {
  label: string;
  className?: string;
};

export function TbdChip({ label, className = "" }: TbdChipProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full bg-accent px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-on-accent ${className}`.trim()}
    >
      {label}
    </span>
  );
}
