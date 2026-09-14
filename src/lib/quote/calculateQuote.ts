import { formatCents, percentOfCents } from "./money";

export const DEFAULT_FIRST_DOG_NIGHTLY_CENTS = 4700;
export const DEFAULT_ADDITIONAL_DOG_PERCENT = 50;

export const ON_TIME_MAX_MINUTES = 120;
export const LATE_MAX_MINUTES = 480;

export const MIN_DOGS = 1;
export const MAX_DOGS = 20;

export type PickupStatus = "on-time" | "late" | "very-late";

export type QuoteRates = {
  firstDogNightlyCents: number;
  additionalDogPercent: number;
};

export type QuoteInput = QuoteRates & {
  dogCount: number;
  dropoffDate: string;
  dropoffTime: string;
  pickupDate: string;
  pickupTime: string;
  transportationCents: number;
};

export type DogQuoteLine = {
  dogNumber: number;
  nightlyCents: number;
  nights: number;
  boardingCents: number;
  extendedCareCents: number;
};

export type QuoteErrorCode =
  | "missing-dropoff"
  | "missing-pickup"
  | "pickup-before-dropoff"
  | "same-day"
  | "invalid-dogs"
  | "invalid-rates";

export type QuoteFailure = {
  ok: false;
  error: QuoteErrorCode;
  message: string;
};

export type QuoteSuccess = {
  ok: true;
  dogCount: number;
  nights: number;
  pickupStatus: PickupStatus;
  pickupStatusLabel: string;
  pickupStatusDetail: string;
  pickupStatusCare: string;
  dogs: DogQuoteLine[];
  boardingCents: number;
  extendedCareCents: number;
  transportationCents: number;
  totalCents: number;
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
  "invalid-dogs": "Choose at least one dog.",
  "invalid-rates": "Check the rate settings. First-dog rate should be more than $0.",
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

export function nightlyRateCents(
  dogNumber: number,
  rates: QuoteRates,
): number {
  if (dogNumber <= 1) return rates.firstDogNightlyCents;
  return percentOfCents(rates.firstDogNightlyCents, rates.additionalDogPercent);
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

export function calculateQuote(input: QuoteInput): QuoteResult {
  if (
    !Number.isInteger(input.dogCount) ||
    input.dogCount < MIN_DOGS ||
    input.dogCount > MAX_DOGS
  ) {
    return { ok: false, error: "invalid-dogs", message: ERROR_MESSAGES["invalid-dogs"] };
  }

  if (
    !Number.isFinite(input.firstDogNightlyCents) ||
    input.firstDogNightlyCents <= 0 ||
    !Number.isFinite(input.additionalDogPercent) ||
    input.additionalDogPercent < 0
  ) {
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

  const pickupStatus = classifyPickup(input.dropoffTime, input.pickupTime);
  if (!pickupStatus) {
    return {
      ok: false,
      error: "missing-pickup",
      message: ERROR_MESSAGES["missing-pickup"],
    };
  }

  const carePercent = extendedCareMultiplierPercent(pickupStatus);
  const transportationCents = Math.max(0, Math.round(input.transportationCents));
  const rates: QuoteRates = {
    firstDogNightlyCents: Math.round(input.firstDogNightlyCents),
    additionalDogPercent: input.additionalDogPercent,
  };

  const dogs: DogQuoteLine[] = [];
  for (let dogNumber = 1; dogNumber <= input.dogCount; dogNumber += 1) {
    const nightlyCents = nightlyRateCents(dogNumber, rates);
    dogs.push({
      dogNumber,
      nightlyCents,
      nights,
      boardingCents: nightlyCents * nights,
      extendedCareCents: percentOfCents(nightlyCents, carePercent),
    });
  }

  const boardingCents = dogs.reduce((sum, dog) => sum + dog.boardingCents, 0);
  const extendedCareCents = dogs.reduce(
    (sum, dog) => sum + dog.extendedCareCents,
    0,
  );
  const copy = pickupStatusCopy(pickupStatus);

  return {
    ok: true,
    dogCount: input.dogCount,
    nights,
    pickupStatus,
    pickupStatusLabel: copy.label,
    pickupStatusDetail: copy.detail,
    pickupStatusCare: copy.care,
    dogs,
    boardingCents,
    extendedCareCents,
    transportationCents,
    totalCents: boardingCents + extendedCareCents + transportationCents,
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
  const late = quote.pickupStatus !== "on-time";
  const transport = quote.transportationCents > 0;

  let including = "";
  if (late && transport) {
    including = ", including the late pickup and pickup and drop-off";
  } else if (late) {
    including = ", including the late pickup";
  } else if (transport) {
    including = ", including pickup and drop-off";
  }

  return `For ${dogPart} from ${from} through ${through}${including}, your total would be ${formatCents(quote.totalCents)}.`;
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
