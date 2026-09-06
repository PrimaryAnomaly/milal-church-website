import Link from "next/link";

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-5 text-[0.9375rem] font-medium transition-colors duration-200 active:scale-[0.98]";

const variants = {
  primary: "bg-accent text-[#FAF7F2] hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent hover:text-accent",
} as const;

type Variant = keyof typeof variants;

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
