import { CalendarDays, Clock, MapPin, Repeat } from "lucide-react";
import type { EventItem } from "@/content/events";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatDate, formatTimeRange, recurrenceLabel, registerHref, type Occurrence } from "@/lib/events";

const tints = {
  amber: "from-[#fff7ea] to-[#fde9c8]",
  blush: "from-[#fdeeee] to-[#fdf6e9]",
  rose: "from-[#fdf8f0] to-[#fbe4e4]",
};

function Artwork({ event }: { event: EventItem }) {
  const a = event.artwork;

  if (!a) {
    return (
      <div className="relative h-full">
        <ImageSlot
          src={event.image}
          alt=""
          sizes="(min-width: 1024px) 25vw, 85vw"
          className="absolute inset-0"
          imageClassName="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <p className="absolute right-6 bottom-6 left-6 font-serif text-2xl font-bold text-white">{event.title}</p>
      </div>
    );
  }

  if (a.variant === "festival") {
    return (
      <div className="relative flex h-full flex-col items-center bg-gradient-to-br from-[#e1700f] via-[#d14a14] to-[#b5191f] bg-[length:160%_160%] bg-[position:0%_0%] px-8 pt-9 text-center text-white transition-[background-position] duration-700 group-hover:bg-[position:100%_100%]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">Greater Manchester</p>
        <p className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-[#ffd84a]">{a.headline}</p>
        {a.subline && <p className="mt-3 text-[15px] leading-snug text-white/90">{a.subline}</p>}
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full flex-col items-center bg-gradient-to-b ${tints[a.tint ?? "amber"]} bg-[length:100%_180%] bg-[position:0%_0%] px-6 pt-7 text-center transition-[background-position] duration-700 group-hover:bg-[position:0%_100%]`}
    >
      <p className="self-start text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Expression Concert</p>
      <p className="mt-3 font-serif text-[26px] font-bold italic leading-none text-brand">{a.scriptLine}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{a.headline}</p>
      {a.badge && <span className="mt-2 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">{a.badge}</span>}
      {a.subline && <p className="mt-2 max-w-[260px] text-xs font-semibold uppercase leading-relaxed text-ink/80">{a.subline}</p>}
      <ImageSlot
        src={event.image}
        alt=""
        sizes="120px"
        className="mt-5 size-28 rounded-full border-2 border-white/80 transition-transform duration-700 group-hover:scale-105"
        placeholderClassName="bg-transparent"
      />
    </div>
  );
}

export function ProgrammeCard({ occurrence, past = false }: { occurrence: Occurrence; past?: boolean }) {
  const { event, date } = occurrence;
  const repeat = recurrenceLabel(event);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_4px_24px_-12px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.25)]">
      <div className="relative h-72 overflow-hidden">
        <Artwork event={event} />
        {past && (
          <span className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            Past event
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink">
          {event.title}
          <span className="block text-base font-semibold text-neutral-500">{event.subtitle}</span>
        </h3>
        <ul className="mt-4 space-y-2.5 text-[15px] text-neutral-600">
          <li className="flex items-center gap-3">
            <CalendarDays className="size-4 shrink-0 text-brand" /> {repeat && !past ? `Next: ${formatDate.medium(date)}` : formatDate.medium(date)}
          </li>
          <li className="flex items-center gap-3">
            <Clock className="size-4 shrink-0 text-brand" /> {formatTimeRange(event)}
          </li>
          {repeat && !past && (
            <li className="flex items-center gap-3">
              <Repeat className="size-4 shrink-0 text-brand" /> {repeat}
            </li>
          )}
          <li className="flex items-start gap-3">
            <MapPin className="mt-1 size-4 shrink-0 text-brand" /> {event.venue}
          </li>
        </ul>
        <div className="mt-auto pt-7">
          {past ? (
            <Button href={`/events/${event.slug}`} variant="outline" size="sm">
              View Details
            </Button>
          ) : (
            <Button href={registerHref(event)} variant="outline" size="sm">
              {event.externalRegistration ? "Get Tickets" : "Register Now"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
