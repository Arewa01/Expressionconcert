import { Container } from "@/components/layout/Container";
import { EqualizerBackdrop } from "@/components/motion/EqualizerBackdrop";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink py-36 text-white">
      <EqualizerBackdrop className="absolute inset-x-0 bottom-0 h-32 opacity-50" />
      <Container className="relative text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">404</p>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
          This page is <Accent>out of tune.</Accent>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
          We couldn&apos;t find the page you were looking for.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="dark">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
