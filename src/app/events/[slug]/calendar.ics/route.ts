import { notFound } from "next/navigation";
import { events } from "@/content/events";
import { org } from "@/content/site";
import { getEvent, lastOccurrence, occurrencesOf } from "@/lib/events";

export const dynamic = "force-static";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const stamp = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
/** Local UK wall-clock time, e.g. 20260623T140000, so weekly sessions stay at 2pm across the clock change */
const local = (date: string, time: string) => `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;

const UK_TIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/London",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0000",
  "TZOFFSETTO:+0100",
  "TZNAME:BST",
  "DTSTART:19700329T010000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0000",
  "TZNAME:GMT",
  "DTSTART:19701025T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];
const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");

/** An .ics file so people can add the event (or every weekly session) to their calendar. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const first = occurrencesOf(event)[0];
  // Events without an end time are treated as two hours long
  const endTime =
    event.endTime ?? `${String(Number(event.startTime.slice(0, 2)) + 2).padStart(2, "0")}:${event.startTime.slice(3)}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Expression Concert//Events//EN",
    "CALSCALE:GREGORIAN",
    ...UK_TIMEZONE,
    "BEGIN:VEVENT",
    `UID:${event.slug}@expressionconcert.com`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART;TZID=Europe/London:${local(first.date, event.startTime)}`,
    `DTEND;TZID=Europe/London:${local(first.date, endTime)}`,
    ...(event.weeklyUntil ? [`RRULE:FREQ=WEEKLY;UNTIL=${stamp(lastOccurrence(event).endsAt)}`] : []),
    `SUMMARY:${escape(`${event.title}: ${event.subtitle}`)}`,
    `DESCRIPTION:${escape(`${event.summary}\n\nMore info: ${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/events/${event.slug}`)}`,
    `LOCATION:${escape(`${event.venue}, ${event.address}`)}`,
    `ORGANIZER;CN=${escape(org.name)}:mailto:${org.email}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
    },
  });
}
