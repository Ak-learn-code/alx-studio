"use client";

import type { CSSProperties } from "react";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type VideoSlot = 0 | 1;

type HeroVideoBackgroundProps = {
  className?: string;
  style?: CSSProperties;
};

const VIDEO_SRC = "/videos/hero-loop.mp4";
const CROSSFADE_MS = 600;
const SWITCH_EARLY_MS = 700;

export function HeroVideoBackground({
  className,
  style,
}: HeroVideoBackgroundProps) {
  const [activeSlot, setActiveSlot] = useState<VideoSlot>(0);
  const [transitioning, setTransitioning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([
    null,
    null,
  ]);
  const transitionTimerRef = useRef<number | null>(null);
  const cleanupTimerRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);

  useEffect(() => {
    transitioningRef.current = transitioning;
  }, [transitioning]);

  useEffect(() => {
    const videos = videoRefs.current;

    if (process.env.NODE_ENV !== "production") {
      console.log("[ALX] HeroVideo mounted");
    }

    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (cleanupTimerRef.current !== null) {
        window.clearTimeout(cleanupTimerRef.current);
      }

      videos.forEach((video) => {
        if (!video) {
          return;
        }

        video.pause();

        try {
          video.currentTime = 0;
        } catch {
          // Ignore browsers that block seeks during teardown.
        }
      });
    };
  }, []);

  useEffect(() => {
    if (hasError) {
      return;
    }

    const currentVideo = videoRefs.current[activeSlot];
    if (!currentVideo) {
      return;
    }

    const resetAndPause = (slot: VideoSlot) => {
      const video = videoRefs.current[slot];
      if (!video) {
        return;
      }

      video.pause();

      try {
        video.currentTime = 0;
      } catch {
        // Some browsers can be strict during rapid handoff; pausing is enough.
      }
    };

    const startTransition = () => {
      if (transitioningRef.current || hasError) {
        return;
      }

      const nextSlot = (activeSlot === 0 ? 1 : 0) as VideoSlot;
      const nextVideo = videoRefs.current[nextSlot];

      if (!nextVideo) {
        return;
      }

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      transitioningRef.current = true;
      setTransitioning(true);

      try {
        nextVideo.currentTime = 0;
      } catch {
        // Ignore seek race conditions while the next layer prepares.
      }

      void nextVideo.play().catch(() => {
        // Let the image fallback remain visible if autoplay fails.
      });

      cleanupTimerRef.current = window.setTimeout(() => {
        resetAndPause(activeSlot);
        transitioningRef.current = false;
        setActiveSlot(nextSlot);
        setTransitioning(false);
      }, CROSSFADE_MS);
    };

    const scheduleTransition = () => {
      if (transitioningRef.current || hasError) {
        return;
      }

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (!Number.isFinite(currentVideo.duration) || currentVideo.duration <= 0) {
        return;
      }

      const remainingMs = Math.max(
        (currentVideo.duration - currentVideo.currentTime) * 1000 - SWITCH_EARLY_MS,
        0
      );

      transitionTimerRef.current = window.setTimeout(startTransition, remainingMs);
    };

    const tryPlayCurrent = () => {
      if (currentVideo.paused) {
        void currentVideo.play().catch(() => {
          if (process.env.NODE_ENV !== "production") {
            console.log("[ALX] HeroVideo play rejected");
          }
        });
      }

      scheduleTransition();
    };

    const handleLoadedMetadata = () => {
      tryPlayCurrent();
    };

    const handlePlaying = () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("[ALX] HeroVideo playing");
      }
      tryPlayCurrent();
    };

    const handleEnded = () => {
      startTransition();
    };

    const handleError = () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("[ALX] HeroVideo error", currentVideo.error);
      }
      setHasError(true);
    };

    currentVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
    currentVideo.addEventListener("playing", handlePlaying);
    currentVideo.addEventListener("ended", handleEnded);
    currentVideo.addEventListener("error", handleError);

    tryPlayCurrent();

    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      if (cleanupTimerRef.current !== null) {
        window.clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }

      currentVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
      currentVideo.removeEventListener("playing", handlePlaying);
      currentVideo.removeEventListener("ended", handleEnded);
      currentVideo.removeEventListener("error", handleError);
    };
  }, [activeSlot, hasError]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={style}
      aria-hidden="true"
    >
      <Image
        src="/hero-sektion.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center max-[860px]:object-[80%_center] max-[960px]:landscape:object-[56%_32%] max-[640px]:object-[48%_36%]"
      />

      <video
        ref={(node) => {
          videoRefs.current[0] = node;
        }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center max-[860px]:object-[80%_center] max-[960px]:landscape:object-[56%_32%] max-[640px]:object-[48%_36%]",
          activeSlot === 0
            ? transitioning
              ? "opacity-0"
              : "opacity-100"
            : transitioning
              ? "opacity-100"
              : "opacity-0"
        )}
        style={{ transition: `opacity ${CROSSFADE_MS}ms ease-in-out` }}
        src={VIDEO_SRC}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
      />

      <video
        ref={(node) => {
          videoRefs.current[1] = node;
        }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center max-[860px]:object-[80%_center] max-[960px]:landscape:object-[56%_32%] max-[640px]:object-[48%_36%]",
          activeSlot === 1
            ? transitioning
              ? "opacity-0"
              : "opacity-100"
            : transitioning
              ? "opacity-100"
              : "opacity-0"
        )}
        style={{ transition: `opacity ${CROSSFADE_MS}ms ease-in-out` }}
        src={VIDEO_SRC}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
      />
    </div>
  );
}
