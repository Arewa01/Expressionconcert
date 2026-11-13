import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity calls this when an event is published, so the site updates straight away
 * instead of waiting up to a minute. Set it up in sanity.io/manage > API > Webhooks
 * with the secret from SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Webhook secret not set" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });

  revalidateTag("events");
  return NextResponse.json({ revalidated: true, type: body?._type ?? null });
}
