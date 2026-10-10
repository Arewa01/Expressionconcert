import { Heart } from "lucide-react";
import type { Link } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";

export type DonateCTAProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: Link;
  image?: string;
};

export function DonateCTA({ eyebrow, title, description, cta, image }: DonateCTAProps) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <ImageSlot src={image} alt="" className="absolute inset-0" placeholderClassName="bg-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,11,0.88)_0%,rgba(110,18,24,0.78)_28%,rgba(200,30,40,0.93)_55%,rgba(160,24,30,0.97)_100%)]"
      />
      <Heart aria-hidden strokeWidth={1.5} className="animate-heartbeat absolute right-10 bottom-10 size-24 text-white/20" />

      <Container className="relative flex min-h-[520px] items-center justify-end py-24">
        <div className="max-w-2xl">
          <Reveal y={12}>
            <Eyebrow tone="white">{eyebrow}</Eyebrow>
          </Reveal>
          <h2 className="mt-6 font-serif text-5xl font-bold italic leading-tight sm:text-6xl">
            <MaskLine delay={0.1}>{title}</MaskLine>
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-6 text-lg leading-relaxed text-white/85">{description}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <Button
              href={cta.href}
              variant="white"
              className="mt-10 transition-shadow duration-300 hover:shadow-[0_0_0_6px_rgba(255,255,255,0.15),0_0_36px_6px_rgba(255,255,255,0.35)]"
            >
              {cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
