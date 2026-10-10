import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function ServiceCards({ items }: { items: ServiceItem[] }) {
  return (
    <section className="bg-white py-24">
      <Container>
        <Stagger stagger={0.12} className="grid gap-8 md:grid-cols-3">
          {items.map((s) => (
            <StaggerItem key={s.title} className="h-full">
              <Link
                href={s.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200/80 bg-[#faf9f6] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.22)]"
              >
                <ImageSlot
                  src={s.image}
                  alt={s.title}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[16/10]"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  placeholderClassName="bg-transparent"
                />
                <div className="p-8 pt-4">
                  <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-neutral-600">{s.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
                    Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
