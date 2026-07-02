"use client";

import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

type IntroPhase = "typing" | "pause" | "reveal";

const INTRO_LABEL = "Alx Studio";

function IntroTypewriter({
  active,
  reducedMotion,
  restartKey,
  onComplete,
}: {
  active: boolean;
  reducedMotion: boolean;
  restartKey: number;
  onComplete: () => void;
}) {
  const [label, setLabel] = useState("");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reducedMotion) {
      const completeTimer = window.setTimeout(() => {
        onCompleteRef.current();
      }, 0);
      return () => {
        window.clearTimeout(completeTimer);
      };
    }

    let isCancelled = false;
    let charIndex = 0;
    let frameTimer = 0;
    let startTimer = 0;

    const tick = () => {
      if (isCancelled) {
        return;
      }

      charIndex += 1;
      setLabel(INTRO_LABEL.slice(0, charIndex));

      if (charIndex < INTRO_LABEL.length) {
        frameTimer = window.setTimeout(tick, 110);
      } else {
        onCompleteRef.current();
      }
    };

    startTimer = window.setTimeout(tick, 260);

    return () => {
      isCancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(frameTimer);
    };
  }, [active, reducedMotion, restartKey]);

  const visibleLabel = reducedMotion ? INTRO_LABEL : label;

  return (
    <p className="flex items-center gap-1 text-[0.78rem] font-semibold tracking-[0.24em] text-black/82 uppercase sm:text-[0.82rem]">
      <span className="min-w-[0.4ch]">
        {visibleLabel}
        <span
          aria-hidden="true"
          className={cn(
            "inline-block translate-y-[0.04em] border-r border-black/65 pr-[0.08em] transition-opacity",
            visibleLabel.length < INTRO_LABEL.length
              ? "opacity-100 motion-safe:animate-pulse"
              : "opacity-0"
          )}
        >
          &nbsp;
        </span>
      </span>
    </p>
  );
}

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

export function IntroTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<IntroPhase>("typing");
  const [target, setTarget] = useState<TargetPoint | null>(null);
  const [sequenceId, setSequenceId] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const runIdRef = useRef(0);
  const phaseTimerRef = useRef(0);
  const debugIntroEnabled =
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_DEBUG_INTRO === "true";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const shouldForceIntro = params.get("intro") === "1";

    if (shouldForceIntro) {
      params.delete("intro");
      const nextSearch = params.toString();
      const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;

      window.history.replaceState(null, "", nextUrl || window.location.pathname);
      clearIntroAsSeen();
      return;
    }

    if (!hasSeenIntro()) {
      return;
    }

    const hideTimer = window.setTimeout(() => {
      setIsActive(false);
    }, 0);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, []);

  const replayIntro = () => {
    clearIntroAsSeen();
    runIdRef.current += 1;
    setSequenceId((current) => current + 1);
    setPhase("typing");
    setTypingComplete(false);
    setTarget(null);
    setIsActive(true);
  };

  const shouldShowIntro = isActive;
  const handleTypingComplete = useCallback(() => {
    setTypingComplete(true);
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

  const measureTarget = useCallback(() => {
    const element = document.getElementById("pupil-target");
    if (!element) {
      if (debugIntroEnabled) {
        console.log("[IntroTransition] Marker found: false");
      }

      return;
    }

    const rect = element.getBoundingClientRect();
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (rect.width <= 0 || rect.height <= 0) {
      if (debugIntroEnabled) {
        console.log("[IntroTransition] Marker found: true");
        console.log("[IntroTransition] BoundingClientRect", rect);
        console.log("[IntroTransition] Ignored zero-sized marker");
      }

      return;
    }

    const nextTarget = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      viewportWidth: width,
      viewportHeight: height,
    };

    if (debugIntroEnabled) {
      console.log("[IntroTransition] Marker found: true");
      console.log("[IntroTransition] BoundingClientRect", rect);
      console.log("[IntroTransition] Calculated target coordinates", {
        x: nextTarget.x,
        y: nextTarget.y,
      });
    }

    setTarget(nextTarget);
  }, [debugIntroEnabled]);

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
    window.visualViewport?.addEventListener("resize", scheduleMeasure);
    window.visualViewport?.addEventListener("scroll", scheduleMeasure);

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
      window.visualViewport?.removeEventListener("resize", scheduleMeasure);
      window.visualViewport?.removeEventListener("scroll", scheduleMeasure);
    };
  }, [measureTarget, shouldShowIntro, sequenceId]);

  useEffect(() => {
    if (!shouldShowIntro || !target) {
      return;
    }

    const currentRunId = runIdRef.current + 1;
    runIdRef.current = currentRunId;

    return () => {
      window.clearTimeout(phaseTimerRef.current);
    };
  }, [debugIntroEnabled, reduceMotion, shouldShowIntro, target, sequenceId]);

  useEffect(() => {
    if (!shouldShowIntro || !target || !typingComplete) {
      return;
    }

    window.clearTimeout(phaseTimerRef.current);
    const currentRunId = runIdRef.current;

    phaseTimerRef.current = window.setTimeout(() => {
      if (runIdRef.current !== currentRunId) {
        return;
      }

      if (debugIntroEnabled) {
        console.log("[IntroTransition] Animation target", target);
      }

      setPhase("reveal");
    }, 400);

    return () => {
      window.clearTimeout(phaseTimerRef.current);
    };
  }, [debugIntroEnabled, shouldShowIntro, target, typingComplete]);

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
  const isRevealing = phase === "reveal" && target !== null && centerPoint !== null;

  return (
    <div className="relative min-h-dvh">
      {children}

      {debugIntroEnabled ? (
        <button
          type="button"
          onClick={replayIntro}
          className="fixed bottom-4 left-4 z-[998] rounded-full border border-white/10 bg-white/80 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.28em] text-black/65 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-black/80"
        >
          Replay Intro
        </button>
      ) : null}

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
              duration: reduceMotion ? 0.18 : 1.26,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => {
              if (phase !== "reveal") {
                return;
              }

              markIntroAsSeen();
              setIsActive(false);
            }}
          >
            {debugIntroEnabled && target && centerPoint ? (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1000]"
                viewBox={`0 0 ${Math.max(1, target.viewportWidth)} ${Math.max(
                  1,
                  target.viewportHeight
                )}`}
                preserveAspectRatio="none"
              >
                <line
                  x1={centerPoint.x}
                  y1={centerPoint.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="rgba(239, 68, 68, 0.7)"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
              </svg>
            ) : null}

            {debugIntroEnabled && target ? (
              <div className="pointer-events-none absolute bottom-4 left-4 z-[1001] rounded-full border border-black/10 bg-white/85 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.16em] text-black/65 shadow-sm backdrop-blur-md">
                {`x ${target.x.toFixed(1)} · y ${target.y.toFixed(1)}`}
              </div>
            ) : null}

            {isRevealing && centerPoint ? (
              <motion.div
                className="fixed left-0 top-0 z-[1000] pointer-events-none will-change-transform"
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
                  duration: reduceMotion ? 0.18 : 1.12,
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
                  <IntroTypewriter
                    active={shouldShowIntro}
                    reducedMotion={reduceMotion}
                    restartKey={sequenceId}
                    onComplete={handleTypingComplete}
                  />
                </IntroStaticMark>
              </div>
            )}

            {debugIntroEnabled && target && centerPoint ? (
              <div className="pointer-events-none absolute left-0 top-0 z-[1002]">
                <div
                  className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_0_12px_rgba(239,68,68,0.16)]"
                  style={{ left: target.x, top: target.y }}
                />
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
