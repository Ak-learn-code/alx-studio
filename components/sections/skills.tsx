"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const skills = [
  {
    title: "Marketingkommunikation",
    note: "Strategie, Sprache und Umsetzung zusammenbringen.",
    span: "md:col-span-6 xl:col-span-5 xl:row-span-2",
  },
  {
    title: "Webprojekte",
    note: "Moderne Websites mit klarer Story und sauberer Struktur.",
    span: "md:col-span-3 xl:col-span-3",
  },
  {
    title: "KI-Tools",
    note: "Sinnvoll einsetzen, statt nur als Buzzword zu nutzen.",
    span: "md:col-span-3 xl:col-span-4",
  },
  {
    title: "E-Commerce",
    note: "Digitale Verkaufsprozesse verstehen und verbessern.",
    span: "md:col-span-4 xl:col-span-4",
  },
  {
    title: "Prompting",
    note: "Präzise Fragen für bessere Ergebnisse und schnellere Iteration.",
    span: "md:col-span-4 xl:col-span-4",
  },
  {
    title: "Automatisierung",
    note: "Abläufe vereinfachen und wiederkehrende Arbeit reduzieren.",
    span: "md:col-span-4 xl:col-span-4 xl:row-span-2",
  },
  {
    title: "Content-Ideen",
    note: "Aus Gedanken werden Formate, Texte und digitale Erlebnisse.",
    span: "md:col-span-6 xl:col-span-4",
  },
  {
    title: "Designgefühl",
    note: "Ruhig, editorial, urban und mit Blick für Details.",
    span: "md:col-span-6 xl:col-span-8",
    manifesto: true,
  },
];

export function Skills() {
  const reduceMotion = useReducedMotion();

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
      id="skills"
      className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.26em] text-sky-300 uppercase">
            Skills
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            Dunkles Bento Grid mit ruhigen, unterschiedlich großen Karten.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Keine Standard-Kacheln, keine KI-Optik, keine Neon-Überladung. Die
            Karten bleiben klar, editorial und leicht asymmetrisch.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-12">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.title}
              {...reveal}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.05 * index,
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className={[
                "group relative overflow-hidden rounded-[1.9rem] border border-white/8 bg-white/[0.03] p-5 sm:p-6",
                skill.span,
                skill.manifesto
                  ? "min-h-[15rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]"
                  : "min-h-[11rem]",
              ].join(" ")}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_30%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="space-y-3">
                  <p className="text-[0.7rem] tracking-[0.24em] text-white/45 uppercase">
                    0{index + 1}
                  </p>
                  <h3
                    className={
                      skill.manifesto
                        ? "max-w-md text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl"
                        : "max-w-[12ch] text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl"
                    }
                  >
                    {skill.title}
                  </h3>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                    {skill.note}
                  </p>
                  <ArrowUpRight className="size-4 shrink-0 text-sky-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
