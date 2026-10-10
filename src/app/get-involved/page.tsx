import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Field } from "@/components/forms/Fields";
import { Form } from "@/components/forms/Form";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SupportersStrip } from "@/components/sections/SupportersStrip";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getInvolved } from "@/content/getInvolved";
import { supporters } from "@/content/supporters";

export const metadata: Metadata = {
  title: "Get Involved",
  description: getInvolved.hero.description,
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero {...getInvolved.hero} />

      <section className="bg-[#faf8f5] py-24">
        <Container>
          <SectionHeading eyebrow="Ways to help" title="Three ways to" titleAccent="make music happen." />
          <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {getInvolved.ways.map((w) => (
              <StaggerItem key={w.id} className="h-full">
                <article
                  id={w.id}
                  className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-neutral-200/80 bg-white transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.22)]"
                >
                  <ImageSlot
                    src={w.image}
                    alt=""
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[4/3]"
                    imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-2xl font-bold text-ink">{w.title}</h3>
                    <p className="mt-3 leading-relaxed text-neutral-600">{w.description}</p>
                    <div className="mt-auto pt-8">
                      <Button href={w.cta.href} variant={w.id === "donate" ? "primary" : "outline"}>
                        {w.cta.label}
                      </Button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading {...getInvolved.newsletter} />
          <Reveal delay={0.2} className="rounded-3xl border border-neutral-200 bg-[#faf8f5] p-6 sm:p-10">
            <Form name="Newsletter signup" submitLabel="Subscribe" successTitle="You're on the list!" successMessage="We'll send you news about upcoming events and programmes.">
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
            </Form>
          </Reveal>
        </Container>
      </section>

      <SupportersStrip supporters={supporters} />
    </>
  );
}
