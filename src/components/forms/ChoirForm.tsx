"use client";

import { useState } from "react";
import { Choice, Field, TextArea } from "./Fields";
import { Form } from "./Form";

export function ChoirForm() {
  const [plays, setPlays] = useState("");
  return (
    <Form
      name="Community Choir sign-up"
      successTitle="Welcome to the choir!"
      successMessage="We'll be in touch with rehearsal details soon."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Email address" name="email" type="email" required autoComplete="email" />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" className="sm:col-span-2" />
      </div>
      <Choice label="What part do you sing?" name="voicePart" options={["Soprano", "Alto", "Tenor", "Bass", "Prefer not to say"]} />
      <Choice label="Do you play any instruments?" name="playsInstrument" options={["Yes", "No"]} value={plays} onChange={setPlays} />
      {plays === "Yes" && <TextArea label="Which instruments?" name="instruments" rows={3} />}
    </Form>
  );
}
