/**
 * A faint row of bars moving like a quiet audio meter.
 * Durations and delays come from the index (not Math.random) so server and client render the same.
 */
export function EqualizerBackdrop({ count = 72, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none flex items-end gap-[6px] ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const height = 30 + ((i * 37) % 70);
        const duration = 1.1 + ((i * 13) % 10) / 10;
        const delay = -((i * 7) % 20) / 10;
        return (
          <span
            key={i}
            className="animate-eq flex-1 rounded-t-full bg-gradient-to-t from-brand/40 to-brand/0"
            style={
              {
                height: `${height}%`,
                "--eq-duration": `${duration}s`,
                "--eq-delay": `${delay}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
