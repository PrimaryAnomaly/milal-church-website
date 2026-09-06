"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function pathIsActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className: string;
  activeClassName: string;
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = pathIsActive(pathname, href);

  return (
    <Link
      href={href}
      className={active ? `${className} ${activeClassName}` : className}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
