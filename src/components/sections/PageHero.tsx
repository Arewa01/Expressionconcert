import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Link as LinkT } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { EqualizerBackdrop } from "@/components/motion/EqualizerBackdrop";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";

export type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  image?: string;
  cta?: LinkT;
  /** Label for the breadcrumb, defaults to the eyebrow */
  crumb?: string;
};

export function PageHero({ eyebrow, title, titleAccent, description, image, cta, crumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <ImageSlot
        src={image}
        alt=""
        priority
        className="absolute inset-0 opacity-70"
        placeholderClassName="bg-[radial-gradient(ellipse_at_75%_40%,#1c1c1c_0%,#070707_65%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />
      <EqualizerBackdrop count={56} className="absolute inset-x-0 bottom-0 h-20 opacity-50" />

      <Container className="relative py-24 sm:py-28">
        <Reveal y={8}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-white/90">{crumb ?? eyebrow}</span>
          </nav>
        </Reveal>
        <Reveal y={12} delay={0.05}>
          <Eyebrow className="mt-10">{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          <MaskLine onMount delay={0.1}>
            {title}
          </MaskLine>
          {titleAccent && (
            <MaskLine onMount delay={0.22}>
              <Accent>{titleAccent}</Accent>
            </MaskLine>
          )}
        </h1>
        {description && (
          <Reveal delay={0.35}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80">{description}</p>
          </Reveal>
        )}
        {cta && (
          <Reveal delay={0.45}>
            <Button href={cta.href} className="mt-9">
              {cta.label}
            </Button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
