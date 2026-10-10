"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { donateLink, mainNav } from "@/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-transparent shadow-[0_6px_24px_-12px_rgba(0,0,0,0.18)]" : "border-neutral-200/70"
      }`}
    >
      <Container
        className={`flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? "h-16" : "h-20"}`}
      >
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-5 text-[14px] text-neutral-700 2xl:gap-8 2xl:text-[15px]">
            {mainNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative whitespace-nowrap py-2 transition-colors hover:text-brand ${
                      active ? "font-medium text-brand" : ""
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <button type="button" aria-label="Search" className="text-neutral-700 hover:text-brand">
            <Search className="size-5" />
          </button>
          <Link
            href={donateLink.href}
            className="hidden h-11 items-center rounded-full bg-brand px-7 text-[15px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(200,30,40,0.55)] transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            {donateLink.label}
          </Link>
          <button
            type="button"
            className="text-neutral-800 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav aria-label="Mobile" className="border-t border-neutral-200 bg-white xl:hidden">
          <Container className="flex flex-col py-4">
            {[...mainNav, donateLink].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-base ${
                  item.href === pathname || item === donateLink ? "font-semibold text-brand" : "text-neutral-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
