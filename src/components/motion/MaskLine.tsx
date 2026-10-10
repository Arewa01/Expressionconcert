"use client";

import { motion, type Variants } from "motion/react";
import { easeOut } from "./easing";

/**
 * One line of a heading that slides up from behind a mask.
 * `onMount` plays immediately (for above-the-fold copy); otherwise it waits until in view.
 * The visible wrapper is what gets observed: the inner line starts fully clipped,
 * so observing it directly would never report it as in view.
 */
export function MaskLine({
  children,
  delay = 0,
  onMount = false,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  onMount?: boolean;
  className?: string;
}) {
  const line: Variants = {
    hidden: { y: "105%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.9, delay, ease: easeOut } },
  };

  return (
    // Bottom padding stops descenders (g, y, p) being clipped by the mask
    <motion.span
      className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      <motion.span className="block" variants={line}>
        {children}
      </motion.span>
    </motion.span>
  );
}
