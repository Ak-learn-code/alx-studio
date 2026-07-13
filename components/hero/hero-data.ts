import { assetPath } from "@/lib/base-path";

type Locale = "de" | "en" | "gr";

type HeadlineFragment = {
  text: string;
  accent?: boolean;
};

type HeadlineLine = HeadlineFragment[];

type HeroCopy = Record<
  Locale,
  {
    available: string;
    since: string;
    talk: string;
    headline: string;
    description: string;
    inUseBy: string;
    projectCta: string;
  }
>;

export const whatsappHref = "https://wa.me/4915734741903";

export const referenceLogos = [
  {
    src: assetPath("/pfrimmpark-arena-tight.png"),
    alt: "Pfrimmpark Arena",
    className: "object-contain",
  },
  {
    src: assetPath("/krug-das-restaurant-tight.png"),
    alt: "Krug Das Restaurant",
    className: "object-contain",
  },
  {
    src: assetPath("/Bukkador-Fotografie-tight.png"),
    alt: "Bukkador Fotografie",
    className: "object-contain",
  },
  {
    src: assetPath("/original-logo-white-tight.png"),
    alt: "Original Logo",
    className: "object-contain",
  },
];

export const copy: HeroCopy = {
  de: {
    available: "Verfügbar für Projekte",
    since: "Seit Anfang Feb 2025",
    talk: "KONTAKT",
    headline: "Mehr als nur Visuals. Gebaut mit Vision.",
    description:
      "Wir bauen Marken, Websites und digitale Erlebnisse mit Intention, Klarheit und Sorgfalt.",
    inUseBy: "Im Einsatz bei",
    projectCta: "PROJEKT STARTEN",
  },
  en: {
    available: "Available for projects",
    since: "Since early Feb 2025",
    talk: "LET'S TALK",
    headline: "Beyond visuals. Built with vision.",
    description:
      "We build brands, websites, and digital experiences with intention, clarity and care.",
    inUseBy: "In use at",
    projectCta: "START A PROJECT",
  },
  gr: {
    available: "Διαθέσιμο για έργα",
    since: "Από τις αρχές Φεβ 2025",
    talk: "ΕΠΙΚΟΙΝΩΝΙΑ",
    headline: "Περισσότερα από visuals. Χτισμένα με όραμα.",
    description:
      "Χτίζουμε brands, websites και ψηφιακές εμπειρίες με πρόθεση, καθαρότητα και φροντίδα.",
    inUseBy: "Σε χρήση σε",
    projectCta: "ΞΕΚΙΝΗΣΤΕ ΕΝΑ PROJECT",
  },
};

export const headlineCopy: Record<Locale, HeadlineLine[]> = {
  de: [
    [
      { text: "Mehr als " },
      { text: "nur", accent: true },
      { text: " Visuals." },
    ],
    [
      { text: "Gebaut mit " },
      { text: "Vision.", accent: true },
    ],
  ],
  en: [
    [
      { text: "Beyond", accent: true },
      { text: " visuals." },
    ],
    [
      { text: "Built with " },
      { text: "vision.", accent: true },
    ],
  ],
  gr: [
    [
      { text: "Περισσότερα", accent: true },
      { text: " από visuals." },
    ],
    [
      { text: "Χτισμένα ", accent: true },
      { text: "με " },
      { text: "όραμα.", accent: true },
    ],
  ],
};

export type { Locale, HeadlineFragment, HeadlineLine, HeroCopy };
