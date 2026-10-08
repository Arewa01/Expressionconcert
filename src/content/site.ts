import type { Link } from "./types";

export const mainNav: Link[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Programmes", href: "/programmes" },
  { label: "Events", href: "/events" },
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
    { label: "Community Choir", href: "/community-choir" },
    { label: "School of Music", href: "/school-of-music" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Donate", href: "/donate" },
    { label: "Partner With Us", href: "/partner" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Fundraise", href: "/fundraise" },
    { label: "Other Ways to Give", href: "/other-ways-to-give" },
  ],
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
