"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Slow zoom-out on a background layer as its section scrolls through the viewport. */
export function ScrollZoom({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        {children}
      </motion.div>
    </div>
  );
}
