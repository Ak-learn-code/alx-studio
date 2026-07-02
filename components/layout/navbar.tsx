"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const whatsappHref = "https://wa.me/4915734741903";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-colors duration-300 sm:px-5",
          scrolled
            ? "border-border/80 bg-background/92 shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
            : "border-transparent bg-background/30"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-[0.28em] text-foreground uppercase"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/6 text-[0.7rem] tracking-[0.24em] text-white">
            ALX
          </span>
          <span className="hidden sm:inline">ALX Studio</span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" aria-hidden="true" />
              Kontakt
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
