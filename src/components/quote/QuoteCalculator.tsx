"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import {
  addCalendarDays,
  buildQuoteScript,
  calculateQuote,
  DEFAULT_ADDITIONAL_DOG_PERCENT,
  DEFAULT_FIRST_DOG_NIGHTLY_CENTS,
  localIsoDate,
  MAX_DOGS,
  MIN_DOGS,
  nightlyRateCents,
  type QuoteInput,
} from "@/lib/quote/calculateQuote";
import {
  formatCents,
  parseDollarsToCents,
  parsePercent,
} from "@/lib/quote/money";
import { cn } from "@/lib/utils";

const DEFAULT_TIME = "15:00";
const QUICK_DOG_COUNTS = [1, 2, 3, 4] as const;

const EMPTY_STAY = {
  dropoffDate: "",
  dropoffTime: "",
  pickupDate: "",
  pickupTime: "",
} as const;

function defaultStay() {
  const dropoffDate = localIsoDate();
  return {
    dropoffDate,
    dropoffTime: DEFAULT_TIME,
    pickupDate: addCalendarDays(dropoffDate, 3),
    pickupTime: DEFAULT_TIME,
  };
}

let clientStayCache: ReturnType<typeof defaultStay> | undefined;

function getClientStay() {
  clientStayCache ??= defaultStay();
  return clientStayCache;
}

function getServerStay() {
  return EMPTY_STAY;
}

function subscribeToStay() {
  return () => {};
}

function fieldClassName() {
  return "min-h-14 w-full rounded-xl border border-input-border bg-soft-cream px-4 text-base font-medium text-bark tabular-nums focus:border-wag-sage focus:outline-none";
}

export function QuoteCalculator() {
  const fallbackStay = useSyncExternalStore(
    subscribeToStay,
    getClientStay,
    getServerStay,
  );
  const [dogCount, setDogCount] = useState(1);
  const [dropoffDate, setDropoffDate] = useState<string | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [transportation, setTransportation] = useState("0");
  const [firstDogRate, setFirstDogRate] = useState("47");
  const [additionalPercent, setAdditionalPercent] = useState("50");
  const [copied, setCopied] = useState(false);

  const resolvedDropoffDate = dropoffDate ?? fallbackStay.dropoffDate;
  const resolvedDropoffTime = dropoffTime ?? fallbackStay.dropoffTime;
  const resolvedPickupDate = pickupDate ?? fallbackStay.pickupDate;
  const resolvedPickupTime = pickupTime ?? fallbackStay.pickupTime;

  useEffect(() => {
    document.body.dataset.kwwTool = "quote";
    return () => {
      delete document.body.dataset.kwwTool;
    };
  }, []);

  const firstDogNightlyCents =
    parseDollarsToCents(firstDogRate) ?? DEFAULT_FIRST_DOG_NIGHTLY_CENTS;
  const additionalDogPercent =
    parsePercent(additionalPercent) ?? DEFAULT_ADDITIONAL_DOG_PERCENT;
  const transportationCents = parseDollarsToCents(transportation) ?? 0;

  const input: QuoteInput = {
    dogCount,
    dropoffDate: resolvedDropoffDate,
    dropoffTime: resolvedDropoffTime,
    pickupDate: resolvedPickupDate,
    pickupTime: resolvedPickupTime,
    transportationCents,
    firstDogNightlyCents,
    additionalDogPercent,
  };

  const result = calculateQuote(input);

  function resetQuote() {
    const stay = defaultStay();
    setDogCount(1);
    setDropoffDate(stay.dropoffDate);
    setDropoffTime(stay.dropoffTime);
    setPickupDate(stay.pickupDate);
    setPickupTime(stay.pickupTime);
    setTransportation("0");
    setCopied(false);
  }

  function bumpDogs(delta: number) {
    setDogCount((current) =>
      Math.min(MAX_DOGS, Math.max(MIN_DOGS, current + delta)),
    );
  }

  async function copyScript(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const additionalNightly = nightlyRateCents(2, {
    firstDogNightlyCents,
    additionalDogPercent,
  });
  const script = result.ok ? buildQuoteScript(result) : "";

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="mb-5">
        <BrandWordmark href={false} size="sm" className="mb-4" />
        <h1 className="font-display text-[1.85rem] leading-[1.1] font-medium text-serif-ink">
          🐾 KWW Quick Quote
        </h1>
        <p className="mt-1.5 text-[15px] leading-snug text-body-muted">
          Fast boarding quotes while you&apos;re talking to a dog parent.
        </p>
      </header>

      <section
        className="sticky top-0 z-20 -mx-4 mb-5 border-b border-border bg-cream/95 px-4 py-3 backdrop-blur-md"
        aria-live="polite"
      >
        {result.ok ? (
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
                Customer total
              </p>
              <p className="font-display text-[2.35rem] leading-none font-semibold text-serif-ink tabular-nums">
                {formatCents(result.totalCents)}
              </p>
            </div>
            <p className="pb-1 text-right text-sm text-body-muted">
              {result.nights} {result.nights === 1 ? "night" : "nights"}
              <br />
              {result.dogCount} {result.dogCount === 1 ? "dog" : "dogs"}
            </p>
          </div>
        ) : (
          <p className="text-[15px] leading-snug font-medium text-serif-ink">
            {result.message}
          </p>
        )}
      </section>

      <section className="mb-5">
        <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Dogs
        </p>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_DOG_COUNTS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setDogCount(count)}
              className={cn(
                "min-h-14 touch-manipulation rounded-xl text-xl font-semibold tabular-nums",
                dogCount === count
                  ? "bg-wag-sage text-cream"
                  : "bg-soft-cream text-bark ring-1 ring-inset ring-border",
              )}
            >
              {count}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => bumpDogs(-1)}
            disabled={dogCount <= MIN_DOGS}
            className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-soft-cream ring-1 ring-inset ring-border disabled:opacity-40"
            aria-label="Fewer dogs"
          >
            <Minus className="h-6 w-6" />
          </button>
          <p className="font-display text-3xl font-semibold tabular-nums text-serif-ink">
            {dogCount}
          </p>
          <button
            type="button"
            onClick={() => bumpDogs(1)}
            disabled={dogCount >= MAX_DOGS}
            className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-soft-cream ring-1 ring-inset ring-border disabled:opacity-40"
            aria-label="More dogs"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </section>

      <section className="mb-5 space-y-3">
        <fieldset className="rounded-2xl bg-soft-cream p-3 ring-1 ring-inset ring-border">
          <legend className="px-1 text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Drop-off
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="block text-xs text-body-muted">
              Date
              <input
                type="date"
                value={resolvedDropoffDate}
                onChange={(event) => setDropoffDate(event.target.value)}
                className={cn(fieldClassName(), "mt-1")}
              />
            </label>
            <label className="block text-xs text-body-muted">
              Time
              <input
                type="time"
                value={resolvedDropoffTime}
                onChange={(event) => setDropoffTime(event.target.value)}
                className={cn(fieldClassName(), "mt-1")}
              />
            </label>
          </div>
        </fieldset>
        <fieldset className="rounded-2xl bg-soft-cream p-3 ring-1 ring-inset ring-border">
          <legend className="px-1 text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Pickup
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="block text-xs text-body-muted">
              Date
              <input
                type="date"
                value={resolvedPickupDate}
                onChange={(event) => setPickupDate(event.target.value)}
                className={cn(fieldClassName(), "mt-1")}
              />
            </label>
            <label className="block text-xs text-body-muted">
              Time
              <input
                type="time"
                value={resolvedPickupTime}
                onChange={(event) => setPickupTime(event.target.value)}
                className={cn(fieldClassName(), "mt-1")}
              />
            </label>
          </div>
        </fieldset>
      </section>

      {result.ok ? (
        <section
          className={cn(
            "mb-5 rounded-2xl px-4 py-3 ring-1 ring-inset",
            result.pickupStatus === "on-time" &&
              "bg-sage-100 text-sage-800 ring-sage-200",
            result.pickupStatus === "late" &&
              "bg-[#f4ebe4] text-serif-ink ring-[#e0d0c3]",
            result.pickupStatus === "very-late" &&
              "bg-blush/40 text-serif-ink ring-blush",
          )}
        >
          <p className="font-display text-xl font-semibold">
            {result.pickupStatusLabel}
          </p>
          <p className="mt-0.5 text-sm">{result.pickupStatusDetail}</p>
          <p className="mt-1 text-sm font-medium">{result.pickupStatusCare}</p>
        </section>
      ) : null}

      <section className="mb-5 rounded-2xl bg-soft-cream p-4 ring-1 ring-inset ring-border">
        <label className="block text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Pickup / Drop-off Transportation
          <input
            type="text"
            inputMode="decimal"
            value={transportation}
            onChange={(event) => setTransportation(event.target.value)}
            className={cn(fieldClassName(), "mt-2")}
            aria-describedby="transport-help"
          />
        </label>
        <p id="transport-help" className="mt-2 text-xs text-body-muted">
          Optional flat charge. Leave at $0 if they are bringing the dogs.
        </p>
      </section>

      <details className="mb-5 rounded-2xl bg-soft-cream ring-1 ring-inset ring-border">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-4 py-4 text-[15px] font-medium text-serif-ink [&::-webkit-details-marker]:hidden">
          Rate Settings
          <span className="text-label-muted" aria-hidden>
            +
          </span>
        </summary>
        <div className="space-y-3 px-4 pb-4">
          <label className="block text-xs text-body-muted">
            First dog rate (per night)
            <input
              type="text"
              inputMode="decimal"
              value={firstDogRate}
              onChange={(event) => setFirstDogRate(event.target.value)}
              className={cn(fieldClassName(), "mt-1")}
            />
          </label>
          <label className="block text-xs text-body-muted">
            Additional dog rate
            <div className="mt-1 flex items-center gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={additionalPercent}
                onChange={(event) => setAdditionalPercent(event.target.value)}
                className={cn(fieldClassName(), "flex-1")}
                aria-label="Additional dog rate percent of first dog"
              />
              <span className="text-sm font-medium text-bark">%</span>
            </div>
          </label>
          <p className="text-sm text-body-muted">
            Additional dogs: {formatCents(additionalNightly)} / night
          </p>
        </div>
      </details>

      {result.ok ? (
        <section className="mb-5 rounded-2xl bg-soft-cream p-4 ring-1 ring-inset ring-border">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Breakdown
          </p>
          <dl className="mt-3 space-y-2 text-[15px]">
            <div className="flex justify-between gap-3">
              <dt>Boarding</dt>
              <dd className="font-medium tabular-nums">
                {formatCents(result.boardingCents)}
              </dd>
            </div>
            {result.extendedCareCents > 0 ? (
              <div className="flex justify-between gap-3">
                <dt>Extended Care</dt>
                <dd className="font-medium tabular-nums">
                  {formatCents(result.extendedCareCents)}
                </dd>
              </div>
            ) : null}
            {result.transportationCents > 0 ? (
              <div className="flex justify-between gap-3">
                <dt>Transportation</dt>
                <dd className="font-medium tabular-nums">
                  {formatCents(result.transportationCents)}
                </dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-3 border-t border-border pt-2 font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatCents(result.totalCents)}</dd>
            </div>
          </dl>

          <ul className="mt-4 space-y-3 border-t border-border pt-4">
            {result.dogs.map((dog) => (
              <li key={dog.dogNumber} className="text-[15px]">
                <p className="font-medium text-serif-ink">Dog {dog.dogNumber}</p>
                <p className="tabular-nums text-body-muted">
                  {formatCents(dog.nightlyCents)} × {dog.nights}{" "}
                  {dog.nights === 1 ? "night" : "nights"} ={" "}
                  {formatCents(dog.boardingCents)}
                </p>
                {dog.extendedCareCents > 0 ? (
                  <p className="tabular-nums text-body-muted">
                    Extended Care: {formatCents(dog.extendedCareCents)}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {result.ok ? (
        <section className="mb-5 rounded-2xl bg-soft-cream p-4 ring-1 ring-inset ring-border">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Todd can say
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-serif-ink">
            {script}
          </p>
          <button
            type="button"
            onClick={() => copyScript(script)}
            className="btn-pill btn-rose-outline mt-3 min-h-12 w-full px-4 text-sm"
          >
            {copied ? "Copied" : "Copy text"}
          </button>
        </section>
      ) : null}

      <button
        type="button"
        onClick={resetQuote}
        className="btn-pill btn-sage min-h-16 w-full px-6 text-base"
      >
        New Quote
      </button>
    </div>
  );
}
