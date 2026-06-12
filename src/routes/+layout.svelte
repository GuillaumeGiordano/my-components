<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { categories } from "$lib/registry";
  import { theme } from "$lib/theme.svelte";
  import ThemeToggle from "$lib/components/ui/ThemeToggle.svelte";
  import ThemePicker from "$lib/components/ui/ThemePicker.svelte";
  import Toaster from "$lib/components/ui/Toaster.svelte";
  import SidebarItem from "$lib/components/ui/SidebarItem.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import {
    FileText,
    MousePointerClick,
    Layers,
    LayoutTemplate,
    BookOpen,
    Sparkles,
  } from "@lucide/svelte";
  import "../app.css";

  let { children } = $props();

  onMount(() => theme.init());

  const categoryIcons: Record<string, any> = {
    forms: FileText,
    buttons: MousePointerClick,
    ui: Layers,
    layout: LayoutTemplate,
    sections: BookOpen,
    backgrounds: Sparkles,
  };

  const navItems = $derived(
    categories.map((cat) => {
      const base = cat.baseSlug ?? cat.slug;
      return {
        slug: cat.slug,
        label: cat.label,
        icon: categoryIcons[cat.slug] ?? Layers,
        badge: cat.components.length,
        active: page.url.pathname.startsWith(`/${base}`),
        children: cat.components.map((comp) => ({
          label: comp.label,
          href: `/${base}/${comp.slug}`,
          active: page.url.pathname === `/${base}/${comp.slug}`,
        })),
      };
    }),
  );
</script>

<div class="app">
  <aside class="sidebar">
    <div class="sidebar-header">
      <LogoGG />
      <ThemeToggle />
    </div>

    <nav class="sidebar-nav">
      {#each navItems as cat}
        <SidebarItem
          icon={cat.icon}
          label={cat.label}
          badge={cat.badge}
          active={cat.active}
          children={cat.children}
        />
      {/each}
    </nav>

    <div class="sidebar-footer">
      <ThemePicker />
    </div>
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
    padding: 16px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .sidebar-nav {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }

  .sidebar-footer {
    padding: 8px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    /* padding: 32px; */
    /* max-width: 960px; */
    overflow-x: clip;
    margin: auto;
  }
</style>
