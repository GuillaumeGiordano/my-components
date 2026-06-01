<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { Menu, X, ChevronDown } from "@lucide/svelte";
  import { slide } from "svelte/transition";

  export type NavSubItem = {
    label: string;
    href: string;
    icon?: Component;
    active?: boolean;
  };

  export type NavItem = {
    icon?: Component;
    label: string;
    href?: string;
    active?: boolean;
    badge?: number | string;
    children?: NavSubItem[];
  };

  let {
    items = [],
    brand,
    actionBtn,
  }: {
    items?: NavItem[];
    brand?: Snippet;
    actionBtn?: Snippet;
  } = $props();

  let menuOpen = $state(false);
  let mobileOpenIndex = $state<number | null>(null);

  function toggleMobileItem(i: number) {
    mobileOpenIndex = mobileOpenIndex === i ? null : i;
  }
</script>

<header class="navbar">
  <div class="navbar-inner">
    {@render brand?.()}

    <!-- ── Desktop nav ── -->
    <nav class="navbar-links" aria-label="Navigation principale">
      {#each items as item, i}
        {@const hasChildren = !!item.children?.length}
        {@const showBadge =
          item.badge !== undefined && item.badge !== null && item.badge !== ""}

        <div class="nav-item-wrap" class:has-dropdown={hasChildren}>
          {#if item.href && !hasChildren}
            <a
              href={item.href}
              class="nav-link"
              class:active={item.active}
              aria-current={item.active ? "page" : undefined}
            >
              {#if item.icon}
                <span class="nav-icon"><item.icon size={16} /></span>
              {/if}
              <span class="nav-label">{item.label}</span>
              {#if showBadge}
                <span class="nav-badge">{item.badge}</span>
              {/if}
            </a>
          {:else}
            <button
              type="button"
              class="nav-link"
              class:active={item.active}
              aria-haspopup={hasChildren ? "true" : undefined}
            >
              {#if item.icon}
                <span class="nav-icon"><item.icon size={16} /></span>
              {/if}
              <span class="nav-label">{item.label}</span>
              {#if showBadge}
                <span class="nav-badge">{item.badge}</span>
              {/if}
              {#if hasChildren}
                <span class="nav-chevron"><ChevronDown size={13} /></span>
              {/if}
            </button>
          {/if}

          <!-- Dropdown (desktop) -->
          {#if hasChildren}
            <div class="dropdown" role="menu">
              {#each item.children! as child}
                <a
                  href={child.href}
                  class="dropdown-item"
                  class:active={child.active}
                  role="menuitem"
                  aria-current={child.active ? "page" : undefined}
                >
                  {#if child.icon}
                    <span class="drop-icon"><child.icon size={15} /></span>
                  {:else}
                    <span class="drop-dot"></span>
                  {/if}
                  <span>{child.label}</span>
                </a>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </nav>

    <!-- ── Actions ── -->
    <div class="navbar-actions">
      {#if actionBtn}
        <span class="cta-desktop">{@render actionBtn()}</span>
      {/if}

      <span class="hamburger-wrap">
        {#if actionBtn}
          <span class="cta-mobile">{@render actionBtn()}</span>
        {/if}
        <button
          type="button"
          class="hamburger"
          onclick={() => {
            menuOpen = !menuOpen;
            mobileOpenIndex = null;
          }}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          {#if menuOpen}
            <X size={20} />
          {:else}
            <Menu size={20} />
          {/if}
        </button>
      </span>
    </div>
  </div>

  <!-- ── Mobile menu ── -->
  {#if menuOpen}
    <nav
      class="mobile-menu"
      aria-label="Navigation mobile"
      transition:slide={{ duration: 200 }}
    >
      {#each items as item, i}
        {@const hasChildren = !!item.children?.length}
        {@const showBadge =
          item.badge !== undefined && item.badge !== null && item.badge !== ""}
        {@const mobileOpen = mobileOpenIndex === i}

        <div class="mobile-item-wrap">
          {#if item.href && !hasChildren}
            <a
              href={item.href}
              class="mobile-link"
              class:active={item.active}
              onclick={() => {
                menuOpen = false;
                mobileOpenIndex = null;
              }}
            >
              {#if item.icon}
                <span class="mobile-icon"><item.icon size={16} /></span>
              {/if}
              <span>{item.label}</span>
              {#if showBadge}
                <span class="nav-badge">{item.badge}</span>
              {/if}
            </a>
          {:else}
            <button
              type="button"
              class="mobile-link"
              class:active={item.active}
              onclick={() => (hasChildren ? toggleMobileItem(i) : (menuOpen = false))}
              aria-expanded={hasChildren ? mobileOpen : undefined}
            >
              {#if item.icon}
                <span class="mobile-icon"><item.icon size={16} /></span>
              {/if}
              <span>{item.label}</span>
              {#if showBadge}
                <span class="nav-badge">{item.badge}</span>
              {/if}
              {#if hasChildren}
                <span class="mobile-chevron" class:rotated={mobileOpen}>
                  <ChevronDown size={14} />
                </span>
              {/if}
            </button>
          {/if}

          <!-- Sub-items mobile -->
          {#if hasChildren && mobileOpen}
            <div class="mobile-sub-items" transition:slide={{ duration: 180 }}>
              {#each item.children! as child}
                <a
                  href={child.href}
                  class="mobile-sub-link"
                  class:active={child.active}
                  onclick={() => {
                    menuOpen = false;
                    mobileOpenIndex = null;
                  }}
                >
                  {#if child.icon}
                    <span class="mobile-sub-icon"><child.icon size={14} /></span>
                  {:else}
                    <span class="mobile-sub-dot"></span>
                  {/if}
                  <span>{child.label}</span>
                </a>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </nav>
  {/if}
</header>

<style>
  /* ── Navbar ── */
  .navbar {
    background: var(--bg-base);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 99;
    transition:
      background var(--transition-base),
      border-color var(--transition-base);
  }

  .navbar-inner {
    max-width: 1200px;
    margin: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 24px;
    height: 60px;
  }

  /* ── Desktop nav ── */
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }

  .nav-item-wrap {
    position: relative;
  }

  /* Show dropdown on hover + focus-within (keyboard) */
  .nav-item-wrap.has-dropdown:hover .dropdown,
  .nav-item-wrap.has-dropdown:focus-within .dropdown {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 400;
    color: var(--text-muted);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    &.active {
      background: var(--primary-subtle);
      color: var(--primary-subtle-fg);
      font-weight: 500;
    }
  }

  .nav-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .nav-label {
    line-height: 1;
  }

  .nav-badge {
    margin-left: 2px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: var(--radius-full);
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .nav-chevron {
    display: flex;
    align-items: center;
    color: var(--text-subtle);
    transition: transform var(--transition-fast);
  }

  .nav-item-wrap.has-dropdown:hover .nav-chevron,
  .nav-item-wrap.has-dropdown:focus-within .nav-chevron {
    transform: rotate(180deg);
  }

  /* ── Dropdown ── */
  .dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 180px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    z-index: 100;
    /* Hidden by default */
    opacity: 0;
    pointer-events: none;
    transform: translateY(-6px);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;
    border-radius: var(--radius-md);
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 1px;
    }

    &.active {
      color: var(--primary);
      font-weight: 500;
    }
  }

  .drop-icon {
    display: flex;
    align-items: center;
    color: var(--text-subtle);
    flex-shrink: 0;
  }

  .drop-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--text-subtle);
    flex-shrink: 0;
    margin-left: 4px;
  }

  .dropdown-item.active .drop-dot {
    background: var(--primary);
  }

  /* ── Actions ── */
  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  .hamburger-wrap {
    display: none;
  }

  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }

  /* ── Mobile menu ── */
  .mobile-menu {
    display: flex;
    flex-direction: column;
    padding: 8px 12px 12px;
    border-top: 1px solid var(--border);
    gap: 2px;
    background: var(--bg-base);
  }

  .mobile-item-wrap {
    display: flex;
    flex-direction: column;
  }

  .mobile-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 8px;
    border-radius: var(--radius-md);
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }

    &.active {
      background: var(--primary-subtle);
      color: var(--primary-subtle-fg);
      font-weight: 500;
    }
  }

  .mobile-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .mobile-chevron {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: var(--text-subtle);
    transition: transform var(--transition-fast);
  }

  .mobile-chevron.rotated {
    transform: rotate(180deg);
  }

  /* Sub-items mobile */
  .mobile-sub-items {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding-left: 12px;
    margin-left: 15px;
    border-left: 2px solid var(--border);
    margin-bottom: 4px;
  }

  .mobile-sub-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 8px;
    border-radius: var(--radius-md);
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }

    &.active {
      color: var(--primary);
      font-weight: 500;
    }
  }

  .mobile-sub-icon {
    display: flex;
    align-items: center;
    color: var(--text-subtle);
    flex-shrink: 0;
  }

  .mobile-sub-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--text-subtle);
    flex-shrink: 0;
    margin-left: 3px;
  }

  .mobile-sub-link.active .mobile-sub-dot {
    background: var(--primary);
  }

  .cta-mobile :global(.btn) {
    width: 100%;
    justify-content: center;
  }

  @container (max-width: 640px) {
    .navbar-links,
    .cta-desktop {
      display: none;
    }

    .hamburger-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .navbar-links,
    .cta-desktop {
      display: none;
    }

    .hamburger-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
</style>
