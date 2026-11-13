import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { sanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui", padding: 48, maxWidth: 560 }}>
        <h1>Studio not connected</h1>
        <p>Add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local and restart the dev server.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
