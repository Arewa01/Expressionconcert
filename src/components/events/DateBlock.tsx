import { formatDate, formatTime } from "@/lib/events";

/** Calendar-page style date: month, big day, year, with the start time underneath. */
export function DateBlock({ date, time, muted = false }: { date: string; time: string; muted?: boolean }) {
  return (
    <div className={`w-[72px] shrink-0 overflow-hidden rounded-xl text-center shadow-sm ring-1 ring-neutral-200 ${muted ? "opacity-70" : ""}`}>
      <div className="bg-white px-2 pt-2 pb-1.5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand">{formatDate.month(date)}</p>
        <p className="text-3xl font-extrabold leading-none text-ink">{formatDate.day(date)}</p>
        <p className="mt-0.5 text-[11px] text-neutral-500">{formatDate.year(date)}</p>
      </div>
      <p className={`py-1.5 text-[11px] font-semibold text-white ${muted ? "bg-neutral-500" : "bg-ink"}`}>{formatTime(time)}</p>
    </div>
  );
}
