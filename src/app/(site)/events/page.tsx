import type { Metadata } from "next";
import { Play } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { EventCalendar } from "@/components/events/EventCalendar";
import { EventHero } from "@/components/events/EventHero";
import { EventRow } from "@/components/events/EventRow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DonateCTA } from "@/components/sections/DonateCTA";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { concerts, eventsPage } from "@/content/events";
import { allOccurrences, ongoingEvents, pastEvents, upcomingEvents } from "@/lib/events";
import { getEvents } from "@/lib/getEvents";

export const metadata: Metadata = {
  title: "Events",
  description: "Concerts, festivals and community music sessions across Stockport and Greater Manchester.",
};

// Re-check which events are upcoming every hour
export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEvents();
  const now = new Date();
  const upcoming = upcomingEvents(events, now);
  const ongoing = ongoingEvents(events, now);
  const past = pastEvents(events, now);
  // The hero leads with upcoming events (the concert), and falls back to ongoing programmes
  const featured = upcoming.length ? upcoming : ongoing;
  const startMonth = ([...upcoming, ...ongoing].sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]?.date ?? now.toISOString()).slice(0, 7);

  return (
    <>
      {featured.length ? (
        <EventHero eyebrow={eventsPage.eyebrow} items={featured} />
      ) : (
        <PageHero
          eyebrow="Events"
          title="New events"
          titleAccent="coming soon."
          description="We're planning what's next. Join the mailing list in the footer to hear first."
          image="/images/gallery/drum-festival/11.jpg"
        />
      )}

      {upcoming.length > 0 && (
        <section className="bg-white py-24">
          <Container className="max-w-5xl">
            <SectionHeading {...eventsPage.upcoming} align="center" />
            <Stagger className="mt-12">
              {upcoming.map((o) => (
                <StaggerItem key={o.event.slug}>
                  <EventRow occurrence={o} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      {ongoing.length > 0 && (
        <section className={`bg-white pb-24 ${upcoming.length ? "" : "pt-24"}`}>
          <Container className="max-w-5xl">
            <SectionHeading {...eventsPage.ongoing} align="center" />
            <Stagger className="mt-12">
              {ongoing.map((o) => (
                <StaggerItem key={o.event.slug}>
                  <EventRow occurrence={o} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      <section className="bg-[#faf8f5] py-24">
        <Container>
          <SectionHeading {...eventsPage.calendar} />
          <Reveal delay={0.15} className="mt-12">
            <EventCalendar occurrences={allOccurrences(events)} startMonth={startMonth} />
          </Reveal>
        </Container>
      </section>

      {past.length > 0 && (
        <section className="bg-white py-24">
          <Container className="max-w-5xl">
            <SectionHeading {...eventsPage.past} align="center" />
            <Stagger className="mt-12">
              {past.map((o) => (
                <StaggerItem key={o.event.slug}>
                  <EventRow occurrence={o} past />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      <section className="bg-ink py-24 text-white">
        <Container>
          <Reveal y={12}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">Past concerts</p>
          </Reveal>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {eventsPage.archive.title} <em className="font-serif font-bold text-brand italic">{eventsPage.archive.titleAccent}</em>
          </h2>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-2">
            {concerts.map((c) => (
              <StaggerItem key={c.id} className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                <ImageSlot
                  src={c.image}
                  alt={c.title}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[16/9]"
                  imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/70">{c.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={c.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      <Play className="size-4 fill-current" /> Watch
                    </a>
                    <Button href={c.gallery} variant="dark" size="sm" className="h-11 px-6">
                      Photos
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <DonateCTA {...eventsPage.cta} />
    </>
  );
}
