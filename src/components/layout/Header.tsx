"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import { ctas, mainNav, secondaryNav, type NavLink } from "@/lib/site";
import { useDialogFocus } from "@/lib/focusTrap";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#") || href.startsWith("#")) return false;
  const base = href.split("#")[0];
  if (!base || base.startsWith("http")) return false;
  return pathname === base || pathname.startsWith(`${base}/`);
}

function shownHrefs(): Set<string> {
  const hrefs = new Set<string>();
  for (const item of mainNav) {
    hrefs.add(item.href);
    for (const child of item.children ?? []) hrefs.add(child.href);
  }
  return hrefs;
}

const overflowNav = secondaryNav.filter((link) => !shownHrefs().has(link.href));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileNavId = useId();

  const closeMobile = () => setOpen(false);

  useDialogFocus({
    open,
    containerRef: mobilePanelRef,
    onClose: closeMobile,
    initialFocusRef: firstMobileLinkRef,
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-3 lg:gap-4">
        <BrandWordmark />

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {mainNav.map((item) =>
            item.children?.length ? (
              <DesktopMenu
                key={item.label}
                item={item}
                pathname={pathname}
                open={menu === item.label}
                onOpen={() => setMenu(item.label)}
                onClose={() => setMenu((current) => (current === item.label ? null : current))}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "nav-link px-2 py-2",
                  isActive(pathname, item.href) && "text-serif-ink",
                )}
                onClick={() => setMenu(null)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link href={ctas.bookService.href} className="btn-pill btn-sage ml-1 px-4 py-2 text-[11px]">
            Book
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center text-bark hover:bg-soft-cream lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={mobileNavId}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          ref={mobilePanelRef}
          id={mobileNavId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="max-h-[min(70dvh,32rem)] overflow-y-auto border-t border-border bg-cream lg:hidden"
        >
          <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-4" aria-label="Mobile">
            <Link
              ref={firstMobileLinkRef}
              href={ctas.bookService.href}
              onClick={closeMobile}
              className="btn-pill btn-sage mb-2 px-4 py-2.5"
            >
              Book dog care
            </Link>
            {mainNav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeMobile}
                  className="nav-link block px-3 py-2.5 text-base"
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={closeMobile}
                    className="block px-6 py-2 text-sm text-bark-soft hover:text-rose-deep"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <p className="mt-3 px-3 text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
              More
            </p>
            {overflowNav.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm text-bark-soft hover:text-rose-deep"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="px-3 py-2 text-sm text-bark-soft hover:text-rose-deep"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function DesktopMenu({
  item,
  pathname,
  open,
  onOpen,
  onClose,
}: {
  item: NavLink;
  pathname: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const childActive = (item.children ?? []).some((child) => isActive(pathname, child.href));

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        href={item.href}
        className={cn(
          "nav-link inline-flex items-center gap-0.5 px-2 py-2",
          (open || isActive(pathname, item.href) || childActive) && "text-serif-ink",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onClose}
        onFocus={onOpen}
        onBlur={(event) => {
          if (!ref.current?.contains(event.relatedTarget as Node)) onClose();
        }}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
      </Link>
      {open && (
        <div className="absolute top-full left-0 z-50 min-w-[240px] pt-1">
          <div className="border border-border bg-soft-cream py-2 shadow-sm">
            {item.href === "/dog-care" && (
              <Link
                href={ctas.bookService.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-xs font-medium tracking-[0.12em] text-sage-ink uppercase hover:text-rose-deep"
              >
                Book dog care
              </Link>
            )}
            {item.children?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-bark hover:text-rose-deep"
                onClick={onClose}
                onBlur={(event) => {
                  if (!ref.current?.contains(event.relatedTarget as Node)) onClose();
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
