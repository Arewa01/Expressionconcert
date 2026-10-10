"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatTime, type Occurrence } from "@/lib/events";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const monthKey = (y: number, m: number) => `${y}-${String(m + 1).padStart(2, "0")}`;
const monthLabel = (y: number, m: number) =>
  new Date(Date.UTC(y, m, 15)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

/** Month grid of every session. Starts on the month of the next event. */
export function EventCalendar({ occurrences, startMonth }: { occurrences: Occurrence[]; startMonth: string }) {
  const [sy, sm] = startMonth.split("-").map(Number);
  const [[year, month, dir], setView] = useState<[number, number, number]>([sy, sm - 1, 0]);
  const [today, setToday] = useState<string | null>(null);

  // Today's date only on the client, so the static page never shows a stale "today"
  useEffect(() => {
    setToday(new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date()));
  }, []);

  const byDate = useMemo(() => {
    const map = new Map<string, Occurrence[]>();
    for (const o of occurrences) map.set(o.date, [...(map.get(o.date) ?? []), o]);
    return map;
  }, [occurrences]);

  const step = (d: 1 | -1) =>
    setView(([y, m]) => {
      const n = new Date(Date.UTC(y, m + d, 1));
      return [n.getUTCFullYear(), n.getUTCMonth(), d];
    });

  const key = monthKey(year, month);
  const first = new Date(Date.UTC(year, month, 1));
  const lead = (first.getUTCDay() + 6) % 7; // Monday-first grid
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((lead + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - lead + 1;
    return day >= 1 && day <= daysInMonth ? `${key}-${String(day).padStart(2, "0")}` : null;
  });
  const monthEvents = occurrences.filter((o) => o.date.startsWith(key));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.3)] sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-ink" aria-live="polite">
            {monthLabel(year, month)}
          </h3>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => step(d)}
                aria-label={d < 0 ? "Previous month" : "Next month"}
                className="grid size-10 place-items-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-brand hover:text-brand"
              >
                {d < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          {WEEKDAYS.map((d) => (
            <div key={d} className="pb-3">
              {d}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            initial={{ opacity: 0, x: dir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -30 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-7 gap-1"
          >
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const items = byDate.get(date) ?? [];
              const isToday = date === today;
              const isPast = today !== null && date < today;
              const cls = `relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition-colors sm:aspect-[1.15] ${
                items.length
                  ? isPast
                    ? "bg-neutral-100 font-semibold text-neutral-500 hover:bg-neutral-200"
                    : "bg-brand font-bold text-white shadow-[0_8px_18px_-8px_rgba(200,30,40,0.7)] hover:bg-brand-dark"
                  : "text-neutral-600"
              } ${isToday ? "ring-2 ring-ink ring-offset-2" : ""}`;
              const day = Number(date.slice(8));
              return items.length ? (
                <Link
                  key={date}
                  href={`/events/${items[0].event.slug}`}
                  className={cls}
                  title={items.map((o) => `${o.event.title}, ${formatTime(o.event.startTime)}`).join("\n")}
                >
                  {day}
                  <span className="mt-0.5 hidden max-w-full truncate px-1 text-[9px] font-semibold leading-tight opacity-90 sm:block">
                    {formatTime(items[0].event.startTime)}
                  </span>
                </Link>
              ) : (
                <div key={date} className={cls}>
                  {day}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">In {monthLabel(year, month)}</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid gap-3"
          >
            {monthEvents.length === 0 && (
              <li className="rounded-2xl border border-dashed border-neutral-300 p-6 text-neutral-500">
                Nothing scheduled this month yet.
              </li>
            )}
            {monthEvents.slice(0, 6).map((o) => (
              <li key={o.event.slug + o.date}>
                <Link
                  href={`/events/${o.event.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-lg font-extrabold text-white">
                    {Number(o.date.slice(8))}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-ink">{o.event.title}</span>
                    <span className="block truncate text-sm text-neutral-500">
                      {formatTime(o.event.startTime)} &middot; {o.event.venue}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            {monthEvents.length > 6 && (
              <li className="px-1 text-sm text-neutral-500">+ {monthEvents.length - 6} more sessions</li>
            )}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
