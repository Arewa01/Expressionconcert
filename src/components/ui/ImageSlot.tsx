import Image from "next/image";

/**
 * Renders a photo when one is supplied, otherwise a neutral placeholder.
 * The Figma file has no final photography yet, so every image goes through here.
 */
export function ImageSlot({
  src,
  alt,
  className = "",
  placeholderClassName = "bg-neutral-100",
  imageClassName = "",
  sizes = "100vw",
  priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  // Callers that pass absolute/fixed positioning (background photos) must not also get `relative`,
  // or the two classes conflict and the box collapses to zero height.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);
  return (
    <div className={`${positioned ? "" : "relative "}overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imageClassName}`} />
      ) : (
        <div aria-hidden className={`absolute inset-0 ${placeholderClassName}`} />
      )}
    </div>
  );
}
