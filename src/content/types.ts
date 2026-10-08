export type Link = { label: string; href: string };

export type Programme = {
  id: string;
  /** Small label at the top of the card artwork */
  organiser: string;
  title: string;
  artwork: {
    variant: "harmony" | "festival";
    /** Italic first line, e.g. "Healing Through" */
    scriptLine?: string;
    /** Bold second line, e.g. "Harmony" or "DRUM FESTIVAL" */
    headline: string;
    subline?: string;
    badge?: string;
    tint?: "amber" | "rose" | "blush";
  };
  date: string;
  time: string;
  location: string;
  cta: Link;
  image?: string;
};

export type Stat = {
  icon: "people" | "calendar" | "sparkles" | "music";
  value: string;
  plus?: boolean;
  label: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  image?: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  image?: string;
};

export type ValueItem = {
  icon: "heart" | "people" | "music" | "sprout";
  title: string;
  description: string;
};
