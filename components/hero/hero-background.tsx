"use client";

import { motion } from "motion/react";

import { HeroVideoBackground } from "@/components/hero/HeroVideoBackground";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  viewportWidth: number;
  scrollProgress: number;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HeroBackground({
  viewportWidth,
  scrollProgress,
  className,
}: HeroBackgroundProps) {
  const shouldAnimateBackground = viewportWidth > 860;
  const sectionFadeProgress = clamp((scrollProgress - 0.08) / 0.34, 0, 1);
  const heroImageOpacity = 1 - sectionFadeProgress * 0.58;
  const heroDimmingOpacity = sectionFadeProgress * 0.72;
  const heroImageScale = shouldAnimateBackground ? 1 + scrollProgress * 0.03 : 1;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {shouldAnimateBackground ? (
        <motion.div
          className="absolute inset-0 will-change-transform"
          animate={{
            scale: [1, 1.02],
            y: [0, -8],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <HeroVideoBackground
            className="absolute inset-0"
            style={{
              opacity: heroImageOpacity,
              transform: `scale(${heroImageScale})`,
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.03),transparent_24%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/25" />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: heroDimmingOpacity }}
            aria-hidden="true"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0">
          <HeroVideoBackground
            className="absolute inset-0"
            style={{
              opacity: heroImageOpacity,
              transform: "none",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.03),transparent_24%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/25" />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: heroDimmingOpacity }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
