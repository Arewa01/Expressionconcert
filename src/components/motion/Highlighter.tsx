"use client";

import { motion } from "motion/react";

/** Yellow marker stroke that draws itself under the text when in view. */
export function Highlighter({ children, delay = 0.5 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-1 h-3 origin-left -rotate-1 rounded-full bg-[#fde58a]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
