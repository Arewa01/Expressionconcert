import type { FeaturedSupporter, Supporter } from "@/components/sections/SupportersStrip";

/** Shown on their own, larger, above the other supporters */
export const featuredSupporters: FeaturedSupporter[] = [
  { label: "Funded by", name: "UK Government", logo: "/images/supporters/uk-government.png" },
  { label: "Supported by", name: "Manchester City Council", logo: "/images/supporters/manchester-city-council.jpg" },
];

export const supporters: Supporter[] = [
  { name: "Stockport Metropolitan Borough Council", logo: "/images/supporters/stockport-council.jpg" },
  { name: "The National Lottery Community Fund", logo: "/images/supporters/community-fund.jpeg" },
  { name: "NCVO", logo: "/images/supporters/ncvo.png" },
  { name: "Musicians' Union", logo: "/images/supporters/musicians-union.jpeg" },
  { name: "Skylight", logo: "/images/supporters/skylight.jpeg" },
  { name: "Tasty Foods", logo: "/images/supporters/tasty.png" },
  { name: "Sector3", logo: "/images/supporters/sector3.jpeg" },
];
