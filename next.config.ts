import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent folder has its own package-lock.json; pin the root to this project.
  outputFileTracingRoot: path.join(__dirname),

  // Gallery photos served from Google Drive (see src/lib/drive.ts)
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/d/**" }],
  },

  // Keep links to the old WordPress site working
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/blog", destination: "/events", permanent: true },
      { source: "/shop", destination: "/donate", permanent: true },
      { source: "/payment", destination: "/donate", permanent: true },
      { source: "/donation-confirmation", destination: "/donate/thank-you", permanent: true },
      { source: "/payment-confirmation", destination: "/donate/thank-you", permanent: true },
    ];
  },
};

export default nextConfig;
