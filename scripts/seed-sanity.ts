/**
 * One-time import: copies the events in src/content/events.ts (with their photos and posters)
 * into Sanity. Safe to re-run: each event keeps the same document ID, so it is replaced, not duplicated.
 *
 *   npm run seed:sanity
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (an Editor token) in .env.local.
 */
import { createReadStream } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { events } from "../src/content/events";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function upload(publicPath: string) {
  const file = path.join(process.cwd(), "public", publicPath);
  const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(file) });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

for (const e of events) {
  const doc = {
    _id: `event-${e.slug}`,
    _type: "event",
    title: e.title,
    subtitle: e.subtitle,
    slug: { _type: "slug", current: e.slug },
    category: e.category,
    summary: e.summary,
    date: e.start,
    startTime: e.startTime,
    endTime: e.endTime,
    repeatsWeekly: Boolean(e.weeklyUntil),
    weeklyUntil: e.weeklyUntil,
    venue: e.venue,
    address: e.address,
    description: e.description.join("\n\n"),
    highlights: e.highlights,
    audience: e.audience,
    price: e.price,
    enquiries: e.enquiries,
    credits: e.credits,
    externalRegistration: e.externalRegistration,
    image: await upload(e.image),
    poster: e.poster ? await upload(e.poster) : undefined,
    album: e.album,
    artwork: e.artwork,
  };
  await client.createOrReplace(doc);
  console.log(`  imported ${e.title} (${e.subtitle})`);
}
console.log(`Done: ${events.length} events in Sanity.`);
