"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { mainNav, ctas } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-clay/70 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo showSponsor />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-sage-100 text-sage-700"
                  : "text-bark-soft hover:bg-sage-50 hover:text-bark",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={ctas.getListed.href} variant="secondary" size="sm">
            {ctas.getListed.label}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-bark hover:bg-sage-50 lg:hidden"
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-base font-medium",
                  isActive(link.href)
                    ? "bg-sage-100 text-sage-700"
                    : "text-bark hover:bg-sage-50",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href={ctas.getListed.href}
              variant="primary"
              className="mt-2 w-full"
              size="md"
            >
              {ctas.getListed.label}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
