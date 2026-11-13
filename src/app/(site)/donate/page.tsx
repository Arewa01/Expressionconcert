import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DonateForm } from "@/components/forms/DonateForm";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { donateCta } from "@/content/home";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Donate",
  description: donateCta.description,
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your support"
        titleAccent="creates opportunity."
        description={donateCta.description}
        image="/images/gallery/music-therapy-sessions-1/07.jpg"
      />

      <section className="bg-[#faf8f5] py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Where your gift goes"
              title="Every pound"
              titleAccent="makes music happen."
              description="Your generous donation fuels our mission to create unforgettable musical experiences for everyone. Whether it's funding free public performances or supporting talented artists, your contribution directly impacts our ability to connect communities through music."
            />
            <Stagger as="ul" className="mt-10 grid gap-3">
              {services.map((s) => (
                <StaggerItem as="li" key={s.id} className="flex items-start gap-4 rounded-2xl bg-white p-5">
                  <Heart className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-bold text-ink">{`${s.title} ${s.titleAccent}`.replace(/\.$/, "")}</p>
                    <p className="text-sm text-neutral-600">{s.summary}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] sm:p-10 lg:sticky lg:top-28">
            <h2 className="text-2xl font-bold text-ink">Make a donation</h2>
            <p className="mt-2 mb-8 text-neutral-600">Expression Concert Music Foundation</p>
            <DonateForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
