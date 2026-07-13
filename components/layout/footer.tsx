import { ArrowUpRight, Link2, Mail, MessageCircle, BadgeInfo } from "lucide-react";

const whatsappHref = "https://wa.me/4915734741903";
const emailHref = "mailto:alex.codales@gmail.com";
const instagramHref = "https://www.instagram.com/allex.68/";

const footerLinks = [
  { label: "Instagram", href: instagramHref, icon: Link2 },
  { label: "E-Mail", href: emailHref, icon: Mail },
  { label: "WhatsApp", href: whatsappHref, icon: MessageCircle },
];

export function Footer() {
  return (
    <footer id="footer" className="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="text-sm font-medium tracking-[0.22em] text-sky-300 uppercase">
              ALX Studio
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
              Founded by Alexandros Kodalis
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              ak-learn-code.github.io/alx-studio/
            </p>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
          >
            WhatsApp öffnen
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-white/15 hover:bg-white/6 hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                <Icon className="size-4 text-white/80" aria-hidden="true" />
                <span>{label}</span>
              </span>
              <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </a>
          ))}
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-muted-foreground">
            <BadgeInfo className="size-4 text-white/40" aria-hidden="true" />
            <span>LinkedIn optional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
