import { headers } from "next/headers";

import { IntroTransition } from "@/components/intro/intro-transition";
import { Hero } from "@/components/sections/hero";
import { isIOSWebKitUserAgent } from "@/lib/is-ios-webkit";

export default async function Home() {
  const userAgent = (await headers()).get("user-agent") ?? "";
  const introSkipped = isIOSWebKitUserAgent(userAgent);

  return (
    <main className="relative overflow-x-hidden">
      {introSkipped ? (
        <Hero />
      ) : (
        <IntroTransition>
          <Hero />
        </IntroTransition>
      )}
    </main>
  );
}
