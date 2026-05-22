# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`@guillaumeg/ui` is a **Svelte 5 component library** distributed as a GitHub dependency (not published on npm registry). It also contains a SvelteKit **showcase app** to develop and preview components locally.

## Commands

```bash
npm run dev          # Start showcase app (localhost:5173)
npm run check        # TypeScript type checking (svelte-check)
npm run check:watch  # Type checking in watch mode
npm run package      # Build library output to /package folder
npm run build        # Build the showcase app
```

## Publishing workflow

Every time components are modified and need to be released:

```bash
# In my-components — build, version, push
npm run package
npm version patch           # bumps package.json + creates git tag
git push origin master --tags

# Quick dev iteration (no versioning)
npm run package && git add -A && git commit -m "fix: ..." && git push
```

Consumers install with: `npm install github:GuillaumeGiordano/my-components`

The `/package` folder is committed to git — it is the distributable artifact.

## Architecture

```
src/
├── lib/
│   ├── index.ts            # Single export file — all public component exports
│   ├── registry.ts         # Component metadata for sidebar navigation
│   ├── theme.svelte.ts     # Dark/light mode + color theme store
│   ├── stores/toast.ts     # Toast notification store
│   ├── utils/              # id.ts (form IDs), calendar.ts
│   ├── styles/tokens.css   # CSS custom properties (design tokens)
│   └── components/
│       ├── buttons/
│       ├── forms/
│       ├── ui/
│       ├── layout/
│       ├── sections/       # Full marketing-page sections
│       └── logo/
└── routes/                 # SvelteKit showcase — one route per category
    └── +layout.svelte      # Sidebar built from registry.ts
```

## Adding a component

1. Create `src/lib/components/<category>/<ComponentName>.svelte`
2. Export it from `src/lib/index.ts`
3. Add its metadata to `src/lib/registry.ts` (slug in English, label in French)
4. Add a demo route in `src/routes/<category>/`
5. Run `npm run package` before committing

## Key conventions

**Svelte 5 runes** — use `$state`, `$props`, `$derived`, `$effect`, `$bindable`. Runes mode is enabled globally.

**Icons** — use exclusively `@lucide/svelte`. Never inline SVG or emoji.

**Styling** — Tailwind CSS 4 (via `@tailwindcss/vite`) + CSS custom properties from `src/lib/styles/tokens.css`. All colors, spacing, shadows, and transitions are defined as CSS variables. Dark mode is applied via `.dark` class on `<html>`; color themes via `.theme-{color}`.

**Exports** — `package.json` exports two entry points:
- `.` → all components (`import { Button } from '@guillaumeg/ui'`)
- `./styles/tokens.css` → design tokens (must be imported separately by consumers)

**Registry labels** — slugs in English, display labels in French.
