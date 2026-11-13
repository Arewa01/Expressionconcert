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
  contain = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Show the whole image (e.g. a portrait flyer) over a blurred copy of itself instead of cropping it */
  contain?: boolean;
}) {
  // Callers that pass absolute/fixed positioning (background photos) must not also get `relative`,
  // or the two classes conflict and the box collapses to zero height.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);
  return (
    <div className={`${positioned ? "" : "relative "}overflow-hidden ${className}`}>
      {src && contain ? (
        <>
          <Image src={src} alt="" aria-hidden fill sizes="64px" className="scale-125 object-cover opacity-70 blur-xl" />
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-contain ${imageClassName}`} />
        </>
      ) : src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imageClassName}`} />
      ) : (
        <div aria-hidden className={`absolute inset-0 ${placeholderClassName}`} />
      )}
    </div>
  );
}
