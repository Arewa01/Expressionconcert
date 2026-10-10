"use client";

import { Heart, Loader2, Lock } from "lucide-react";
import { useActionState, useState } from "react";
import { startDonation, type DonateState } from "@/lib/donate";

const presets = [10, 25, 50, 100];

export function DonateForm() {
  const [state, action, pending] = useActionState<DonateState, FormData>(startDonation, {});
  const [amount, setAmount] = useState("25");
  const isPreset = presets.map(String).includes(amount);

  return (
    <form action={action} className="grid gap-6">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">Choose an amount</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={amount === String(p)}
              onClick={() => setAmount(String(p))}
              className={`h-14 rounded-2xl border text-lg font-bold transition-colors ${
                amount === String(p)
                  ? "border-brand bg-brand text-white shadow-[0_8px_20px_-8px_rgba(200,30,40,0.6)]"
                  : "border-neutral-300 bg-white text-ink hover:border-brand"
              }`}
            >
              £{p}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="donate-amount" className="mb-2 block text-sm font-semibold text-ink">
          {isPreset ? "Or enter another amount" : "Your amount"}
        </label>
        <div className="relative">
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-lg font-bold text-neutral-500">£</span>
          <input
            id="donate-amount"
            name="amount"
            inputMode="decimal"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            className="h-14 w-full rounded-2xl border border-neutral-300 bg-white pr-4 pl-9 text-lg font-bold text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
          />
        </div>
      </div>

      <div>
        <label htmlFor="donate-email" className="mb-2 block text-sm font-semibold text-ink">
          Email address <span className="font-normal text-neutral-500">(for your receipt)</span>
        </label>
        <input
          id="donate-email"
          name="email"
          type="email"
          autoComplete="email"
          className="h-14 w-full rounded-2xl border border-neutral-300 bg-white px-4 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-brand">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand text-lg font-semibold text-white shadow-[0_10px_24px_-8px_rgba(200,30,40,0.6)] transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-5 animate-spin" /> : <Heart className="size-5" />}
        Donate £{amount || "0"}
      </button>
      <p className="flex items-center justify-center gap-2 text-xs text-neutral-500">
        <Lock className="size-3.5" /> Secure payment by Stripe. Card details never touch our site.
      </p>
    </form>
  );
}
