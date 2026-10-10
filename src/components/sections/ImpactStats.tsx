import type { Link, Stat, TestimonialItem } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { CountUp } from "@/components/motion/CountUp";
import { Highlighter } from "@/components/motion/Highlighter";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Testimonial } from "./Testimonial";

export type ImpactStatsProps = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  cta: Link;
  stats: Stat[];
  testimonials: TestimonialItem[];
};

export function ImpactStats({ eyebrow, titleLine1, titleLine2, description, cta, stats, testimonials }: ImpactStatsProps) {
  return (
    <section className="bg-white py-24">
      <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="mt-8 text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl">
            <MaskLine delay={0.1}>{titleLine1}</MaskLine>
            <MaskLine delay={0.22} className="pb-3">
              <Highlighter delay={0.8}>{titleLine2}</Highlighter>
            </MaskLine>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">{description}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <Button href={cta.href} className="mt-10">
              {cta.label}
            </Button>
          </Reveal>
        </div>

        <div>
          <Stagger as="dl" stagger={0.1} className="grid grid-cols-2 gap-8 border-b border-neutral-200 pb-10 md:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="flex flex-col">
                <Icon name={s.icon} className="size-6 text-neutral-400" />
                <dt className="order-3 mt-2 text-sm leading-snug text-neutral-500">{s.label}</dt>
                <dd className="order-2 mt-3 text-4xl font-extrabold tracking-tight text-ink">
                  <CountUp value={s.value} plus={s.plus} />
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-12">
            <Testimonial items={testimonials} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
