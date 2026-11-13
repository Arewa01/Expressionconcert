import { CalendarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { albums } from "@/content/gallery";

// Every quarter hour from 7am to 11pm, shown as e.g. "2:00 PM", stored as "14:00"
const times = Array.from({ length: (23 - 7) * 4 + 1 }, (_, i) => {
  const mins = 7 * 60 + i * 15;
  const value = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
  const h = Math.floor(mins / 60);
  return { title: `${h % 12 || 12}:${String(mins % 60).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`, value };
});

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "when", title: "Date & place" },
    { name: "details", title: "Details" },
    { name: "media", title: "Images" },
    { name: "advanced", title: "Advanced" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Event name",
      type: "string",
      group: "basics",
      description: 'e.g. "Stockport Christmas Concert"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "basics",
      description: 'One short line under the name, e.g. "A festive afternoon of music & poetry"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "basics",
      description: "Click Generate. This becomes expressionconcert.com/events/...",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Type of event",
      type: "string",
      group: "basics",
      options: { list: ["Concert", "Festival", "Programme", "Taster Session", "Workshop"], layout: "radio" },
      initialValue: "Concert",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 2,
      group: "basics",
      description: "One or two sentences for listings and search results.",
      validation: (r) => r.required().max(240),
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      group: "when",
      description: "For weekly events, the date of the first session.",
      options: { dateFormat: "D MMMM YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startTime",
      title: "Start time",
      type: "string",
      group: "when",
      options: { list: times },
      initialValue: "14:00",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endTime",
      title: "End time",
      type: "string",
      group: "when",
      options: { list: times },
      description: "Optional",
      validation: (r) =>
        r.custom((end, ctx) => {
          const start = (ctx.document as { startTime?: string })?.startTime;
          return !end || !start || end > start ? true : "End time must be after the start time";
        }),
    }),
    defineField({
      name: "repeatsWeekly",
      title: "Repeats every week",
      type: "boolean",
      group: "when",
      initialValue: false,
    }),
    defineField({
      name: "weeklyUntil",
      title: "Last session date",
      type: "date",
      group: "when",
      options: { dateFormat: "D MMMM YYYY" },
      hidden: ({ document }) => !document?.repeatsWeekly,
      validation: (r) =>
        r.custom((until, ctx) => {
          const doc = ctx.document as { repeatsWeekly?: boolean; date?: string };
          if (!doc?.repeatsWeekly) return true;
          if (!until) return "Add the date of the last session";
          return doc.date && (until as string) < doc.date ? "Must be after the first session" : true;
        }),
    }),
    defineField({
      name: "venue",
      title: "Venue name",
      type: "string",
      group: "when",
      description: 'e.g. "Stockroom"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      group: "when",
      description: "Used for the map, so include the postcode.",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 8,
      group: "details",
      description: "Leave a blank line between paragraphs.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "details",
      description: 'Short bullet points, e.g. "Christmas carols", "Open mic"',
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "audience", title: "Who it's for", type: "string", group: "details", description: 'e.g. "All ages" or "Ages 55+"' }),
    defineField({ name: "price", title: "Price", type: "string", group: "details", description: 'e.g. "Free" or "£10"' }),
    defineField({
      name: "enquiries",
      title: "Enquiries phone",
      type: "string",
      group: "details",
      initialValue: "07769 493682",
    }),
    defineField({
      name: "externalRegistration",
      title: "Register on another website",
      type: "object",
      group: "details",
      description: "Only if people book on Eventbrite or similar. Leave empty to use the registration form on our site.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "label", title: "Button text", type: "string", initialValue: "Register on Eventbrite" }),
        defineField({ name: "href", title: "Link", type: "url" }),
      ],
    }),
    defineField({ name: "credits", title: "Funders / credits", type: "string", group: "details", description: 'e.g. "Funded by Stockport Council."' }),

    defineField({
      name: "image",
      title: "Main photo",
      type: "image",
      group: "media",
      description: "A landscape photo. Click the crop icon to choose the focal point.",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "poster", title: "Poster", type: "image", group: "media", description: "Optional. The event flyer, shown on the event page." }),
    defineField({
      name: "album",
      title: "Photo album",
      type: "string",
      group: "media",
      description: "After the event, link it to its album on the Gallery page.",
      options: { list: albums.map((a) => ({ title: a.title, value: a.id })) },
    }),

    defineField({
      name: "artwork",
      title: "Homepage card style",
      type: "object",
      group: "advanced",
      description: "Optional. Leave empty to show the main photo on the homepage card.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "variant", type: "string", options: { list: ["harmony", "festival"] } }),
        defineField({ name: "scriptLine", title: "Italic line", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "subline", type: "string" }),
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "tint", type: "string", options: { list: ["amber", "rose", "blush"] } }),
      ],
    }),
  ],
  orderings: [{ title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "subtitle", date: "date", media: "image" },
    prepare: ({ title, subtitle, date, media }) => ({
      title,
      subtitle: [date && new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), subtitle]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
