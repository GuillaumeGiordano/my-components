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
- [ ] `src/lib/components/forms/Input.svelte`
- [ ] `src/lib/components/forms/Select.svelte`
- [ ] `src/lib/components/forms/Textarea.svelte`
- [ ] `src/lib/components/forms/Checkbox.svelte`
- [ ] `src/lib/components/forms/Switch.svelte`
- [ ] `src/lib/components/forms/RadioGroup.svelte`
- [ ] `src/lib/components/forms/FileInput.svelte`
- [ ] `src/lib/components/forms/SelectMulti.svelte`
- [ ] `src/lib/components/forms/SelectSearch.svelte`
- [ ] `src/lib/components/forms/SelectSearchMulti.svelte`
- [ ] `src/lib/components/forms/DatePicker.svelte`
- [ ] `src/lib/components/forms/DateRangePicker.svelte`
- [ ] `src/lib/components/ui/Tooltip.svelte`

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
- [ ] `src/lib/components/forms/SelectSearch.svelte` — 1 block `{#each}` (ligne 197)
- [ ] `src/lib/components/forms/SelectSearchMulti.svelte` — 3 blocks `{#each}` (lignes 120, 159, 218)

---

### 5. `stores/toast.ts` — migrer de `writable` vers `$state`

**Problème :** Utilise l'API store Svelte 4 (`writable` de `svelte/store`).
En Svelte 5, la bonne pratique est d'utiliser `$state` dans un fichier `.svelte.ts`.
L'API publique (`toast.success()`, `toast.error()`, etc.) reste identique.

- [ ] Renommer `src/lib/stores/toast.ts` → `src/lib/stores/toast.svelte.ts`
- [ ] Remplacer `writable<Toast[]>([])` par `let toasts = $state<Toast[]>([])`
- [ ] Remplacer `subscribe` par un getter `get list()` ou exposer `toasts` directement
- [ ] Mettre à jour tous les imports dans `Toaster.svelte` et `index.ts`

---

### 6. `Breadcrumb.svelte` — `href` sans `base` path

**Problème :** Les liens `href="/"` et `href={item.href}` sont hardcodés.
Dans les apps SvelteKit avec `paths.base` configuré, ils doivent utiliser `base`
de `$app/paths` : `href="{base}/"`.

- [ ] `src/lib/components/ui/Breadcrumb.svelte`
  - Importer `base` depuis `$app/paths`
  - Préfixer `href="/"` → `href="{base}/"`
  - Préfixer `href={item.href}` → `href="{base}{item.href}"` (si href est relatif)

---

## BASSE PRIORITÉ — Documentation

### 7. `CLAUDE.md` — inconsistances dans le catalogue Tabs

- [ ] Corriger `bind:active` → `bind:value` dans la doc `Tabs`
- [ ] Supprimer `icon?` du type `tabs` dans la doc (la prop n'existe pas dans le composant)

---

## Checklist de validation

Après chaque correction, relancer l'autofixer MCP Svelte sur le fichier modifié
pour confirmer l'absence de nouveaux problèmes.

```
mcp__svelte__svelte-autofixer({ code: "chemin/vers/Fichier.svelte", desired_svelte_version: 5 })
```
