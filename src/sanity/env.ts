// Sanity connection settings. Without a project ID the site falls back to src/content/events.ts.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";
export const sanityConfigured = projectId.length > 0;
