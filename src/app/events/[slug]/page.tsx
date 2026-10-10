import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, CalendarPlus, Check, ChevronRight, Clock, Images, MapPin, Phone, Repeat, Ticket, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Countdown } from "@/components/events/Countdown";
import { EventRegisterForm } from "@/components/events/EventRegisterForm";
import { EventRow } from "@/components/events/EventRow";
import { EqualizerBackdrop } from "@/components/motion/EqualizerBackdrop";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { events } from "@/content/events";
import {
  formatDate,
  formatTimeRange,
  getEvent,
  lastOccurrence,
  nextOccurrence,
  occurrencesOf,
  pastEvents,
  recurrenceLabel,
  upcomingEvents,
} from "@/lib/events";

export const revalidate = 3600;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = getEvent((await params).slug);
  if (!event) return {};
  return {
    title: `${event.title}: ${event.subtitle}`,
    description: event.summary,
    openGraph: { images: [event.image] },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = getEvent((await params).slug);
  if (!event) notFound();

  const now = new Date();
  const next = nextOccurrence(event, now);
  const shown = next ?? lastOccurrence(event);
  const isPast = !next;
  const repeat = recurrenceLabel(event);
  const external = event.externalRegistration;
  const sessions = occurrencesOf(event)
    .filter((o) => new Date(o.endsAt) > now)
    .slice(0, 8)
    .map((o) => formatDate.long(o.date));
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${event.venue}, ${event.address}`)}&t=m&z=15&output=embed`;

  const more = [...upcomingEvents(now), ...pastEvents(now)].filter((o) => o.event.slug !== event.slug).slice(0, 3);

  const facts = [
    { icon: CalendarDays, label: repeat ? "Next session" : "Date", value: formatDate.long(shown.date) },
    { icon: Clock, label: "Time", value: formatTimeRange(event) },
    ...(repeat ? [{ icon: Repeat, label: "Runs", value: `${repeat} until ${formatDate.medium(event.weeklyUntil!)}` }] : []),
    { icon: MapPin, label: "Venue", value: `${event.venue}, ${event.address}` },
    ...(event.audience ? [{ icon: Users, label: "Who it's for", value: event.audience }] : []),
    ...(event.price ? [{ icon: Ticket, label: "Price", value: event.price }] : []),
    ...(event.enquiries ? [{ icon: Phone, label: "Enquiries", value: event.enquiries }] : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <ImageSlot src={event.image} alt="" priority className="absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />
        <EqualizerBackdrop count={56} className="absolute inset-x-0 bottom-0 h-20 opacity-50" />

        <Container className="relative py-20 sm:py-24">
          <Reveal y={8}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-white/90">{event.title}</span>
            </nav>
          </Reveal>

          <Reveal y={10} delay={0.05} className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-widest">{event.category}</span>
            {isPast && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest">Past event</span>
            )}
          </Reveal>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] font-bold sm:text-6xl">
            <MaskLine onMount delay={0.1}>
              {event.title}
            </MaskLine>
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-4 text-xl text-white/80">{event.subtitle}</p>
            <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <CalendarDays className="size-4 text-brand" /> {formatDate.long(shown.date)}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-brand" /> {formatTimeRange(event)}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-brand" /> {event.venue}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {isPast ? (
              <p className="text-lg text-white/70">This event has finished. Thank you to everyone who came.</p>
            ) : (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  {repeat ? "Next session starts in" : "Starts in"}
                </p>
                <Countdown startsAt={shown.startsAt} endsAt={shown.endsAt} />
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {isPast ? (
                event.album && (
                  <Button href={`/gallery#${event.album}`} arrow={false}>
                    <Images className="size-4" /> View Photos
                  </Button>
                )
              ) : (
                <>
                  <Button href={external?.href ?? "#register"} arrow={!external}>
                    {external ? external.label : "Register Now"}
                  </Button>
                  <a
                    href={`/events/${event.slug}/calendar.ics`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <CalendarPlus className="size-4" /> Add to Calendar
                  </a>
                </>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#faf8f5] py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <SectionHeading eyebrow="About this event" title="What to" titleAccent="expect." />
            <Reveal delay={0.15} className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
              {event.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            {event.highlights && (
              <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
                {event.highlights.map((h) => (
                  <StaggerItem as="li" key={h} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-semibold text-ink ring-1 ring-neutral-200">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check className="size-4" />
                    </span>
                    {h}
                  </StaggerItem>
                ))}
              </Stagger>
            )}

            {repeat && sessions.length > 0 && (
              <Reveal className="mt-12">
                <h3 className="text-xl font-bold text-ink">Upcoming sessions</h3>
                <p className="mt-1 text-sm text-neutral-500">{formatTimeRange(event)} at {event.venue}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {sessions.map((s) => (
                    <li key={s} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-neutral-700 ring-1 ring-neutral-200">
                      <CalendarDays className="size-4 shrink-0 text-brand" /> {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {event.poster && (
              <Reveal className="mt-12">
                <h3 className="text-xl font-bold text-ink">Event poster</h3>
                <a href={event.poster} target="_blank" rel="noopener noreferrer" className="group mt-4 block max-w-sm">
                  <ImageSlot
                    src={event.poster}
                    alt={`${event.title} poster`}
                    sizes="384px"
                    className="aspect-[4/5] rounded-2xl shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
                    imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </a>
              </Reveal>
            )}
            {event.credits && <p className="mt-8 text-sm text-neutral-500">{event.credits}</p>}
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-24">
            <Reveal className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200">
              <dl className="grid gap-4 p-7">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <Icon className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{label}</dt>
                      <dd className="text-ink">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <iframe title={`Map of ${event.venue}`} src={mapSrc} loading="lazy" className="block h-56 w-full border-0" />
            </Reveal>

            {!isPast && !external && (
              <Reveal id="register" className="scroll-mt-24 rounded-3xl bg-white p-7 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200">
                <h2 className="font-serif text-2xl font-bold text-ink">Save your place</h2>
                <p className="mt-1 mb-6 text-sm text-neutral-500">Register below and we&apos;ll keep a seat for you.</p>
                <EventRegisterForm title={`${event.title} (${event.subtitle})`} sessions={repeat ? sessions : undefined} />
              </Reveal>
            )}
            {!isPast && external && (
              <Reveal>
                <Button href={external.href} className="w-full justify-center">
                  {external.label}
                </Button>
              </Reveal>
            )}
          </aside>
        </Container>
      </section>

      {more.length > 0 && (
        <section className="bg-white py-20">
          <Container className="max-w-5xl">
            <SectionHeading eyebrow="More events" title="You might" titleAccent="also like." />
            <div className="mt-8">
              {more.map((o) => (
                <EventRow key={o.event.slug} occurrence={o} past={!nextOccurrence(o.event, now)} />
              ))}
            </div>
            <Reveal className="mt-8 text-center">
              <Button href="/events" variant="outline">
                View All Events
              </Button>
            </Reveal>
          </Container>
        </section>
      )}
    </>
  );
}
