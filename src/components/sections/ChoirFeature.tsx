import type { Link } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";

export type ChoirFeatureProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  cta: Link;
  image?: string;
};

export function ChoirFeature({ eyebrow, title, titleAccent, description, cta, image }: ChoirFeatureProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <ScrollZoom className="absolute inset-0">
        <ImageSlot
          src={image}
          alt=""
          className="absolute inset-0"
          placeholderClassName="bg-[radial-gradient(ellipse_at_30%_50%,#151515_0%,#070707_70%)]"
        />
      </ScrollZoom>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/60 to-transparent" />

      <Container className="relative flex min-h-[560px] items-center justify-end py-24">
        <div className="max-w-lg">
          <Reveal y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            <MaskLine delay={0.1}>{title}</MaskLine>
            <MaskLine delay={0.25}>
              <Accent>{titleAccent}</Accent>
            </MaskLine>
          </h2>
          <Reveal delay={0.35}>
            <p className="mt-7 text-lg leading-relaxed text-white/75">{description}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <Button href={cta.href} className="mt-10">
              {cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
