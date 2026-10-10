import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DonateCTA } from "@/components/sections/DonateCTA";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Split } from "@/components/sections/Split";
import { SupportersStrip } from "@/components/sections/SupportersStrip";
import { Testimonial } from "@/components/sections/Testimonial";
import { ValuesStrip } from "@/components/sections/ValuesStrip";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { about } from "@/content/about";
import { values } from "@/content/home";
import { services } from "@/content/services";
import { supporters } from "@/content/supporters";

export const metadata: Metadata = {
  title: "About Us",
  description: about.hero.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...about.hero} />
      <ValuesStrip items={values} />
      <Split {...about.whoWeAre} imageAlt="A saxophonist performing at Expression Concert" />

      <section className="bg-[#faf8f5] py-20">
        <Container>
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {about.pillars.map((p, i) => (
              <StaggerItem key={p} className="group relative overflow-hidden rounded-3xl">
                <ImageSlot
                  src={about.photos[i]}
                  alt=""
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="aspect-[4/5]"
                  imageClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <p className="absolute right-6 bottom-6 left-6 text-xl font-bold text-white">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white pt-24">
        <Container>
          <SectionHeading eyebrow="What We Do" title="Five ways" titleAccent="music helps." />
        </Container>
      </section>
      <ServiceCards
        items={services.map((s) => ({
          title: `${s.title} ${s.titleAccent}`.replace(/\.$/, ""),
          description: s.summary,
          href: `/what-we-do#${s.id}`,
          image: s.image,
        }))}
      />

      <section className="bg-[#faf8f5] py-24">
        <Container className="max-w-5xl">
          <Reveal>
            <Testimonial items={[about.testimonial]} />
          </Reveal>
        </Container>
      </section>

      <SupportersStrip supporters={supporters} />
      <DonateCTA {...about.cta} />
    </>
  );
}
