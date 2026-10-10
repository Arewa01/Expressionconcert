import type { Link } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "./SectionHeading";

export type SplitProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  cta?: Link;
  reverse?: boolean;
  tone?: "white" | "cream";
};

/** Photo on one side, copy on the other. */
export function Split({
  id,
  eyebrow,
  title,
  titleAccent,
  paragraphs,
  image,
  imageAlt = "",
  cta,
  reverse,
  tone = "white",
}: SplitProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-24 ${tone === "cream" ? "bg-[#faf8f5]" : "bg-white"}`}>
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <ImageSlot
            src={image}
            alt={imageAlt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] rounded-3xl shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]"
          />
        </Reveal>
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} titleAccent={titleAccent} />
          <Reveal delay={0.2} className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          {cta && (
            <Reveal delay={0.3}>
              <Button href={cta.href} className="mt-8">
                {cta.label}
              </Button>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
