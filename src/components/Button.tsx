import Link from "next/link";

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-5 text-[0.9375rem] font-medium transition-[color,background-color,border-color] duration-200";

const variants = {
  primary:
    "border border-transparent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent hover:text-accent active:border-accent active:bg-accent-soft",
  danger:
    "border border-danger/40 bg-surface text-danger hover:bg-danger-soft active:bg-danger-soft",
} as const;

type Variant = keyof typeof variants;

function classes(variant: Variant, className: string) {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  newTabHint?: string;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  newTabHint,
  className = "",
}: ButtonLinkProps) {
  const cls = classes(variant, className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        {newTabHint ? <span className="sr-only"> ({newTabHint})</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
