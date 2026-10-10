export function Eyebrow({
  children,
  tone = "brand",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "brand" | "white";
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.3em] ${
        tone === "brand" ? "text-brand" : "text-white"
      } ${className}`}
    >
      {children}
    </p>
  );
}
