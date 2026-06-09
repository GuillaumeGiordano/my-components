<script lang="ts">
  import { ChevronLeft } from "@lucide/svelte";
  import type { Component, Snippet } from "svelte";
  const browser = typeof window !== "undefined";
  import SidebarItem from "../ui/SidebarItem.svelte";
  import type { SidebarSubItem } from "../ui/SidebarItem.svelte";

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
    activeHref = "",
    shortkey = "[",
    header,
    footer,
  }: {
    groups?: SidebarGroup[];
    collapsed?: boolean;
    activeHref?: string;
    shortkey?: string | false;
    header?: Snippet;
    footer?: Snippet;
  } = $props();

  // Keyboard shortcut — ignored when focus is inside an input/textarea
  $effect(() => {
    if (!browser || !shortkey) return;

    function onKeydown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      if (e.key === shortkey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        collapsed = !collapsed;
      }
    }

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  });
</script>

<aside class="sidebar" class:collapsed>
  <button
    class="collapse-btn"
    aria-label="{collapsed ? 'Ouvrir' : 'Réduire'} le menu{shortkey
      ? ` (${shortkey})`
      : ''}"
    title="{collapsed ? 'Ouvrir' : 'Réduire'} le menu{shortkey ? ` · ${shortkey}` : ''}"
    onclick={() => (collapsed = !collapsed)}
  >
    <ChevronLeft size={14} />
    {#if shortkey}
      <span class="shortkey-hint">{shortkey}</span>
    {/if}
  </button>

  {#if header}
    <div class="sidebar-header">
      {@render header()}
    </div>
  {/if}

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

  {#if footer}
    <div class="sidebar-footer">
      {@render footer()}
    </div>
  {/if}
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
    height: 100%;
  }

  .sidebar.collapsed {
    width: 56px;
  }

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

  /* Kbd hint — visible au hover du bouton toggle */
  .shortkey-hint {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--text-heading);
    color: var(--bg-base);
    font-size: 11px;
    font-weight: 600;
    font-family: var(--font-mono);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--transition-fast);

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: var(--text-heading);
    }
  }

  .collapse-btn:hover .shortkey-hint {
    opacity: 1;
  }

  .sidebar.collapsed .collapse-btn :global(svg) {
    transform: rotate(180deg);
  }

  /* ── Header / Footer snippets ── */
  .sidebar-header {
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    overflow: hidden;
  }

  .sidebar-footer {
    border-top: 1px solid var(--border);
    flex-shrink: 0;
    overflow: hidden;
    margin-top: auto;
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
