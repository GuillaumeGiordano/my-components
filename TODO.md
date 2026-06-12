# TODO — Audit Svelte 5 Best Practices + V0

Audit complet du 2026-06-12. Tous les items sont terminés.

---

## ✅ PASSE 1 — Bugs de réactivité Svelte 5

- [x] `$derived(() => ...)` → `$derived.by(() => ...)` (5 fichiers)
- [x] `state_referenced_locally` — props capturées sans `$derived` (12 fichiers de formulaires)
- [x] `Collapse.svelte` — prop `isOpen` sans effet sur `<details>`

## ✅ PASSE 1 — Performance / Qualité

- [x] `{#each}` sans clé — Pagination, Table, Breadcrumb, SelectSearch, SelectSearchMulti, DatePicker, DateRangePicker
- [x] `stores/toast.ts` → `stores/toast.svelte.ts` (migration Svelte 4 `writable` → `$state`)
- [x] `Breadcrumb.svelte` — hrefs préfixés avec `base` de `$app/paths`

## ✅ PASSE 1 — Documentation

- [x] `CLAUDE.md` — Tabs : `bind:active` → `bind:value`, retrait de `icon?`

## ✅ PASSE 1 — Accessibilité

- [x] `DatePicker.svelte` — `role="combobox"` + `aria-required`/`aria-invalid` retirés du bouton, `<abbr role="columnheader">` corrigé, clés `{#each}` ajoutées
- [x] `DateRangePicker.svelte` — `aria-required`/`aria-invalid` retirés du bouton, même fix `<abbr>`, clés `{#each}`

---

## ✅ PASSE 2 — Qualité package V0

- [x] `package.json` — suppression `@anthropic-ai/sdk` + `groq-sdk`, ajout `keywords`
- [x] `theme.svelte.ts` — retrait des 2 casts `as any`
- [x] `Button.svelte` — prop `type` avec défaut `"button"` + variante `danger` utilise `var(--danger)`
- [x] `tokens.css` — ajout des tokens sémantiques : `--danger`, `--success`, `--warning`, `--info` (et variantes `*-hover`, `*-fg`, `*-subtle`, `*-subtle-fg`)
- [x] Couleurs d'erreur hardcodées `#dc2626` → `var(--danger)` dans 12 composants de formulaires
- [x] `rgba(220,38,38,0.2)` → `color-mix(in srgb, var(--danger) 20%, transparent)` (shadows d'erreur)
- [x] `#fee2e2` → `var(--danger-subtle)` (FileInput hover)
- [x] `Toaster.svelte` — retrait des fallbacks hardcodés, `--danger-fg` → `--danger-subtle-fg` pour la couleur texte des toasts
- [x] `src/routes/ui/toast/+page.svelte` — import mis à jour vers `toast.svelte`

---

## État V0

| Catégorie              | Status    |
|------------------------|-----------|
| Syntaxe Svelte 4       | ✅ Clean   |
| Réactivité `$derived`  | ✅ Clean   |
| Clés `{#each}`         | ✅ Clean   |
| TypeScript `src/lib`   | ✅ 0 erreurs |
| Package.json           | ✅ Propre  |
| Tokens CSS             | ✅ Complets |
| Couleurs hardcodées    | ✅ Migrées  |
| Accessibilité (formes) | ✅ OK      |
| `type="button"`        | ✅ Button.svelte (défaut) |

### Éléments non bloquants laissés pour après V0

- Couleurs hardcodées dans les composants **sections** (PremiumHeroSection, GallerySection…) — cosmétiques décoratifs, non liés au système de thème
- Faux positifs autofixer `resolve()` sur les `<a href>` (Breadcrumb, Button) — pattern `{base}` correct
- Suggestions `$effect` pour click-outside — pattern inévitable pour event listeners DOM
- Erreurs dans les pages de démo `src/routes` (exemples de showcase, pas dans le package publié)
