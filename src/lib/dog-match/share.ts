import type { QuizAnswers } from "@/data/dog-match/types";

/**
 * Use standard base64 plus URL-safe substitutions, not the "base64url" encoding
 * name. The Buffer polyfill shipped in the browser bundle does not support
 * "base64url" and throws "Unknown encoding: base64url", which broke quiz
 * completion (share URL never written) and Share My Match.
 */
function utf8ToBase64Url(text: string): string {
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(text, "utf8").toString("base64")
      : btoa(text);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToUtf8(raw: string): string {
  const padded = raw.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((raw.length + 3) % 4);
  return typeof Buffer !== "undefined"
    ? Buffer.from(padded, "base64").toString("utf8")
    : atob(padded);
}

export function encodeAnswers(answers: QuizAnswers): string {
  return utf8ToBase64Url(JSON.stringify(answers));
}

export function decodeAnswers(raw: string | null | undefined): QuizAnswers | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(base64UrlToUtf8(raw)) as QuizAnswers;
    if (!parsed?.homeType || !parsed?.desiredLife) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function dogMatchSharePath(answers: QuizAnswers): string {
  return `/dog-match?m=${encodeAnswers(answers)}`;
}
