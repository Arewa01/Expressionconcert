import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
        <MaskLine delay={0.1}>
          {title} {titleAccent && <Accent>{titleAccent}</Accent>}
        </MaskLine>
      </h2>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
