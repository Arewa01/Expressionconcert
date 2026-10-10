"use client";

import { motion, type Variants } from "motion/react";
import { easeOut } from "./easing";

type Tag = "div" | "li" | "p" | "span" | "section";

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: Tag;
  className?: string;
  id?: string;
}) {
  const M = motion[as];
  return (
    <M
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </M>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

/** Parent that reveals each StaggerItem one after another. */
export function Stagger({
  children,
  stagger = 0.08,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  as?: "div" | "ul" | "dl";
  className?: string;
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
}) {
  const M = motion[as];
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  );
}
