import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DonateCTA } from "@/components/sections/DonateCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ProgrammeCard } from "@/components/sections/ProgrammeCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Split } from "@/components/sections/Split";
import { donateCta } from "@/content/home";
import { programmesPage } from "@/content/programmesPage";
import { upcomingEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Programmes",
  description: programmesPage.hero.description,
};

export const revalidate = 3600;

export default function ProgrammesPage() {
  const upcoming = upcomingEvents().filter((o) => o.event.category === "Programme" || o.event.category === "Taster Session");
  const { flagship } = programmesPage;

  return (
    <>
      <PageHero {...programmesPage.hero} />

      <section className="bg-[#faf8f5] py-24">
        <Container>
          <SectionHeading
            eyebrow="Upcoming sessions"
            title="Book your"
            titleAccent="place."
            description={
              upcoming.length
                ? "Register to save your place."
                : "New dates are on the way. Get in touch or join the mailing list to hear first."
            }
          />
          {upcoming.length > 0 && (
            <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {upcoming.map((o) => (
                <StaggerItem as="li" key={o.event.slug}>
                  <ProgrammeCard occurrence={o} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      <Split eyebrow={flagship.eyebrow} title={flagship.title} titleAccent={flagship.titleAccent} paragraphs={flagship.paragraphs} image={flagship.image} imageAlt="A Healing Through Harmony session" />
      <section className="bg-white pb-24">
        <Container>
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flagship.activities.map((a) => (
              <StaggerItem as="li" key={a} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-[#faf8f5] p-5 font-semibold text-ink">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-4" />
                </span>
                {a}
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="All year round" title="Ongoing" titleAccent="programmes." />
          </Reveal>
        </Container>
      </section>
      <ServiceCards items={programmesPage.ongoing} />

      <DonateCTA {...donateCta} />
    </>
  );
}
