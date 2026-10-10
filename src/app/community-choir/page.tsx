import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ChoirForm } from "@/components/forms/ChoirForm";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Split } from "@/components/sections/Split";
import { choirPage } from "@/content/choir";

export const metadata: Metadata = {
  title: "Community Choir",
  description: choirPage.hero.description,
};

export default function ChoirPage() {
  const { story, highlights, form } = choirPage;
  return (
    <>
      <PageHero {...choirPage.hero} />
      <Split {...story} imageAlt="A singer performing at the Christmas Concert" />

      <section className="bg-ink py-20 text-white">
        <Container>
          <Stagger className="grid gap-10 md:grid-cols-3">
            {highlights.map((h, i) => (
              <StaggerItem key={h.title} className="border-t border-white/15 pt-6">
                <p className="font-serif text-5xl font-bold italic text-brand">0{i + 1}</p>
                <h3 className="mt-4 text-xl font-bold">{h.title}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{h.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section id="join" className="scroll-mt-20 bg-[#faf8f5] py-24">
        <Container className="max-w-3xl">
          <SectionHeading {...form} align="center" />
          <Reveal delay={0.2} className="mt-12 rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.3)] sm:p-10">
            <ChoirForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
