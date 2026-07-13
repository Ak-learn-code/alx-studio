"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/components/hero/hero-data";

type HeroFooterProps = {
  inUseBy: string;
  projectCta: string;
  referenceLogos: Array<{
    src: string;
    alt: string;
    className: string;
  }>;
  referenceOpacity: number;
  referenceTranslate: number;
};

export function HeroFooter({
  inUseBy,
  projectCta,
  referenceLogos,
  referenceOpacity,
  referenceTranslate,
}: HeroFooterProps) {
  return (
    <footer className="relative z-30 mt-10 pt-8 pb-[calc(env(safe-area-inset-bottom)+1rem)] lg:mt-8 lg:pb-0 xl:mt-auto max-[860px]:mt-0 max-[860px]:pt-0 max-[860px]:pb-[calc(env(safe-area-inset-bottom)+0.25rem)] max-[960px]:landscape:mt-2 max-[960px]:landscape:pt-2 max-[960px]:landscape:pb-0">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8 max-[860px]:gap-2 max-[860px]:items-stretch max-[960px]:landscape:gap-3">
        <div
          className="w-full max-w-[min(58rem,100%)] max-[860px]:max-w-full"
          style={{
            opacity: referenceOpacity,
            transform: `translate3d(${referenceTranslate}px, 0, 0)`,
          }}
        >
          <p className="text-[0.68rem] tracking-[0.26em] text-white/42 uppercase max-[860px]:text-[0.58rem] max-[960px]:landscape:text-[0.55rem]">
            {inUseBy}
          </p>
          <div className="mt-4 overflow-hidden max-[860px]:mt-4 max-[960px]:landscape:mt-2">
            <motion.div
              className="flex w-max items-center gap-6 sm:gap-8 max-[860px]:gap-4 max-[960px]:landscape:gap-2"
              animate={{
                x: ["-50%", "0%"],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: "max-content" }}
            >
              {[...referenceLogos, ...referenceLogos].map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="relative h-10 w-[140px] shrink-0 sm:h-12 sm:w-[170px] lg:h-14 lg:w-[200px] max-[860px]:h-8 max-[860px]:w-[112px] max-[960px]:landscape:h-7 max-[960px]:landscape:w-[94px]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 170px, 140px"
                    className={cn(
                      "object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.08)] max-[860px]:drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]",
                      logo.className
                    )}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="relative z-50 h-11 w-fit rounded-full border border-slate-200/35 bg-[linear-gradient(180deg,rgba(232,242,251,0.96),rgba(197,216,233,0.9))] px-4 text-[0.82rem] font-semibold tracking-[0.08em] text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform hover:translate-y-[-1px] hover:bg-[linear-gradient(180deg,rgba(241,248,253,0.98),rgba(208,226,239,0.95))] sm:px-5 max-[860px]:h-12 max-[860px]:w-full max-[860px]:px-4 max-[860px]:justify-between max-[860px]:mt-0 max-[860px]:shadow-[0_20px_48px_rgba(0,0,0,0.42)] lg:static lg:mt-0 lg:self-end max-[960px]:landscape:h-10 max-[960px]:landscape:w-fit max-[960px]:landscape:px-4 max-[960px]:landscape:self-end max-[960px]:landscape:mt-0"
        >
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            {projectCta}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </footer>
  );
}
