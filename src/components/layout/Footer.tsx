import Link from "next/link";
import { footer } from "@/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

function LinkColumn({ title, links, highlightFirst }: { title: string; links: { label: string; href: string }[]; highlightFirst?: boolean }) {
  return (
    <div>
      <h3 className="text-[15px] font-bold tracking-wide text-ink">{title}</h3>
      <ul className="mt-5 space-y-3 text-[15px]">
        {links.map((l, i) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`transition-colors hover:text-brand ${
                highlightFirst && i === 0 ? "font-semibold text-brand" : "text-neutral-600"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-cream">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_0.8fr_1.5fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-600">{footer.description}</p>
          </div>

          <LinkColumn title="Quick Links" links={footer.quickLinks} />
          <LinkColumn title="Support" links={footer.support} highlightFirst />

          <div>
            <h3 className="text-[15px] font-bold tracking-wide text-ink">Follow Us</h3>
            <ul className="mt-5 flex gap-4">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-500 transition-colors hover:border-brand hover:text-brand"
                  >
                    {s.label[0]}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-[15px] font-bold tracking-wide text-ink">{footer.newsletter.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{footer.newsletter.description}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 pt-8 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex items-center gap-4">
            {footer.legal.map((l, i) => (
              <li key={l.href} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden className="h-4 w-px bg-neutral-400" />}
                <Link href={l.href} className="hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
