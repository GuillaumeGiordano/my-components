<script lang="ts">
  import { page } from "$app/state";
  import { Menu, X } from "@lucide/svelte";
  import { fly } from "svelte/transition";
  import type { Component } from "svelte";

  type Section = { icon?: Component; label: string; href: string };
  type NavPage = { link: string; label: string; icon?: Component; section?: Section[] };

  let {
    navItems = [],
    side = "left",
  }: {
    /** The whole site nav: each page carries its route (`link`) and its in-page anchors. */
    navItems?: NavPage[];
    /** Edge the dock sits on — controls tooltip + pages-menu direction. */
    side?: "left" | "right";
  } = $props();

  const browser = typeof window !== "undefined";
  const normalize = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);

  // Page matching the current route (fallback to the first), and its sections.
  const currentPath = $derived(normalize(page.url.pathname));
  const current = $derived(
    navItems.find((p) => normalize(p.link) === currentPath) ?? navItems[0],
  );
  const sections = $derived(current?.section ?? []);

  const idOf = (href: string) => (href.startsWith("#") ? href.slice(1) : href);
  function goSection(href: string) {
    document.getElementById(idOf(href))?.scrollIntoView({ behavior: "smooth" });
  }

  // ── Pages menu (opened by the burger) ──
  let menuOpen = $state(false);
  let navEl = $state<HTMLElement>();

  // Close on Escape or a click outside the dock.
  $effect(() => {
    if (!browser || !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") menuOpen = false;
    };
    const onDown = (e: PointerEvent) => {
      if (navEl && !navEl.contains(e.target as Node)) menuOpen = false;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  });
</script>

{#if navItems.length}
  <nav class="dock dock--{side}" aria-label="Navigation" bind:this={navEl}>
    <ul class="dock-list">
      <!-- Burger: opens the pages menu -->
      <li>
        <button
          class="dock-item dock-burger"
          class:open={menuOpen}
          onclick={() => (menuOpen = !menuOpen)}
          aria-label="Menu des pages"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <span class="dock-icon">
            {#if menuOpen}<X size={20} />{:else}<Menu size={20} />{/if}
          </span>
        </button>
      </li>

      {#if sections.length}
        <li class="dock-sep" aria-hidden="true"></li>
      {/if}

      <!-- Current page sections: scroll to the anchor -->
      {#each sections as s (s.href)}
        <li>
          <button class="dock-item" onclick={() => goSection(s.href)} aria-label={s.label}>
            {#if s.icon}<span class="dock-icon"><s.icon size={20} /></span>{/if}
            <span class="dock-label">{s.label}</span>
          </button>
        </li>
      {/each}
    </ul>

    <!-- Pages menu panel — opens toward the screen center -->
    {#if menuOpen}
      <div
        class="pages-menu pages-menu--{side}"
        role="menu"
        transition:fly={{ x: side === "right" ? 10 : -10, duration: 160 }}
      >
        {#each navItems as p (p.link)}
          <a
            class="page-link"
            class:active={p === current}
            href={p.link}
            role="menuitem"
            aria-current={p === current ? "page" : undefined}
            onclick={() => (menuOpen = false)}
          >
            {#if p.icon}<span class="page-icon"><p.icon size={16} /></span>{/if}
            <span>{p.label}</span>
          </a>
        {/each}
      </div>
    {/if}
  </nav>
{/if}

<style>
  .dock {
    position: relative;
    width: fit-content;
    background: color-mix(in srgb, var(--bg-base) 55%, transparent);
    backdrop-filter: blur(12px) saturate(1.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
    border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg);
    user-select: none;
    -webkit-user-select: none;
  }

  .dock-list {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Circular items ── */
  .dock-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--bg-base);
    color: var(--text-muted);
    text-decoration: none;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      transform var(--transition-fast);
  }

  .dock-item:hover {
    background: var(--bg-hover);
    color: var(--text-base);
    transform: scale(1.05);
  }

  /* Burger — filled like a FAB to stand out as the menu trigger */
  .dock-burger {
    background: var(--primary);
    color: var(--primary-fg);
    border-color: transparent;
  }

  .dock-burger:hover,
  .dock-burger.open {
    background: var(--primary-hover);
    color: var(--primary-fg);
  }

  .dock-item:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .dock-icon {
    display: flex;
  }

  /* Thin separator between the burger and the section list */
  .dock-sep {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 9px;
  }

  .dock-sep::before {
    content: "";
    width: 60%;
    height: 1px;
    border-radius: 1px;
    background: color-mix(in srgb, var(--border-strong) 85%, transparent);
  }

  /* ── Tooltip label (dark pill that slides out) ── */
  .dock-label {
    position: absolute;
    top: 50%;
    background: var(--text-heading);
    color: var(--bg-base);
    font-size: 12px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: var(--radius-full);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  .dock--left .dock-label {
    left: calc(100% + 14px);
    transform: translateY(-50%) translateX(-6px);
  }
  .dock--right .dock-label {
    right: calc(100% + 14px);
    transform: translateY(-50%) translateX(6px);
  }

  /* Tooltip arrow */
  .dock-label::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
  }
  .dock--left .dock-label::after {
    right: 100%;
    border-right-color: var(--text-heading);
  }
  .dock--right .dock-label::after {
    left: 100%;
    border-left-color: var(--text-heading);
  }

  .dock-item:hover .dock-label {
    opacity: 1;
  }
  .dock--left .dock-item:hover .dock-label,
  .dock--right .dock-item:hover .dock-label {
    transform: translateY(-50%) translateX(0);
  }

  /* ── Pages menu panel ── */
  .pages-menu {
    position: absolute;
    top: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 180px;
    padding: 6px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  /* Open toward the screen center (opposite the dock's edge) */
  .pages-menu--right {
    right: calc(100% + 12px);
  }
  .pages-menu--left {
    left: calc(100% + 12px);
  }

  .page-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: var(--radius-md);
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: none;
    white-space: nowrap;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .page-link:hover {
    background: var(--bg-hover);
    color: var(--text-base);
  }

  .page-link.active {
    background: var(--primary-subtle);
    color: var(--primary-subtle-fg);
    font-weight: 500;
  }

  .page-icon {
    display: flex;
    color: var(--text-subtle);
  }

  .page-link.active .page-icon {
    color: var(--primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .dock-item {
      transition: none;
    }
  }
</style>
