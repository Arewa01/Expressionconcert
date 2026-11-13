export function Eyebrow({
  children,
  tone = "brand",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "brand" | "white" | "gold";
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.3em] ${
        tone === "brand" ? "text-brand" : tone === "gold" ? "text-gold-light" : "text-white"
      } ${className}`}
    >
      {children}
    </p>
  );
}
