import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { org } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Expression Concert Music Foundation in Stockport.",
};

export default function ContactPage() {
  const cards = [
    {
      icon: MapPin,
      title: "Find us here",
      lines: [org.address.line1, `${org.address.town} ${org.address.postcode}`],
    },
    {
      icon: Phone,
      title: "Call us",
      lines: org.phones,
      href: (l: string) => `tel:${l.replace(/\s/g, "")}`,
    },
    { icon: Mail, title: "Email us", lines: [org.email], href: (l: string) => `mailto:${l}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to"
        titleAccent="hear from you."
        description="Questions about our programmes, events, lessons or partnerships? Get in touch."
        image="/images/gallery/expression-2-0/10.jpg"
      />

      <section className="bg-[#faf8f5] py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Get in touch" title="Say" titleAccent="hello." />
            <Stagger className="mt-10 grid gap-4">
              {cards.map(({ icon: Icon, title, lines, href }) => (
                <StaggerItem key={title} className="flex gap-5 rounded-2xl border border-neutral-200 bg-white p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand/8 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{title}</h3>
                    {lines.map((l) =>
                      href ? (
                        <a key={l} href={href(l)} className="block text-neutral-600 hover:text-brand">
                          {l}
                        </a>
                      ) : (
                        <p key={l} className="text-neutral-600">
                          {l}
                        </p>
                      ),
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.3)] sm:p-10">
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <Reveal>
        <iframe
          title="Map showing 228 Wellington Road South, Stockport"
          src={org.mapEmbed}
          loading="lazy"
          className="block h-[420px] w-full border-0 grayscale-[30%]"
        />
      </Reveal>
    </>
  );
}
