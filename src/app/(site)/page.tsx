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
import { featuredSupporters, supporters } from "@/content/supporters";
import { ongoingEvents, pastEvents, upcomingEvents } from "@/lib/events";
import { getEvents } from "@/lib/getEvents";

// Re-check which events are upcoming every hour
export const revalidate = 60;

export default async function Home() {
  const events = await getEvents();
  const now = new Date();
  // Upcoming events first, then ongoing programmes, topped up with recent past ones so the slider is never empty
  const items = [
    ...upcomingEvents(events, now).map((occurrence) => ({ occurrence, past: false })),
    ...ongoingEvents(events, now).map((occurrence) => ({ occurrence, past: false })),
    ...pastEvents(events, now).map((occurrence) => ({ occurrence, past: true })),
  ].slice(0, 4);

  return (
    <>
      <Hero {...hero} />
      <ValuesStrip items={values} />
      <ProgrammeGrid {...programmesSection} items={items} />
      <ImpactStats {...impact} stats={stats} testimonials={testimonials} />
      <ChoirFeature {...choir} />
      <ServiceCards items={services} />
      <SupportersStrip featured={featuredSupporters} supporters={supporters} />
      <DonateCTA {...donateCta} />
    </>
  );
}
