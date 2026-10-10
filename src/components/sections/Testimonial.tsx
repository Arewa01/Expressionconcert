"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { easeOut } from "@/components/motion/easing";
import type { TestimonialItem } from "@/content/types";
import { CarouselButton } from "@/components/ui/CarouselButton";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function Testimonial({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const t = items[index];
  if (!t) return null;
  const go = (d: 1 | -1) => {
    setDir(d);
    setIndex((i) => (i + d + items.length) % items.length);
  };

  return (
    <figure className="grid overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-50 md:grid-cols-[1fr_1.6fr]">
      <ImageSlot
        src={t.image}
        alt={t.name}
        sizes="(min-width: 768px) 300px, 100vw"
        className="min-h-48 md:min-h-full"
        placeholderClassName="bg-neutral-100/70"
      />
      <div className="p-8 sm:p-10">
        <span aria-hidden className="font-serif text-4xl font-bold leading-none text-brand">
          &ldquo;
        </span>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.blockquote
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -24 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mt-2 font-serif text-xl font-semibold italic leading-relaxed text-ink"
          >
            {t.quote}
          </motion.blockquote>
        </AnimatePresence>
        <figcaption className="mt-6 flex items-end justify-between gap-4">
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <p className="font-bold text-ink">{t.name}</p>
            <p className="text-sm text-neutral-500">{t.role}</p>
          </motion.div>
          {items.length > 1 && (
            <div className="flex gap-2">
              <CarouselButton direction="prev" size="sm" onClick={() => go(-1)} />
              <CarouselButton direction="next" size="sm" onClick={() => go(1)} />
            </div>
          )}
        </figcaption>
      </div>
    </figure>
  );
}
