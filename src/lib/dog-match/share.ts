import type { QuizAnswers } from "@/data/dog-match/types";

export function encodeAnswers(answers: QuizAnswers): string {
  const json = JSON.stringify(answers);
  if (typeof Buffer !== "undefined") {
    return Buffer.from(json, "utf8").toString("base64url");
  }
  return btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeAnswers(raw: string | null | undefined): QuizAnswers | null {
  if (!raw) return null;
  try {
    const json =
      typeof Buffer !== "undefined"
        ? Buffer.from(raw, "base64url").toString("utf8")
        : decodeBase64Url(raw);
    const parsed = JSON.parse(json) as QuizAnswers;
    if (!parsed?.homeType || !parsed?.desiredLife) return null;
    return parsed;
  } catch {
    return null;
  }
}

function decodeBase64Url(raw: string): string {
  const padded = raw.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((raw.length + 3) % 4);
  return atob(padded);
}

export function dogMatchSharePath(answers: QuizAnswers): string {
  return `/dog-match?m=${encodeAnswers(answers)}`;
}
