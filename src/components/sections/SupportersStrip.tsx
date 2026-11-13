import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type Supporter = { name: string; logo: string };
/** A headline funder or partner, shown larger with its own label (e.g. "Funded by") */
export type FeaturedSupporter = Supporter & { label: string };

export function SupportersStrip({
  title = "Supported by",
  featured = [],
  supporters,
}: {
  title?: string;
  featured?: FeaturedSupporter[];
  supporters: Supporter[];
}) {
  return (
    <section className="border-y border-neutral-100 bg-white py-14">
      <Container>
        {featured.length > 0 && (
          <>
            <Reveal className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-0 sm:divide-x sm:divide-neutral-200">
              {featured.map((s) => (
                <figure key={s.name} className="flex flex-col items-center gap-4 sm:px-12 lg:px-16">
                  <Eyebrow className="text-center">{s.label}</Eyebrow>
                  <Image
                    src={s.logo}
                    alt={`${s.label} ${s.name}`}
                    width={360}
                    height={140}
                    className="h-16 w-auto max-w-[240px] object-contain sm:h-20 sm:max-w-[280px]"
                  />
                </figure>
              ))}
            </Reveal>
            <div aria-hidden className="mx-auto my-12 h-px max-w-3xl bg-neutral-100" />
          </>
        )}

        <Eyebrow className="text-center">{featured.length ? `Also ${title.toLowerCase()}` : title}</Eyebrow>
        <Stagger as="ul" stagger={0.06} className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:grid lg:grid-cols-7 lg:gap-x-8">
          {supporters.map((s) => (
            <StaggerItem as="li" key={s.name} className="flex justify-center">
              <Image
                src={s.logo}
                alt={s.name}
                width={240}
                height={96}
                className="h-11 w-auto max-w-[160px] object-contain transition-transform duration-300 hover:scale-105 lg:max-w-full xl:h-12"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
