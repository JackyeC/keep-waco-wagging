"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import {
  addCalendarDays,
  BOARDING_CATEGORY_LABELS,
  buildQuoteScript,
  calculateQuote,
  calendarNights,
  CLIENT_RELATIONSHIP_OPTIONS,
  DEFAULT_QUOTE_RATES,
  DEFAULT_TRANSPORTATION_CENTS,
  EXTENDED_STAY_MIN_NIGHTS,
  FIT_CHECK_OPTIONS,
  localIsoDate,
  MAX_BATHS,
  MAX_DOGS,
  type BoardingCategory,
  type ClientRelationship,
  type FitCheckStatus,
  type QuoteInput,
  type QuoteRates,
} from "@/lib/quote/calculateQuote";
import {
  formatCents,
  parseDollarsToCents,
  parseSignedDollarsToCents,
} from "@/lib/quote/money";
import { cn } from "@/lib/utils";

const BOARDING_CATEGORY_CHOICES: BoardingCategory[] = [
  "standard",
  "puppy",
  "holiday",
  "extended-stay",
];

const DEFAULT_TIME = "15:00";

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
  return "min-h-14 w-full rounded-xl border border-input-border bg-soft-cream px-4 text-base font-medium text-bark focus:border-wag-sage focus:outline-none";
}

function centsToInput(cents: number): string {
  const negative = cents < 0;
  const absolute = Math.abs(cents);
  const dollars = Math.floor(absolute / 100);
  const remainder = absolute % 100;
  const body =
    remainder === 0
      ? String(dollars)
      : `${dollars}.${String(remainder).padStart(2, "0")}`;
  return `${negative ? "-" : ""}${body}`;
}

function parseRate(raw: string, fallback: number): number {
  return parseDollarsToCents(raw) ?? fallback;
}

function QuantityStepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-medium text-serif-ink">{label}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cream ring-1 ring-inset ring-border disabled:opacity-40"
          aria-label={`Fewer ${label}`}
        >
          <Minus className="h-5 w-5" />
        </button>
        <p className="w-8 text-center font-display text-2xl font-semibold tabular-nums text-serif-ink">
          {value}
        </p>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cream ring-1 ring-inset ring-border disabled:opacity-40"
          aria-label={`More ${label}`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function QuoteCalculator() {
  const fallbackStay = useSyncExternalStore(
    subscribeToStay,
    getClientStay,
    getServerStay,
  );
  const [firstDogCount, setFirstDogCount] = useState(1);
  const [sharedAdditionalCount, setSharedAdditionalCount] = useState(0);
  const [separateCareCount, setSeparateCareCount] = useState(0);
  const [dropoffDate, setDropoffDate] = useState<string | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [boardingCategory, setBoardingCategory] =
    useState<BoardingCategory>("standard");
  const [bathCount, setBathCount] = useState(0);
  const [transportation, setTransportation] = useState(
    centsToInput(DEFAULT_TRANSPORTATION_CENTS),
  );
  const [clientRelationship, setClientRelationship] =
    useState<ClientRelationship>("new");
  const [fitCheckStatus, setFitCheckStatus] = useState<FitCheckStatus>(
    "required-before-booking",
  );
  const [adjustment, setAdjustment] = useState("0");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [standardFirstDog, setStandardFirstDog] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.standardFirstDogCents),
  );
  const [puppyFirstDog, setPuppyFirstDog] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.puppyFirstDogCents),
  );
  const [holidayFirstDog, setHolidayFirstDog] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.holidayFirstDogCents),
  );
  const [extendedStayFirstDog, setExtendedStayFirstDog] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.extendedStayFirstDogCents),
  );
  const [sharedAdditionalRate, setSharedAdditionalRate] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.sharedAdditionalCents),
  );
  const [separateCareRate, setSeparateCareRate] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.separateCareAdditionalCents),
  );
  const [extendedStaySharedRate, setExtendedStaySharedRate] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.extendedStaySharedAdditionalCents),
  );
  const [bathRate, setBathRate] = useState(
    centsToInput(DEFAULT_QUOTE_RATES.bathCents),
  );
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

  const rates: QuoteRates = {
    standardFirstDogCents: parseRate(
      standardFirstDog,
      DEFAULT_QUOTE_RATES.standardFirstDogCents,
    ),
    puppyFirstDogCents: parseRate(
      puppyFirstDog,
      DEFAULT_QUOTE_RATES.puppyFirstDogCents,
    ),
    holidayFirstDogCents: parseRate(
      holidayFirstDog,
      DEFAULT_QUOTE_RATES.holidayFirstDogCents,
    ),
    extendedStayFirstDogCents: parseRate(
      extendedStayFirstDog,
      DEFAULT_QUOTE_RATES.extendedStayFirstDogCents,
    ),
    sharedAdditionalCents: parseRate(
      sharedAdditionalRate,
      DEFAULT_QUOTE_RATES.sharedAdditionalCents,
    ),
    separateCareAdditionalCents: parseRate(
      separateCareRate,
      DEFAULT_QUOTE_RATES.separateCareAdditionalCents,
    ),
    extendedStaySharedAdditionalCents: parseRate(
      extendedStaySharedRate,
      DEFAULT_QUOTE_RATES.extendedStaySharedAdditionalCents,
    ),
    bathCents: parseRate(bathRate, DEFAULT_QUOTE_RATES.bathCents),
  };

  const nightsPreview = calendarNights(
    resolvedDropoffDate,
    resolvedPickupDate,
  );
  const extendedStayEligible =
    nightsPreview !== null && nightsPreview >= EXTENDED_STAY_MIN_NIGHTS;

  const input: QuoteInput = {
    ...rates,
    boardingCategory,
    firstDogCount,
    sharedAdditionalCount,
    separateCareCount,
    dropoffDate: resolvedDropoffDate,
    dropoffTime: resolvedDropoffTime,
    pickupDate: resolvedPickupDate,
    pickupTime: resolvedPickupTime,
    transportationCents: parseDollarsToCents(transportation) ?? 0,
    bathCount,
    adjustmentCents: parseSignedDollarsToCents(adjustment) ?? 0,
    adjustmentReason,
    internalNotes,
    clientRelationship,
    fitCheckStatus,
  };

  const result = calculateQuote(input);
  const dogCount =
    firstDogCount + sharedAdditionalCount + separateCareCount;

  function resetQuote() {
    const stay = defaultStay();
    setFirstDogCount(1);
    setSharedAdditionalCount(0);
    setSeparateCareCount(0);
    setDropoffDate(stay.dropoffDate);
    setDropoffTime(stay.dropoffTime);
    setPickupDate(stay.pickupDate);
    setPickupTime(stay.pickupTime);
    setBoardingCategory("standard");
    setBathCount(0);
    setTransportation(centsToInput(DEFAULT_TRANSPORTATION_CENTS));
    setClientRelationship("new");
    setFitCheckStatus("required-before-booking");
    setAdjustment("0");
    setAdjustmentReason("");
    setInternalNotes("");
    setCopied(false);
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

  const script = result.ok ? buildQuoteScript(result) : "";
  const remainingAdditional = Math.max(0, MAX_DOGS - firstDogCount);

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="mb-5">
        <BrandWordmark href={false} size="sm" className="mb-4" />
        <h1 className="font-display text-[1.85rem] leading-[1.1] font-medium text-serif-ink">
          🐾 KWW Quick Quote
        </h1>
        <p className="mt-1.5 text-[15px] leading-snug text-body-muted">
          Fast boarding estimates while you&apos;re talking to a dog parent.
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
                Estimated total
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

      <section className="mb-5 grid gap-3">
        <label className="block text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Client relationship
          <select
            value={clientRelationship}
            onChange={(event) =>
              setClientRelationship(event.target.value as ClientRelationship)
            }
            className={cn(fieldClassName(), "mt-2")}
          >
            {CLIENT_RELATIONSHIP_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Meet &amp; Greet / Fit Check Status
          <select
            value={fitCheckStatus}
            onChange={(event) =>
              setFitCheckStatus(event.target.value as FitCheckStatus)
            }
            className={cn(fieldClassName(), "mt-2")}
          >
            {FIT_CHECK_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="mb-5">
        <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          First-dog boarding rate
        </p>
        <div className="grid grid-cols-2 gap-2">
          {BOARDING_CATEGORY_CHOICES.map((category) => {
            const disabled =
              category === "extended-stay" && !extendedStayEligible;
            return (
              <button
                key={category}
                type="button"
                disabled={disabled}
                onClick={() => setBoardingCategory(category)}
                className={cn(
                  "min-h-12 touch-manipulation rounded-xl px-3 text-sm font-medium",
                  boardingCategory === category
                    ? "bg-wag-sage text-cream"
                    : "bg-soft-cream text-bark ring-1 ring-inset ring-border",
                  disabled && "opacity-40",
                )}
              >
                {BOARDING_CATEGORY_LABELS[category]}
              </button>
            );
          })}
        </div>
        {extendedStayEligible ? (
          <p className="mt-2 rounded-xl bg-sage-100 px-3 py-2 text-sm font-medium text-sage-800">
            Extended Stay Eligible — {nightsPreview} nights. Select Extended
            stay to use that rate. It does not stack with Puppy or Holiday.
          </p>
        ) : (
          <p className="mt-2 text-xs text-body-muted">
            Extended stay is available at 14 nights or more.
          </p>
        )}
      </section>

      <section className="mb-5 space-y-4 rounded-2xl bg-soft-cream p-4 ring-1 ring-inset ring-border">
        <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Dogs
        </p>
        <QuantityStepper
          label="Primary dog"
          value={firstDogCount}
          min={0}
          max={1}
          onChange={setFirstDogCount}
        />
        <QuantityStepper
          label="Additional — shared household"
          value={sharedAdditionalCount}
          min={0}
          max={Math.max(0, remainingAdditional - separateCareCount)}
          onChange={setSharedAdditionalCount}
        />
        <QuantityStepper
          label="Additional — separate care"
          value={separateCareCount}
          min={0}
          max={Math.max(0, remainingAdditional - sharedAdditionalCount)}
          onChange={setSeparateCareCount}
        />
        <p className="text-sm leading-relaxed text-body-muted">
          Use shared-household pricing only when the dogs can safely share the
          normal care routine. Use separate-care pricing when a dog needs
          individual feeding, sleep arrangements, activity rotation, behavioral
          support, or extra management.
        </p>
        <p className="text-sm text-serif-ink">
          {dogCount} {dogCount === 1 ? "dog" : "dogs"} total
        </p>
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
                className={cn(fieldClassName(), "mt-1 tabular-nums")}
              />
            </label>
            <label className="block text-xs text-body-muted">
              Time
              <input
                type="time"
                value={resolvedDropoffTime}
                onChange={(event) => setDropoffTime(event.target.value)}
                className={cn(fieldClassName(), "mt-1 tabular-nums")}
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
                className={cn(fieldClassName(), "mt-1 tabular-nums")}
              />
            </label>
            <label className="block text-xs text-body-muted">
              Time
              <input
                type="time"
                value={resolvedPickupTime}
                onChange={(event) => setPickupTime(event.target.value)}
                className={cn(fieldClassName(), "mt-1 tabular-nums")}
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

      {result.ok ? (
        <section
          className={cn(
            "mb-5 rounded-2xl px-4 py-3 ring-1 ring-inset",
            result.bookingStatus.tone === "estimate" &&
              "bg-[#f4ebe4] text-serif-ink ring-[#e0d0c3]",
            result.bookingStatus.tone === "ready" &&
              "bg-sage-100 text-sage-800 ring-sage-200",
            result.bookingStatus.tone === "rover" &&
              "bg-brazos-blue/25 text-serif-ink ring-brazos-blue/50",
          )}
        >
          <p className="font-display text-lg font-semibold">
            {result.bookingStatus.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed">
            {result.bookingStatus.detail}
          </p>
        </section>
      ) : null}

      <section className="mb-5 space-y-4 rounded-2xl bg-soft-cream p-4 ring-1 ring-inset ring-border">
        <QuantityStepper
          label="Baths"
          value={bathCount}
          min={0}
          max={MAX_BATHS}
          onChange={setBathCount}
        />
        <label className="block text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Pickup / Drop-off Transportation
          <input
            type="text"
            inputMode="decimal"
            value={transportation}
            onChange={(event) => setTransportation(event.target.value)}
            className={cn(fieldClassName(), "mt-2 tabular-nums")}
            aria-describedby="transport-help"
          />
        </label>
        <p id="transport-help" className="text-xs text-body-muted">
          Default is $40 per round trip. Set to $0 if they are bringing the
          dogs.
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
          <RateField
            label="Standard boarding, first dog"
            value={standardFirstDog}
            onChange={setStandardFirstDog}
          />
          <RateField
            label="Puppy boarding, first dog"
            value={puppyFirstDog}
            onChange={setPuppyFirstDog}
          />
          <RateField
            label="Holiday boarding, first dog"
            value={holidayFirstDog}
            onChange={setHolidayFirstDog}
          />
          <RateField
            label="Extended stay, first dog (14+ nights)"
            value={extendedStayFirstDog}
            onChange={setExtendedStayFirstDog}
          />
          <RateField
            label="Additional dog, shared household"
            value={sharedAdditionalRate}
            onChange={setSharedAdditionalRate}
          />
          <RateField
            label="Additional dog, separate care"
            value={separateCareRate}
            onChange={setSeparateCareRate}
          />
          <RateField
            label="Extended stay additional, shared household"
            value={extendedStaySharedRate}
            onChange={setExtendedStaySharedRate}
          />
          <RateField
            label="Bath"
            value={bathRate}
            onChange={setBathRate}
          />
        </div>
      </details>

      <section className="mb-5 space-y-3 rounded-2xl bg-soft-cream p-4 ring-1 ring-inset ring-border">
        <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Client Adjustment (optional)
        </p>
        <p className="text-sm text-body-muted">
          Internal only. Use for legacy, Friends &amp; Family, referral, or
          client-specific quotes. This is not a public discount list.
        </p>
        <label className="block text-xs text-body-muted">
          Adjustment amount
          <input
            type="text"
            inputMode="decimal"
            value={adjustment}
            onChange={(event) => setAdjustment(event.target.value)}
            className={cn(fieldClassName(), "mt-1 tabular-nums")}
          />
        </label>
        <label className="block text-xs text-body-muted">
          Adjustment reason
          <input
            type="text"
            value={adjustmentReason}
            onChange={(event) => setAdjustmentReason(event.target.value)}
            className={cn(fieldClassName(), "mt-1")}
            placeholder="Required when the amount is not $0"
          />
        </label>
        <label className="block text-xs text-body-muted">
          Internal notes
          <textarea
            value={internalNotes}
            onChange={(event) => setInternalNotes(event.target.value)}
            className={cn(fieldClassName(), "mt-1 min-h-24 py-3")}
            rows={3}
          />
        </label>
      </section>

      {result.ok ? (
        <section className="mb-5 rounded-2xl bg-soft-cream p-4 ring-1 ring-inset ring-border">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Breakdown
          </p>
          <dl className="mt-3 space-y-2 text-[15px]">
            <div className="flex justify-between gap-3">
              <dt>Nights</dt>
              <dd className="font-medium tabular-nums">{result.nights}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Boarding category</dt>
              <dd className="font-medium">{result.boardingCategoryLabel}</dd>
            </div>
            {result.groups.map((group) => (
              <div key={group.key} className="border-t border-border/70 pt-2">
                <div className="flex justify-between gap-3">
                  <dt>{group.label}</dt>
                  <dd className="font-medium tabular-nums">
                    {formatCents(group.boardingCents)}
                  </dd>
                </div>
                <p className="text-sm tabular-nums text-body-muted">
                  {group.count > 1 ? `${group.count} × ` : ""}
                  {formatCents(group.nightlyCents)} × {group.nights}{" "}
                  {group.nights === 1 ? "night" : "nights"}
                </p>
              </div>
            ))}
            <div className="flex justify-between gap-3 border-t border-border pt-2">
              <dt>Boarding subtotal</dt>
              <dd className="font-medium tabular-nums">
                {formatCents(result.boardingCents)}
              </dd>
            </div>
            {result.extendedCareCents > 0 ? (
              <div className="flex justify-between gap-3">
                <dt>
                  Extended Care (
                  {result.pickupStatus === "late" ? "50%" : "100%"})
                </dt>
                <dd className="font-medium tabular-nums">
                  {formatCents(result.extendedCareCents)}
                </dd>
              </div>
            ) : null}
            {result.bathCents > 0 ? (
              <div className="flex justify-between gap-3">
                <dt>
                  Baths ({result.bathCount} × {formatCents(rates.bathCents)})
                </dt>
                <dd className="font-medium tabular-nums">
                  {formatCents(result.bathCents)}
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
            {result.adjustmentCents !== 0 ? (
              <div>
                <div className="flex justify-between gap-3">
                  <dt>Client adjustment</dt>
                  <dd className="font-medium tabular-nums">
                    {formatCents(result.adjustmentCents)}
                  </dd>
                </div>
                {result.adjustmentReason ? (
                  <p className="text-sm text-body-muted">
                    {result.adjustmentReason}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="flex justify-between gap-3 border-t border-border pt-2 font-semibold">
              <dt>Estimated total</dt>
              <dd className="tabular-nums">{formatCents(result.totalCents)}</dd>
            </div>
          </dl>
          {result.internalNotes ? (
            <p className="mt-4 border-t border-border pt-3 text-sm text-body-muted">
              Internal notes: {result.internalNotes}
            </p>
          ) : null}
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

function RateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs text-body-muted">
      {label}
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClassName(), "mt-1 tabular-nums")}
      />
    </label>
  );
}
