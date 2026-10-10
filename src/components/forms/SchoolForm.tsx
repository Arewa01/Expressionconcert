"use client";

import { useState } from "react";
import { schoolPage } from "@/content/school";
import { Choice, Field, Select, TextArea } from "./Fields";
import { Form } from "./Form";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-5 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
      <legend className="px-2 text-lg font-bold text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

export function SchoolForm() {
  const [age, setAge] = useState("");
  const [exams, setExams] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [mode, setMode] = useState("");
  const isMinor = age !== "" && Number(age) < 18;

  return (
    <Form
      name="School of Music registration"
      submitLabel="Submit Registration"
      successTitle="Registration received!"
      successMessage="Thank you for registering. We'll contact you to arrange your lessons."
    >
      <Group title="Student information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" name="name" required autoComplete="name" />
          <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" />
          <Field label="Email address" name="email" type="email" required autoComplete="email" />
          <Field label="Date of birth" name="dateOfBirth" type="date" required />
          <Field
            label="Age"
            name="age"
            type="number"
            min={3}
            max={120}
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <Choice label="Gender" name="gender" options={["Male", "Female", "Other", "Prefer not to say"]} required />
      </Group>

      <Group title="Address">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Street address" name="street" required autoComplete="address-line1" className="sm:col-span-2" />
          <Field label="Apartment, suite, etc." name="addressLine2" autoComplete="address-line2" className="sm:col-span-2" />
          <Field label="City" name="city" autoComplete="address-level2" />
          <Field label="County" name="county" autoComplete="address-level1" />
          <Field label="Postcode" name="postcode" autoComplete="postal-code" />
          <Field label="Country" name="country" defaultValue="United Kingdom" autoComplete="country-name" />
        </div>
      </Group>

      <Group title="Music experience">
        <TextArea label="Which instruments do you wish to study?" name="instruments" rows={3} />
        <Choice label="Current level" name="level" options={["Beginner", "Intermediate", "Advanced"]} required />
        <Choice label="Have you taken any music examinations?" name="exams" options={["Yes", "No"]} required value={exams} onChange={setExams} />
        {exams === "Yes" && <TextArea label="Please give details of your exams" name="examDetails" rows={3} />}
        <Choice label="Do you play in any ensembles or orchestras?" name="ensembles" options={["Yes", "No"]} required />
      </Group>

      <Group title="Lessons">
        <Choice
          label="Do you prefer private or group lessons?"
          name="lessonType"
          options={["Private lessons", "Group lessons"]}
          required
          value={lessonType}
          onChange={setLessonType}
        />
        {lessonType === "Group lessons" && (
          <Select label="Preferred venue" name="venue" options={schoolPage.groupVenues} required />
        )}
        {lessonType === "Private lessons" && (
          <>
            <Choice label="Online or in-person lessons?" name="mode" options={["Online", "In person"]} required value={mode} onChange={setMode} />
            {mode === "Online" && (
              <>
                <Choice label="Lesson length" name="lessonLength" options={["30 minutes", "45 minutes", "1 hour"]} required />
                <p className="text-sm text-neutral-500">Online lessons are billed per session.</p>
              </>
            )}
          </>
        )}
        <Choice label="Would you like to pay monthly or per term (12 weeks)?" name="payment" options={["Monthly", "Per term (12 weeks)"]} required />
      </Group>

      {isMinor && (
        <Group title="Parent or guardian">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Parent/guardian name" name="guardianName" required />
            <Field label="Parent/guardian email" name="guardianEmail" type="email" required />
            <Field label="Parent/guardian phone" name="guardianPhone" type="tel" />
            <Field label="Relationship to student" name="guardianRelationship" required />
          </div>
        </Group>
      )}
    </Form>
  );
}
