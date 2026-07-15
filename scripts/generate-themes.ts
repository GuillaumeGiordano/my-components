// Generates one static CSS file per theme from the catalog.
// Run with: pnpm generate:themes   (Node 24+ runs TypeScript natively)
//
// Each file overrides the base design tokens for a single theme, so a consumer
// app just imports ONE of them — no JavaScript engine, no 33 themes shipped.

import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEMES, themeToCss } from '../src/lib/themes/catalog.ts';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '../src/lib/styles/themes');

// Clean + recreate so removed themes don't leave stale files behind.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const t of THEMES) {
  writeFileSync(resolve(outDir, `${t.id}.css`), themeToCss(t), 'utf8');
}

console.log(`✓ Generated ${THEMES.length} theme CSS files → src/lib/styles/themes/`);
