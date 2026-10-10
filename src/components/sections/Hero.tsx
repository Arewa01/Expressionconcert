import type { Link } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { EqualizerBackdrop } from "@/components/motion/EqualizerBackdrop";
import { Handwrite } from "@/components/motion/Handwrite";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";

export type HeroProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  primaryCta: Link;
  secondaryCta: Link;
  proof: { title: string; subtitle: string };
  proofAvatars?: string[];
  script?: string[];
  image?: string;
};

export function Hero({
  eyebrow,
  title,
  titleAccent,
  description,
  primaryCta,
  secondaryCta,
  proof,
  proofAvatars = [],
  script,
  image,
}: HeroProps) {
  const avatars = proofAvatars.length ? proofAvatars : [undefined, undefined, undefined, undefined];

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <ImageSlot
        src={image}
        alt=""
        priority
        className="absolute inset-0"
        placeholderClassName="bg-[radial-gradient(ellipse_at_75%_40%,#1c1c1c_0%,#070707_65%)]"
      />
      {/* Darken the left side so copy stays readable over photography */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <EqualizerBackdrop className="absolute inset-x-0 bottom-0 h-28 opacity-60 sm:h-36" />

      <Container className="relative grid min-h-[620px] items-center py-24 lg:grid-cols-[1fr_auto]">
        <div className="max-w-4xl">
          <Reveal y={12}>
            <Eyebrow tone="white">{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl xl:text-[4.25rem]">
            <MaskLine onMount delay={0.15}>
              {title}
            </MaskLine>
            <MaskLine onMount delay={0.3}>
              <Accent className="text-brand xl:whitespace-nowrap">{titleAccent}</Accent>
            </MaskLine>
          </h1>
          <Reveal delay={0.55}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80">{description}</p>
          </Reveal>

          <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-4">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="dark">
              {secondaryCta.label}
            </Button>
          </Reveal>

          <div className="mt-14 flex items-center gap-5">
            <Stagger stagger={0.1} className="flex -space-x-3">
              {avatars.map((src, i) => (
                <StaggerItem key={i}>
                  <ImageSlot
                    src={src}
                    alt=""
                    sizes="48px"
                    className="size-12 rounded-2xl border-2 border-ink"
                    placeholderClassName="bg-neutral-800"
                  />
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={1.1} y={8} className="text-sm">
              <p className="font-semibold">{proof.title}</p>
              <p className="text-white/60">{proof.subtitle}</p>
            </Reveal>
          </div>
        </div>

        {script && (
          <p className="mt-16 hidden -rotate-3 text-right font-script text-4xl leading-tight text-white/90 lg:block xl:text-5xl">
            {script.map((line, i) => (
              <Handwrite key={i} delay={0.9 + i * 1.1}>
                {line}
              </Handwrite>
            ))}
          </p>
        )}
      </Container>
    </section>
  );
}
