"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import type { Locale, HeroCopy } from "@/components/hero/hero-data";
import { whatsappHref } from "@/components/hero/hero-data";

type HeroHeaderProps = {
  locale: Locale;
  text: HeroCopy[Locale];
  logoDockScale: number;
  logoDockTranslateY: number;
  onLocaleChange: (locale: Locale) => void;
};

export function HeroHeader({
  locale,
  text,
  logoDockScale,
  logoDockTranslateY,
  onLocaleChange,
}: HeroHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 max-[960px]:landscape:gap-2">
        <Link
          href="/"
          aria-label="ALX Studio"
          className="relative origin-top-left will-change-transform"
          style={{
            opacity: 1,
            transform: `translate3d(0, ${logoDockTranslateY}px, 0) scale(${logoDockScale})`,
          }}
        >
          <span
            id="pupil-target"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-full opacity-0"
          />
          <Image
            src={assetPath("/ALX-Studio_logo.svg")}
            alt="ALX Studio"
            width={1000}
            height={600}
            className="block h-[clamp(5.9rem,8vw,10.8rem)] w-auto select-none object-contain max-[860px]:h-[3.3rem] max-[860px]:-translate-y-1 max-[960px]:landscape:h-[2.7rem] max-[960px]:landscape:-translate-y-0.5"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 self-start translate-y-[-7px] sm:gap-3 sm:translate-y-[-8px] lg:translate-y-[-10px] max-[860px]:gap-1.5 max-[960px]:landscape:gap-1 max-[960px]:landscape:translate-y-[-5px]">
          <div className="inline-flex items-center rounded-full border border-white/12 bg-black/25 p-1 backdrop-blur-sm max-[860px]:p-0.5 max-[960px]:landscape:p-0.5">
            {(["de", "en", "gr"] as const).map((code) => {
              const active = locale === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onLocaleChange(code)}
                  className={cn(
                    "rounded-full px-2.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.22em] transition-colors sm:px-3 max-[860px]:px-1.5 max-[860px]:py-1 max-[860px]:text-[0.56rem] max-[860px]:tracking-[0.18em]",
                    active ? "bg-white text-black" : "text-white/68 hover:text-white"
                  )}
                >
                  {code.toUpperCase()}
                </button>
              );
            })}
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-white/14 bg-black/20 px-4 text-[0.9rem] font-semibold tracking-[0.06em] text-white shadow-none backdrop-blur-sm transition-colors hover:border-white/24 hover:bg-black/35 sm:px-5 max-[860px]:hidden max-[960px]:landscape:hidden"
          >
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              {text.talk}
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="icon-lg"
            className="size-12 rounded-full border-white/14 bg-black/20 text-white shadow-none backdrop-blur-sm transition-colors hover:border-white/24 hover:bg-black/35 max-[860px]:size-10 max-[960px]:landscape:size-10"
          >
            <a href="#studio-scroll-target" aria-label="Go to the next section">
              <Menu className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
