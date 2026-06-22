<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { Menu, X, ChevronDown } from "@lucide/svelte";
  import { slide, fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { browser } from "$app/environment";

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
    mobileMenu = "drawer",
    spy = false,
  }: {
    items?: NavItem[];
    brand?: Snippet;
    actionBtn?: Snippet;
    mobileMenu?: "drawer" | "popover" | "fullscreen";
    /** Enable scroll spy: highlight the item whose `#anchor` section crosses the viewport center. */
    spy?: boolean;
  } = $props();

  let menuOpen = $state(false);
  let mobileOpenIndex = $state<number | null>(null);

  // ── Scroll spy ──────────────────────────────────────────────────────────────
  // Id of the section currently crossing the viewport center (spy mode only)
  let activeId = $state<string | null>(null);

  // True when an item's `#anchor` href points to the active section
  function isItemActive(item: NavItem | NavSubItem): boolean {
    if (spy && item.href?.startsWith("#")) return item.href.slice(1) === activeId;
    return !!item.active;
  }

  $effect(() => {
    if (!browser || !spy) return;

    // Collect section ids from every hash href (top-level items + children)
    const ids = items
      .flatMap((item) => [item.href, ...(item.children?.map((c) => c.href) ?? [])])
      .filter((href): href is string => !!href && href.startsWith("#"))
      .map((href) => href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId = entry.target.id;
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });

  function close() {
    menuOpen = false;
    mobileOpenIndex = null;
  }

  function toggleMobileItem(i: number) {
    mobileOpenIndex = mobileOpenIndex === i ? null : i;
  }

  $effect(() => {
    if (!browser) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
</script>

<!-- ── Mobile items (shared across all 3 modes) ── -->
{#snippet mobileItems()}
  {#each items as item, i}
    {@const hasChildren = !!item.children?.length}
    {@const showBadge =
      item.badge !== undefined && item.badge !== null && item.badge !== ""}
    {@const subOpen = mobileOpenIndex === i}

    <div class="mobile-item-wrap">
      {#if item.href && !hasChildren}
        <a
          href={item.href}
          class="mobile-link"
          class:active={isItemActive(item)}
          onclick={close}
        >
          {#if item.icon}<span class="mobile-icon"><item.icon size={16} /></span>{/if}
          <span>{item.label}</span>
          {#if showBadge}<span class="nav-badge">{item.badge}</span>{/if}
        </a>
      {:else}
        <button
          type="button"
          class="mobile-link"
          class:active={isItemActive(item)}
          onclick={() => (hasChildren ? toggleMobileItem(i) : close())}
          aria-expanded={hasChildren ? subOpen : undefined}
        >
          {#if item.icon}<span class="mobile-icon"><item.icon size={16} /></span>{/if}
          <span>{item.label}</span>
          {#if showBadge}<span class="nav-badge">{item.badge}</span>{/if}
          {#if hasChildren}
            <span class="mobile-chevron" class:rotated={subOpen}>
              <ChevronDown size={14} />
            </span>
          {/if}
        </button>
      {/if}

      {#if hasChildren && subOpen}
        <div class="mobile-sub-items" transition:slide={{ duration: 180 }}>
          {#each item.children! as child}
            <a
              href={child.href}
              class="mobile-sub-link"
              class:active={isItemActive(child)}
              onclick={close}
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
{/snippet}

<!-- ══════════════════════════════════════════════════════════════════════ -->

<header class="navbar">
  <div class="navbar-inner">
    {@render brand?.()}

    <!-- ── Desktop nav ── -->
    <nav class="navbar-links" aria-label="Navigation principale">
      {#each items as item}
        {@const hasChildren = !!item.children?.length}
        {@const showBadge =
          item.badge !== undefined && item.badge !== null && item.badge !== ""}

        <div class="nav-item-wrap" class:has-dropdown={hasChildren}>
          {#if item.href && !hasChildren}
            <a
              href={item.href}
              class="nav-link"
              class:active={isItemActive(item)}
              aria-current={isItemActive(item) ? "page" : undefined}
            >
              {#if item.icon}<span class="nav-icon"><item.icon size={16} /></span>{/if}
              <span class="nav-label">{item.label}</span>
              {#if showBadge}<span class="nav-badge">{item.badge}</span>{/if}
            </a>
          {:else}
            <button
              type="button"
              class="nav-link"
              class:active={isItemActive(item)}
              aria-haspopup={hasChildren ? "true" : undefined}
            >
              {#if item.icon}<span class="nav-icon"><item.icon size={16} /></span>{/if}
              <span class="nav-label">{item.label}</span>
              {#if showBadge}<span class="nav-badge">{item.badge}</span>{/if}
              {#if hasChildren}
                <span class="nav-chevron"><ChevronDown size={13} /></span>
              {/if}
            </button>
          {/if}

          {#if hasChildren}
            <div class="dropdown" role="menu">
              {#each item.children! as child}
                <a
                  href={child.href}
                  class="dropdown-item"
                  class:active={isItemActive(child)}
                  role="menuitem"
                  aria-current={isItemActive(child) ? "page" : undefined}
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
          {#if menuOpen && mobileMenu === "fullscreen"}
            <X size={20} />
          {:else}
            <Menu size={20} />
          {/if}
        </button>
      </span>
    </div>
  </div>
</header>

<!-- ── DRAWER ── slide depuis la droite + backdrop -->
{#if menuOpen && mobileMenu === "drawer"}
  <div
    class="backdrop"
    transition:fade={{ duration: 220 }}
    onclick={close}
    role="presentation"
    aria-hidden="true"
  ></div>
  <nav
    class="mobile-drawer"
    aria-label="Navigation mobile"
    transition:fly={{ x: 300, duration: 260, easing: cubicOut }}
  >
    <div class="drawer-header">
      {#if brand}{@render brand()}{/if}
      <button type="button" class="drawer-close" onclick={close} aria-label="Fermer">
        <X size={20} />
      </button>
    </div>
    <div class="drawer-items">
      {@render mobileItems()}
    </div>
    {#if actionBtn}
      <div class="drawer-footer">{@render actionBtn()}</div>
    {/if}
  </nav>
{/if}

<!-- ── POPOVER ── dropdown flottant sous le hamburger -->
{#if menuOpen && mobileMenu === "popover"}
  <nav
    class="mobile-popover"
    aria-label="Navigation mobile"
    transition:fly={{ y: -8, duration: 180 }}
  >
    {@render mobileItems()}
  </nav>
{/if}

<!-- ── FULLSCREEN ── overlay plein écran -->
{#if menuOpen && mobileMenu === "fullscreen"}
  <div
    class="mobile-fullscreen"
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-label="Navigation mobile"
  >
    <button type="button" class="fs-close" onclick={close} aria-label="Fermer">
      <X size={24} />
    </button>
    <nav class="fs-items">
      {@render mobileItems()}
    </nav>
    {#if actionBtn}
      <div class="fs-footer">{@render actionBtn()}</div>
    {/if}
  </div>
{/if}

<style>
  /* ── Navbar ── */
  .navbar {
    background: var(--bg-base);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
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
    height: var(--header-height);
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

  .nav-item-wrap.has-dropdown:hover .dropdown,
  .nav-item-wrap.has-dropdown:focus-within .dropdown {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .nav-item-wrap.has-dropdown:hover .nav-chevron,
  .nav-item-wrap.has-dropdown:focus-within .nav-chevron {
    transform: rotate(180deg);
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: var(--radius-md);
    font-size: 14px;
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
  }

  .nav-chevron {
    display: flex;
    align-items: center;
    color: var(--text-subtle);
    transition: transform var(--transition-fast);
  }

  /* ── Desktop dropdown ── */
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
    z-index: 101;
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

  /* ── Actions / hamburger ── */
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

  /* ── Shared mobile items ── */
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

  /* ── Backdrop ── */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 199;
  }

  /* ── DRAWER ── */
  .mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    background: var(--bg-base);
    border-left: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    z-index: 200;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 12px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .drawer-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    margin-left: auto;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }
  }

  .drawer-items {
    flex: 1;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .drawer-footer {
    padding: 12px 16px 20px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .drawer-footer :global(.btn) {
    width: 100%;
    justify-content: center;
  }

  /* ── POPOVER ── */
  .mobile-popover {
    position: fixed;
    top: 68px;
    right: 16px;
    width: 260px;
    max-height: calc(100vh - 84px);
    overflow-y: auto;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 200;
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  /* ── FULLSCREEN ── */
  .mobile-fullscreen {
    position: fixed;
    inset: 0;
    background: var(--bg-base);
    z-index: 200;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .fs-close {
    position: absolute;
    top: 16px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
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
  }

  .fs-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 32px 32px;
    gap: 4px;
  }

  /* Bigger items in fullscreen */
  .mobile-fullscreen .mobile-link {
    font-size: 22px;
    font-weight: 500;
    padding: 14px 12px;
  }

  .mobile-fullscreen .mobile-sub-link {
    font-size: 16px;
    padding: 10px 12px;
  }

  .mobile-fullscreen .mobile-icon :global(svg) {
    width: 22px;
    height: 22px;
  }

  .fs-footer {
    padding: 16px 32px 32px;
    border-top: 1px solid var(--border);
  }

  .fs-footer :global(.btn) {
    width: 100%;
    justify-content: center;
  }

  /* .cta-mobile :global(.btn) { width: 100%; justify-content: center; } */

  /* ── Responsive ── */
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
