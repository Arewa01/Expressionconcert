# Expression Concert website

Next.js 15 (App Router) + Tailwind CSS v4. Built from the Figma homepage design.

```bash
npm install
npm run dev   # http://localhost:3000
```

## Structure

```
src/
├── app/                  layout (header, footer, fonts) and pages
├── components/
│   ├── layout/           Header, Footer, Logo, Container, NewsletterForm
│   ├── sections/         Hero, ValuesStrip, ProgrammeGrid, ProgrammeCard,
│   │                     ImpactStats, Testimonial, ChoirFeature,
│   │                     ServiceCards, DonateCTA
│   └── ui/               Button, Eyebrow, Accent, Icon, ImageSlot, CarouselButton
└── content/              all copy and data (home.ts, site.ts, types.ts)
```

Rules that keep the Builder.io migration easy:

- Sections never import content. They receive it as props. `app/page.tsx` is the only place content meets components.
- All copy lives in `src/content/`. Builder (or any CMS) replaces those files later.
- Every image goes through `ImageSlot`. Pass a `src` and the photo appears; leave it out and a placeholder renders. Put photos in `public/images/` and set the `image` fields in `content/home.ts`.

## Pages

Home, About, What We Do, Programmes, Events, Gallery, Community Choir, School of Music,
Get Involved, Contact, Donate (plus Donate thank-you and a custom 404).
Copy, contact details and photos come from the old WordPress site at expressionconcert.com.
Old WordPress URLs such as `/about-us` and `/contact-us` redirect in `next.config.ts`.

All events live in `src/content/events.ts`. The Events page, each event's detail page
(`/events/[slug]`), the homepage slider and the Programmes page all read from it.
Events split into upcoming and past automatically, and those pages regenerate hourly.
Weekly events (`weeklyUntil`) produce one session per week. The countdown always targets the next one.
Each event also has an "Add to Calendar" file at `/events/[slug]/calendar.ics`.

## Forms and donations

Copy `.env.example` to `.env.local` and fill it in.

- Forms (contact, choir, school registration, newsletter) are sent by email through Resend
  (`src/lib/forms.ts`). Without keys they only log to the terminal in development, and show
  an error with the contact email in production.
- Donations use Stripe Checkout (`src/lib/donate.ts`). Without `STRIPE_SECRET_KEY` the donate
  form says online giving isn't connected yet.

## Still to do

- Social media links in `content/site.ts` (the old site lists none)
- Privacy Policy, Terms and Accessibility pages (linked in the footer, not written yet)
- Confirm the homepage programme dates and venues from the Figma design (see `content/home.ts`)
- The gallery holds a selection of 12 photos per album. The full albums are in Google Drive.
