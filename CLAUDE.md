# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Turbopack, default in Next 16)
npm run build    # production build
npm run lint     # ESLint (next core-web-vitals + typescript ruleset)
```

There is no test runner configured.

Type-check without emitting:

```bash
npx tsc --noEmit
```

## Stack

- **Next.js 16.2.4** with the App Router — this is a newer version than most training data; consult `node_modules/next/dist/docs/` before writing any routing, navigation, or data-fetching code.
- **React 19.2.4**
- **Tailwind CSS v4** — configured entirely in `app/globals.css` via `@theme` blocks; there is no `tailwind.config.*` file.
- **TypeScript** (strict mode, `@/*` alias maps to the repo root)

## Architecture

Single-page portfolio (`app/page.tsx`) composed of section components rendered top-to-bottom: `Navbar → Hero → WhatIDo → FeaturedWork → AboutMe → Footer`.

**Component layout:**

- `components/sections/` — full-width page sections (Hero, WhatIDo, FeaturedWork, AboutMe)
- `components/layout/` — persistent chrome (Navbar, Footer)
- `components/ui/` — primitives shared across sections (Button, Tag)

**Server vs client components:** All components are server components by default. Only `Navbar` and `WhatIDo` carry `"use client"` (they hold local toggle/accordion state). Avoid adding `"use client"` unless the component genuinely needs browser APIs or React state.

## Styling

Tailwind v4 is imported as a single CSS layer (`@import "tailwindcss"` in `globals.css`). Theme tokens are declared with `@theme` / `@theme inline` — **not** a JS config file. To add a new design token, add it inside a `@theme` block in `globals.css`. CSS custom properties (`--background`, `--foreground`) are mapped into Tailwind via `@theme inline` so they can be used as utility classes (`bg-background`, `text-foreground`, etc.).

## Design

The design source is `designs/final-design.webp`, with three target breakpoints:

- **Desktop:** 1440px
- **Tablet:** 1024px
- **Mobile:** 375px

`designs/laptop-view.webp` shows the above-the-fold view at 11-inch laptop size — use it to verify the hero section, navbar, and floating sticker elements are all fully visible without scrolling at that viewport.

**No animations.** Do not add any motion effects, transitions, or animation — this is a future iteration. Layout, typography, spacing, colours, and responsiveness only.

Notable responsive behaviours from the design:

- The "what i do" section collapses to an accordion on mobile
- The navbar becomes a hamburger menu on mobile
