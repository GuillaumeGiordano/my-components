<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { categories } from "$lib/registry";
  import { theme, THEMES } from "$lib/theme.svelte";
  import ThemeToggle from "$lib/components/ui/ThemeToggle.svelte";
  import ThemePicker from "$lib/components/ui/ThemePicker.svelte";
  import Toaster from "$lib/components/ui/Toaster.svelte";
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import SidebarItem from "$lib/components/ui/SidebarItem.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import {
    FileText,
    MousePointerClick,
    Layers,
    LayoutTemplate,
    BookOpen,
    Sparkles,
    Palette,
  } from "@lucide/svelte";

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
        active: page.url.pathname.startsWith(`/showroom/${base}`),
        children: cat.components.map((comp) => ({
          label: comp.label,
          href: `/showroom/${base}/${comp.slug}`,
          active: page.url.pathname === `/showroom/${base}/${comp.slug}`,
        })),
      };
    }),
  );
</script>

<div class="app">
  <Sidebar
    fill
    collapsible={false}
    shortkey={false}
    groups={[{ label: "", items: navItems }]}
  >
    {#snippet header()}
      <div class="sb-header">
        <LogoGG />
        <ThemeToggle />
      </div>
    {/snippet}

    <!-- Appended after the nav groups (just below "Backgrounds") -->
    <SidebarItem icon={Palette} label="Identité visuelle" badge={THEMES.length}>
      {#snippet content()}
        <ThemePicker />
      {/snippet}
    </SidebarItem>
  </Sidebar>

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

  /* Header/footer content rendered inside the Sidebar snippets */
  .sb-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }

  .content {
    flex: 1;
    overflow-x: clip;
    margin: 0 auto;
  }
</style>
