"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitForm, type FormState } from "@/lib/forms";

/** Wraps any site form: posts to the shared server action and shows status. */
export function Form({
  name,
  children,
  submitLabel = "Submit",
  successTitle = "Thank you!",
  successMessage = "We've received your message and will be in touch soon.",
  className = "",
}: {
  name: string;
  children: React.ReactNode;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  className?: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, { status: "idle" });

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
        >
          <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
          <p className="mt-4 text-xl font-bold text-ink">{successTitle}</p>
          <p className="mt-2 text-neutral-600">{successMessage}</p>
          {state.message && <p className="mt-4 text-sm text-amber-700">{state.message}</p>}
        </motion.div>
      ) : (
        <motion.form key="form" action={action} exit={{ opacity: 0 }} className={`grid gap-5 ${className}`}>
          <input type="hidden" name="_form" value={name} />
          <div aria-hidden className="absolute -left-[9999px]">
            <label>
              Company <input type="text" name="_company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {children}
          {state.status === "error" && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-brand">
              {state.message}
            </p>
          )}
          <div>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 font-semibold text-white shadow-[0_8px_20px_-6px_rgba(200,30,40,0.55)] transition-colors hover:bg-brand-dark disabled:opacity-60"
            >
              {pending && <Loader2 className="size-4 animate-spin" />}
              {pending ? "Sending..." : submitLabel}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
