# ALX Studio

Premium, cinematic website experience built with Next.js and Tailwind CSS.

## Technologies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- motion

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Environment Variables

No environment variables are required for the current local setup.

If you add private configuration later, keep it in `.env.local` and document only the variable names in `.env.example`.

## Project Structure

- `app/` - App Router entry points, global styles, and page layout
- `components/layout/` - Header and footer layout pieces
- `components/hero/` - Hero background, content, header, and video logic
- `components/intro/` - Intro transition and preloader behavior
- `components/sections/` - Page sections rendered on the homepage
- `components/ui/` - Reusable UI primitives
- `lib/` - Shared utilities and browser helpers
- `public/` - Static assets, images, and video files

## Notes

- This repository is ready to run locally with the included assets.
- Build artifacts such as `.next/` are intentionally ignored and should not be committed.
