import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/** Header and footer for every public page. The Sanity Studio at /studio sits outside this group. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
