import type { Link } from "./types";

export const org = {
  name: "Expression Concert Music Foundation",
  legalName: "Expression Concert Music Foundation CIC",
  email: "hello@expressionconcert.com",
  phones: ["07769 493682", "07769 493685"],
  eventsLine: "0161 531 4228",
  address: {
    line1: "228 Wellington Road South",
    town: "Stockport",
    postcode: "SK2 6NW",
  },
  mapEmbed:
    "https://maps.google.com/maps?q=228%20Wellington%20Rd%20S%2C%20Stockport%20SK2%206NW%2C%20UK&t=m&z=14&output=embed&iwloc=near",
};

export const mainNav: Link[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Programmes", href: "/programmes" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Community Choir", href: "/community-choir" },
  { label: "School of Music", href: "/school-of-music" },
  { label: "Get Involved", href: "/get-involved" },
];

export const donateLink: Link = { label: "Donate", href: "/donate" };

export const footer = {
  description:
    "A community interest company using music for healing, education, opportunity and cultural connection across Greater Manchester.",
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Programmes", href: "/programmes" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Community Choir", href: "/community-choir" },
    { label: "School of Music", href: "/school-of-music" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Donate", href: "/donate" },
    { label: "Partner With Us", href: "/get-involved#sponsor" },
    { label: "Volunteer", href: "/get-involved#volunteer" },
    { label: "Fundraise", href: "/contact" },
    { label: "Other Ways to Give", href: "/get-involved" },
  ],
  // TODO: the live site lists no social accounts. Add the real URLs here.
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  newsletter: {
    title: "Stay in the loop",
    description: "Get updates on events, programmes and opportunities.",
  },
  copyright: "© 2026 Expression Concert Music Foundation. All rights reserved.",
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
