# @guillaumeg/ui — Reference for Claude

## ⚠️ Rules — read before writing any code

1. **Always use library components.** Never use raw `<input>`, `<select>`, `<textarea>`, `<button>` when a library component exists.
2. **Before assuming a component supports a prop, snippet or slot — read its source file.** Do not invent props.
3. **CSS variables use the library naming, not a `--color-*` prefix.** See the token table below.
4. **When in doubt about a component's API, read `src/lib/components/<category>/<Name>.svelte`.**

---

## CSS Design Tokens — variable names

The library defines these in `src/lib/styles/tokens.css` (imported via `@guillaumeg/ui/styles/tokens.css`).

| Token | Light default | Usage |
|---|---|---|
| `--bg-base` | `#ffffff` | Page background |
| `--bg-subtle` | `#f8fafc` | Sidebar, cards, panels |
| `--bg-muted` | `#f1f5f9` | Disabled areas, preview |
| `--bg-hover` | `#e2e8f0` | Hover states |
| `--border` | `#e2e8f0` | Default borders |
| `--border-strong` | `#cbd5e1` | Emphasis borders |
| `--text-base` | `#1e293b` | Primary text |
| `--text-muted` | `#475569` | Secondary text |
| `--text-subtle` | `#94a3b8` | Placeholders, hints |
| `--text-heading` | `#0f172a` | Headings |
| `--primary` | `#2563eb` | Accent color (changes per theme) |
| `--primary-hover` | `#1d4ed8` | Accent hover |
| `--primary-fg` | `#ffffff` | Text on primary bg |
| `--primary-subtle` | `#dbeafe` | Light accent bg |
| `--primary-subtle-fg` | `#1d4ed8` | Text on light accent bg |
| `--radius-sm/md/lg/xl` | 4/6/8/10px | Border radii |
| `--shadow-sm/md/lg` | — | Box shadows |
| `--transition-fast` | `0.15s ease` | Fast transitions |
| `--transition-base` | `0.25s ease` | Default transitions |

> **Do NOT use `--color-bg`, `--color-text`, `--color-primary`, etc.** Those are app-level aliases, not library tokens. Always use the library token names directly in library component source files.

Dark mode: overridden via `.dark` class on `<html>`. Applied automatically by `theme.init()`.

---

## Component catalog — what replaces what

### Forms (always prefer over raw HTML)

| Use this | Instead of | Key props |
|---|---|---|
| `<Input>` | `<input type="text">` | `label?`, `name?`, `bind:value`, `placeholder`, `error`, `disabled`, `type`, `required` |
| `<NumberInput>` | `<input type="number">` | `bind:value` (number), `min`, `max`, `step`, `label?`, `disabled` — has +/− steppers, **no `name` prop** |
| `<Select>` | `<select>` | `label?`, `name?`, `bind:value`, `options: {value,label}[]`, `placeholder`, `error`, `disabled` |
| `<Textarea>` | `<textarea>` | `label`, `name?`, `bind:value`, `rows`, `placeholder`, `resize`, `error`, `disabled` |
| `<DatePicker>` | `<input type="date">` | `label`, `name?` (renders hidden input), `bind:value` (ISO string), `min`, `max` — opens calendar |
| `<Checkbox>` | `<input type="checkbox">` | `label`, `bind:checked`, `name?`, `disabled` |
| `<Switch>` | `<input type="checkbox">` (toggle) | `label`, `bind:checked`, `disabled` |
| `<RadioGroup>` | `<input type="radio">` group | `label`, `bind:value`, `options: {value,label}[]` |
| `<SelectMulti>` | multiple `<select>` | `label`, `bind:value` (string[]), `options` |
| `<SelectSearch>` | searchable `<select>` | `label`, `bind:value`, `options`, `placeholder` |
| `<TagInput>` | custom tag field | `label`, `bind:tags` (string[]) |
| `<Slider>` | `<input type="range">` | `bind:value`, `min`, `max`, `step`, `label?` |
| `<FileInput>` | `<input type="file">` | `label`, `name?`, `accept`, `multiple` |

> `Input` and `Select` — `label` is **optional**. If omitted, no `<label>` element is rendered (useful for unlabeled inline fields in table rows).

> `NumberInput` — has **no `name` prop**. For form submission, bind to a state variable and submit via a hidden input or JSON payload.

> `DatePicker` — renders its own `<input type="hidden" name value>` internally when `name` is provided. Do NOT add a separate hidden input.

### UI components

| Component | Usage |
|---|---|
| `<Button>` | All clickable actions. Props: `variant` (primary/outline/ghost/danger), `size`, `icon`, `loading`, `href`, `type`, `disabled` |
| `<Card>` | Content panels. Snippets: `{#snippet header()}`, `{#snippet footer()}`. Props: `padding` (sm/md/lg) |
| `<Badge>` | Status labels. Props: `label`, `variant` (default/primary/success/warning/danger/info) |
| `<Alert>` | Inline messages. Props: `variant`, `title`, `description` |
| `<Modal>` | Dialog. Props: `id`, `title`, `size`. Snippets: `{#snippet footer(close)}` |
| `<Tabs>` | Tab navigation. Props: `tabs: {id,label,icon?}[]`, `bind:active` |
| `<Table>` | Data table. Props: `columns`, `rows`, `loading`, `empty` |
| `<Pagination>` | Page controls. Props: `bind:page`, `totalPages`, `total`, `perPage` — **always render, no condition needed** |
| `<Breadcrumb>` | Navigation trail. Props: `items: {label,href?}[]` |
| `<Avatar>` | User avatar. Props: `name`, `src?`, `size` |
| `<Stepper>` | Step indicator. Props: `steps: string[]`, `current` |
| `<Spinner>` | Loading spinner. Props: `size`, `color` |
| `<EmptyState>` | Empty list placeholder. Props: `title`, `description`, `icon?` |
| `<Skeleton>` | Loading placeholder. Props: `height`, `rounded` |
| `<Progress>` | Progress bar. Props: `value`, `max`, `label?` |
| `<Tooltip>` | Hover tooltip. Props: `text`, `position` |
| `<CopyButton>` | Copy to clipboard. Props: `text` |
| `<Toaster>` | Toast container — add once in root layout |
| `<ThemeToggle>` | Light/dark toggle button — no props |
| `<ThemePicker>` | Full theme picker grid — no props |

### Layout

| Component | Usage |
|---|---|
| `<Sidebar>` | Navigation sidebar. Props: `groups: SidebarGroup[]`, `bind:collapsed`, `activeHref`, `shortkey`. Snippets: `{#snippet header()}`, `{#snippet footer()}` — optionnels, rendus en haut/bas avec bordure séparatrice. |
| `<Navbar>` | Top navigation bar. Props: `items: NavItem[]`, `logo?`, snippets: `{#snippet actions()}` |
| `<Footer>` | Page footer |
| `<StandardLayout>` | Full page layout wrapper |

---

## Theme setup in a consumer SvelteKit app

### 1. `app.html` — anti-flash script (paste verbatim)
```html
<script>(function(){var d=document.documentElement;var m=localStorage.getItem('theme');var dark=m?m==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');var cls=localStorage.getItem('theme-classes');if(cls)cls.split(' ').forEach(function(c){if(c)d.classList.add(c);});try{var vars=JSON.parse(localStorage.getItem('theme-vars')||'null');if(vars)vars.forEach(function(v){d.style.setProperty(v[0],v[1]);});}catch(e){}})();</script>
```

### 2. `app.css`
```css
@import "tailwindcss";
@import "@guillaumeg/ui/styles/tokens.css";

@custom-variant dark (&:where(.dark, .dark *));
```

### 3. Root `+layout.svelte`
```svelte
<script>
  import { onMount } from 'svelte';
  import { theme, Toaster } from '@guillaumeg/ui';
  onMount(() => theme.init());
</script>
{@render children()}
<Toaster />
```

### 4. `ThemeToggle` anywhere in the UI
```svelte
import { ThemeToggle } from '@guillaumeg/ui';
<ThemeToggle />
```

---

## Publishing workflow

```bash
# In my-components
npm run package
npm version patch
git push origin main --tags
```

Consumer install: `npm install github:GuillaumeGiordano/my-components`

After updating the library, consuming projects must run `npm update @guillaumeg/ui` (or `pnpm update`).

---

## Commands

```bash
npm run dev       # Showcase app (localhost:5173)
npm run check     # TypeScript check
npm run package   # Build library → /package
```
