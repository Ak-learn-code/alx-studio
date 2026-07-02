import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alx-studio.de"),
  title: {
    default: "ALX Studio – Alexandros Kodalis",
    template: "%s | ALX Studio",
  },
  description:
    "ALX Studio ist die persönliche Creative-Studio-Marke von Alexandros Kodalis für Marketing, Web, KI und digitale Ideen.",
  applicationName: "ALX Studio",
  keywords: [
    "Alexandros Kodalis",
    "ALX Studio",
    "Marketingkommunikation",
    "E-Commerce",
    "KI",
    "Webdesign",
    "Mannheim",
    "Rhein-Neckar",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      dir="ltr"
      suppressHydrationWarning
      className={`${robotoSans.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
