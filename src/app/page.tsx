import { ChoirFeature } from "@/components/sections/ChoirFeature";
import { DonateCTA } from "@/components/sections/DonateCTA";
import { Hero } from "@/components/sections/Hero";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { ProgrammeGrid } from "@/components/sections/ProgrammeGrid";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { SupportersStrip } from "@/components/sections/SupportersStrip";
import { ValuesStrip } from "@/components/sections/ValuesStrip";
import {
  choir,
  donateCta,
  hero,
  impact,
  programmesSection,
  services,
  stats,
  testimonials,
  values,
} from "@/content/home";
import { supporters } from "@/content/supporters";
import { pastEvents, upcomingEvents } from "@/lib/events";

// Re-check which events are upcoming every hour
export const revalidate = 3600;

export default function Home() {
  const now = new Date();
  // Upcoming events first, topped up with the most recent past ones so the slider is never empty
  const items = [
    ...upcomingEvents(now).map((occurrence) => ({ occurrence, past: false })),
    ...pastEvents(now).map((occurrence) => ({ occurrence, past: true })),
  ].slice(0, 4);

  return (
    <>
      <Hero {...hero} />
      <ValuesStrip items={values} />
      <ProgrammeGrid {...programmesSection} items={items} />
      <ImpactStats {...impact} stats={stats} testimonials={testimonials} />
      <ChoirFeature {...choir} />
      <ServiceCards items={services} />
      <SupportersStrip supporters={supporters} />
      <DonateCTA {...donateCta} />
    </>
  );
}
