<script lang="ts">
  import type { Snippet, Component } from "svelte";
  import { MoreHorizontal } from "@lucide/svelte";
  import { page } from "$app/state";

  type NavItem = {
    icon: Component;
    label: string;
    href: string;
  };

  let {
    items,
    moreLabel = "Plus",
    moreIcon: MoreIcon = MoreHorizontal,
    moreItems,
    fixed = true,
  }: {
    items: NavItem[];
    moreLabel?: string;
    moreIcon?: Component;
    moreItems?: Snippet<[() => void]>;
    fixed?: boolean;
  } = $props();

  let isMoreOpen = $state(false);
  let moreTriggerEl: HTMLButtonElement | null = $state(null);
  let moreMenuEl: HTMLDivElement | null = $state(null);
  let wasOpenOnMousedown = false;

  function reposition() {
    if (!moreTriggerEl || !moreMenuEl) return;
    const rect = moreTriggerEl.getBoundingClientRect();
    const mRect = moreMenuEl.getBoundingClientRect();
    moreMenuEl.style.top = `${rect.top - mRect.height - 8}px`;
    const left = rect.right - mRect.width;
    moreMenuEl.style.left = `${Math.max(8, left)}px`;
    moreMenuEl.style.minWidth = `${rect.width}px`;
  }

  function handleMousedown() {
    wasOpenOnMousedown = isMoreOpen;
  }

  function openMore() {
    if (!moreTriggerEl || !moreMenuEl || wasOpenOnMousedown) return;
    moreMenuEl.showPopover();
    reposition();
    window.addEventListener("scroll", reposition, { passive: true, capture: true });
  }

  function closeMore() {
    moreMenuEl?.hidePopover();
    window.removeEventListener("scroll", reposition, { capture: true });
  }
</script>

<nav class="mobile-nav" class:fixed aria-label="Navigation mobile">
  {#each items as item}
    {@const active = page.url.pathname === item.href}
    <a
      href={item.href}
      class="nav-item"
      class:active
      aria-current={active ? "page" : undefined}
    >
      <span class="nav-icon"><item.icon size={22} /></span>
      <span class="nav-label">{item.label}</span>
    </a>
  {/each}

  {#if moreItems}
    <button
      class="nav-item"
      class:active={isMoreOpen}
      bind:this={moreTriggerEl}
      onmousedown={handleMousedown}
      onclick={openMore}
      aria-haspopup="menu"
      aria-expanded={isMoreOpen}
    >
      <span class="nav-icon"><MoreIcon size={22} /></span>
      <span class="nav-label">{moreLabel}</span>
    </button>

    <div
      class="more-menu"
      popover="auto"
      bind:this={moreMenuEl}
      role="menu"
      ontoggle={(e) => {
        isMoreOpen = (e as ToggleEvent).newState === "open";
        if (!isMoreOpen) window.removeEventListener("scroll", reposition, { capture: true });
      }}
    >
      {@render moreItems(closeMore)}
    </div>
  {/if}
</nav>

<style>
  .mobile-nav {
    display: flex;
    align-items: stretch;
    background: var(--bg-base);
    border-top: 1px solid var(--border);
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 100;
    bottom: 0;
    left: 0;
    right: 0;
    transition: background var(--transition-base), border-color var(--transition-base);
  }

  .mobile-nav.fixed {
    position: fixed;
  }

  /* ---- Nav items ---- */
  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 4px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    color: var(--text-subtle);
    font-family: var(--font-sans);
    transition: color var(--transition-fast);
    min-width: 0;
  }

  .nav-item:hover {
    color: var(--text-muted);
  }

  .nav-item.active {
    color: var(--primary);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .nav-label {
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* ---- More menu popover ---- */
  .more-menu {
    position: fixed;
    inset: unset;
    margin: 0;
    padding: 4px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    display: none;
    flex-direction: column;
    gap: 1px;
    min-width: 180px;
    outline: none;

    &:popover-open {
      display: flex;
      animation: menu-in 0.18s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  @keyframes menu-in {
    from {
      transform: translateY(6px) scale(0.97);
    }
    to {
      transform: none;
    }
  }
</style>
