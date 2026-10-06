/** Integer-cent helpers so quote totals never display as $70.499999. */

export function percentOfCents(cents: number, percent: number): number {
  return Math.round((cents * percent) / 100);
}

export function formatCents(cents: number): string {
  const negative = cents < 0;
  const absolute = Math.abs(Math.round(cents));
  const dollars = Math.floor(absolute / 100);
  const remainder = absolute % 100;
  return `${negative ? "-" : ""}$${dollars.toLocaleString("en-US")}.${String(remainder).padStart(2, "0")}`;
}

function parseUnsignedDollarString(raw: string): number | null {
  const match = raw.match(/^(\d+)(?:\.(\d{1,2}))?$/);
  if (match) {
    const dollars = Number(match[1]);
    const centsPart = (match[2] ?? "").padEnd(2, "0");
    return dollars * 100 + Number(centsPart || "0");
  }
  const fallback = Number(raw);
  if (!Number.isFinite(fallback) || fallback < 0) return null;
  return Math.round(fallback * 100);
}

/** Parse a dollar string such as "47", "$23.50", or "0" into cents. */
export function parseDollarsToCents(raw: string): number | null {
  const trimmed = raw.trim().replace(/[$,]/g, "");
  if (trimmed === "") return 0;
  return parseUnsignedDollarString(trimmed);
}

/** Parse an adjustment such as "-25", "+10.50", or "25". */
export function parseSignedDollarsToCents(raw: string): number | null {
  const trimmed = raw.trim().replace(/[$,]/g, "").replace(/^\+/, "");
  if (trimmed === "" || trimmed === "-") return 0;
  const negative = trimmed.startsWith("-");
  const unsigned = negative ? trimmed.slice(1) : trimmed;
  if (unsigned === "") return 0;
  const cents = parseUnsignedDollarString(unsigned);
  if (cents === null) return null;
  return negative ? -cents : cents;
}

export function parsePercent(raw: string): number | null {
  const trimmed = raw.trim().replace(/%/g, "");
  if (trimmed === "") return 0;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}
