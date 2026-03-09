# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

No test suite is configured.

## Architecture

Next.js 16 App Router project (all pages are client components using `"use client"`). No backend — purely frontend.

**Stack:** React 19, Tailwind CSS 4, Motion (Framer Motion successor), Lucide React icons, TypeScript.

**Routing (app/):**
- `/` — Homepage with hero, services overview, why-us, locations + map, CTA
- `/services` — Detailed service categories (Phone, Laptop/Desktop, Accessories)
- `/book-appointment` — 4-step multi-step form with local state only (no API)
- `/accessories` — Product grid with category filter + reservation modal (local state only)
- `/contact` — Contact methods, store hours, embedded Google Map

**Shared components (components/):** `Header`, `Footer`, `Logo`, `WaveDivider`. The root layout (`app/layout.tsx`) wraps all pages with Header and Footer.

## Design System

Custom Tailwind theme (defined in `globals.css` `@theme`):
- `navy-dark`: `#080B1A` — page backgrounds
- `indigo-electric`: `#4F6EF7` — primary buttons/accents
- `indigo-light`: `#6B7FFF` — hover/secondary accents
- Font: Space Grotesk (loaded via Google Fonts in layout)

Button utility classes defined in `globals.css`: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`.

Animations use the `motion` library with `whileInView` + fade-up pattern and easing `[0.22, 1, 0.36, 1]`.

## Key Notes

- All forms (booking, reservation) use React `useState` only — no API calls are wired up yet. The project spec (`Azerotech.md`) outlines future backend integration with Vercel Postgres.
- Remote images are served from `images.unsplash.com` (configured in `next.config.ts`).
- Phone validation enforces Philippine format: `09XXXXXXXXX` (11 digits starting with `09`).
- The appointment date picker constrains selection to 1–14 days ahead.
- Currency is Philippine Peso (₱).
