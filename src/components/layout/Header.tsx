"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NavLinkItem, isNavActive } from "@/components/NavLinkItem";
import { Button } from "@/components/ui/Button";
import { mainNav, secondaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-clay/70 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/90">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo variant="mark" className="min-w-0 shrink-0" />

        <nav className="hidden items-center gap-0 lg:flex xl:gap-0.5" aria-label="Primary">
          {mainNav.map((link) => (
            <NavLinkItem
              key={link.href}
              link={link}
              className={cn(
                "rounded-full px-2.5 py-2 text-[0.8125rem] font-medium transition-colors xl:px-3 xl:text-sm",
                isNavActive(pathname, link.href)
                  ? "bg-sage-100 text-sage-700"
                  : "text-bark-soft hover:bg-sage-50 hover:text-bark",
              )}
            />
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button href="/book" variant="sponsor" size="sm" className="rounded-sm px-4 py-1.5">
            Book a service
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-bark hover:bg-sage-50 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-clay/70 bg-cream lg:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {mainNav.map((link) => (
              <NavLinkItem
                key={link.href}
                link={link}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-base font-medium",
                  isNavActive(pathname, link.href)
                    ? "bg-sage-100 text-sage-700"
                    : "text-bark hover:bg-sage-50",
                )}
              />
            ))}
            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wide text-bark-faint">
              More
            </p>
            {secondaryNav.map((link) => (
              <NavLinkItem
                key={link.href}
                link={link}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-bark-soft hover:bg-sage-50"
              />
            ))}
            <Button
              href="/book"
              variant="sponsor"
              className="mt-3 w-full"
              size="md"
            >
              Book a service
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
