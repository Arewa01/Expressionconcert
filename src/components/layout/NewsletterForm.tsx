"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { submitForm, type FormState } from "@/lib/forms";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, { status: "idle" });

  if (state.status === "success") {
    return (
      <p role="status" className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
        <Check className="size-4" /> You&apos;re on the list. Thank you!
      </p>
    );
  }

  return (
    <form action={action} className="mt-4">
      <input type="hidden" name="_form" value="Newsletter signup" />
      <div className="flex items-center gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          className="h-12 min-w-0 flex-1 rounded-full border border-neutral-300 bg-white px-5 text-[15px] outline-none placeholder:text-neutral-400 focus:border-brand"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={pending}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-5 animate-spin" /> : <ArrowRight className="size-5" />}
        </button>
      </div>
      {state.status === "error" && <p className="mt-2 text-sm text-brand">{state.message}</p>}
    </form>
  );
}
