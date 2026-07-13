"use client";

import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  clearIntroAsSeen,
  hasSeenIntro,
  markIntroAsSeen,
} from "@/lib/intro-storage";
import { cn } from "@/lib/utils";

type TargetPoint = {
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
};

type IntroPhase = "idle" | "typing" | "pause" | "reveal" | "done";

const INTRO_LABEL = "Alx Studio";
const TYPING_START_DELAY_MS = 260;
const TYPING_STEP_MS = 110;
const PAUSE_MS = 400;
const REVEAL_MS = 1260;
const PHASE_MAX_MS = 5000;

function IntroStaticMark({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Image
        src="/ALX-Studio_logo.svg"
        alt="ALX Studio"
        width={960}
        height={540}
        className="h-[clamp(4.2rem,8vw,6.6rem)] w-auto select-none object-contain invert sm:h-[clamp(5rem,7vw,8rem)]"
        priority
      />
      {children}
    </div>
  );
}

function IntroTypewriterText({
  text,
  typing,
}: {
  text: string;
  typing: boolean;
}) {
  return (
    <p className="flex items-center gap-1 text-[0.78rem] font-semibold tracking-[0.24em] text-black/82 uppercase sm:text-[0.82rem]">
      <span className="min-w-[0.4ch]">
        {text}
        <span
          aria-hidden="true"
          className={cn(
            "inline-block translate-y-[0.04em] border-r border-black/65 pr-[0.08em]",
            typing ? "opacity-100" : "opacity-0"
          )}
        >
          &nbsp;
        </span>
      </span>
    </p>
  );
}

export function IntroTransition({ children }: { children: ReactNode }) {
  const isDev = process.env.NODE_ENV !== "production";
  const [phase, setPhase] = useState<IntroPhase>("idle");
  const [typedCount, setTypedCount] = useState(0);
  const [target, setTarget] = useState<TargetPoint | null>(null);
  const [typingFinished, setTypingFinished] = useState(false);
  const runIdRef = useRef(0);
  const phaseTimerRef = useRef<number>(0);
  const revealTimerRef = useRef<number>(0);
  const introWasVisibleRef = useRef(false);

  const shouldShowIntro = phase !== "done";
  const typedText = INTRO_LABEL.slice(0, typedCount);
  const isTyping = phase === "typing";
  const showCursor = isTyping && !typingFinished;
  const isRevealing = phase === "reveal" && target !== null;

  useEffect(() => {
    if (isDev) {
      console.log(phase.toUpperCase());
    }
  }, [isDev, phase]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const shouldForceIntro = params.get("intro") === "1";

    if (shouldForceIntro) {
      params.delete("intro");
      const nextSearch = params.toString();
      const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${
        window.location.hash
      }`;

      window.history.replaceState(null, "", nextUrl || window.location.pathname);
      clearIntroAsSeen();
      const startTimer = window.setTimeout(() => {
        setPhase("typing");
      }, 0);

      return () => {
        window.clearTimeout(startTimer);
      };
    }

    const startTimer = window.setTimeout(() => {
      if (hasSeenIntro()) {
        setPhase("done");
        return;
      }

      setPhase("typing");
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
    };
  }, []);

  const handleTypingComplete = useCallback(() => {
    setTypingFinished(true);
    setPhase("pause");
  }, []);

  useEffect(() => {
    if (!shouldShowIntro) {
      return;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : previousPaddingRight;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [shouldShowIntro]);

  useEffect(() => {
    if (!isDev || !shouldShowIntro) {
      return;
    }

    console.log("[ALX] Intro visible");
  }, [isDev, shouldShowIntro]);

  useEffect(() => {
    if (shouldShowIntro) {
      introWasVisibleRef.current = true;
      if (isDev) {
        console.log("[ALX] Intro phase", phase);
      }
      return;
    }

    if (introWasVisibleRef.current && isDev) {
      console.log("[ALX] Intro finished");
    }
  }, [isDev, phase, shouldShowIntro]);

  const measureTarget = useCallback(() => {
    const element = document.getElementById("pupil-target");
    if (!element) {
      if (isDev) {
        console.log("[IntroTransition] Marker found: false");
      }
      setTarget(null);
      return;
    }

    const rect = element.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      if (isDev) {
        console.log("[IntroTransition] Marker found: true");
        console.log("[IntroTransition] BoundingClientRect", rect);
        console.log("[IntroTransition] Ignored zero-sized marker");
      }
      setTarget(null);
      return;
    }

    const nextTarget = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };

    if (isDev) {
      console.log("[IntroTransition] Marker found: true");
      console.log("[IntroTransition] BoundingClientRect", rect);
      console.log("[IntroTransition] Calculated target coordinates", {
        x: nextTarget.x,
        y: nextTarget.y,
      });
    }

    setTarget(nextTarget);
  }, [isDev]);

  useLayoutEffect(() => {
    if (!shouldShowIntro) {
      return;
    }

    let firstFrame = 0;
    let secondFrame = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          measureTarget();
        });
      });
    };

    scheduleMeasure();
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    window.addEventListener("orientationchange", scheduleMeasure);

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
    };
  }, [measureTarget, shouldShowIntro]);

  useEffect(() => {
    if (!shouldShowIntro || phase !== "typing") {
      return;
    }

    let cancelled = false;
    let charIndex = 0;
    let initialTimer = 0;
    let stepTimer = 0;
    const runId = ++runIdRef.current;
    const startedAt = window.performance.now();

    const finishTyping = () => {
      if (cancelled || runIdRef.current !== runId) {
        return;
      }

      setTypedCount(INTRO_LABEL.length);
      handleTypingComplete();
    };

    const tick = () => {
      if (cancelled || runIdRef.current !== runId) {
        return;
      }

      if (window.performance.now() - startedAt >= PHASE_MAX_MS) {
        finishTyping();
        return;
      }

      charIndex += 1;
      setTypedCount(charIndex);

      if (charIndex >= INTRO_LABEL.length) {
        finishTyping();
        return;
      }

      stepTimer = window.setTimeout(tick, TYPING_STEP_MS);
    };

    initialTimer = window.setTimeout(tick, TYPING_START_DELAY_MS);
    phaseTimerRef.current = window.setTimeout(finishTyping, PHASE_MAX_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(initialTimer);
      window.clearTimeout(stepTimer);
      window.clearTimeout(phaseTimerRef.current);
    };
  }, [handleTypingComplete, phase, shouldShowIntro]);

  useEffect(() => {
    if (!shouldShowIntro || phase !== "pause") {
      return;
    }

    let cancelled = false;
    const startedAt = window.performance.now();
    const currentRun = runIdRef.current;

    const advance = () => {
      if (cancelled || runIdRef.current !== currentRun) {
        return;
      }

      if (target) {
        setPhase("reveal");
        return;
      }

      if (window.performance.now() - startedAt >= PHASE_MAX_MS) {
        setPhase("done");
        return;
      }

      phaseTimerRef.current = window.setTimeout(advance, 50);
    };

    phaseTimerRef.current = window.setTimeout(advance, PAUSE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(phaseTimerRef.current);
    };
  }, [phase, shouldShowIntro, target]);

  useEffect(() => {
    if (!shouldShowIntro || phase !== "reveal") {
      return;
    }

    const currentRun = runIdRef.current;
    const finishReveal = () => {
      if (runIdRef.current !== currentRun) {
        return;
      }

      setPhase("done");
    };

    revealTimerRef.current = window.setTimeout(finishReveal, REVEAL_MS);
    phaseTimerRef.current = window.setTimeout(finishReveal, PHASE_MAX_MS);

    return () => {
      window.clearTimeout(revealTimerRef.current);
      window.clearTimeout(phaseTimerRef.current);
    };
  }, [phase, shouldShowIntro]);

  useEffect(() => {
    if (phase !== "done") {
      return;
    }

    markIntroAsSeen();
  }, [phase]);

  const overlayStyle = {
    "--pupil-x": target ? `${target.x}px` : "50vw",
    "--pupil-y": target ? `${target.y}px` : "50vh",
  } as CSSProperties;

  const centerPoint = target
    ? {
        x: target.viewportWidth / 2,
        y: target.viewportHeight / 2,
      }
    : null;

  return (
    <div className="relative min-h-dvh">
      {children}

      <AnimatePresence>
        {shouldShowIntro ? (
          <motion.div
            key="intro-transition"
            className="fixed inset-0 z-[999] overflow-hidden bg-white text-black"
            style={overlayStyle}
            initial={false}
            animate={{
              clipPath:
                phase === "reveal" && target
                  ? "circle(0% at var(--pupil-x) var(--pupil-y))"
                  : "circle(150% at 50% 50%)",
            }}
            transition={{
              duration: phase === "reveal" ? REVEAL_MS / 1000 : 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {isRevealing && centerPoint ? (
              <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[1000] will-change-transform"
                initial={{
                  x: centerPoint.x,
                  y: centerPoint.y,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: target.x,
                  y: target.y,
                  opacity: 0,
                  scale: 0.04,
                }}
                transition={{
                  duration: REVEAL_MS / 1000,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                  <IntroStaticMark>
                    <p className="text-[0.78rem] font-semibold tracking-[0.24em] text-black/82 uppercase sm:text-[0.82rem]">
                      {INTRO_LABEL}
                    </p>
                  </IntroStaticMark>
                </div>
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <IntroStaticMark>
                  <IntroTypewriterText text={typedText} typing={showCursor} />
                </IntroStaticMark>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
