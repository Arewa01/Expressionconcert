import Link from "next/link";
import { MapPin, Repeat } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatTimeRange, recurrenceLabel, registerHref, type Occurrence } from "@/lib/events";
import { DateBlock } from "./DateBlock";
import { TicketImage } from "./TicketImage";

/** One event in a list: date block, details and a ticket-stub photo. */
export function EventRow({ occurrence, past = false, notch = "#ffffff" }: { occurrence: Occurrence; past?: boolean; notch?: string }) {
  const { event, date } = occurrence;
  const repeat = recurrenceLabel(event);
  const external = !!event.externalRegistration;

  return (
    <article className="group grid gap-5 border-b border-neutral-200 py-8 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)_minmax(0,300px)] md:items-center md:gap-8">
      <DateBlock date={date} time={event.startTime} muted={past} />

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
          {event.category}
          {past && <span className="ml-3 rounded-full bg-neutral-100 px-2 py-0.5 tracking-wider text-neutral-500">Past</span>}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-ink sm:text-[28px]">
          <Link href={`/events/${event.slug}`} className="transition-colors hover:text-brand">
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 text-neutral-600">{event.subtitle}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-500">
          <li className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand" /> {event.venue}
          </li>
          <li>{formatTimeRange(event)}</li>
          {repeat && !past && (
            <li className="flex items-center gap-1.5">
              <Repeat className="size-3.5 text-brand" /> {repeat}
            </li>
          )}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          {past ? (
            event.album && (
              <Button href={`/gallery#${event.album}`} variant="outline" size="sm">
                View Photos
              </Button>
            )
          ) : (
            <Button href={registerHref(event)} size="sm" arrow={!external}>
              {external ? "Get Tickets" : "Register Now"}
            </Button>
          )}
          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-semibold text-ink underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
          >
            View Details
          </Link>
        </div>
      </div>

      <Link href={`/events/${event.slug}`} aria-hidden tabIndex={-1} className="hidden md:block">
        <TicketImage src={event.image} alt="" sizes="300px" className="aspect-[16/10]" notch={notch} muted={past} />
      </Link>
    </article>
  );
}
