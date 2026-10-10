import type {
  ServiceItem,
  Stat,
  TestimonialItem,
  ValueItem,
} from "./types";

// All homepage copy lives here. Later, Builder.io (or any CMS) replaces this file.

export const hero = {
  eyebrow: "Music. People. Possibility.",
  title: "Healing Minds.",
  titleAccent: "Connecting Communities.",
  description:
    "We use the power of music to create spaces for healing, learning, opportunity and belonging across Greater Manchester.",
  primaryCta: { label: "Donate Today", href: "/donate" },
  secondaryCta: { label: "Explore Our Work", href: "/what-we-do" },
  proof: { title: "Real people. Real stories.", subtitle: "A stronger, more connected community." },
  proofAvatars: [
    "/images/site/audience-foundation.jpg",
    "/images/gallery/christmas-concert/04.jpg",
    "/images/gallery/drum-festival/10.jpg",
    "/images/gallery/healing-through-harmony-2-0/08.jpg",
  ],
  script: ["Different Cultures", "One Community"],
  image: "/images/site/saxophonist.jpg" as string | undefined,
};

export const values: ValueItem[] = [
  { icon: "heart", title: "People First", description: "We believe in the power of every individual." },
  { icon: "people", title: "Community Driven", description: "Stronger communities through music." },
  { icon: "music", title: "Inclusive", description: "Music for everyone, regardless of background." },
  { icon: "sprout", title: "Lasting Impact", description: "Creating opportunities that transform lives." },
];

export const programmesSection = {
  eyebrow: "Upcoming Programmes",
  title: "Join Our",
  titleAccent: "Upcoming Programmes.",
  description: "Workshops, community sessions, concerts and more. There's something for everyone.",
  cta: { label: "View All Events", href: "/events" },
};

export const impact = {
  eyebrow: "Our Impact",
  titleLine1: "Music",
  titleLine2: "Changes Lives.",
  description:
    "From improving mental wellbeing to creating opportunities for young people, our programmes are making a real difference across Greater Manchester.",
  cta: { label: "See Our Impact", href: "/about" },
};

export const stats: Stat[] = [
  { icon: "people", value: "1,000", plus: true, label: "People reached through our programmes" },
  { icon: "calendar", value: "52", label: "Weeks of community programming" },
  { icon: "sparkles", value: "20", plus: true, label: "Community sessions and workshops" },
  { icon: "music", value: "100", plus: true, label: "Artists supported" },
];

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "An incredible evening celebrating culture, community and the power of music to bring people together.",
    name: "Andrew Gwynne",
    role: "Former MP, Gorton",
    image: "/images/site/mp-clapping.jpg",
  },
];

export const choir = {
  eyebrow: "Community Choir",
  title: "Sing. Connect.",
  titleAccent: "Belong.",
  description:
    "Our community choir brings people from different backgrounds together through music, building confidence, friendships and a stronger sense of community.",
  cta: { label: "Join the Choir", href: "/community-choir" },
  image: "/images/gallery/expression-2-0/07.jpg" as string | undefined,
};

export const services: ServiceItem[] = [
  {
    title: "School of Music",
    description: "Accessible music education for children, young people and underserved groups.",
    href: "/school-of-music",
    image: "/images/gallery/drum-festival/12.jpg",
  },
  {
    title: "Artist Development",
    description: "Mentoring, training and performance opportunities for emerging musicians.",
    href: "/what-we-do#artist-development",
    image: "/images/site/singers.jpg",
  },
  {
    title: "Cultural Events",
    description: "Concerts, showcases and multicultural experiences that bring people together.",
    href: "/events",
    image: "/images/gallery/expression-2-0/10.jpg",
  },
];

export const donateCta = {
  eyebrow: "Your Support",
  title: "Creates Opportunity.",
  description:
    "Your donation helps us deliver music therapy, community programmes, workshops and opportunities for the next generation.",
  cta: { label: "Donate Now", href: "/donate" },
  image: "/images/site/crowd.jpg" as string | undefined,
};
