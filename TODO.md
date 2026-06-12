# TODO — Audit Svelte 5 Best Practices

Résultats de l'audit complet du 2026-06-12 (autofixer MCP Svelte + revue manuelle).
Cocher chaque tâche une fois terminée et validée par l'autofixer.

---

## HAUTE PRIORITÉ — Bugs de réactivité

### 1. `$derived(() => ...)` → `$derived.by(() => ...)` (5 fichiers)

**Problème :** `$derived(() => {...})` stocke la fonction elle-même comme valeur dérivée,
au lieu de son résultat. Svelte ne mémoïse pas le calcul. La bonne syntaxe pour
une computation complexe est `$derived.by(() => {...})`.

- [x] `src/lib/components/ui/Breadcrumb.svelte` — ligne 19 (`visible`)
- [x] `src/lib/components/ui/Collapse.svelte` — ligne 19 (`detailOpen`) — voir aussi item #3
- [x] `src/lib/components/ui/Pagination.svelte` — ligne 40 (`pages`)
- [x] `src/lib/components/sections/VideoSection.svelte` — ligne 31 (`embedUrl`)
- [x] `src/lib/components/ui/Table.svelte` — ligne 46 (`sorted`)

**Correction type :**
```ts
// Avant (❌)
const pages = $derived((): (number | '...')[] => { ... });
// Après (✓)
const pages = $derived.by((): (number | '...')[] => { ... });
```
Et dans le template : utiliser `pages` (sans parenthèses) à la place de `pages()`.

---

### 2. `state_referenced_locally` — props capturées en `const` sans `$derived` (13 fichiers)

**Problème :** Les props `_id`, `name`, `hint`, `error` sont référencées dans des `const`
simples. Cela ne capture que la valeur initiale — si la prop change, les dérivés
(`id`, `hintId`, `errorId`, `describedby`) ne se mettent pas à jour.

Fichiers concernés :
- [x] `src/lib/components/forms/Input.svelte`
- [x] `src/lib/components/forms/Select.svelte`
- [x] `src/lib/components/forms/Textarea.svelte`
- [x] `src/lib/components/forms/Checkbox.svelte`
- [x] `src/lib/components/forms/Switch.svelte`
- [x] `src/lib/components/forms/RadioGroup.svelte`
- [x] `src/lib/components/forms/FileInput.svelte`
- [x] `src/lib/components/forms/SelectMulti.svelte`
- [x] `src/lib/components/forms/SelectSearch.svelte`
- [x] `src/lib/components/forms/SelectSearchMulti.svelte`
- [x] `src/lib/components/forms/DatePicker.svelte`
- [x] `src/lib/components/forms/DateRangePicker.svelte`
- [ ] `src/lib/components/ui/Tooltip.svelte` — pas concerné (uniqueId sans props réactives)

**Correction type :**
```ts
// Avant (❌)
const id = _id ?? name ?? uniqueId('input');
const hintId = hint ? `${id}-hint` : undefined;
const errorId = error ? `${id}-error` : undefined;
const describedby = [hintId, errorId].filter(Boolean).join(' ') || undefined;

// Après (✓)
const uid = uniqueId('input'); // appelé une seule fois, valeur stable
const id = $derived(_id ?? name ?? uid);
const hintId = $derived(hint ? `${id}-hint` : undefined);
const errorId = $derived(error ? `${id}-error` : undefined);
const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);
```

---

### 3. `Collapse.svelte` — prop `isOpen` sans effet + `detailOpen` inutilisé

**Problème :** La prop `isOpen` est déclarée mais ne contrôle pas l'attribut `open` du
`<details>`. L'élément est toujours fermé au rendu initial, quel que soit `isOpen`.
De plus, `detailOpen` est calculé via `$derived` mais jamais utilisé dans le template.

- [x] `src/lib/components/ui/Collapse.svelte`
  - Supprimer `let detailOpen = $derived(...)`
  - Ajouter `open={isOpen}` sur `<details>`

---

## PRIORITÉ MOYENNE — Performance / Qualité

### 4. `{#each}` sans clé (5 fichiers)

**Problème :** Sans clé, Svelte ne peut pas optimiser le DOM lors des réordonnements.
Ajouter `{#each items as item (item.id)}` ou une clé unique.

- [x] `src/lib/components/ui/Pagination.svelte` — 2 blocks `{#each}` (lignes 68, 104)
- [x] `src/lib/components/ui/Table.svelte` — 3 blocks `{#each}` (lignes 88, 132, 149)
- [x] `src/lib/components/ui/Breadcrumb.svelte` — 1 block `{#each}` (ligne 42)
- [x] `src/lib/components/forms/SelectSearch.svelte` — 1 block `{#each}` (ligne 198)
- [x] `src/lib/components/forms/SelectSearchMulti.svelte` — 3 blocks `{#each}` (lignes 121, 160, 219)

---

### 5. `stores/toast.ts` — migrer de `writable` vers `$state`

**Problème :** Utilise l'API store Svelte 4 (`writable` de `svelte/store`).
En Svelte 5, la bonne pratique est d'utiliser `$state` dans un fichier `.svelte.ts`.
L'API publique (`toast.success()`, `toast.error()`, etc.) reste identique.

- [x] Renommer `src/lib/stores/toast.ts` → `src/lib/stores/toast.svelte.ts`
- [x] Remplacer `writable<Toast[]>([])` par `let toasts = $state<Toast[]>([])`
- [x] Remplacer `subscribe` par un getter `get list()` ou exposer `toasts` directement
- [x] Mettre à jour tous les imports dans `Toaster.svelte` et `index.ts`

---

### 6. `Breadcrumb.svelte` — `href` sans `base` path

**Problème :** Les liens `href="/"` et `href={item.href}` sont hardcodés.
Dans les apps SvelteKit avec `paths.base` configuré, ils doivent utiliser `base`
de `$app/paths` : `href="{base}/"`.

- [x] `src/lib/components/ui/Breadcrumb.svelte`
  - Importer `base` depuis `$app/paths`
  - Préfixer `href="/"` → `href="{base}/"`
  - Préfixer `href={item.href}` → `href="{base}{item.href}"` (si href est relatif)

Note : l'autofixer signale encore `resolve()` — faux positif, `{base}` est le pattern SvelteKit correct.

---

## BASSE PRIORITÉ — Documentation

### 7. `CLAUDE.md` — inconsistances dans le catalogue Tabs

- [x] Corriger `bind:active` → `bind:value` dans la doc `Tabs`
- [x] Supprimer `icon?` du type `tabs` dans la doc (la prop n'existe pas dans le composant)

---

## PRIORITÉ MOYENNE — Accessibilité (détectée lors de l'audit #2)

### 8. `DatePicker.svelte` — erreurs ARIA

- [x] `src/lib/components/forms/DatePicker.svelte`
  - Supprimé `role="combobox"`, `aria-required`, `aria-invalid` du bouton trigger
  - `<abbr role="columnheader">` → `<span role="columnheader"><abbr title=...>{wd}</abbr></span>`
  - 3 blocks `{#each}` : clés `(i)`, `(wi)`, `(di)` ajoutées

### 9. `DateRangePicker.svelte` — erreurs ARIA

- [x] `src/lib/components/forms/DateRangePicker.svelte`
  - Supprimé `aria-required` et `aria-invalid` du bouton trigger
  - `<abbr role="columnheader">` → `<span role="columnheader"><abbr title=...>{wd}</abbr></span>`
  - 3 blocks `{#each}` dans le snippet `calGrid` : clés `(i)`, `(wi)`, `(di)` ajoutées

---

## Checklist de validation

Après chaque correction, relancer l'autofixer MCP Svelte sur le fichier modifié
pour confirmer l'absence de nouveaux problèmes.

```
mcp__svelte__svelte-autofixer({ code: "chemin/vers/Fichier.svelte", desired_svelte_version: 5 })
```
