// Converts various date/time inputs into a local ISO-like string "YYYY-MM-DDTHH:mm:ss"
export const toLocalDateTimeString = (value: any): string | null => {
  if (!value) return null;

  // helper to zero-pad numbers
  const pad = (n: number) => String(n).padStart(2, "0");

  // If value is a Date, preserve its local date/time fields (no UTC conversion) and return
  // an ISO-like string without timezone or fractional seconds: "YYYY-MM-DDTHH:mm:ss"
  if (value instanceof Date && !isNaN(value.getTime())) {
    return (
      value.getFullYear() +
      "-" +
      pad(value.getMonth() + 1) +
      "-" +
      pad(value.getDate()) +
      "T" +
      pad(value.getHours()) +
      ":" +
      pad(value.getMinutes()) +
      ":" +
      pad(value.getSeconds())
    );
  }

  // If value is a string that already contains an ISO datetime with optional timezone,
  // extract the date+time portion and return it without fractional seconds or timezone.
  const s = String(value).trim();
  // Match "YYYY-MM-DDTHH:mm:ss", optional ".xxx", optional "Z" or "+/-HH:MM" (or without colon)
  const isoLike = s.match(
    /^(\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/,
  );
  if (isoLike) {
    return isoLike[1].replace(" ", "T");
  }

  // Fallback: try to parse into a Date and use its local fields (loses original textual offset)
  const parsed = new Date(s);
  if (!isNaN(parsed.getTime())) {
    return (
      parsed.getFullYear() +
      "-" +
      pad(parsed.getMonth() + 1) +
      "-" +
      pad(parsed.getDate()) +
      "T" +
      pad(parsed.getHours()) +
      ":" +
      pad(parsed.getMinutes()) +
      ":" +
      pad(parsed.getSeconds())
    );
  }

  return null;
};
