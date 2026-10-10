import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type Supporter = { name: string; logo: string };

export function SupportersStrip({ title = "Supported by", supporters }: { title?: string; supporters: Supporter[] }) {
  return (
    <section className="border-y border-neutral-100 bg-white py-14">
      <Container>
        <Eyebrow className="text-center">{title}</Eyebrow>
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
