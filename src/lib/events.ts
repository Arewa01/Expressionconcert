import { events, type EventItem } from "@/content/events";

/** One dated session of an event. Weekly events produce one occurrence per week. */
export type Occurrence = {
  event: EventItem;
  /** YYYY-MM-DD */
  date: string;
  /** ISO timestamps (UTC) for start and end */
  startsAt: string;
  endsAt: string;
};

const DAY = 86_400_000;

/** Converts a UK wall-clock date and time to the real instant, handling GMT/BST. */
export function londonToUtc(date: string, time = "00:00"): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(guess));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asLondon = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return new Date(guess - (asLondon - guess));
}

const addDays = (date: string, n: number) => new Date(Date.parse(`${date}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);

function occurrence(event: EventItem, date: string): Occurrence {
  const start = londonToUtc(date, event.startTime);
  // Events without an end time are treated as two hours long
  const end = event.endTime ? londonToUtc(date, event.endTime) : new Date(start.getTime() + 2 * 3_600_000);
  return { event, date, startsAt: start.toISOString(), endsAt: end.toISOString() };
}

export function occurrencesOf(event: EventItem): Occurrence[] {
  if (!event.weeklyUntil) return [occurrence(event, event.start)];
  const out: Occurrence[] = [];
  for (let d = event.start; d <= event.weeklyUntil; d = addDays(d, 7)) out.push(occurrence(event, d));
  return out;
}

export const allOccurrences = () =>
  events.flatMap(occurrencesOf).sort((a, b) => a.startsAt.localeCompare(b.startsAt));

/** The next session that hasn't finished yet, or null if the event is over. */
export function nextOccurrence(event: EventItem, now = new Date()): Occurrence | null {
  return occurrencesOf(event).find((o) => new Date(o.endsAt) > now) ?? null;
}

export function lastOccurrence(event: EventItem): Occurrence {
  const all = occurrencesOf(event);
  return all[all.length - 1];
}

/** Each upcoming event once, at its next session, soonest first. */
export function upcomingEvents(now = new Date()): Occurrence[] {
  return events
    .map((e) => nextOccurrence(e, now))
    .filter((o): o is Occurrence => o !== null)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Each finished event once, at its last session, most recent first. */
export function pastEvents(now = new Date()): Occurrence[] {
  return events
    .filter((e) => !nextOccurrence(e, now))
    .map(lastOccurrence)
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

// ---------- Formatting (always in UK time) ----------

const fmt = (date: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", { timeZone: "Europe/London", ...opts });

export const formatDate = {
  long: (d: string) => fmt(d, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  medium: (d: string) => fmt(d, { day: "numeric", month: "short", year: "numeric" }),
  dayMonth: (d: string) => fmt(d, { weekday: "long", day: "numeric", month: "long" }),
  day: (d: string) => fmt(d, { day: "numeric" }),
  month: (d: string) => fmt(d, { month: "short" }),
  year: (d: string) => fmt(d, { year: "numeric" }),
  weekday: (d: string) => fmt(d, { weekday: "long" }),
};

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

export const formatTimeRange = (e: EventItem) =>
  e.endTime ? `${formatTime(e.startTime)} – ${formatTime(e.endTime)}` : formatTime(e.startTime);

/** "Every Tuesday" for weekly events, otherwise null */
export const recurrenceLabel = (e: EventItem) => (e.weeklyUntil ? `Every ${formatDate.weekday(e.start)}` : null);

/** Where the main register button should go for an event */
export const registerHref = (e: EventItem) => e.externalRegistration?.href ?? `/events/${e.slug}#register`;
