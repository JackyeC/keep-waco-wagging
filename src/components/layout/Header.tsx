"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import { ctas, servicesNav } from "@/lib/site";
import { useDialogFocus } from "@/lib/focusTrap";
import { cn } from "@/lib/utils";

/** Quiet chrome: Shop-first apparel lead, with ecosystem destinations from main. */
const primaryNav = [
  { label: "Shop", href: "/shop" },
  { label: "Dog Care", href: "/dog-care", isServices: true },
  { label: "Dog-Friendly Waco", href: "/dog-friendly-waco" },
  { label: "Wag Watch", href: "/wag-watch" },
  { label: "Events", href: "/weekend" },
  { label: "Wag Club", href: "/#wag-club" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  const base = href.split("#")[0];
  if (!base) return false;
  return pathname === base || pathname.startsWith(`${base}/`);
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
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-3 lg:gap-8">
        <BrandWordmark />

        <nav
          className="ml-auto hidden items-center gap-1 lg:flex"
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
                  href={item.href}
                  className={cn(
                    "nav-link inline-flex items-center gap-0.5 px-2.5 py-2",
                    isActive(pathname, item.href) && "text-serif-ink",
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
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
                </Link>
                {servicesOpen && (
                  <div className="absolute top-full left-0 z-50 min-w-[220px] pt-1">
                    <div className="border border-border bg-soft-cream py-2 shadow-sm">
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
                        href="/dog-care"
                        className="mt-1 block border-t border-border px-4 py-2.5 text-xs font-medium tracking-[0.12em] text-wag-sage uppercase hover:text-rose"
                      >
                        All dog care →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "nav-link px-2.5 py-2",
                  isActive(pathname, item.href) && "text-serif-ink",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href={ctas.bookService.href}
            className="nav-link ml-2 px-2.5 py-2 text-label-muted"
          >
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
            {primaryNav.map((item, index) => (
              <Link
                key={item.label}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                href={item.href}
                onClick={closeMobile}
                className="nav-link px-3 py-2.5 text-base"
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
              Dog Care
            </p>
            {servicesNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="px-3 py-2 text-sm font-light text-bark-soft hover:text-rose"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctas.bookService.href}
              onClick={closeMobile}
              className="mt-3 px-3 py-2.5 text-sm font-medium tracking-[0.12em] text-wag-sage uppercase"
            >
              Book a service
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
