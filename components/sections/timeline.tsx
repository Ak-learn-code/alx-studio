"use client";

import { motion, useReducedMotion } from "motion/react";

const timeline = [
  {
    when: "September 2024",
    title: "Start Ausbildung",
    text: "Start als Kaufmann für Marketingkommunikation.",
  },
  {
    when: "2024–2026",
    title: "E-Commerce-Erfahrung",
    text: "Praxis im Ausbildungsbetrieb, digitale Prozesse und Shop-Alltag.",
  },
  {
    when: "Juni 2026",
    title: "Abschluss",
    text: "Ausbildung erfolgreich abgeschlossen.",
  },
  {
    when: "Next",
    title: "Weiterbauen",
    text: "Social Media, Automatisierung, KI-Prozesse und Webprojekte.",
  },
];

export function Timeline() {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="timeline"
      className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.26em] text-sky-300 uppercase">
            Timeline
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            Entwicklung sichtbar machen, nicht nur Lebenslauf zeigen.
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.08,
            }}
            className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 sm:p-6 lg:p-8"
          >
            <p className="text-[0.7rem] tracking-[0.24em] text-sky-300 uppercase">
              Storyline
            </p>
            <p className="mt-4 text-lg leading-8 text-foreground sm:text-xl">
              Build. Learn. Improve. Die Timeline erzählt Entwicklung, Erfahrung
              und die nächsten Schritte.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Die Section bleibt bewusst ruhig, aber mit klarer Linie und etwas
              mehr Spannung als eine klassische Vita.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.12,
            }}
            className="rounded-[2rem] border border-white/8 bg-black/25 p-5 sm:p-6 lg:p-8"
          >
            <div className="relative pl-8">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" />
              {timeline.map((entry) => (
                <div key={entry.when} className="relative pb-8 last:pb-0">
                  <div className="absolute left-[-1.65rem] top-1 size-4 rounded-full border border-sky-300/60 bg-background shadow-[0_0_0_4px_rgba(7,7,7,0.8)]" />
                  <div className="grid gap-2 md:grid-cols-[0.28fr_0.72fr] md:gap-6">
                    <div className="text-sm tracking-[0.2em] text-sky-300 uppercase">
                      {entry.when}
                    </div>
                    <div className="space-y-2 border-b border-white/8 pb-8 last:border-b-0 last:pb-0">
                      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                        {entry.title}
                      </h3>
                      <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                        {entry.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
