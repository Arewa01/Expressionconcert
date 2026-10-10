"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Album } from "@/content/gallery";
import { easeOut } from "@/components/motion/easing";

export function AlbumGallery({ albums }: { albums: Album[] }) {
  const [active, setActive] = useState(albums[0].id);
  const [open, setOpen] = useState<number | null>(null);
  const album = albums.find((a) => a.id === active) ?? albums[0];

  // Support links like /gallery#pilot
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (albums.some((a) => a.id === id)) setActive(id);
  }, [albums]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + album.photos.length) % album.photos.length)),
    [album.photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div role="tablist" aria-label="Albums" className="flex flex-wrap gap-2">
        {albums.map((a) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={a.id === active}
            onClick={() => select(a.id)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              a.id === active ? "text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {a.id === active && (
              <motion.span
                layoutId="album-pill"
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{a.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={album.id}
          role="tabpanel"
          aria-label={album.title}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {album.photos.map((src, i) => (
            <motion.li
              key={src}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
              }}
              className="mb-4 break-inside-avoid"
            >
              <button
                onClick={() => setOpen(i)}
                className="group block w-full overflow-hidden rounded-2xl bg-neutral-100 focus-visible:ring-4 focus-visible:ring-brand/30 focus-visible:outline-none"
                aria-label={`Open photo ${i + 1} of ${album.photos.length}`}
              >
                <Image
                  src={src}
                  alt={`${album.title}, photo ${i + 1}`}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${album.title} photo viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setOpen(null)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="relative h-[85vh] w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={album.photos[open]} alt={`${album.title}, photo ${open + 1}`} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {open + 1} / {album.photos.length}
            </p>
            {[
              { label: "Close", icon: X, cls: "top-5 right-5", fn: () => setOpen(null) },
              { label: "Previous photo", icon: ChevronLeft, cls: "left-4 top-1/2 -translate-y-1/2", fn: () => step(-1) },
              { label: "Next photo", icon: ChevronRight, cls: "right-4 top-1/2 -translate-y-1/2", fn: () => step(1) },
            ].map(({ label, icon: Icon, cls, fn }) => (
              <button
                key={label}
                aria-label={label}
                onClick={(e) => {
                  e.stopPropagation();
                  fn();
                }}
                className={`absolute grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 ${cls}`}
              >
                <Icon className="size-6" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
