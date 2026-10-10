"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Clock, MapPin, Repeat } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { EqualizerBackdrop } from "@/components/motion/EqualizerBackdrop";
import { easeOut } from "@/components/motion/easing";
import { Button } from "@/components/ui/Button";
import { CarouselButton } from "@/components/ui/CarouselButton";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatDate, formatTimeRange, recurrenceLabel, registerHref, type Occurrence } from "@/lib/events";
import { Countdown } from "./Countdown";
import { TicketImage } from "./TicketImage";

/** Events page banner: the soonest events as swipeable tickets, each with a live countdown. */
export function EventHero({ eyebrow, items }: { eyebrow: string; items: Occurrence[] }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const go = (d: 1 | -1) => setState(([i]) => [(i + d + items.length) % items.length, d]);
  const current = items[index];
  const { event } = current;
  const repeat = recurrenceLabel(event);
  const external = !!event.externalRegistration;

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={event.slug}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ImageSlot src={event.image} alt="" priority className="absolute inset-0 scale-110 opacity-50 blur-[2px]" />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      <EqualizerBackdrop count={56} className="absolute inset-x-0 bottom-0 h-24 opacity-50" />

      <Container className="relative py-20 sm:py-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
        >
          &bull; {eyebrow} &bull;
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
          className="mt-5 text-center text-4xl font-extrabold tracking-tight sm:text-6xl"
        >
          Next up,{" "}
          <AnimatePresence mode="wait" initial={false}>
            <motion.em
              key={current.date + event.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-serif font-bold whitespace-nowrap text-brand italic"
            >
              {formatDate.dayMonth(current.date)}
            </motion.em>
          </AnimatePresence>
        </motion.h1>

        <div className="relative mx-auto mt-12 max-w-4xl">
          {items.length > 1 && (
            <div className="absolute top-1/2 -left-6 z-10 hidden -translate-y-1/2 lg:block">
              <CarouselButton direction="prev" onClick={() => go(-1)} />
            </div>
          )}

          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.article
              key={event.slug}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="grid overflow-hidden rounded-3xl bg-white text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]"
            >
              <TicketImage
                src={event.image}
                alt={event.title}
                sizes="(min-width: 768px) 360px, 100vw"
                className="m-3 aspect-[16/10] md:order-2 md:ml-0 md:aspect-auto md:min-h-[300px]"
              />
              <div className="flex flex-col p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{event.category}</p>
                <h2 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                  <Link href={`/events/${event.slug}`} className="hover:text-brand">
                    {event.title}
                  </Link>
                </h2>
                <p className="mt-1 text-neutral-600">{event.subtitle}</p>
                <ul className="mt-5 grid gap-2 text-sm text-neutral-600 sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-brand" /> {formatDate.medium(current.date)}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="size-4 text-brand" /> {formatTimeRange(event)}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-brand" /> {event.venue}
                  </li>
                  {repeat && (
                    <li className="flex items-center gap-2">
                      <Repeat className="size-4 text-brand" /> {repeat}
                    </li>
                  )}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-5 pt-7">
                  <Button href={registerHref(event)} arrow={!external}>
                    {external ? "Get Tickets" : "Register Now"}
                  </Button>
                  <Link href={`/events/${event.slug}`} className="text-sm font-semibold underline decoration-neutral-300 underline-offset-4 hover:text-brand">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="absolute top-1/2 -right-6 z-10 hidden -translate-y-1/2 lg:block">
              <CarouselButton direction="next" onClick={() => go(1)} />
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Starts in</p>
          <Countdown key={current.startsAt} startsAt={current.startsAt} endsAt={current.endsAt} />
          {items.length > 1 && (
            <div className="mt-4 flex items-center gap-4 lg:hidden">
              <CarouselButton direction="prev" size="sm" onClick={() => go(-1)} />
              <CarouselButton direction="next" size="sm" onClick={() => go(1)} />
            </div>
          )}
          {items.length > 1 && (
            <div className="flex gap-2" role="tablist" aria-label="Upcoming events">
              {items.map((o, i) => (
                <button
                  key={o.event.slug}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={o.event.title}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-2 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
