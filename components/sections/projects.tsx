"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const projects = [
  {
    id: "01",
    title: "Projekt 01",
    category: "E-Commerce Brand",
    status: "Platzhalter",
    tags: ["Shop", "Content", "Launch"],
  },
  {
    id: "02",
    title: "Projekt 02",
    category: "Web & Branding",
    status: "Platzhalter",
    tags: ["Website", "UX", "Editorial"],
  },
  {
    id: "03",
    title: "Projekt 03",
    category: "KI / Automatisierung",
    status: "Platzhalter",
    tags: ["Workflow", "Prompting", "Prozess"],
  },
  {
    id: "04",
    title: "Coming Soon",
    category: "Journal / Case Study Ready",
    status: "Später",
    tags: ["MDX", "Archive", "Stories"],
  },
];

export function Projects() {
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
      id="projekte"
      className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.26em] text-sky-300 uppercase">
            Projects
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            Platzhalter-Projekte als klare, große Liste statt Standard-Karten.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Die V1 zeigt noch keine Case Studies, aber die Struktur ist schon auf
            Archiv, MDX und spätere Projektseiten vorbereitet.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.08,
            }}
            className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03]"
          >
            {projects.map((project) => (
              <Link
                key={project.id}
                href="#kontakt"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/8 px-5 py-5 transition-colors hover:bg-white/[0.045] sm:px-6"
              >
                <span className="text-sm text-white/45">{project.id}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                      {project.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/8 bg-black/25 px-3 py-1 text-[0.72rem] tracking-[0.18em] text-white/55 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="hidden sm:inline">{project.status}</span>
                  <ArrowUpRight className="size-4 text-sky-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.aside
            {...reveal}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.14,
            }}
            className="flex flex-col justify-between gap-6 rounded-[2rem] border border-white/8 bg-black/30 p-5 sm:p-6"
          >
            <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
              <p className="text-[0.7rem] tracking-[0.24em] text-sky-300 uppercase">
                Archive Ready
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground">
                Projekte werden später als Case Studies und Journal-Einträge ausgebaut.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                V1 bleibt bewusst als Platzhalter-Phase bestehen, damit das System
                sauber für Inhalte vorbereitet ist.
              </p>
            </div>

            <Link
              href="#kontakt"
              className="inline-flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/10"
            >
              Später Projekte anfragen
              <ArrowUpRight className="size-4 text-sky-300" aria-hidden="true" />
            </Link>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
