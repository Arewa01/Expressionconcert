import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Photo cut like the stub of a ticket: perforated edge on one side, a notch punched out of the other.
 * `notch` is the background colour behind the card, so the punched hole blends in.
 */
export function TicketImage({
  src,
  alt,
  sizes,
  className = "",
  notch = "#ffffff",
  muted = false,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  notch?: string;
  muted?: boolean;
}) {
  return (
    <div className={`group/ticket relative ${className}`}>
      <ImageSlot
        src={src}
        alt={alt}
        sizes={sizes}
        className="absolute inset-0 rounded-xl"
        imageClassName={`transition-transform duration-700 group-hover/ticket:scale-[1.04] ${muted ? "grayscale-[60%]" : ""}`}
      />
      {/* perforations */}
      <span
        aria-hidden
        className="absolute inset-y-2 left-0 w-2 bg-[radial-gradient(circle,var(--notch)_2.5px,transparent_3px)] bg-[length:8px_12px] bg-repeat-y"
        style={{ "--notch": notch } as React.CSSProperties}
      />
      {/* punched notch */}
      <span
        aria-hidden
        className="absolute top-1/2 -right-4 size-8 -translate-y-1/2 rounded-full"
        style={{ background: notch }}
      />
    </div>
  );
}
