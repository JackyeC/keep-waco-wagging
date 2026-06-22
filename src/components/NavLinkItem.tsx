import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/site";

export function NavLinkItem({
  link,
  className,
  onClick,
}: {
  link: NavLink;
  className?: string;
  onClick?: () => void;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}

export function isNavActive(pathname: string, href: string) {
  if (href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  if (href === "/pet-care") return pathname === "/pet-care";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function navLinkClass(active: boolean, base = "") {
  return cn(
    base,
    active
      ? "bg-sage-100 text-sage-700"
      : "text-bark-soft hover:bg-sage-50 hover:text-bark",
  );
}
