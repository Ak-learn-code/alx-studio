import { IntroTransition } from "@/components/intro/intro-transition";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <IntroTransition>
        <Hero />
      </IntroTransition>
    </main>
  );
}
