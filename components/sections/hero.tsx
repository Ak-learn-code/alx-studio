"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { HeroVideoBackground } from "@/components/hero/HeroVideoBackground";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Locale = "de" | "en" | "gr";
type HeadlineFragment = {
  text: string;
  accent?: boolean;
};

type HeadlineLine = HeadlineFragment[];

const whatsappHref = "https://wa.me/4915734741903";

const referenceLogos = [
  {
    src: "/pfrimmpark-arena-tight.png",
    alt: "Pfrimmpark Arena",
    className: "object-contain",
  },
  {
    src: "/krug-das-restaurant-tight.png",
    alt: "Krug Das Restaurant",
    className: "object-contain",
  },
  {
    src: "/Bukkador-Fotografie-tight.png",
    alt: "Bukkador Fotografie",
    className: "object-contain",
  },
  {
    src: "/original-logo-white-tight.png",
    alt: "Original Logo",
    className: "object-contain",
  },
];

const copy: Record<
  Locale,
  {
    available: string;
    since: string;
    talk: string;
    headline: string;
    description: string;
    inUseBy: string;
    projectCta: string;
  }
> = {
  de: {
    available: "Verfügbar für Projekte",
    since: "Seit Anfang Feb 2025",
    talk: "KONTAKT",
    headline: "Mehr als nur Visuals. Gebaut mit Vision.",
    description:
      "Wir bauen Marken, Websites und digitale Erlebnisse mit Intention, Klarheit und Sorgfalt.",
    inUseBy: "Im Einsatz bei",
    projectCta: "PROJEKT STARTEN",
  },
  en: {
    available: "Available for projects",
    since: "Since early Feb 2025",
    talk: "LET'S TALK",
    headline: "Beyond visuals. Built with vision.",
    description:
      "We build brands, websites, and digital experiences with intention, clarity and care.",
    inUseBy: "In use at",
    projectCta: "START A PROJECT",
  },
  gr: {
    available: "Διαθέσιμο για έργα",
    since: "Από τις αρχές Φεβ 2025",
    talk: "ΕΠΙΚΟΙΝΩΝΙΑ",
    headline: "Περισσότερα από visuals. Χτισμένα με όραμα.",
    description:
      "Χτίζουμε brands, websites και ψηφιακές εμπειρίες με πρόθεση, καθαρότητα και φροντίδα.",
    inUseBy: "Σε χρήση σε",
    projectCta: "ΞΕΚΙΝΗΣΤΕ ΕΝΑ PROJECT",
  },
};

const headlineCopy: Record<Locale, HeadlineLine[]> = {
  de: [
    [
      { text: "Mehr als " },
      { text: "nur", accent: true },
      { text: " Visuals." },
    ],
    [
      { text: "Gebaut mit " },
      { text: "Vision.", accent: true },
    ],
  ],
  en: [
    [
      { text: "Beyond", accent: true },
      { text: " visuals." },
    ],
    [
      { text: "Built with " },
      { text: "vision.", accent: true },
    ],
  ],
  gr: [
    [
      { text: "Περισσότερα", accent: true },
      { text: " από visuals." },
    ],
    [
      { text: "Χτισμένα ", accent: true },
      { text: "με " },
      { text: "όραμα.", accent: true },
    ],
  ],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [locale, setLocale] = useState<Locale>("de");
  const debugPupil = process.env.NEXT_PUBLIC_DEBUG_PUPIL === "true";

  const text = copy[locale];
  const headlineLines = headlineCopy[locale];
  const isCompactViewport = viewportWidth > 0 && viewportWidth <= 860;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const root = rootRef.current;
        if (!root) {
          return;
        }

        const total = root.offsetHeight - window.innerHeight;
        if (total <= 0) {
          setScrollProgress(0);
          return;
        }

        const progress = clamp((-root.getBoundingClientRect().top) / total, 0, 1);
        setScrollProgress(progress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [reducedMotion]);

  const isLandscapeViewport = viewportWidth > viewportHeight;
  const logoDockScaleTarget = reducedMotion
    ? 1
    : viewportWidth <= 860
      ? isLandscapeViewport
        ? 0.75
        : 0.78
      : viewportWidth <= 1180
        ? isLandscapeViewport
          ? 0.57
          : 0.62
        : 0.41;
  const logoDockScale = reducedMotion
    ? 1
    : 1 - clamp(scrollProgress, 0, 1) * (1 - logoDockScaleTarget);
  const logoDockTranslateYTarget = reducedMotion
    ? 0
    : viewportWidth <= 860
      ? isLandscapeViewport
        ? -4
        : -8
      : viewportWidth <= 1180
        ? isLandscapeViewport
          ? -8
          : -10
        : -10;
  const logoDockTranslateY = reducedMotion
    ? 0
    : clamp(scrollProgress, 0, 1) * logoDockTranslateYTarget;
  const headlineLift = reducedMotion ? 0 : scrollProgress * (isCompactViewport ? 8 : 14);
  const headlineShift = reducedMotion ? 0 : -scrollProgress * (isCompactViewport ? 10 : 26);
  const descriptionLift = reducedMotion ? 0 : scrollProgress * (isCompactViewport ? 6 : 10);
  const descriptionShift = reducedMotion ? 0 : scrollProgress * (isCompactViewport ? 8 : 18);
  const referenceOpacity = reducedMotion
    ? 1
    : 1 - clamp((scrollProgress - 0.1) / 0.14, 0, 1);
  const referenceTranslate = reducedMotion ? 0 : scrollProgress * 10;
  const heroImageScale = reducedMotion ? 1 : 1 + scrollProgress * 0.03;
  const headlineClassName =
    locale === "gr"
      ? "max-w-[7.8ch] text-[clamp(1.45rem,6.2vw,2.95rem)] leading-[0.92] tracking-[-0.09em] sm:max-w-[10.2ch] sm:text-[clamp(2.35rem,4.35vw,5.5rem)] sm:leading-[0.88] lg:max-w-[12.2ch] lg:text-[clamp(2.35rem,4.35vw,5.5rem)] max-[860px]:max-w-[15rem] max-[860px]:text-[clamp(2rem,8.8vw,4.2rem)] max-[860px]:leading-[0.9] max-[860px]:tracking-[-0.08em]"
      : "max-w-[7.4ch] text-[clamp(1.45rem,6.2vw,2.95rem)] leading-[0.92] tracking-[-0.09em] sm:max-w-[8ch] sm:text-[clamp(2.35rem,4.35vw,5.5rem)] sm:leading-[0.88] max-[860px]:max-w-[13rem] max-[860px]:text-[clamp(2rem,8.8vw,4.2rem)] max-[860px]:leading-[0.9] max-[860px]:tracking-[-0.08em]";
  const sectionFadeProgress = clamp((scrollProgress - 0.08) / 0.34, 0, 1);
  const heroImageOpacity = reducedMotion ? 1 : 1 - sectionFadeProgress * 0.58;
  const heroDimmingOpacity = reducedMotion ? 0 : sectionFadeProgress * 0.72;
  const headlineScale = reducedMotion
    ? 1
    : 1 - clamp(scrollProgress / (isCompactViewport ? 1.2 : 1), 0, 1) * 0.2;
  const descriptionScale = reducedMotion
    ? 1
    : 1 - clamp(scrollProgress / (isCompactViewport ? 1.4 : 1.15), 0, 1) * 0.08;

  return (
    <section
      ref={rootRef}
      className="hero-shell relative min-h-[200svh] overflow-hidden bg-black text-white"
    >
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
              className={cn(
                "pointer-events-none absolute inset-0 z-20 rounded-full",
                debugPupil
                  ? "bg-red-500 opacity-100 shadow-[0_0_0_12px_rgba(239,68,68,0.16)]"
                  : "opacity-0"
              )}
            />
            <Image
              src="/ALX-Studio_logo.svg"
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
                    onClick={() => setLocale(code)}
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

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <HeroVideoBackground
          className="will-change-transform"
          style={{
            transform: `scale(${heroImageScale})`,
            opacity: heroImageOpacity,
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.03),transparent_24%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/25" />
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: heroDimmingOpacity }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex h-full max-w-[1920px] flex-col px-4 pb-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pb-8 lg:pt-6 max-[860px]:pt-2 max-[960px]:landscape:px-4 max-[960px]:landscape:pt-2 max-[960px]:landscape:pb-2">
          <main className="relative flex flex-1 flex-col pt-32 sm:pt-32 lg:pt-24 xl:pt-32 max-[860px]:pt-20 max-[960px]:landscape:pt-4">
            <div className="relative grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8 max-[960px]:landscape:grid-rows-[auto_auto] max-[960px]:landscape:gap-2">
              <div className="relative order-2 flex min-h-[12rem] items-end pt-8 lg:order-1 lg:pt-0 max-[860px]:pt-6 max-[960px]:landscape:hidden">
                <div className="max-w-[29rem] lg:pb-6 max-[860px]:max-w-[18rem]">
                  <h2
                    className="max-w-[21rem] text-balance text-[clamp(1.35rem,2.15vw,2.35rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white/86 sm:max-w-[26rem] max-[860px]:max-w-[16.5rem] max-[860px]:text-[clamp(1rem,3.8vw,1.45rem)] max-[860px]:leading-[0.98]"
                    style={{
                      transform: reducedMotion
                        ? "none"
                        : `translate3d(${descriptionShift}px, ${descriptionLift}px, 0) scale(${descriptionScale})`,
                    }}
                  >
                    {text.description}
                  </h2>
                </div>
              </div>

              <div className="relative order-1 flex min-h-[18rem] items-start justify-end pt-24 pr-8 lg:order-2 lg:pt-4 lg:pr-0 max-[860px]:min-h-[16rem] max-[860px]:pt-14 max-[860px]:pr-0 max-[860px]:items-start max-[960px]:landscape:min-h-0 max-[960px]:landscape:pt-2">
                <h1
                  className={cn(
                    "ml-auto w-full text-balance text-right font-semibold text-white/86 max-[960px]:landscape:max-w-[12rem] max-[960px]:landscape:text-[clamp(1.25rem,3vw,1.9rem)] max-[960px]:landscape:leading-[0.92]",
                    headlineClassName,
                    reducedMotion ? "" : "will-change-transform"
                  )}
                  style={{
                    transform: reducedMotion
                      ? "none"
                      : `translate3d(${headlineShift}px, ${headlineLift}px, 0) scale(${headlineScale})`,
                  }}
                >
                  <span className="block">
                  {headlineLines[0].map((fragment, index) => (
                      <span
                        key={`headline-top-${locale}-${index}`}
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
                        key={`headline-bottom-${locale}-${index}`}
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

            <footer className="relative z-20 mt-10 pt-8 lg:mt-8 xl:mt-auto max-[860px]:mt-7 max-[860px]:pt-7 max-[960px]:landscape:mt-2 max-[960px]:landscape:pt-2">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8 max-[860px]:gap-10 max-[860px]:items-stretch max-[960px]:landscape:gap-3">
                <div
                  className="w-full max-w-[min(58rem,100%)] max-[860px]:max-w-full"
                  style={{
                    opacity: referenceOpacity,
                    transform: `translate3d(${referenceTranslate}px, 0, 0)`,
                  }}
                >
                  <p className="text-[0.68rem] tracking-[0.26em] text-white/42 uppercase max-[860px]:text-[0.58rem] max-[960px]:landscape:text-[0.55rem]">
                    {text.inUseBy}
                  </p>
                  <div className="mt-4 overflow-hidden max-[860px]:mt-4 max-[960px]:landscape:mt-2">
                    <motion.div
                      className="flex w-max items-center gap-6 sm:gap-8 max-[860px]:gap-4 max-[960px]:landscape:gap-2"
                      animate={
                        reducedMotion
                          ? undefined
                          : {
                              x: ["-50%", "0%"],
                            }
                      }
                      transition={
                        reducedMotion
                          ? undefined
                          : {
                              duration: 22,
                              repeat: Infinity,
                              ease: "linear",
                            }
                      }
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
                  className="h-11 w-fit rounded-full border border-slate-200/35 bg-[linear-gradient(180deg,rgba(232,242,251,0.96),rgba(197,216,233,0.9))] px-4 text-[0.82rem] font-semibold tracking-[0.08em] text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform hover:translate-y-[-1px] hover:bg-[linear-gradient(180deg,rgba(241,248,253,0.98),rgba(208,226,239,0.95))] sm:px-5 max-[860px]:h-12 max-[860px]:w-full max-[860px]:px-4 max-[860px]:justify-between max-[860px]:mt-2 lg:mt-0 lg:self-end max-[960px]:landscape:h-10 max-[960px]:landscape:w-fit max-[960px]:landscape:px-4 max-[960px]:landscape:self-end max-[960px]:landscape:mt-0"
                >
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    {text.projectCta}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </footer>
          </main>
        </div>
      </div>

      <div id="studio-scroll-target" className="h-[100svh]" aria-hidden="true" />
    </section>
  );
}
