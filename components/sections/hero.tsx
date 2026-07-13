"use client";

import { useEffect, useState } from "react";

import { HeroBackground } from "@/components/hero/hero-background";
import { HeroContent } from "@/components/hero/hero-content";
import { HeroFooter } from "@/components/hero/hero-footer";
import { HeroHeader } from "@/components/hero/hero-header";
import {
  copy,
  headlineCopy,
  referenceLogos,
  type Locale,
} from "@/components/hero/hero-data";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [locale, setLocale] = useState<Locale>("de");

  const text = copy[locale];
  const headlineLines = headlineCopy[locale];
  const isCompactViewport = viewportWidth > 0 && viewportWidth <= 860;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const updateViewportSize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    updateViewportSize();

    window.addEventListener("resize", updateViewportSize);

    return () => {
      window.removeEventListener("resize", updateViewportSize);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let rafFrame = 0;
    let active = true;

    const readProgress = () => {
      const scrollingElement =
        document.scrollingElement ?? document.documentElement;
      const total = scrollingElement.scrollHeight - window.innerHeight;

      if (total <= 0) {
        return 0;
      }

      const currentScroll =
        window.pageYOffset ?? scrollingElement.scrollTop ?? window.scrollY;
      return clamp(currentScroll / total, 0, 1);
    };

    const applyProgress = () => {
      const progress = readProgress();
      setScrollProgress((current) =>
        Math.abs(current - progress) < 0.0005 ? current : progress
      );
    };

    const scheduleProgress = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(applyProgress);
    };

    const startCompactSampler = () => {
      cancelAnimationFrame(rafFrame);

      if (!isCompactViewport) {
        return;
      }

      const tick = () => {
        if (!active) {
          return;
        }

        applyProgress();
        rafFrame = window.requestAnimationFrame(tick);
      };

      rafFrame = window.requestAnimationFrame(tick);
    };

    applyProgress();
    scheduleProgress();
    startCompactSampler();

    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("orientationchange", scheduleProgress);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(rafFrame);
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("orientationchange", scheduleProgress);
    };
  }, [isCompactViewport]);

  const isLandscapeViewport = viewportWidth > viewportHeight;
  const logoDockScaleTarget =
    viewportWidth <= 860
      ? isLandscapeViewport
        ? 0.75
        : 0.78
      : viewportWidth <= 1180
        ? isLandscapeViewport
          ? 0.57
          : 0.62
        : 0.41;
  const logoDockScale = 1 - clamp(scrollProgress, 0, 1) * (1 - logoDockScaleTarget);
  const logoDockTranslateYTarget =
    viewportWidth <= 860
      ? isLandscapeViewport
        ? -4
        : -8
      : viewportWidth <= 1180
        ? isLandscapeViewport
          ? -8
          : -10
        : -10;
  const logoDockTranslateY = clamp(scrollProgress, 0, 1) * logoDockTranslateYTarget;
  const headlineLift = scrollProgress * (isCompactViewport ? 8 : 14);
  const headlineShift = -scrollProgress * (isCompactViewport ? 10 : 26);
  const descriptionLift = scrollProgress * (isCompactViewport ? 6 : 10);
  const descriptionShift = scrollProgress * (isCompactViewport ? 8 : 18);
  const referenceOpacity = 1 - clamp((scrollProgress - 0.1) / 0.14, 0, 1);
  const referenceTranslate = scrollProgress * 10;
  const headlineClassName =
    locale === "gr"
      ? "max-w-[7.8ch] text-[clamp(1.45rem,6.2vw,2.95rem)] leading-[0.92] tracking-[-0.09em] sm:max-w-[10.2ch] sm:text-[clamp(2.35rem,4.35vw,5.5rem)] sm:leading-[0.88] lg:max-w-[12.2ch] lg:text-[clamp(2.35rem,4.35vw,5.5rem)] max-[860px]:max-w-[15rem] max-[860px]:text-[clamp(1.75rem,7.8vw,3.8rem)] max-[860px]:leading-[0.9] max-[860px]:tracking-[-0.08em]"
      : "max-w-[7.4ch] text-[clamp(1.45rem,6.2vw,2.95rem)] leading-[0.92] tracking-[-0.09em] sm:max-w-[8ch] sm:text-[clamp(2.35rem,4.35vw,5.5rem)] sm:leading-[0.88] max-[860px]:max-w-[13rem] max-[860px]:text-[clamp(1.75rem,7.8vw,3.8rem)] max-[860px]:leading-[0.9] max-[860px]:tracking-[-0.08em]";
  const headlineTransform = `translate3d(${headlineShift}px, ${headlineLift}px, 0) scale(${
    1 - clamp(scrollProgress / (isCompactViewport ? 1.2 : 1), 0, 1) * 0.2
  })`;
  const descriptionTransform = `translate3d(${descriptionShift}px, ${descriptionLift}px, 0) scale(${
    1 - clamp(scrollProgress / (isCompactViewport ? 1.4 : 1.15), 0, 1) * 0.08
  })`;

  return (
    <section className="hero-shell relative min-h-[120svh] overflow-x-hidden bg-black text-white lg:min-h-[200svh]">
      <div className="relative min-h-[120svh] overflow-visible lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden">
        <HeroBackground
          viewportWidth={viewportWidth}
          scrollProgress={scrollProgress}
        />

        <HeroHeader
          locale={locale}
          text={text}
          logoDockScale={logoDockScale}
          logoDockTranslateY={logoDockTranslateY}
          onLocaleChange={setLocale}
        />

        <HeroContent
          description={text.description}
          headlineLines={headlineLines}
          headlineClassName={headlineClassName}
          headlineTransform={headlineTransform}
          descriptionTransform={descriptionTransform}
        />

        <HeroFooter
          inUseBy={text.inUseBy}
          projectCta={text.projectCta}
          referenceLogos={referenceLogos}
          referenceOpacity={referenceOpacity}
          referenceTranslate={referenceTranslate}
        />
      </div>

      <div
        id="studio-scroll-target"
        className="h-[100svh] max-[860px]:hidden"
        aria-hidden="true"
      />
    </section>
  );
}
