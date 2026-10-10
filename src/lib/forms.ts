"use server";

import { org } from "@/content/site";

export type FormState = { status: "idle" | "success" | "error"; message?: string };

/**
 * Every site form posts here. Fields starting with "_" are internal.
 * Sends the submission by email through Resend when RESEND_API_KEY and FORMS_TO_EMAIL are set.
 * Without them it logs in development and fails honestly in production.
 */
export async function submitForm(_prev: FormState, data: FormData): Promise<FormState> {
  // Honeypot: real visitors never see or fill this field
  if (data.get("_company")) return { status: "success" };

  const formName = String(data.get("_form") ?? "Website form");
  const fields = [...data.entries()]
    .filter(([k, v]) => !k.startsWith("_") && !k.startsWith("$ACTION") && typeof v === "string" && v.trim())
    .map(([k, v]) => [k, String(v).trim()] as const);

  const email = fields.find(([k]) => k === "email")?.[1];
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const { RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !FORMS_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[form] ${formName}`, Object.fromEntries(fields));
      return {
        status: "success",
        message: "Development mode: the form is not connected yet, so this was only logged to the terminal.",
      };
    }
    return {
      status: "error",
      message: `Sorry, this form is not working right now. Please email us at ${org.email}.`,
    };
  }

  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FORMS_FROM_EMAIL ?? "Expression Concert website <onboarding@resend.dev>",
      to: FORMS_TO_EMAIL.split(","),
      reply_to: email,
      subject: `${formName}: new submission`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[form] Resend error", res.status, await res.text());
    return { status: "error", message: `Something went wrong. Please try again or email ${org.email}.` };
  }
  return { status: "success" };
}
