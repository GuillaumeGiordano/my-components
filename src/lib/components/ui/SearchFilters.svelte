<script lang="ts">
  import type { Snippet } from "svelte";
  import { SlidersHorizontal, Search, X, ChevronDown } from "@lucide/svelte";
  const browser = typeof window !== "undefined";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  // Params ignorés dans le comptage des filtres actifs
  const PAGINATION_PARAMS = new Set(["page", "perPage"]);

  let {
    children,
    onSearch,
    onReset,
    loading = false,
    collapsible = false,
    columns = 3,
    title = "Filtres",
    urlDriven = false,
    expanded = $bindable(false),
  }: {
    children: Snippet;
    onSearch?: (values: Record<string, string | string[]>) => void;
    onReset?: () => void;
    loading?: boolean;
    collapsible?: boolean;
    columns?: number;
    title?: string;
    /** Encode les filtres dans l'URL et remet page=1 à chaque recherche */
    urlDriven?: boolean;
    expanded?: boolean;
  } = $props();

  let formEl: HTMLFormElement | null = null;
  let activeCount = $state(0);

  // ── Mode URL : pré-remplir les champs + compter les filtres actifs ────
  $effect(() => {
    if (!urlDriven || !browser || !formEl) return;

    // $page crée la dépendance réactive — se re-déclenche à chaque changement d'URL
    const params = $page.url.searchParams;

    for (const el of Array.from(formEl.elements)) {
      const input = el as HTMLInputElement | HTMLSelectElement;
      if (!input.name || PAGINATION_PARAMS.has(input.name)) continue;
      const val = params.get(input.name);
      if (val !== null) input.value = val;
    }

    activeCount = [...params.entries()].filter(
      ([k, v]) => !PAGINATION_PARAMS.has(k) && v !== "",
    ).length;
  });

  function collect(): Record<string, string | string[]> {
    if (!formEl) return {};
    const fd = new FormData(formEl);
    const result: Record<string, string | string[]> = {};
    for (const key of new Set(fd.keys())) {
      const vals = fd.getAll(key) as string[];
      result[key] = vals.length === 1 ? vals[0] : vals;
    }
    return result;
  }

  function countActive(values: Record<string, string | string[]>): number {
    return Object.values(values).filter((v) =>
      Array.isArray(v) ? v.length > 0 : v !== "",
    ).length;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const values = collect();
    activeCount = countActive(values);

    if (urlDriven) {
      // Construire les nouveaux params en partant des params actuels (préserve perPage)
      const params = new URLSearchParams($page.url.searchParams);
      for (const [key, val] of Object.entries(values)) {
        if (Array.isArray(val)) {
          params.delete(key);
          val.forEach((v) => {
            if (v) params.append(key, v);
          });
        } else {
          if (val) params.set(key, val);
          else params.delete(key);
        }
      }
      params.set("page", "1"); // reset pagination
      await goto(`?${params.toString()}`);
      onSearch?.(values); // callback optionnel (analytics, etc.)
    } else {
      onSearch?.(values);
    }
  }

  async function handleReset() {
    formEl?.reset();
    activeCount = 0;

    if (urlDriven) {
      // Garder uniquement perPage, effacer les filtres, revenir page 1
      const params = new URLSearchParams();
      const perPage = $page.url.searchParams.get("perPage");
      if (perPage) params.set("perPage", perPage);
      params.set("page", "1");
      await goto(`?${params.toString()}`);
      onReset?.();
    } else {
      onReset?.();
    }
  }
</script>

<div class="sf">
  <form bind:this={formEl} onsubmit={handleSubmit} novalidate>
    <!-- ── Header ─────────────────────────────────────────────────────── -->
    <div class="sf-header">
      <span class="sf-title">
        <SlidersHorizontal size={15} />
        {title}
        {#if activeCount > 0}
          <span class="sf-badge">{activeCount}</span>
        {/if}
      </span>

      <div class="sf-header-actions">
        {#if activeCount > 0}
          <!-- Quick reset visible même quand réduit -->
          <button
            type="button"
            class="sf-btn-ghost"
            onclick={handleReset}
            disabled={loading}
            aria-label="Réinitialiser les filtres"
          >
            <X size={13} />
            Réinitialiser
          </button>
        {/if}

        {#if collapsible}
          <button
            type="button"
            class="sf-toggle"
            class:sf-toggle--open={expanded}
            onclick={() => (expanded = !expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Réduire les filtres" : "Afficher les filtres"}
          >
            <ChevronDown size={15} />
          </button>
        {/if}
      </div>
    </div>

    <!-- ── Champs + footer — restent dans le DOM (valeurs préservées) ── -->
    <div class="sf-body" class:sf-body--collapsed={!expanded}>
      <div class="sf-body-inner">
        <!-- Grille de champs configurable -->
        <div class="sf-fields" style="--cols:{columns}">
          {@render children()}
        </div>

        <!-- Footer avec boutons -->
        <div class="sf-footer">
          {#if activeCount === 0}
            <button
              type="button"
              class="sf-btn-ghost"
              onclick={handleReset}
              disabled={loading}
            >
              <X size={13} />
              Réinitialiser
            </button>
          {/if}

          <button
            type="submit"
            class="sf-btn-primary"
            disabled={loading}
            aria-busy={loading}
          >
            {#if loading}
              <span class="sf-spinner" aria-hidden="true"></span>
            {:else}
              <Search size={14} />
            {/if}
            Filtrer
          </button>
        </div>
      </div>
    </div>
  </form>
</div>

<style>
  /* ── Wrapper ── */
  .sf {
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  /* ── Header ── */
  .sf-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-subtle);
    gap: 12px;
    min-height: 48px;
  }

  .sf-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-heading);
    font-family: var(--font-sans);
  }

  /* Badge filtre actifs */
  .sf-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: var(--radius-full);
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
  }

  .sf-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Bouton collapse (chevron) */
  .sf-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--bg-base);
    color: var(--text-muted);
    cursor: pointer;
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      transform var(--transition-base);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }
  }

  .sf-toggle--open {
    transform: rotate(180deg);
  }

  /* ── Corps (champs) — collapse via grid-template-rows ── */
  .sf-body {
    display: grid;
    grid-template-rows: 1fr;
    transition: grid-template-rows 220ms ease;
  }

  .sf-body--collapsed {
    grid-template-rows: 0fr;
  }

  .sf-body-inner {
    overflow: hidden;
  }

  /* ── Grille de champs ── */
  .sf-fields {
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), 1fr);
    gap: 16px;
    padding: 16px;
  }

  /* ── Footer ── */
  .sf-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--border);
    background: var(--bg-subtle);
  }

  /* ── Bouton ghost (Réinitialiser) ── */
  .sf-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font-sans);
    cursor: pointer;
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast);

    &:hover:not(:disabled) {
      background: var(--bg-hover);
      color: var(--text-base);
      border-color: var(--border-strong);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* ── Bouton primary (Filtrer) ── */
  .sf-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: var(--radius-md);
    border: none;
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-sans);
    cursor: pointer;
    transition:
      background var(--transition-fast),
      transform var(--transition-fast),
      box-shadow var(--transition-fast);

    &:hover:not(:disabled) {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 35%, transparent);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* ── Spinner ── */
  .sf-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid color-mix(in srgb, var(--primary-fg) 35%, transparent);
    border-top-color: var(--primary-fg);
    border-radius: 50%;
    animation: sf-spin 0.7s linear infinite;
  }

  @keyframes sf-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* ── Responsive — 1 colonne sur mobile ── */
  @media (max-width: 640px) {
    .sf-fields {
      grid-template-columns: 1fr !important;
    }
  }
</style>
