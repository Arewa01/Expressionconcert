import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SchoolForm } from "@/components/forms/SchoolForm";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Split } from "@/components/sections/Split";
import { schoolPage } from "@/content/school";

export const metadata: Metadata = {
  title: "School of Music",
  description: schoolPage.hero.description,
};

export default function SchoolPage() {
  return (
    <>
      <PageHero {...schoolPage.hero} />
      <Split {...schoolPage.intro} imageAlt="A student and tutor at the keyboard" />

      <section className="bg-[#faf8f5] py-24">
        <Container>
          <SectionHeading eyebrow="How it works" title="Lessons that" titleAccent="fit your life." />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {schoolPage.options.map((o) => (
              <StaggerItem
                key={o.title}
                className="rounded-3xl border border-neutral-200 bg-white p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.2)]"
              >
                <h3 className="text-xl font-bold text-ink">{o.title}</h3>
                <p className="mt-2 text-neutral-600">{o.description}</p>
                <ul className="mt-6 space-y-3 text-[15px] text-neutral-700">
                  {o.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {p}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section id="register" className="scroll-mt-20 bg-white py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Registration"
            title="Register"
            titleAccent="today."
            description="Tell us about the student and the lessons you're interested in. We'll be in touch to arrange everything."
            align="center"
          />
          <Reveal delay={0.2} className="mt-12">
            <SchoolForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
