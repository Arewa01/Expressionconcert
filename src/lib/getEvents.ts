import "server-only";
import { cache } from "react";
import { events as localEvents, type EventItem } from "@/content/events";
import { client, imageUrl } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

const query = `*[_type == "event" && defined(slug.current) && defined(date)] | order(date asc) {
  "slug": slug.current, category, title, subtitle, date, startTime, endTime, repeatsWeekly, weeklyUntil,
  venue, address, summary, description, highlights, audience, price, credits, enquiries,
  externalRegistration, image, poster, album, artwork
}`;

type SanityEvent = {
  slug: string;
  category: EventItem["category"];
  title: string;
  subtitle: string;
  date: string;
  startTime: string;
  endTime?: string;
  repeatsWeekly?: boolean;
  weeklyUntil?: string;
  venue: string;
  address: string;
  summary: string;
  description?: string;
  highlights?: string[];
  audience?: string;
  price?: string;
  credits?: string;
  enquiries?: string;
  externalRegistration?: { label?: string; href?: string };
  image?: { asset?: unknown };
  poster?: { asset?: unknown };
  album?: string;
  artwork?: EventItem["artwork"];
};

function toEventItem(e: SanityEvent): EventItem {
  return {
    slug: e.slug,
    category: e.category,
    title: e.title,
    subtitle: e.subtitle,
    start: e.date,
    startTime: e.startTime ?? "14:00",
    endTime: e.endTime || undefined,
    weeklyUntil: e.repeatsWeekly && e.weeklyUntil ? e.weeklyUntil : undefined,
    venue: e.venue,
    address: e.address,
    summary: e.summary,
    description: (e.description ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    highlights: e.highlights?.length ? e.highlights : undefined,
    audience: e.audience || undefined,
    price: e.price || undefined,
    credits: e.credits || undefined,
    enquiries: e.enquiries || undefined,
    externalRegistration:
      e.externalRegistration?.href
        ? { label: e.externalRegistration.label || "Register", href: e.externalRegistration.href }
        : undefined,
    image: e.image?.asset ? imageUrl(e.image) : "/images/site/crowd.jpg",
    poster: e.poster?.asset ? imageUrl(e.poster, 1200) : undefined,
    album: e.album || undefined,
    artwork: e.artwork?.variant && e.artwork.headline ? e.artwork : undefined,
  };
}

/**
 * All events. The events hardcoded in src/content/events.ts always show. When Sanity is
 * connected, its events are added too, except any whose slug matches a hardcoded event
 * (the hardcoded version wins). Sanity results are cached for 60 seconds.
 */
export const getEvents = cache(async (): Promise<EventItem[]> => {
  if (!sanityConfigured) return localEvents;
  try {
    const docs = await client.fetch<SanityEvent[]>(query, {}, { next: { revalidate: 60, tags: ["events"] } });
    const localSlugs = new Set(localEvents.map((e) => e.slug));
    return [...localEvents, ...docs.map(toEventItem).filter((e) => !localSlugs.has(e.slug))];
  } catch (err) {
    console.error("[events] Sanity fetch failed, using local events", err);
    return localEvents;
  }
});
