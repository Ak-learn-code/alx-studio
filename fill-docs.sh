#!/bin/bash

cat > docs/02-design/02-experience-principles.md <<'MD'
# Experience Principles

Version: 1.0  
Status: Active

## Purpose

Diese Datei definiert, wie sich ALX Studio für Besucher anfühlen soll.

## Core Experience

ALX Studio soll sich wie ein hochwertiges digitales Studio anfühlen: ruhig, modern, urban, klar und hochwertig.

## Principles

### 1. Clarity First

Jede Section muss sofort verständlich sein.

### 2. Motion With Purpose

Animationen dürfen nie Selbstzweck sein. Jede Bewegung muss Orientierung, Fokus oder Feedback erzeugen.

### 3. Taste Over Noise

Die Website wirkt durch Geschmack, nicht durch Lautstärke.

### 4. Scroll As Story

Jede Scrollbewegung soll den Besucher einen Schritt weiter in die Geschichte führen.

### 5. Fast Contact

WhatsApp, E-Mail und Social Links müssen leicht erreichbar sein.

## Avoid

- chaotische Animationen
- überladene Sections
- zu viele Farben
- generische KI-Optik
- Stockfoto-Feeling
MD

cat > docs/02-design/03-design-language.md <<'MD'
# Design Language

Version: 1.0  
Status: Active

## Direction

Dark Streetwear Editorial.

## Keywords

- schwarz
- silber
- clean
- urban
- modern
- präzise
- reduziert
- hochwertig
- großflächig
- rhythmisch

## Visual Rules

- Dark Mode only
- große Typografie
- viel Abstand
- klare Raster
- wenige Akzentfarben
- keine übertriebenen Neon-Effekte
- keine generische AI-Ästhetik

## Feeling

Die Seite soll wirken wie ein Mix aus Creative Studio, digitalem Magazin und moderner Streetwear-Marke.
MD

cat > docs/02-design/04-design-system.md <<'MD'
# Design System

Version: 1.0  
Status: Active

## Stack

- Next.js
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion
- Lucide Icons
- Geist Font

## Radius

- Small: 8px
- Medium: 16px
- Large: 24px
- Full: 999px

## Layout Width

Max content width: 1440px  
Main container: 90vw  
Desktop padding: 64px  
Mobile padding: 24px

## Components

- Navbar
- Hero
- About
- Skill Bento
- Project Cards
- Timeline
- Lab Section
- Contact
- Footer

## Rule

Alle Komponenten müssen dark-mode-first entwickelt werden.
MD

cat > docs/02-design/05-colors.md <<'MD'
# Colors

Version: 1.0  
Status: Active

## Base Palette

Background: #050505  
Surface: #0D0D0D  
Surface Elevated: #151515  
Border: #262626  
Text Primary: #F5F5F5  
Text Secondary: #A3A3A3  
Text Muted: #737373  

## Accent

Silver: #C7C7C7  
Ice Blue: #7DD3FC  

## Usage

Hellblau wird nur sparsam eingesetzt: CTAs, kleine Highlights, aktive States.

## Avoid

- Neon Pink
- bunte Verläufe
- zufällige Glows
- KI-typische Cyan-Lila-Verläufe
MD

cat > docs/02-design/06-typography.md <<'MD'
# Typography

Version: 1.0  
Status: Active

## Font

Primary: Geist Sans  
Secondary: Geist Mono optional für kleine Labels

## Rules

Maximal zwei Schriften.

## Hero Headline

Desktop: 96px–140px  
Tablet: 72px–96px  
Mobile: 48px–64px  

## Section Headline

Desktop: 48px–72px  
Mobile: 36px–48px  

## Body

Desktop: 18px–20px  
Mobile: 16px–18px  

## Style

Headlines sind kurz, groß und direkt.

Keine verspielten KI-Fonts.
MD

cat > docs/02-design/07-spacing.md <<'MD'
# Spacing

Version: 1.0  
Status: Active

## Section Spacing

Desktop vertical: 120px–180px  
Mobile vertical: 80px–120px  

## Container

Desktop: max-width 1440px  
Padding desktop: 64px  
Padding mobile: 24px  

## Component Spacing

Card padding: 24px–40px  
Grid gap: 16px–32px  
Button gap: 12px  

## Rule

Whitespace ist aktiver Bestandteil des Designs.
MD

cat > docs/02-design/08-layout-system.md <<'MD'
# Layout System

Version: 1.0  
Status: Active

## Layout

OnePager mit klarer Storyline.

## Grid

Desktop: 12 columns  
Tablet: 8 columns  
Mobile: 4 columns  

## Sections

- Hero
- About
- Skills
- Projects
- Lab
- Timeline
- Contact
- Footer

## Rules

Mobile first.  
Keine Section darf überladen wirken.  
Bento Layouts sind erlaubt, wenn sie klar bleiben.
MD

cat > docs/02-design/09-iconography.md <<'MD'
# Iconography

Version: 1.0  
Status: Active

## Library

Lucide React.

## Style

- linear
- ruhig
- modern
- maximal 1.5–2px stroke
- keine bunten Icons

## Usage

Icons unterstützen Orientierung, ersetzen aber keine Texte.
MD

cat > docs/02-design/10-imagery.md <<'MD'
# Imagery

Version: 1.0  
Status: Active

## Direction

Bilder sollen hochwertig, dunkel, urban und editorial wirken.

## Allowed

- Projekt-Screenshots
- Mockups
- Detailbilder
- Logo
- abstrakte Texturen
- eigene Fotos

## Avoid

- Stockfotos
- generische KI-Bilder
- Business-Handshakes
- übertriebene 3D-Illustrationen
MD

cat > docs/02-design/11-accessibility.md <<'MD'
# Accessibility

Version: 1.0  
Status: Active

## Rules

- ausreichender Kontrast
- Buttons mit klaren Labels
- Fokus-Zustände sichtbar
- semantisches HTML
- reduzierte Motion bei prefers-reduced-motion
- Formulare mit Labels
- keine reine Farbkommunikation

## Motion

Animationen müssen deaktivierbar oder reduzierbar sein.
MD

cat > docs/03-motion/01-motion-system.md <<'MD'
# Motion System

Version: 1.0  
Status: Active

## Philosophy

Motion erzeugt Fokus, Orientierung und Qualität.

## Durations

Micro: 150ms–250ms  
Default: 300ms–500ms  
Large: 600ms–800ms  

## Easing

Smooth ease-out. Keine hektischen Bewegungen.

## Allowed

- Scroll reveal
- Hover lift
- subtle parallax
- staggered text
- smooth section transitions

## Avoid

- endlose Loops
- wilde 3D-Effekte
- blinkende Elemente
MD

cat > docs/03-motion/02-scroll-animations.md <<'MD'
# Scroll Animations

Version: 1.0  
Status: Active

## Rules

Sections erscheinen beim Scrollen subtil.

## Pattern

Initial: opacity 0, y 32  
Animate: opacity 1, y 0  
Duration: 500ms  
Stagger: 80ms  

## Usage

Hero, About, Cards, Timeline, Contact.

## Avoid

Keine Scrollanimation darf den Content schwer lesbar machen.
MD

cat > docs/03-motion/03-hover-interactions.md <<'MD'
# Hover Interactions

Version: 1.0  
Status: Active

## Buttons

Hover: leichte Bewegung, dezenter Glow, klare Farbe.

## Cards

Hover: translateY(-4px), Border heller, Surface leicht heller.

## Links

Hover: Farbe oder Underline Motion.

## Avoid

Keine sprunghaften Effekte.
MD

cat > docs/03-motion/04-page-transitions.md <<'MD'
# Page Transitions

Version: 1.0  
Status: Active

## V1

OnePager braucht keine komplexen Page Transitions.

## Future

Für Journal und Case Studies später sanfte Fade/Slide Transitions nutzen.

## Rule

Transitions dürfen Navigation nicht verlangsamen.
MD

cat > docs/03-motion/05-loading.md <<'MD'
# Loading

Version: 1.0  
Status: Active

## Rule

Keine übertriebene Loading Animation.

## Preferred

Schnelle Seite statt langer Loader.

## Optional

Kleines ALX Logo Fade-In beim ersten Laden.
MD

cat > docs/03-motion/06-microinteractions.md <<'MD'
# Microinteractions

Version: 1.0  
Status: Active

## Examples

- Button hover
- Card hover
- Input focus
- Language toggle
- Navbar active state
- WhatsApp CTA feedback

## Rule

Microinteractions müssen präzise, kurz und hochwertig wirken.
MD

cat > docs/04-product/01-information-architecture.md <<'MD'
# Information Architecture

Version: 1.0  
Status: Active

## OnePager Structure

1. Hero
2. About
3. Skills
4. Projects
5. Lab
6. Timeline
7. Contact
8. Footer

## Story

Erst Marke zeigen.  
Dann Person erklären.  
Dann Fähigkeiten beweisen.  
Dann Projekte zeigen.  
Dann Entwicklung zeigen.  
Dann Kontakt vereinfachen.
MD

cat > docs/04-product/02-user-flow.md <<'MD'
# User Flow

Version: 1.0  
Status: Active

## Primary Flow

Landing → Hero → Projects → Contact

## Secondary Flow

Landing → About → Timeline → Contact

## Recruiter Flow

Hero → About → Skills → Timeline → Contact

## Client Flow

Hero → Projects → Lab → Contact
MD

cat > docs/04-product/03-sections.md <<'MD'
# Sections

Version: 1.0  
Status: Active

## Hero

Große Headline, kurzer Claim, CTA zu Projekten und WhatsApp.

## About

Kurzer persönlicher Snapshot.

## Skills

Bento Grid mit Marketing, E-Commerce, KI, Web, Automatisierung, Designgefühl.

## Projects

Platzhalter-Projekte, später per Content pflegbar.

## Lab

Interaktive Spielwiese, z. B. Projektfinder.

## Timeline

Ausbildung und Entwicklung.

## Contact

WhatsApp, E-Mail, Instagram, LinkedIn optional.
MD

cat > docs/04-product/04-navigation.md <<'MD'
# Navigation

Version: 1.0  
Status: Active

## Items

- Studio
- Skills
- Projekte
- Timeline
- Kontakt

## Behavior

Sticky top.  
Transparent bis Scroll.  
Dann dunkler Hintergrund mit Border.

## Mobile

Sheet/Menu mit klaren Links.

## CTA

WhatsApp Button sichtbar.
MD

cat > docs/04-product/05-content-strategy.md <<'MD'
# Content Strategy

Version: 1.0  
Status: Active

## Language

Deutsch zuerst. Englisch und Griechisch vorbereitet.

## Tone

Locker, urban, direkt, ehrlich.

## Main Message

Ideen werden durch Ausprobieren, Lernen und Verbessern digital erlebbar.

## Avoid

Buzzwords und künstliche Experten-Sprache.
MD

cat > docs/04-product/06-seo.md <<'MD'
# SEO

Version: 1.0  
Status: Active

## Title

ALX Studio – Alexandros Kodalis

## Description

ALX Studio ist die persönliche Creative-Studio-Marke von Alexandros Kodalis für Marketing, Web, KI und digitale Ideen.

## Keywords

- Alexandros Kodalis
- ALX Studio
- Marketingkommunikation
- E-Commerce
- KI
- Webdesign
- Mannheim
- Rhein-Neckar

## Future

Journal für SEO-relevante Inhalte.
MD

cat > docs/04-product/07-i18n.md <<'MD'
# Internationalization

Version: 1.0  
Status: Active

## Languages

Default: Deutsch  
Prepared: English, Greek

## Routes

/de  
/en  
/gr

## V1

Deutsch aktiv, Sprachwechsel sichtbar vorbereitet.

## Rule

Keine hart codierten Texte in Komponenten, sobald i18n aktiv wird.
MD

cat > docs/04-product/08-future-roadmap.md <<'MD'
# Future Roadmap

Version: 1.0  
Status: Active

## V1

OnePager.

## V2

Projektseiten und Case Studies.

## V3

Journal.

## V4

KI-Experimente und Automatisierungsbeispiele.

## V5

Templates, Ressourcen und Downloads.
MD

cat > docs/05-components/hero.md <<'MD'
# Hero Component

Version: 1.0  
Status: Active

## Purpose

Erster Eindruck von ALX Studio.

## Content

Headline: Ideen werden beim Machen digital.  
Subline: ALX Studio ist die persönliche Creative-Studio-Marke von Alexandros Kodalis – für Marketing, Web, KI und moderne digitale Erlebnisse.

## CTAs

- Projekte ansehen
- WhatsApp

## Motion

Headline erscheint gestaffelt.  
Subline fade-in.  
CTA leicht verzögert.
MD

cat > docs/05-components/navbar.md <<'MD'
# Navbar Component

Version: 1.0  
Status: Active

## Content

Logo: ALX  
Links: Studio, Skills, Projekte, Timeline, Kontakt  
CTA: WhatsApp

## Behavior

Sticky.  
Beim Scrollen Hintergrund abdunkeln.  
Mobile Sheet.

## Style

Minimal, dunkel, klar.
MD

cat > docs/05-components/buttons.md <<'MD'
# Buttons

Version: 1.0  
Status: Active

## Variants

Primary: heller Text, dunkle Fläche, Border  
Secondary: transparent, Border  
Ghost: nur Text

## Motion

Hover lift 2px.  
Transition 200ms.

## Rule

Buttons müssen klar beschriftet sein.
MD

cat > docs/05-components/cards.md <<'MD'
# Cards

Version: 1.0  
Status: Active

## Usage

Skills, Projekte, Lab, Timeline.

## Style

Dunkle Surface, dezente Border, großer Radius.

## Hover

Leicht anheben, Border heller, Hintergrund heller.

## Avoid

Keine übertriebenen Glows.
MD

cat > docs/05-components/bento-grid.md <<'MD'
# Bento Grid

Version: 1.0  
Status: Active

## Purpose

Skills und Studio-Qualitäten visuell präsentieren.

## Items

- Marketing
- E-Commerce
- KI
- Web
- Automatisierung
- Designgefühl

## Layout

Responsive Grid.  
Mobile: eine Spalte.  
Desktop: asymmetrisches Bento.
MD

cat > docs/05-components/projects.md <<'MD'
# Projects Component

Version: 1.0  
Status: Active

## Purpose

Ausgewählte Arbeiten zeigen.

## V1

Platzhalter-Projekte verwenden.

## Fields

- title
- description
- category
- year
- status
- tags
- image optional

## Future

MDX/Content-System.
MD

cat > docs/05-components/timeline.md <<'MD'
# Timeline Component

Version: 1.0  
Status: Active

## Entries

September 2024: Start Ausbildung Kaufmann für Marketingkommunikation  
2024–2026: E-Commerce-Erfahrung im Ausbildungsbetrieb  
Juni 2026: Ausbildung erfolgreich abgeschlossen  
Next: Social Media, Automatisierung, KI-Prozesse, Webprojekte

## Style

Vertikale Timeline mit Scroll Reveal.
MD

cat > docs/05-components/skills.md <<'MD'
# Skills Component

Version: 1.0  
Status: Active

## Skills

- Marketingkommunikation
- E-Commerce
- KI-Tools
- Prompting
- Webprojekte
- Automatisierung
- Content-Ideen
- Designgefühl

## Style

Bento Grid oder Tag-System.
MD

cat > docs/05-components/contact.md <<'MD'
# Contact Component

Version: 1.0  
Status: Active

## Contact

Email: alex.codales@gmail.com  
WhatsApp: +4915734741903  
Instagram: @allex.68  
LinkedIn: optional

## Requirements

WhatsApp öffnet direkt.  
Kontaktformular unten.  
Social Links sichtbar.
MD

cat > docs/05-components/footer.md <<'MD'
# Footer Component

Version: 1.0  
Status: Active

## Content

ALX Studio  
Founded by Alexandros Kodalis  
ak-learn-code.github.io/alx-studio/

## Links

Instagram  
LinkedIn optional  
Email  
WhatsApp

## Style

Minimal, dunkel, editorial.
MD

cat > docs/05-components/lab.md <<'MD'
# Lab Component

Version: 1.0  
Status: Active

## Purpose

Interaktive Spielwiese.

## V1 Idea

Projektfinder: Nutzer beantwortet 2–3 Fragen und erhält eine grobe Empfehlung.

## Style

Spielerisch, aber nicht unseriös.

## Future

Mini-Kalkulator, Automatisierungs-Demos, KI-Experimente.
MD

cat > docs/06-engineering/01-tech-stack.md <<'MD'
# Tech Stack

Version: 1.0  
Status: Active

## Framework

Next.js App Router

## Language

TypeScript

## Styling

Tailwind CSS v4

## UI

shadcn/ui with Radix  
Lucide Icons  
Geist Font

## Animation

Motion

## Deployment

Vercel

## Content

Markdown/MDX vorbereitet.
MD

cat > docs/06-engineering/02-folder-structure.md <<'MD'
# Folder Structure

Version: 1.0  
Status: Active

## Structure

app/  
components/  
components/ui/  
components/sections/  
components/layout/  
components/motion/  
content/  
docs/  
lib/  
hooks/  
public/brand/  
public/projects/

## Rule

Sections liegen in components/sections.  
Layout in components/layout.  
Reusable UI in components/ui.
MD

cat > docs/06-engineering/03-coding-standards.md <<'MD'
# Coding Standards

Version: 1.0  
Status: Active

## Rules

- TypeScript only
- keine unnötigen Inline Styles
- Tailwind Utility Classes erlaubt
- Komponenten klein halten
- sprechende Namen
- keine Magic Numbers ohne Grund
- Accessibility beachten
- responsive testen

## Naming

Components: PascalCase  
Files: kebab-case  
Functions: camelCase
MD

cat > docs/06-engineering/04-performance.md <<'MD'
# Performance

Version: 1.0  
Status: Active

## Goals

Schnelle Ladezeit.  
Keine unnötigen Libraries.  
Bilder optimieren.  
Animationen performant halten.

## Rules

- next/image nutzen
- keine schweren 3D Libraries in V1
- Motion sparsam einsetzen
- Lighthouse ernst nehmen
MD

cat > docs/06-engineering/05-testing.md <<'MD'
# Testing

Version: 1.0  
Status: Active

## V1

Manuelles Testing.

## Check

- Desktop
- Tablet
- Mobile
- Safari
- Chrome
- Contact Links
- WhatsApp Link
- Form States
- Reduced Motion

## Future

Playwright für E2E.
MD

cat > docs/06-engineering/06-deployment.md <<'MD'
# Deployment

Version: 1.0  
Status: Active

## Platform

Vercel.

## Domain

ak-learn-code.github.io/alx-studio/

## Requirements

- Production Build muss erfolgreich sein
- Metadata gesetzt
- Favicon ALX
- Logo Assets eingebunden
MD

cat > docs/06-engineering/07-content-system.md <<'MD'
# Content System

Version: 1.0  
Status: Active

## Content Types

Projects  
Journal  
Timeline

## V1

Content kann hardcoded sein.

## Future

Markdown/MDX Dateien für Projekte und Journal nutzen.

## Rule

Texte sollen später leicht austauschbar sein.
MD

cat > docs/06-engineering/08-security.md <<'MD'
# Security

Version: 1.0  
Status: Active

## Rules

- Keine Secrets im Repository
- Formulare serverseitig absichern
- keine privaten Daten außer bewusst freigegebene Kontaktinfos
- .env.local nutzen
- Spam-Schutz für Kontaktformular später ergänzen
MD

cat > docs/07-ai/01-agent.md <<'MD'
# AI Agent Instructions

Version: 1.0  
Status: Critical

## Role

Du bist Senior Frontend Engineer, Creative Developer und UI Designer.

## Task

Baue ALX Studio als hochwertige Next.js OnePager Website.

## Rules

- Lies zuerst alle docs Dateien.
- Dokumentation ist Single Source of Truth.
- Dark Mode only.
- Keine generische KI-Optik.
- Keine Fake-Agentur-Sprache.
- Nutze Next.js, TypeScript, Tailwind, Motion und shadcn/ui.
- Deutsch zuerst.
- EN und GR vorbereiten.
- Baue mobile-first.

## Visual Direction

Dark Streetwear Editorial.

## Sections

Hero, About, Skills, Projects, Lab, Timeline, Contact, Footer.
MD

cat > docs/07-ai/02-prompts.md <<'MD'
# AI Prompts

Version: 1.0  
Status: Active

## Initial Build Prompt

Lies alle Dateien im docs Ordner. Erstelle daraus eine moderne Next.js App Router Website für ALX Studio. Halte dich strikt an Design, Motion, Content und Engineering Regeln.

## Review Prompt

Prüfe die Website gegen alle Acceptance Criteria. Liste Abweichungen auf und verbessere sie.

## Component Prompt

Erstelle die Komponente gemäß passender Datei in docs/05-components und halte Design- und Motion-System ein.
MD

cat > docs/07-ai/03-review-system.md <<'MD'
# Review System

Version: 1.0  
Status: Active

## Review Criteria

- passt zur Brand DNA
- sieht hochwertig aus
- ist responsive
- Motion ist ruhig
- kein Template-Look
- Kontakt funktioniert
- Code ist sauber

## Process

Build → Review → Fix → Repeat.
MD

cat > docs/07-ai/04-rules.md <<'MD'
# AI Rules

Version: 1.0  
Status: Active

## Hard Rules

- Keine zufälligen Farben
- Keine generischen KI-Glows
- Keine unnötigen Libraries
- Keine überlangen Komponenten
- Keine Buzzwords
- Kein Light Mode in V1
- Kein Stockfoto-Feeling

## Must Do

- Mobile-first
- Accessibility
- Smooth Motion
- Clean TypeScript
- Consistent Design
MD

cat > docs/07-ai/05-workflows.md <<'MD'
# AI Workflows

Version: 1.0  
Status: Active

## Workflow 1: Build Section

1. passende Docs lesen
2. Komponente bauen
3. responsive prüfen
4. Motion hinzufügen
5. gegen Brand prüfen

## Workflow 2: Review

1. Seite öffnen
2. Design prüfen
3. Code prüfen
4. Accessibility prüfen
5. Fixes umsetzen
MD

cat > docs/08-quality/acceptance-criteria.md <<'MD'
# Acceptance Criteria

Version: 1.0  
Status: Critical

## Website

- OnePager funktioniert
- Dark Mode only
- ALX Studio sichtbar
- Alexandros Kodalis korrekt geschrieben
- Kontaktinformationen korrekt
- WhatsApp CTA funktioniert
- Mobile Version sauber
- Keine generische KI-Optik
- Keine Fake-Agentur-Sprache
- Animationen hochwertig und ruhig

## Build

npm run build muss erfolgreich sein.
MD

cat > docs/08-quality/checklist.md <<'MD'
# Checklist

Version: 1.0  
Status: Active

## Before Launch

- [ ] Hero fertig
- [ ] About fertig
- [ ] Skills fertig
- [ ] Projects fertig
- [ ] Timeline fertig
- [ ] Contact fertig
- [ ] Footer fertig
- [ ] Mobile geprüft
- [ ] SEO geprüft
- [ ] Favicon gesetzt
- [ ] Build erfolgreich
MD

cat > docs/08-quality/review.md <<'MD'
# Review

Version: 1.0  
Status: Active

## Review Questions

Wirkt die Seite wie ALX Studio?  
Ist sie modern, clean und urban?  
Ist sie nicht überladen?  
Funktionieren Kontakt und Navigation?  
Ist der Code sauber?  
Ist die Mobile Version stark?
MD

cat > docs/08-quality/changelog.md <<'MD'
# Changelog

Version: 1.0  
Status: Active

## 1.0

Initiale Dokumentation für ALX Studio OS angelegt.
MD

cat > docs/00-overview/02-roadmap.md <<'MD'
# Roadmap

Version: 1.0  
Status: Active

## V1

Animierter OnePager.

## V2

Case Studies.

## V3

Journal.

## V4

Mehrsprachigkeit DE/EN/GR.

## V5

Interaktive Tools und Ressourcen.
MD

cat > docs/00-overview/03-glossary.md <<'MD'
# Glossary

Version: 1.0  
Status: Active

## ALX Studio

Persönliche Creative-Studio-Marke von Alexandros Kodalis.

## Build. Learn. Improve.

Internes Arbeitsprinzip.

## Dark Streetwear Editorial

Visuelle Richtung: dunkel, clean, urban, typografisch stark.

## Lab

Interaktiver Bereich für Experimente und Tools.
MD

cat > docs/00-overview/04-project-status.md <<'MD'
# Project Status

Version: 1.0  
Status: Active

## Current Phase

Foundation and first implementation.

## Done

- Next.js Projekt erstellt
- Tailwind aktiv
- shadcn/ui eingerichtet
- Docs Struktur erstellt

## Next

- Komponenten bauen
- Inhalte einfügen
- Animationen umsetzen
MD

cat > docs/01-brand/02-brand-voice.md <<'MD'
# Brand Voice

Version: 1.0  
Status: Active

## Voice

Locker, klar, urban, direkt.

## Use

Ich-Form für persönliche Bereiche.  
Studio-Form für ALX Studio Bereiche.

## Avoid

Keine Buzzwords.  
Keine künstliche Experten-Sprache.  
Keine übertriebenen Versprechen.
MD

cat > docs/01-brand/03-brand-messaging.md <<'MD'
# Brand Messaging

Version: 1.0  
Status: Active

## Main Message

Ideen werden beim Machen digital.

## Supporting Message

ALX Studio verbindet Marketing, Web, KI und moderne digitale Erlebnisse.

## Hero Options

- Ideen werden beim Machen digital.
- Build. Learn. Improve.
- Marketing, Web und digitale Ideen.
MD

cat > docs/01-brand/04-brand-values.md <<'MD'
# Brand Values

Version: 1.0  
Status: Active

## Values

- Neugier
- Klarheit
- Qualität
- Ehrlichkeit
- Eigeninitiative
- Momentum
- gutes Design
- kontinuierliche Verbesserung
MD

cat > docs/01-brand/05-brand-assets.md <<'MD'
# Brand Assets

Version: 1.0  
Status: Active

## Brand

ALX Studio

## Founder

Alexandros Kodalis

## Domain

ak-learn-code.github.io/alx-studio/

## Logo

ALX Logo liegt in public/brand.

## Favicon

ALX Favicon liegt in public/brand.

## Rule

Logo nicht verzerren. Immer genug Abstand lassen.
MD

cat > docs/01-brand/06-copywriting-rules.md <<'MD'
# Copywriting Rules

Version: 1.0  
Status: Active

## Rules

Kurz schreiben.  
Direkt schreiben.  
Keine Buzzwords.  
Keine künstliche Größe.  
Persönlich bleiben.  
Junior-Status nicht verstecken, sondern als Entwicklung zeigen.

## Preferred Words

Ideen, Systeme, entwickeln, verbessern, ausprobieren, digital, modern, klar.
MD

echo "✅ Alle Markdown-Dateien wurden gefüllt."
