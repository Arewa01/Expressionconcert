import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DonateCTA } from "@/components/sections/DonateCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Split } from "@/components/sections/Split";
import { donateCta } from "@/content/home";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Music therapy, community music education, therapeutic workshops, artist development and cultural events.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Healing, learning"
        titleAccent="and belonging."
        description="We use music to support mental health, open up learning and bring communities together across Stockport and Greater Manchester."
        image="/images/gallery/music-therapy-sessions-2/03.jpg"
      />

      <nav aria-label="Services" className="sticky top-16 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <Container>
          <Stagger as="ul" stagger={0.05} className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
            {services.map((s) => (
              <StaggerItem as="li" key={s.id} className="shrink-0">
                <Link
                  href={`#${s.id}`}
                  className="block rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand hover:text-brand"
                >
                  {`${s.title} ${s.titleAccent}`.replace(/\.$/, "")}
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </nav>

      {services.map((s, i) => (
        <Split
          key={s.id}
          id={s.id}
          eyebrow={`0${i + 1}`}
          title={s.title}
          titleAccent={s.titleAccent}
          paragraphs={s.paragraphs}
          image={s.image}
          imageAlt={s.imageAlt}
          cta={s.cta}
          reverse={i % 2 === 1}
          tone={i % 2 === 1 ? "cream" : "white"}
        />
      ))}

      <DonateCTA {...donateCta} />
    </>
  );
}
