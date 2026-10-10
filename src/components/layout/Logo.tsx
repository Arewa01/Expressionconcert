"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";

const bars = [22, 40, 30, 40, 22];

// Each bar bounces through its own levels, then settles at its resting height (1)
const levels = [
  [1, 0.4, 1.15, 0.6, 1],
  [1, 0.55, 0.3, 1.1, 1],
  [1, 1.2, 0.45, 0.8, 1],
  [1, 0.35, 0.9, 0.5, 1],
  [1, 0.8, 0.4, 1.2, 1],
];

export function Logo({ className = "" }: { className?: string }) {
  const controls = useAnimationControls();
  const play = () =>
    controls.start((i: number) => ({
      scaleY: levels[i],
      transition: { duration: 1.2, ease: "easeInOut", delay: i * 0.04 },
    }));

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link
      href="/"
      aria-label="Expression Concert home"
      onMouseEnter={play}
      className={`flex items-center gap-3 ${className}`}
    >
      <span aria-hidden className="flex h-10 items-center gap-[5px]">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            custom={i}
            animate={controls}
            className="w-[5px] rounded-full bg-brand"
            style={{ height: h }}
          />
        ))}
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-bold tracking-[0.22em] text-ink">EXPRESSION</span>
        <span className="mt-1 block text-[11px] font-medium tracking-[0.42em] text-neutral-500">
          CONCERT
        </span>
      </span>
    </Link>
  );
}
