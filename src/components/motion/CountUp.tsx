"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 to a value like "1,000" when scrolled into view, keeping the thousands separator. */
export function CountUp({ value, plus = false }: { value: string; plus?: boolean }) {
  const target = Number(value.replace(/,/g, ""));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(target);
      setDone(true);
      return;
    }
    const controls = animate(0, target, {
      duration: target > 100 ? 1.8 : 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final number straight away */}
      <span className="sr-only">
        {value}
        {plus && "+"}
      </span>
      <span aria-hidden>{n.toLocaleString("en-GB")}</span>
      {plus && (
        <motion.span
          aria-hidden
          className="inline-block text-brand"
          initial={{ scale: 0, opacity: 0 }}
          animate={done ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}
        >
          +
        </motion.span>
      )}
    </span>
  );
}
