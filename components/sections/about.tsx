"use client";

import { MapPin, Sparkles, Target } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const aboutFacts = [
  {
    icon: MapPin,
    title: "Standort",
    value: "Rhein-Neckar-Region / Nähe Mannheim",
  },
  {
    icon: Target,
    title: "Fokus",
    value: "Marketing, Web, KI, E-Commerce und Prozessoptimierung",
  },
  {
    icon: Sparkles,
    title: "Mindset",
    value: "Locker, urban, modern, hands-on und lernbereit",
  },
];

export function About() {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="about"
      className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18"
    >
      <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <motion.div
          {...reveal}
          className="rounded-[2.25rem] border border-white/8 bg-white/[0.03] p-6 sm:p-8 lg:p-10"
        >
          <p className="text-sm font-medium tracking-[0.26em] text-sky-300 uppercase">
            About
          </p>
          <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            Ich bin Alexandros Kodalis.
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>Frisch ausgebildeter Kaufmann für Marketingkommunikation mit E-Commerce-Erfahrung.</p>
            <p>
              Ich arbeite an der Schnittstelle von Strategie, Gestaltung und Technologie.
              Nicht übertrieben, sondern klar, ehrlich und auf Augenhöhe.
            </p>
            <p>
              Das Ergebnis soll sich locker, urban und modern anfühlen, ohne in
              Floskeln oder Agentur-Sprech abzurutschen.
            </p>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.08,
          }}
          className="grid gap-4"
        >
          {aboutFacts.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[1.75rem] border border-white/8 bg-black/30 p-5 sm:p-6 transition-colors duration-300 hover:bg-white/[0.045]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-300 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.24em] text-white/50 uppercase">
                      {item.title}
                    </p>
                    <p className="mt-3 text-lg leading-8 text-foreground sm:text-xl">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
