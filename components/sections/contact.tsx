"use client";

import Link from "next/link";
import { ArrowUpRight, BadgeInfo, Link2, Mail, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const whatsappHref = "https://wa.me/4915734741903";
const emailHref = "mailto:alex.codales@gmail.com";
const instagramHref = "https://www.instagram.com/allex.68/";

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  const contactItems = useMemo(
    () => [
      {
        label: "E-Mail",
        href: emailHref,
        icon: Mail,
        detail: "alex.codales@gmail.com",
      },
      {
        label: "WhatsApp",
        href: whatsappHref,
        icon: MessageCircle,
        detail: "+4915734741903",
      },
      {
        label: "Instagram",
        href: instagramHref,
        icon: Link2,
        detail: "@allex.68",
      },
      {
        label: "LinkedIn",
        href: "#kontakt",
        icon: BadgeInfo,
        detail: "optional",
        optional: true,
      },
    ],
    []
  );

  return (
    <section
      id="kontakt"
      className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.26em] text-sky-300 uppercase">
            Contact
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            Lust auf ein Projekt?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Kontakt über WhatsApp oder E-Mail ist direkt möglich. Das Formular
            bleibt in V1 bewusst schlicht und lokal.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.08,
            }}
            className="flex flex-col justify-between gap-6 rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 sm:p-6 lg:p-8"
          >
            <div className="space-y-4">
              <p className="text-[0.7rem] tracking-[0.24em] text-sky-300 uppercase">
                Direct Contact
              </p>
              <p className="max-w-md text-lg leading-8 text-foreground sm:text-xl">
                Lieber direkt, ehrlich und ohne Umwege. Die Kontaktwege sollen
                klar und schnell zugänglich sein.
              </p>
            </div>

            <div className="grid gap-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                if ("optional" in item && item.optional) {
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-[1.35rem] border border-white/8 bg-black/25 px-4 py-3"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-300">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="space-y-0.5">
                          <span className="block text-[0.7rem] tracking-[0.24em] text-white/50 uppercase">
                            {item.label}
                          </span>
                          <span className="block text-sm text-foreground">
                            {item.detail}
                          </span>
                        </span>
                      </span>
                      <span className="text-xs tracking-[0.2em] text-white/35 uppercase">
                        optional
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between rounded-[1.35rem] border border-white/8 bg-black/25 px-4 py-3 transition-colors hover:bg-white/[0.05]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-300">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="space-y-0.5">
                        <span className="block text-[0.7rem] tracking-[0.24em] text-white/50 uppercase">
                          {item.label}
                        </span>
                        <span className="block text-sm text-foreground">
                          {item.detail}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 text-sky-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.14,
            }}
            className="rounded-[2rem] border border-white/8 bg-black/25 p-5 sm:p-6 lg:p-8"
          >
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs tracking-[0.22em] text-white/50 uppercase">
                    Name
                  </span>
                  <Input name="name" placeholder="Dein Name" className="h-12 rounded-2xl border-white/10 bg-white/[0.03] px-4 text-base" />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs tracking-[0.22em] text-white/50 uppercase">
                    E-Mail
                  </span>
                  <Input name="email" type="email" placeholder="dein@mail.de" className="h-12 rounded-2xl border-white/10 bg-white/[0.03] px-4 text-base" />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] text-white/50 uppercase">
                  Nachricht
                </span>
                <Textarea
                  name="message"
                  placeholder="Worum geht es?"
                  className="min-h-40 rounded-[1.5rem] border-white/10 bg-white/[0.03] px-4 py-4 text-base"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Button type="submit" className="rounded-full px-6">
                  {submitted ? "Bereit zum Senden" : "Nachricht vorbereiten"}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  {submitted
                    ? "Das Formular ist in V1 lokal und bewusst schlicht."
                    : "Keine extra Hektik. Nur klarer Kontakt und direkte Wege."}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
