import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "dark" | "white";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_8px_20px_-6px_rgba(200,30,40,0.55)] hover:bg-brand-dark",
  outline: "border border-brand/60 text-brand hover:bg-brand hover:text-white",
  dark: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
  white: "bg-white text-brand shadow-lg hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-7 text-[15px]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
