// Every event on the site lives here: the Events page, event detail pages, the homepage
// "Upcoming Programmes" slider and the Programmes page all read from this list.
// Facts come from expressionconcert.com and the event posters in public/images/posters.

export type EventCategory = "Programme" | "Taster Session" | "Festival" | "Concert";

export type EventArtwork = {
  variant: "harmony" | "festival";
  scriptLine?: string;
  headline: string;
  subline?: string;
  badge?: string;
  tint?: "amber" | "rose" | "blush";
};

export type EventItem = {
  slug: string;
  category: EventCategory;
  title: string;
  subtitle: string;
  /** First (or only) date, YYYY-MM-DD, UK time */
  start: string;
  /** 24-hour HH:MM, UK time */
  startTime: string;
  endTime?: string;
  /** Repeats every week on the same weekday until this date (inclusive) */
  weeklyUntil?: string;
  venue: string;
  address: string;
  summary: string;
  description: string[];
  highlights?: string[];
  audience?: string;
  price?: string;
  credits?: string;
  enquiries?: string;
  /** Registration on another site (e.g. Eventbrite). Without it, the event page shows its own form. */
  externalRegistration?: { label: string; href: string };
  image: string;
  poster?: string;
  /** Album id on the Gallery page */
  album?: string;
  /** Illustrated card used on the homepage slider */
  artwork?: EventArtwork;
};

export const events: EventItem[] = [
  {
    slug: "healing-through-harmony-the-hub",
    category: "Programme",
    title: "Healing Through Harmony",
    subtitle: "Weekly sessions at The Hub, Stockport",
    start: "2026-06-23",
    startTime: "14:00",
    endTime: "16:00",
    // 52 weekly sessions from 23 June 2026
    weeklyUntil: "2027-06-15",
    venue: "The Hub",
    address: "2 Castle Street, Edgeley, Stockport SK3 9AB",
    summary: "A 52 week music programme for people aged 55+ in Stockport.",
    description: [
      "Healing Through Harmony is a 52 week music programme for the people of Stockport aged 55 and over. Sessions run every Tuesday at 2pm at The Hub in Edgeley.",
      "Sessions include singing for joy, rhythm and percussion circles, and creative socials with tea, all built around friendship.",
    ],
    highlights: ["Sing for joy", "Rhythm & percussion circles", "Creative socials & tea", "Building friendship"],
    audience: "Ages 55+",
    credits: "Funded by The National Lottery Community Fund. Supported by Age UK Stockport.",
    enquiries: "0161 531 2448 | 07769 493682",
    image: "/images/gallery/healing-through-harmony/08.jpg",
    poster: "/images/posters/healing-through-harmony-hub.jpeg",
    album: "healing-through-harmony",
    artwork: {
      variant: "harmony",
      scriptLine: "Healing Through",
      headline: "Harmony",
      subline: "A 52 week music programme for people aged 55+",
      tint: "amber",
    },
  },
  {
    slug: "healing-through-harmony-davenport-cale-green",
    category: "Taster Session",
    title: "Healing Through Harmony",
    subtitle: "Davenport & Cale Green taster session",
    start: "2026-04-23",
    startTime: "12:00",
    venue: "Adswood Community Centre",
    address: "231 Garners Lane, Stockport SK3 8QJ",
    summary: "A Healing Through Harmony taster session for Davenport & Cale Green.",
    description: [
      "A taster session of Healing Through Harmony for people aged 55+ in Davenport & Cale Green.",
      "Sessions include singing for joy, rhythm and percussion circles, and creative socials with tea, all built around friendship.",
    ],
    highlights: ["Sing for joy", "Rhythm & percussion circles", "Creative socials & tea", "Building friendship"],
    audience: "Ages 55+",
    credits: "Funded by Stockport Metropolitan Borough Council.",
    enquiries: "0161 531 2448 | 07769 493682",
    image: "/images/gallery/healing-through-harmony-2-0/04.jpg",
    poster: "/images/posters/healing-through-harmony-adswood.jpeg",
    album: "healing-through-harmony-2-0",
    artwork: {
      variant: "harmony",
      scriptLine: "Healing Through",
      headline: "Harmony",
      badge: "Davenport & Cale Green",
      tint: "blush",
    },
  },
  {
    slug: "healing-through-harmony-brinington",
    category: "Taster Session",
    title: "Healing Through Harmony",
    subtitle: "Brinington & Stockport Central taster session",
    start: "2026-04-13",
    startTime: "12:00",
    venue: "Brinington Community Centre",
    address: "35 Hereford Rd, Brinington, Stockport SK5 8ER",
    summary: "A Healing Through Harmony taster session for Brinington & Stockport Central.",
    description: [
      "A taster session of Healing Through Harmony for people aged 55+ in Brinington & Stockport Central.",
      "Sessions include singing for joy, rhythm and percussion circles, and creative socials with tea, all built around friendship.",
    ],
    highlights: ["Sing for joy", "Rhythm & percussion circles", "Creative socials & tea", "Building friendship"],
    audience: "Ages 55+",
    credits: "Funded by Stockport Metropolitan Borough Council.",
    enquiries: "0161 531 2448 | 07769 493682",
    image: "/images/gallery/healing-through-harmony/02.jpg",
    poster: "/images/posters/healing-through-harmony-brinington.jpeg",
    album: "healing-through-harmony",
    artwork: {
      variant: "harmony",
      scriptLine: "Healing Through",
      headline: "Harmony",
      subline: "Brinington",
      tint: "rose",
    },
  },
  {
    slug: "greater-manchester-drum-festival",
    category: "Festival",
    title: "Greater Manchester Drum Festival",
    subtitle: "Celebrating World Drummers Day 2026",
    start: "2026-04-04",
    startTime: "14:00",
    endTime: "16:00",
    venue: "Stockroom",
    address: "Merseyway Shopping Centre, Stockport",
    summary: "A vibrant celebration of African and global drumming, performances and culture.",
    description: [
      "A vibrant celebration of African and global drumming, performances and culture.",
      "Express yourself percussively.",
    ],
    credits: "Supported by the Musicians' Union.",
    image: "/images/gallery/drum-festival/11.jpg",
    poster: "/images/posters/drum-festival.jpeg",
    album: "drum-festival",
    artwork: {
      variant: "festival",
      headline: "Drum Festival",
      subline: "A vibrant celebration of African and global drumming, performances and culture.",
    },
  },
  {
    slug: "stockport-christmas-concert",
    category: "Concert",
    title: "Stockport Christmas Concert",
    subtitle: "A festive afternoon of music & poetry",
    start: "2025-12-23",
    startTime: "14:00",
    venue: "Stockroom",
    address: "Merseyway Shopping Centre, Stockport SK1 1PW",
    summary: "A joyful afternoon of music, poetry, and festive celebration in the heart of Stockport.",
    description: [
      "Join us for a joyful afternoon of music, poetry, and festive celebration in the heart of Stockport.",
      "Enjoy Christmas carols, solo performances, poetry, spoken word, an open mic session, and complimentary refreshments. This is a free community event, open to all ages.",
    ],
    highlights: ["Christmas carols", "Solo performances", "Poetry & spoken word", "Open mic", "Complimentary refreshments"],
    audience: "All ages",
    price: "Free",
    enquiries: "0161 531 4228 | 07769 493682",
    externalRegistration: {
      label: "Register on Eventbrite",
      href: "https://www.eventbrite.com/e/stockport-christmas-concert-tickets-1976436631168",
    },
    image: "/images/gallery/christmas-concert/03.jpg",
    poster: "/images/posters/festive-afternoon.jpeg",
    album: "christmas-concert",
  },
];

/** Past concerts without a fixed date, shown in the archive on the Events page */
export const concerts = [
  {
    id: "expression-2-0",
    title: "Expression Concert 2.0",
    summary: "Watch highlights from Expression Concert 2.0 and browse the photos from the night.",
    video: "https://web.facebook.com/61566262677470/videos/1003262641983452",
    gallery: "/gallery#expression-2-0",
    image: "/images/gallery/expression-2-0/07.jpg",
  },
  {
    id: "expression-1-0",
    title: "Expression Concert 1.0",
    summary:
      "Our pilot event featured Ileriayo, Fola Adeola, Oprah Atunrase, The Trios, Denise Jesus, Jemima Limen and many more, with MP Andrew Gwynne in attendance.",
    video: "https://web.facebook.com/ileriayo.temitope1/videos/1279098589900940/",
    gallery: "/gallery#pilot",
    image: "/images/site/musician.jpg",
  },
];

export const eventsPage = {
  eyebrow: "Expression Concert Events",
  upcoming: {
    title: "Upcoming",
    titleAccent: "events.",
    description: "Keep coming back to stay informed about our events, and register early to save your place.",
  },
  calendar: {
    title: "Event",
    titleAccent: "calendar.",
    description: "Every session, festival and concert in one place. Pick a date to see what's on.",
  },
  past: { title: "Past", titleAccent: "events." },
  archive: { title: "From the", titleAccent: "archive." },
  cta: {
    eyebrow: "Be part of the next concert",
    title: "Perform. Volunteer. Sponsor.",
    description: "Want to perform, volunteer or partner with us at our next event? We'd love to hear from you.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "/images/site/crowd.jpg",
  },
};
