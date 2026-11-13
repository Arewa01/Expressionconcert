import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <section className="bg-[#faf8f5] py-32">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Heart className="animate-heartbeat mx-auto size-16 fill-brand text-brand" />
        </Reveal>
        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-ink">
          <MaskLine onMount delay={0.1}>
            Thank <Accent>you.</Accent>
          </MaskLine>
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-6 text-lg text-neutral-600">
            Your donation helps us deliver music therapy, community programmes, workshops and opportunities for the next
            generation. A receipt is on its way to your inbox.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/">Back to Home</Button>
            <Button href="/events" variant="outline">
              See Our Events
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
