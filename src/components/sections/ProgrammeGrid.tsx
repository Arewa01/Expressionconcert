"use client";

import { useRef } from "react";
import type { Link } from "@/content/types";
import type { Occurrence } from "@/lib/events";
import { Container } from "@/components/layout/Container";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { CarouselButton } from "@/components/ui/CarouselButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ProgrammeCard } from "./ProgrammeCard";

export type ProgrammeGridProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  cta: Link;
  items: { occurrence: Occurrence; past: boolean }[];
};

export function ProgrammeGrid({ eyebrow, title, titleAccent, description, cta, items }: ProgrammeGridProps) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 24), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#faf8f5] py-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[600px] rounded-full bg-brand/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 size-[500px] rounded-full bg-amber-200/20 blur-3xl" />

      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={12}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              <MaskLine delay={0.1}>
                {title} <Accent>{titleAccent}</Accent>
              </MaskLine>
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-4 max-w-xl text-lg text-neutral-500">{description}</p>
            </Reveal>
          </div>
          <Reveal delay={0.35} className="flex items-center gap-3">
            <Button href={cta.href} variant="outline" className="mr-2">
              {cta.label}
            </Button>
            <CarouselButton direction="prev" onClick={() => scroll(-1)} />
            <CarouselButton direction="next" onClick={() => scroll(1)} />
          </Reveal>
        </div>

        <div
          ref={track}
          className="-mx-5 mt-14 snap-x snap-mandatory scroll-px-5 sm:scroll-px-8 overflow-x-auto px-5 pb-12 -mb-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          <Stagger as="ul" stagger={0.08} className="flex gap-6 pt-2">
            {items.map(({ occurrence, past }) => (
              <StaggerItem
                as="li"
                key={occurrence.event.slug}
                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <ProgrammeCard occurrence={occurrence} past={past} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
