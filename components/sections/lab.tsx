"use client";

import { ArrowRight, FlaskConical, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const labOptions = [
  {
    id: "website",
    label: "Website",
    result: "Fokus auf klare Story, starke Typografie und ruhige Motion.",
  },
  {
    id: "marketing",
    label: "Marketing",
    result: "Fokus auf Positionierung, Content-Ideen und saubere Kommunikation.",
  },
  {
    id: "automation",
    label: "KI / Automatisierung",
    result: "Fokus auf Prozesse, Prompting und praktische Workflows.",
  },
] as const;

export function Lab() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<(typeof labOptions)[number]["id"]>("website");

  const current = useMemo(
    () => labOptions.find((item) => item.id === active) ?? labOptions[0],
    [active]
  );

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="lab"
      className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.26em] text-sky-300 uppercase">
            Lab
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            Interaktive Spielwiese für einen schnellen Projektfinder.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Spielerisch, aber nicht unseriös. Genau der Ort, an dem die Website
            etwas digitaler und lebendiger wird.
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.08,
          }}
          className="mt-8 grid gap-4 rounded-[2.2rem] border border-white/8 bg-white/[0.03] p-5 sm:p-6 lg:grid-cols-[0.75fr_1.25fr] lg:p-8"
        >
          <div className="flex flex-col justify-between gap-6 rounded-[1.7rem] border border-white/8 bg-black/35 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-300">
                <FlaskConical className="size-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[0.7rem] tracking-[0.24em] text-sky-300 uppercase">
                  Projektfinder
                </p>
                <p className="text-sm text-muted-foreground">2-3 Klicks, eine klare Empfehlung.</p>
              </div>
            </div>

            <div className="space-y-3">
              {labOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActive(option.id)}
                  className={[
                    "flex w-full items-center justify-between rounded-full border px-4 py-3 text-left text-sm transition-colors",
                    active === option.id
                      ? "border-sky-300/40 bg-sky-300/10 text-foreground"
                      : "border-white/8 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
                  ].join(" ")}
                >
                  <span>{option.label}</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,rgba(125,211,252,0.08),rgba(255,255,255,0.02))] p-5 sm:p-6 lg:p-8">
            <div className="max-w-2xl">
              <p className="text-[0.7rem] tracking-[0.24em] text-sky-300 uppercase">
                Empfehlung
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                {current.label}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                {current.result}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-black/25 p-4">
              <p className="text-sm text-muted-foreground">
                Nächster Schritt: die passende Idee direkt per WhatsApp oder E-Mail besprechen.
              </p>
              <div className="flex items-center gap-2 text-sm text-sky-300">
                <WandSparkles className="size-4" aria-hidden="true" />
                Direct.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
