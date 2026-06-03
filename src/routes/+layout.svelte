<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { categories } from "$lib/registry";
  import { theme } from "$lib/theme.svelte";
  import ThemeToggle from "$lib/components/ui/ThemeToggle.svelte";
  import ThemePicker from "$lib/components/ui/ThemePicker.svelte";
  import Toaster from "$lib/components/ui/Toaster.svelte";
  import "../app.css";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";

  let { children } = $props();

  // Init theme on client only (localStorage + prefers-color-scheme)
  onMount(() => theme.init());
</script>

<div class="app">
  <aside class="sidebar">
    <ThemeToggle />
    <div class="sidebar-header">
      <LogoGG />
    </div>

    <nav class="sidebar-nav">
      {#if categories.length === 0}
        <p class="empty-hint">Aucun composant encore.<br />Créons-en ensemble !</p>
      {:else}
        {#each categories as category}
          <div class="nav-group">
            <a
              href="/{category.slug}"
              class="nav-category"
              class:active={$page.url.pathname.startsWith(`/${category.slug}`)}
            >
              {category.label}
            </a>
            {#each category.components as component}
              <a
                href="/{category.slug}/{component.slug}"
                class="nav-component"
                class:active={$page.url.pathname ===
                  `/${category.slug}/${component.slug}`}
              >
                {component.label}
              </a>
            {/each}
          </div>
        {/each}
      {/if}
    </nav>

    <ThemePicker />
  </aside>

  <main class="content">
    {@render children()}
  </main>
</div>

<Toaster />

<style>
  .app {
    display: flex;
    min-height: 100vh;
    background: var(--bg-base);
  }

  .sidebar {
    width: 240px;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
    background: var(--bg-subtle);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    transition:
      background var(--transition-base),
      border-color var(--transition-base);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px 16px;
    border-bottom: 1px solid var(--border);
  }

  .logo {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-base);
    text-decoration: none;
  }

  .sidebar-nav {
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .empty-hint {
    padding: 16px 8px;
    font-size: 13px;
    color: var(--text-subtle);
    line-height: 1.6;
  }

  .nav-group {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-bottom: 8px;
  }

  .nav-category {
    padding: 6px 8px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-subtle);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .nav-category:hover,
  .nav-category.active {
    background: var(--bg-hover);
    color: var(--text-base);
  }

  .nav-component {
    padding: 5px 8px 5px 16px;
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .nav-component:hover {
    background: var(--bg-hover);
    color: var(--text-base);
  }

  .nav-component.active {
    background: var(--primary-subtle);
    color: var(--primary-subtle-fg);
    font-weight: 500;
  }

  .content {
    flex: 1;
    padding: 32px;
    max-width: 960px;
    overflow-x: clip;
    margin: auto;
  }
</style>
