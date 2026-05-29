<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte';
  import type { Component } from 'svelte';
  import SidebarItem from '$lib/components/ui/SidebarItem.svelte';
  import type { SidebarSubItem } from '$lib/components/ui/SidebarItem.svelte';

  type SidebarLink = {
    label: string;
    href?: string;
    icon: Component;
    badge?: number | string;
    active?: boolean;
    children?: SidebarSubItem[];
    onclick?: () => void;
  };

  type SidebarGroup = {
    label: string;
    items: SidebarLink[];
  };

  let {
    groups = [] as SidebarGroup[],
    collapsed = $bindable(false),
    activeHref = '',
  }: {
    groups?: SidebarGroup[];
    collapsed?: boolean;
    activeHref?: string;
  } = $props();
</script>

<aside class="sidebar" class:collapsed>
  <button
    class="collapse-btn"
    aria-label={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
    onclick={() => (collapsed = !collapsed)}
  >
    <ChevronLeft size={14} />
  </button>

  <nav class="sidebar-nav" aria-label="Navigation principale">
    {#each groups as group}
      <div class="group">
        {#if !collapsed}
          <span class="group-label">{group.label}</span>
        {/if}

        {#each group.items as item}
          <SidebarItem
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={item.active ?? activeHref === item.href}
            {collapsed}
            badge={item.badge}
            children={item.children}
            onclick={item.onclick}
          />
        {/each}
      </div>
    {/each}
  </nav>
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 220px;
    background: var(--bg-subtle);
    border-right: 1px solid var(--border);
    transition:
      width var(--transition-base),
      background var(--transition-base),
      border-color var(--transition-base);
    position: relative;
    min-height: 300px;
  }

  .sidebar.collapsed { width: 56px; }

  /* ── Toggle button ── */
  .collapse-btn {
    position: absolute;
    top: 12px;
    right: -12px;
    width: 24px;
    height: 24px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-muted);
    z-index: 10;
    padding: 0;
    transition:
      color var(--transition-fast),
      box-shadow var(--transition-fast),
      background var(--transition-base),
      border-color var(--transition-base);

    &:hover {
      color: var(--text-base);
      box-shadow: var(--shadow-md);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }

  .collapse-btn :global(svg) {
    transition: transform var(--transition-base);
  }

  .sidebar.collapsed .collapse-btn :global(svg) {
    transform: rotate(180deg);
  }

  /* ── Nav ── */
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
    overflow: hidden;
    margin-top: 4px;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .group-label {
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-subtle);
    white-space: nowrap;
    margin-bottom: 2px;
  }
</style>
