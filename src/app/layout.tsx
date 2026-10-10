import type { Metadata } from "next";
import { Caveat, Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});
const caveat = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-caveat" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Expression Concert | Healing Minds. Connecting Communities.",
    template: "%s | Expression Concert",
  },
  description:
    "Expression Concert uses the power of music to create spaces for healing, learning, opportunity and belonging across Greater Manchester.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body>
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
