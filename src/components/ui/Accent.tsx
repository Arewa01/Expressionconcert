/** Red italic serif emphasis used inside headings. */
export function Accent({
  children,
  className = "text-brand",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <em className={`font-serif font-bold italic tracking-normal ${className}`}>{children}</em>;
}
