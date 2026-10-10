export type Link = { label: string; href: string };

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
