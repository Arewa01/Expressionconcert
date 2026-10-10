import type { ValueItem } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

export function ValuesStrip({ items }: { items: ValueItem[] }) {
  return (
    <section className="border-b border-neutral-100 bg-white">
      <Container>
        <Stagger stagger={0.12} className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v) => (
            <StaggerItem key={v.title} className="group flex items-start gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand/8 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon
                  name={v.icon}
                  className={`size-5 ${v.icon === "heart" ? "motion-safe:animate-[heartbeat-once_0.9s_ease-in-out_0.9s_1]" : ""}`}
                />
              </span>
              <div>
                <h3 className="font-bold text-ink">{v.title}</h3>
                <p className="mt-1 text-[15px] leading-snug text-neutral-500">{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
