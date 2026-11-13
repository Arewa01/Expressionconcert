"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import key1 from "@/assets/logo/key-1.png";
import key2 from "@/assets/logo/key-2.png";
import key3 from "@/assets/logo/key-3.png";
import key4 from "@/assets/logo/key-4.png";
import wordmark from "@/assets/logo/wordmark.png";

const keys = [key1, key2, key3, key4];

/**
 * The Expression Concert logo laid out horizontally: the four gold piano keys, then the wordmark.
 * Both pieces are cut from the logo artwork (public/images/logo/expression-concert-logo.png).
 * The keys "play" a quick run when the page loads and again on hover.
 */
export function Logo({ className = "" }: { className?: string }) {
  const controls = useAnimationControls();
  const play = () =>
    controls.start((i: number) => ({
      y: [0, 5, 0],
      transition: { duration: 0.45, delay: i * 0.09, ease: "easeInOut" },
    }));

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link
      href="/"
      aria-label="Expression Concert home"
      onMouseEnter={play}
      className={`flex shrink-0 items-center gap-3 ${className}`}
    >
      <span aria-hidden className="flex items-start gap-[3px]">
        {keys.map((src, i) => (
          <motion.span key={i} custom={i} animate={controls} className="block">
            <Image src={src} alt="" priority className="h-10 w-auto sm:h-11" />
          </motion.span>
        ))}
      </span>
      <Image src={wordmark} alt="" priority className="h-8 w-auto sm:h-9" />
    </Link>
  );
}
