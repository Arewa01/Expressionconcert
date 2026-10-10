"use server";

import { redirect } from "next/navigation";
import { org } from "@/content/site";

export type DonateState = { error?: string };

/** Creates a Stripe Checkout session and sends the donor to it. */
export async function startDonation(_prev: DonateState, data: FormData): Promise<DonateState> {
  const amount = Number(String(data.get("amount") ?? "").replace(/[^0-9.]/g, ""));
  const email = String(data.get("email") ?? "").trim();

  if (!amount || amount < 1) return { error: "Please choose an amount of at least £1." };
  if (amount > 10000) return { error: `For gifts over £10,000 please contact us at ${org.email}.` };

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return {
      error: `Online donations are not connected yet. Please email ${org.email} and we'll help you give.`,
    };
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const body = new URLSearchParams({
    mode: "payment",
    submit_type: "donate",
    success_url: `${site}/donate/thank-you`,
    cancel_url: `${site}/donate`,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "gbp",
    "line_items[0][price_data][unit_amount]": String(Math.round(amount * 100)),
    "line_items[0][price_data][product_data][name]": `Donation to ${org.name}`,
  });
  if (email) body.set("customer_email", email);

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const session = (await res.json()) as { url?: string; error?: { message: string } };

  if (!res.ok || !session.url) {
    console.error("[donate] Stripe error", session.error?.message);
    return { error: "We couldn't start the payment. Please try again in a moment." };
  }
  redirect(session.url);
}
