"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60 };
}

/** A single number that slides when it changes */
function Unit({ value, label, tone }: { value: number; label: string; tone: "dark" | "light" }) {
  const text = String(value).padStart(2, "0");
  return (
    <div
      className={`flex min-w-[64px] flex-col items-center rounded-2xl px-3 py-3 sm:min-w-[76px] ${
        tone === "dark" ? "bg-white/10 text-white ring-1 ring-white/15 backdrop-blur" : "bg-ink text-white"
      }`}
    >
      <span className="relative h-9 overflow-hidden text-3xl font-extrabold tabular-nums leading-9 sm:h-10 sm:text-4xl sm:leading-10">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">{label}</span>
    </div>
  );
}

/**
 * Live countdown to an event. Renders dashes on the server so the first paint matches,
 * then ticks every second. Shows "Happening now" between start and end.
 */
export function Countdown({
  startsAt,
  endsAt,
  tone = "dark",
  className = "",
}: {
  startsAt: string;
  endsAt: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = Date.parse(startsAt);
  const end = Date.parse(endsAt);

  if (now !== null && now >= start && now < end) {
    return (
      <p className={`inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white ${className}`}>
        <span className="size-2 animate-pulse rounded-full bg-white" /> Happening now
      </p>
    );
  }

  const p = now === null ? null : parts(start - now);
  return (
    <div className={`flex gap-2 sm:gap-3 ${className}`} role="timer" aria-label="Time until the event starts">
      {(["days", "hours", "mins", "secs"] as const).map((k) =>
        p ? (
          <Unit key={k} value={p[k]} label={k} tone={tone} />
        ) : (
          <div
            key={k}
            className={`flex min-w-[64px] flex-col items-center rounded-2xl px-3 py-3 sm:min-w-[76px] ${
              tone === "dark" ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-ink text-white"
            }`}
          >
            <span className="h-9 text-3xl font-extrabold leading-9 sm:h-10 sm:text-4xl sm:leading-10">--</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">{k}</span>
          </div>
        ),
      )}
    </div>
  );
}
