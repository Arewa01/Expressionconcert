"use client";

import { motion } from "motion/react";

/** Wipes text in from left to right, like it is being written. */
export function Handwrite({
  children,
  delay = 0,
  duration = 1.4,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`block ${className}`}
      initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
      animate={{ clipPath: "inset(-20% -15% -20% 0)" }}
      transition={{ duration, delay, ease: [0.45, 0, 0.25, 1] }}
    >
      {children}
    </motion.span>
  );
}
