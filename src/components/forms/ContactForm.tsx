"use client";

import { Field, TextArea } from "./Fields";
import { Form } from "./Form";

export function ContactForm() {
  return (
    <Form name="Contact form" submitLabel="Send Message" successMessage="Thanks for getting in touch. We'll reply as soon as we can.">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" autoComplete="family-name" />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <TextArea label="Message" name="message" required />
    </Form>
  );
}
