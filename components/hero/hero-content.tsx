"use client";

import { cn } from "@/lib/utils";
import type { HeadlineLine } from "@/components/hero/hero-data";

type HeroContentProps = {
  description: string;
  headlineLines: HeadlineLine[];
  headlineClassName: string;
  headlineTransform: string;
  descriptionTransform: string;
};

export function HeroContent({
  description,
  headlineLines,
  headlineClassName,
  headlineTransform,
  descriptionTransform,
}: HeroContentProps) {
  return (
    <div className="relative mx-auto flex min-h-[100svh] max-w-[1920px] flex-col px-4 pb-4 pt-4 sm:px-6 sm:pt-5 lg:h-full lg:min-h-0 lg:px-8 lg:pb-8 lg:pt-6 max-[860px]:min-h-[82svh] max-[860px]:pt-2 max-[960px]:landscape:min-h-[78svh] max-[960px]:landscape:px-4 max-[960px]:landscape:pt-2 max-[960px]:landscape:pb-2">
      <main className="relative flex flex-1 flex-col pt-32 sm:pt-32 lg:pt-24 xl:pt-32 max-[860px]:flex-none max-[860px]:pt-0 max-[960px]:landscape:pt-4">
        <div className="relative grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8 max-[960px]:landscape:grid-rows-[auto_auto] max-[960px]:landscape:gap-2">
          <div className="relative order-2 flex min-h-[12rem] items-end pt-8 lg:order-1 lg:pt-0 max-[860px]:min-h-[7rem] max-[860px]:pt-1 max-[960px]:landscape:hidden">
            <div className="max-w-[29rem] lg:pb-6 max-[860px]:max-w-[18rem]">
              <h2
                className="max-w-[21rem] text-balance text-[clamp(1.35rem,2.15vw,2.35rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white/86 sm:max-w-[26rem] max-[860px]:max-w-[16.5rem] max-[860px]:text-[clamp(0.86rem,3vw,1.15rem)] max-[860px]:leading-[0.98]"
                style={{
                  transform: descriptionTransform,
                }}
              >
                {description}
              </h2>
            </div>
          </div>

          <div className="relative order-1 flex min-h-[18rem] items-start justify-end pt-24 pr-8 lg:order-2 lg:pt-4 lg:pr-0 max-[860px]:min-h-[7rem] max-[860px]:pt-4 max-[860px]:pr-0 max-[860px]:items-start max-[960px]:landscape:min-h-0 max-[960px]:landscape:pt-2">
            <h1
              className={cn(
                "ml-auto w-full text-balance text-right font-semibold text-white/86 max-[960px]:landscape:max-w-[12rem] max-[960px]:landscape:text-[clamp(1.25rem,3vw,1.9rem)] max-[960px]:landscape:leading-[0.92]",
                headlineClassName,
                "will-change-transform"
              )}
              style={{
                transform: headlineTransform,
              }}
            >
              <span className="block">
                {headlineLines[0].map((fragment, index) => (
                  <span
                    key={`headline-top-${index}`}
                    className={cn(
                      fragment.accent
                        ? "text-[#d7e3ef] drop-shadow-[0_0_12px_rgba(215,227,239,0.12)]"
                        : ""
                    )}
                  >
                    {fragment.text}
                  </span>
                ))}
              </span>
              <span className="block">
                {headlineLines[1].map((fragment, index) => (
                  <span
                    key={`headline-bottom-${index}`}
                    className={cn(
                      fragment.accent
                        ? "text-[#d7e3ef] drop-shadow-[0_0_12px_rgba(215,227,239,0.12)]"
                        : ""
                    )}
                  >
                    {fragment.text}
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
