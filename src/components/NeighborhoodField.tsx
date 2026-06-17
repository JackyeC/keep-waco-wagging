"use client";

import { useState } from "react";
import {
  NEIGHBORHOOD_OTHER,
  resolveNeighborhoodValue,
  wacoCityNeighborhoods,
} from "@/data/wacoNeighborhoods";

export function NeighborhoodField({
  name = "neighborhood",
  disabled = false,
  inputClass,
  id = "neighborhood",
}: {
  name?: string;
  disabled?: boolean;
  inputClass: string;
  id?: string;
}) {
  const [preset, setPreset] = useState("");
  const [other, setOther] = useState("");
  const showOther = preset === NEIGHBORHOOD_OTHER;
  const resolved = resolveNeighborhoodValue(preset, other);

  return (
    <>
      <select
        id={id}
        value={preset}
        onChange={(e) => setPreset(e.target.value)}
        disabled={disabled}
        className={`${inputClass} mt-1.5`}
        aria-describedby={`${id}-hint`}
      >
        <option value="">Select neighborhood (optional)</option>
        {wacoCityNeighborhoods.map((neighborhood) => (
          <option key={neighborhood} value={neighborhood}>
            {neighborhood}
          </option>
        ))}
        <option value={NEIGHBORHOOD_OTHER}>Other — type yours below</option>
      </select>
      {showOther && (
        <input
          id={`${id}-other`}
          type="text"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          disabled={disabled}
          placeholder="Hewitt, Woodway, Lorena…"
          className={`${inputClass} mt-2`}
          aria-label="Your neighborhood"
        />
      )}
      <input type="hidden" name={name} value={resolved} />
      <p id={`${id}-hint`} className="caption mt-1.5">
        Names from the{" "}
        <a
          href="https://www.waco-texas.gov/resident/neighborhood-engagement/neighborhood-directory"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
        >
          City of Waco neighborhood directory
        </a>
        . Choose Other for nearby towns.
      </p>
    </>
  );
}
