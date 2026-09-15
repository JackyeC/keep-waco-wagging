import { formatCents, percentOfCents } from "./money";

export const ON_TIME_MAX_MINUTES = 120;
export const LATE_MAX_MINUTES = 480;
export const EXTENDED_STAY_MIN_NIGHTS = 14;
export const MIN_DOGS = 0;
export const MAX_DOGS = 20;
export const MAX_BATHS = 20;

export const DEFAULT_TRANSPORTATION_CENTS = 4000;

export type BoardingCategory =
  | "standard"
  | "puppy"
  | "holiday"
  | "extended-stay";

export type PickupStatus = "on-time" | "late" | "very-late";

export type FitCheckStatus =
  | "completed-approved"
  | "scheduled"
  | "required-before-booking"
  | "returning-approved"
  | "rover";

export type ClientRelationship =
  | "new"
  | "returning"
  | "legacy-friends-family"
  | "rover";

export type QuoteRates = {
  standardFirstDogCents: number;
  puppyFirstDogCents: number;
  holidayFirstDogCents: number;
  extendedStayFirstDogCents: number;
  sharedAdditionalCents: number;
  separateCareAdditionalCents: number;
  extendedStaySharedAdditionalCents: number;
  bathCents: number;
};

export const DEFAULT_QUOTE_RATES: QuoteRates = {
  standardFirstDogCents: 5000,
  puppyFirstDogCents: 5500,
  holidayFirstDogCents: 6000,
  extendedStayFirstDogCents: 4700,
  sharedAdditionalCents: 3000,
  separateCareAdditionalCents: 4000,
  extendedStaySharedAdditionalCents: 2800,
  bathCents: 2500,
};

export const BOARDING_CATEGORY_LABELS: Record<BoardingCategory, string> = {
  standard: "Standard",
  puppy: "Puppy",
  holiday: "Holiday",
  "extended-stay": "Extended stay",
};

export const FIT_CHECK_OPTIONS: { value: FitCheckStatus; label: string }[] = [
  { value: "required-before-booking", label: "Required before booking" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed-approved", label: "Completed and approved" },
  { value: "returning-approved", label: "Returning client already approved" },
  { value: "rover", label: "Not applicable — Rover booking" },
];

export const CLIENT_RELATIONSHIP_OPTIONS: {
  value: ClientRelationship;
  label: string;
}[] = [
  { value: "new", label: "New client" },
  { value: "returning", label: "Returning client" },
  { value: "legacy-friends-family", label: "Legacy / Friends & Family" },
  { value: "rover", label: "Rover client" },
];

export type QuoteInput = QuoteRates & {
  boardingCategory: BoardingCategory;
  firstDogCount: number;
  sharedAdditionalCount: number;
  separateCareCount: number;
  dropoffDate: string;
  dropoffTime: string;
  pickupDate: string;
  pickupTime: string;
  transportationCents: number;
  bathCount: number;
  adjustmentCents: number;
  adjustmentReason: string;
  internalNotes: string;
  clientRelationship: ClientRelationship;
  fitCheckStatus: FitCheckStatus;
};

export type DogGroupLine = {
  key: "first" | "shared" | "separate";
  label: string;
  count: number;
  nightlyCents: number;
  nights: number;
  boardingCents: number;
  extendedCareCents: number;
};

export type BookingStatusCard = {
  title: string;
  detail: string;
  tone: "estimate" | "ready" | "rover";
};

export type QuoteErrorCode =
  | "missing-dropoff"
  | "missing-pickup"
  | "pickup-before-dropoff"
  | "same-day"
  | "invalid-dogs"
  | "invalid-rates"
  | "extended-stay-ineligible"
  | "missing-adjustment-reason"
  | "negative-total";

export type QuoteFailure = {
  ok: false;
  error: QuoteErrorCode;
  message: string;
};

export type QuoteSuccess = {
  ok: true;
  dogCount: number;
  firstDogCount: number;
  sharedAdditionalCount: number;
  separateCareCount: number;
  nights: number;
  extendedStayEligible: boolean;
  boardingCategory: BoardingCategory;
  boardingCategoryLabel: string;
  firstDogNightlyCents: number;
  sharedAdditionalNightlyCents: number;
  separateCareNightlyCents: number;
  pickupStatus: PickupStatus;
  pickupStatusLabel: string;
  pickupStatusDetail: string;
  pickupStatusCare: string;
  groups: DogGroupLine[];
  boardingCents: number;
  extendedCareCents: number;
  bathCount: number;
  bathCents: number;
  transportationCents: number;
  adjustmentCents: number;
  adjustmentReason: string;
  internalNotes: string;
  subtotalBeforeAdjustmentCents: number;
  totalCents: number;
  bookingStatus: BookingStatusCard;
  dropoffDate: string;
  dropoffTime: string;
  pickupDate: string;
  pickupTime: string;
};

export type QuoteResult = QuoteFailure | QuoteSuccess;

const ERROR_MESSAGES: Record<QuoteErrorCode, string> = {
  "missing-dropoff": "Add the drop-off date and time to see a quote.",
  "missing-pickup": "Add the pickup date and time to see a quote.",
  "pickup-before-dropoff": "Pickup needs to be after drop-off.",
  "same-day":
    "Overnight boarding needs at least one night. Pickup is the same day as drop-off.",
  "invalid-dogs": "Add at least one dog to see a quote.",
  "invalid-rates": "Check the rate settings. Nightly rates should be $0 or more, and the first-dog rate should be more than $0 when a primary dog is included.",
  "extended-stay-ineligible":
    "Extended stay needs 14 or more nights. Choose Standard, Puppy, or Holiday.",
  "missing-adjustment-reason":
    "Add a reason for the client adjustment before using a non-zero amount.",
  "negative-total":
    "The client adjustment would make the total less than $0. Reduce the adjustment.",
};

type Ymd = { y: number; m: number; d: number };

export function parseYmd(value: string): Ymd | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  const probe = new Date(y, m - 1, d);
  if (
    probe.getFullYear() !== y ||
    probe.getMonth() !== m - 1 ||
    probe.getDate() !== d
  ) {
    return null;
  }
  return { y, m, d };
}

export function timeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

export function calendarNights(fromDate: string, toDate: string): number | null {
  const from = parseYmd(fromDate);
  const to = parseYmd(toDate);
  if (!from || !to) return null;
  const ms =
    Date.UTC(to.y, to.m - 1, to.d) - Date.UTC(from.y, from.m - 1, from.d);
  return Math.round(ms / 86_400_000);
}

export function firstDogNightlyCents(
  category: BoardingCategory,
  rates: QuoteRates,
): number {
  if (category === "puppy") return rates.puppyFirstDogCents;
  if (category === "holiday") return rates.holidayFirstDogCents;
  if (category === "extended-stay") return rates.extendedStayFirstDogCents;
  return rates.standardFirstDogCents;
}

export function sharedAdditionalNightlyCents(
  category: BoardingCategory,
  rates: QuoteRates,
): number {
  if (category === "extended-stay") {
    return rates.extendedStaySharedAdditionalCents;
  }
  return rates.sharedAdditionalCents;
}

export function classifyPickup(
  dropoffTime: string,
  pickupTime: string,
): PickupStatus | null {
  const dropoffMinutes = timeToMinutes(dropoffTime);
  const pickupMinutes = timeToMinutes(pickupTime);
  if (dropoffMinutes === null || pickupMinutes === null) return null;
  const laterBy = pickupMinutes - dropoffMinutes;
  if (laterBy <= ON_TIME_MAX_MINUTES) return "on-time";
  if (laterBy <= LATE_MAX_MINUTES) return "late";
  return "very-late";
}

export function pickupStatusCopy(status: PickupStatus): {
  label: string;
  detail: string;
  care: string;
} {
  if (status === "on-time") {
    return {
      label: "On-Time Pickup",
      detail: "No more than 2 hours later than drop-off time",
      care: "No Extended Care",
    };
  }
  if (status === "late") {
    return {
      label: "Late Pickup",
      detail: "More than 2–8 hours later",
      care: "50% Extended Care",
    };
  }
  return {
    label: "Very Late Pickup",
    detail: "More than 8 hours later",
    care: "100% Extended Care",
  };
}

function extendedCareMultiplierPercent(status: PickupStatus): number {
  if (status === "late") return 50;
  if (status === "very-late") return 100;
  return 0;
}

export function bookingStatusCard(
  relationship: ClientRelationship,
  fitCheck: FitCheckStatus,
): BookingStatusCard {
  if (relationship === "rover" || fitCheck === "rover") {
    return {
      title: "Booking status: Rover estimate",
      detail:
        "Confirm the final booking and payment details through Rover.",
      tone: "rover",
    };
  }

  if (fitCheck === "scheduled") {
    return {
      title: "Booking status: Estimate only",
      detail:
        "Fit Check is scheduled; booking remains subject to approval, availability, and final care review.",
      tone: "estimate",
    };
  }

  if (relationship === "new" && fitCheck !== "completed-approved") {
    return {
      title: "Booking status: Estimate only",
      detail:
        "A Meet & Greet / Fit Check is required and must be approved before a first boarding stay can be confirmed.",
      tone: "estimate",
    };
  }

  if (fitCheck === "completed-approved") {
    return {
      title: "Booking status: Fit Check complete",
      detail: "Quote remains subject to date availability and final care review.",
      tone: "ready",
    };
  }

  if (
    (relationship === "returning" ||
      relationship === "legacy-friends-family") &&
    fitCheck === "returning-approved"
  ) {
    return {
      title: "Booking status: Returning-client estimate",
      detail: "Booking remains subject to availability and final care review.",
      tone: "ready",
    };
  }

  return {
    title: "Booking status: Estimate only",
    detail: "Booking remains subject to availability and final care review.",
    tone: "estimate",
  };
}

function isWholeCount(value: number, min: number, max: number): boolean {
  return Number.isInteger(value) && value >= min && value <= max;
}

function rateIsValid(cents: number): boolean {
  return Number.isFinite(cents) && cents >= 0;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const firstDogCount = input.firstDogCount;
  const sharedAdditionalCount = input.sharedAdditionalCount;
  const separateCareCount = input.separateCareCount;
  const dogCount =
    firstDogCount + sharedAdditionalCount + separateCareCount;

  if (
    !isWholeCount(firstDogCount, 0, 1) ||
    !isWholeCount(sharedAdditionalCount, 0, MAX_DOGS) ||
    !isWholeCount(separateCareCount, 0, MAX_DOGS) ||
    dogCount > MAX_DOGS
  ) {
    return {
      ok: false,
      error: "invalid-dogs",
      message: ERROR_MESSAGES["invalid-dogs"],
    };
  }

  if (dogCount < 1) {
    return {
      ok: false,
      error: "invalid-dogs",
      message: ERROR_MESSAGES["invalid-dogs"],
    };
  }

  const rates: QuoteRates = {
    standardFirstDogCents: Math.round(input.standardFirstDogCents),
    puppyFirstDogCents: Math.round(input.puppyFirstDogCents),
    holidayFirstDogCents: Math.round(input.holidayFirstDogCents),
    extendedStayFirstDogCents: Math.round(input.extendedStayFirstDogCents),
    sharedAdditionalCents: Math.round(input.sharedAdditionalCents),
    separateCareAdditionalCents: Math.round(input.separateCareAdditionalCents),
    extendedStaySharedAdditionalCents: Math.round(
      input.extendedStaySharedAdditionalCents,
    ),
    bathCents: Math.round(input.bathCents),
  };

  const selectedFirstRate = firstDogNightlyCents(input.boardingCategory, rates);
  if (
    !rateIsValid(rates.standardFirstDogCents) ||
    !rateIsValid(rates.puppyFirstDogCents) ||
    !rateIsValid(rates.holidayFirstDogCents) ||
    !rateIsValid(rates.extendedStayFirstDogCents) ||
    !rateIsValid(rates.sharedAdditionalCents) ||
    !rateIsValid(rates.separateCareAdditionalCents) ||
    !rateIsValid(rates.extendedStaySharedAdditionalCents) ||
    !rateIsValid(rates.bathCents) ||
    (firstDogCount > 0 && selectedFirstRate <= 0)
  ) {
    return {
      ok: false,
      error: "invalid-rates",
      message: ERROR_MESSAGES["invalid-rates"],
    };
  }

  if (!isWholeCount(input.bathCount, 0, MAX_BATHS)) {
    return {
      ok: false,
      error: "invalid-rates",
      message: ERROR_MESSAGES["invalid-rates"],
    };
  }

  const dropoffDate = parseYmd(input.dropoffDate);
  const dropoffMinutes = timeToMinutes(input.dropoffTime);
  if (!dropoffDate || dropoffMinutes === null) {
    return {
      ok: false,
      error: "missing-dropoff",
      message: ERROR_MESSAGES["missing-dropoff"],
    };
  }

  const pickupDate = parseYmd(input.pickupDate);
  const pickupMinutes = timeToMinutes(input.pickupTime);
  if (!pickupDate || pickupMinutes === null) {
    return {
      ok: false,
      error: "missing-pickup",
      message: ERROR_MESSAGES["missing-pickup"],
    };
  }

  const nights = calendarNights(input.dropoffDate, input.pickupDate);
  if (nights === null) {
    return {
      ok: false,
      error: "missing-pickup",
      message: ERROR_MESSAGES["missing-pickup"],
    };
  }

  const pickupIsBeforeOrEqual =
    nights < 0 || (nights === 0 && pickupMinutes <= dropoffMinutes);
  if (pickupIsBeforeOrEqual) {
    return {
      ok: false,
      error: "pickup-before-dropoff",
      message: ERROR_MESSAGES["pickup-before-dropoff"],
    };
  }

  if (nights < 1) {
    return { ok: false, error: "same-day", message: ERROR_MESSAGES["same-day"] };
  }

  const extendedStayEligible = nights >= EXTENDED_STAY_MIN_NIGHTS;
  if (input.boardingCategory === "extended-stay" && !extendedStayEligible) {
    return {
      ok: false,
      error: "extended-stay-ineligible",
      message: ERROR_MESSAGES["extended-stay-ineligible"],
    };
  }

  const pickupStatus = classifyPickup(input.dropoffTime, input.pickupTime);
  if (!pickupStatus) {
    return {
      ok: false,
      error: "missing-pickup",
      message: ERROR_MESSAGES["missing-pickup"],
    };
  }

  const adjustmentCents = Math.round(input.adjustmentCents);
  const adjustmentReason = input.adjustmentReason.trim();
  if (adjustmentCents !== 0 && adjustmentReason === "") {
    return {
      ok: false,
      error: "missing-adjustment-reason",
      message: ERROR_MESSAGES["missing-adjustment-reason"],
    };
  }

  const carePercent = extendedCareMultiplierPercent(pickupStatus);
  const firstNightly = firstDogNightlyCents(input.boardingCategory, rates);
  const sharedNightly = sharedAdditionalNightlyCents(
    input.boardingCategory,
    rates,
  );
  const separateNightly = rates.separateCareAdditionalCents;
  const transportationCents = Math.max(0, Math.round(input.transportationCents));
  const bathLineCents = input.bathCount * rates.bathCents;

  const groups: DogGroupLine[] = [];
  if (firstDogCount > 0) {
    groups.push({
      key: "first",
      label: `First dog (${BOARDING_CATEGORY_LABELS[input.boardingCategory]})`,
      count: firstDogCount,
      nightlyCents: firstNightly,
      nights,
      boardingCents: firstNightly * nights * firstDogCount,
      extendedCareCents:
        firstDogCount * percentOfCents(firstNightly, carePercent),
    });
  }
  if (sharedAdditionalCount > 0) {
    groups.push({
      key: "shared",
      label:
        sharedAdditionalCount === 1
          ? "Shared-household additional dog"
          : "Shared-household additional dogs",
      count: sharedAdditionalCount,
      nightlyCents: sharedNightly,
      nights,
      boardingCents: sharedNightly * nights * sharedAdditionalCount,
      extendedCareCents:
        sharedAdditionalCount * percentOfCents(sharedNightly, carePercent),
    });
  }
  if (separateCareCount > 0) {
    groups.push({
      key: "separate",
      label:
        separateCareCount === 1
          ? "Separate-care additional dog"
          : "Separate-care additional dogs",
      count: separateCareCount,
      nightlyCents: separateNightly,
      nights,
      boardingCents: separateNightly * nights * separateCareCount,
      extendedCareCents:
        separateCareCount * percentOfCents(separateNightly, carePercent),
    });
  }

  const boardingCents = groups.reduce((sum, group) => sum + group.boardingCents, 0);
  const extendedCareCents = groups.reduce(
    (sum, group) => sum + group.extendedCareCents,
    0,
  );
  const subtotalBeforeAdjustmentCents =
    boardingCents + extendedCareCents + bathLineCents + transportationCents;
  const totalCents = subtotalBeforeAdjustmentCents + adjustmentCents;
  if (totalCents < 0) {
    return {
      ok: false,
      error: "negative-total",
      message: ERROR_MESSAGES["negative-total"],
    };
  }

  const copy = pickupStatusCopy(pickupStatus);

  return {
    ok: true,
    dogCount,
    firstDogCount,
    sharedAdditionalCount,
    separateCareCount,
    nights,
    extendedStayEligible,
    boardingCategory: input.boardingCategory,
    boardingCategoryLabel: BOARDING_CATEGORY_LABELS[input.boardingCategory],
    firstDogNightlyCents: firstNightly,
    sharedAdditionalNightlyCents: sharedNightly,
    separateCareNightlyCents: separateNightly,
    pickupStatus,
    pickupStatusLabel: copy.label,
    pickupStatusDetail: copy.detail,
    pickupStatusCare: copy.care,
    groups,
    boardingCents,
    extendedCareCents,
    bathCount: input.bathCount,
    bathCents: bathLineCents,
    transportationCents,
    adjustmentCents,
    adjustmentReason,
    internalNotes: input.internalNotes.trim(),
    subtotalBeforeAdjustmentCents,
    totalCents,
    bookingStatus: bookingStatusCard(
      input.clientRelationship,
      input.fitCheckStatus,
    ),
    dropoffDate: input.dropoffDate,
    dropoffTime: input.dropoffTime,
    pickupDate: input.pickupDate,
    pickupTime: input.pickupTime,
  };
}

export function formatClockTime(hhmm: string): string {
  const minutes = timeToMinutes(hhmm);
  if (minutes === null) return hhmm;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(mins).padStart(2, "0")} ${period}`;
}

export function formatWeekday(isoDate: string): string {
  const parsed = parseYmd(isoDate);
  if (!parsed) return isoDate;
  return new Date(parsed.y, parsed.m - 1, parsed.d).toLocaleDateString("en-US", {
    weekday: "long",
  });
}

export function buildQuoteScript(quote: QuoteSuccess): string {
  const dogPart = quote.dogCount === 1 ? "1 dog" : `${quote.dogCount} dogs`;
  const from = `${formatWeekday(quote.dropoffDate)} at ${formatClockTime(quote.dropoffTime)}`;
  const through = `${formatWeekday(quote.pickupDate)} at ${formatClockTime(quote.pickupTime)}`;
  const extras: string[] = [];
  if (quote.pickupStatus !== "on-time") extras.push("the late pickup");
  if (quote.bathCount === 1) extras.push("a bath");
  if (quote.bathCount > 1) extras.push(`${quote.bathCount} baths`);
  if (quote.transportationCents > 0) extras.push("pickup and drop-off");

  let including = "";
  if (extras.length === 1) including = `, including ${extras[0]}`;
  if (extras.length === 2) including = `, including ${extras[0]} and ${extras[1]}`;
  if (extras.length > 2) {
    including = `, including ${extras.slice(0, -1).join(", ")}, and ${extras[extras.length - 1]}`;
  }

  return `For ${dogPart} from ${from} through ${through}${including}, the estimated total would be ${formatCents(quote.totalCents)}.`;
}

export function addCalendarDays(isoDate: string, days: number): string {
  const parsed = parseYmd(isoDate);
  if (!parsed) return isoDate;
  const next = new Date(parsed.y, parsed.m - 1, parsed.d + days);
  const y = next.getFullYear();
  const m = String(next.getMonth() + 1).padStart(2, "0");
  const d = String(next.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function localIsoDate(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
