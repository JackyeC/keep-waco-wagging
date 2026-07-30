"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import { ctas, servicesNav } from "@/lib/site";
import { useDialogFocus } from "@/lib/focusTrap";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services", isServices: true },
  { label: "Shop", href: "/shop" },
  { label: "Guides", href: "/dog-friendly-waco", isGuides: true },
  { label: "About", href: "/about" },
] as const;

function guidesHref(pathname: string) {
  return pathname === "/" ? "/#guides" : "/dog-friendly-waco";
}

function navHref(
  item: (typeof primaryNav)[number],
  pathname: string,
): string {
  if ("isGuides" in item && item.isGuides) return guidesHref(pathname);
  return item.href;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
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
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
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
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-3.5 lg:gap-6">
        <BrandWordmark />

        <nav
          className="ml-2 hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) =>
            "isServices" in item && item.isServices ? (
              <div
                key={item.label}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/#services"
                  className={cn(
                    "nav-link inline-flex items-center gap-0.5 rounded-full px-2.5 py-2",
                    pathname === "/" && "text-serif-ink",
                  )}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onFocus={() => setServicesOpen(true)}
                  onBlur={(e) => {
                    if (!servicesRef.current?.contains(e.relatedTarget as Node)) {
                      setServicesOpen(false);
                    }
                  }}
                >
                  Services
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
                </Link>
                {servicesOpen && (
                  <div className="absolute top-full left-0 z-50 min-w-[220px] pt-1">
                    <div className="rounded-[18px] border border-border bg-soft-cream py-2 shadow-lg">
                      {servicesNav.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-sm font-light text-bark hover:text-rose"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <Link
                        href="/book"
                        className="mt-1 block border-t border-border px-4 py-2.5 text-xs font-medium tracking-[0.12em] text-wag-sage uppercase hover:text-rose"
                      >
                        All booking options →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={navHref(item, pathname)}
                className={cn(
                  "nav-link rounded-full px-2.5 py-2",
                  isActive(pathname, navHref(item, pathname)) &&
                    "text-serif-ink",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href={ctas.bookService.href}
          className="btn-pill btn-sage ml-auto hidden px-5 py-2.5 lg:inline-flex"
        >
          Book a service
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-bark hover:bg-soft-cream lg:hidden"
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
            {primaryNav.map((item, index) => (
              <Link
                key={item.label}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                href={navHref(item, pathname)}
                onClick={closeMobile}
                className="nav-link rounded-xl px-3 py-2.5 text-base"
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
              Services
            </p>
            {servicesNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="rounded-xl px-3 py-2 text-sm font-light text-bark-soft hover:text-rose"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctas.bookService.href}
              onClick={closeMobile}
              className="btn-pill btn-sage mt-3 w-full py-3"
            >
              Book a service
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
