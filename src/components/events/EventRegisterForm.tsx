"use client";

import { Field, Select, TextArea } from "@/components/forms/Fields";
import { Form } from "@/components/forms/Form";

export function EventRegisterForm({ title, sessions }: { title: string; sessions?: string[] }) {
  return (
    <Form
      name={`Event registration: ${title}`}
      submitLabel="Register"
      successTitle="You're registered!"
      successMessage="We've saved your place and will be in touch with any details before the day."
    >
      <input type="hidden" name="event" value={title} />
      <Field label="Full name" name="name" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" />
      {sessions && sessions.length > 1 && <Select label="Which session?" name="session" options={sessions} required />}
      <Field label="Number of people" name="attendees" type="number" min={1} max={10} defaultValue={1} required />
      <TextArea label="Anything we should know?" name="notes" rows={3} placeholder="Access needs, questions..." />
    </Form>
  );
}
