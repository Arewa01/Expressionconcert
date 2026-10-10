import { ChevronLeft, ChevronRight } from "lucide-react";

export function CarouselButton({
  direction,
  onClick,
  size = "md",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  size?: "sm" | "md";
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={`grid place-items-center rounded-full border border-neutral-300 bg-white/60 text-neutral-700 transition-colors hover:border-brand hover:text-brand ${
        size === "md" ? "size-11" : "size-8"
      }`}
    >
      <Icon className={size === "md" ? "size-4" : "size-3.5"} />
    </button>
  );
}
