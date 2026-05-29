<script lang="ts">
  import type { Component } from "svelte";
  import { Menu, X } from "@lucide/svelte";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";

  export type RadialNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    onclick?: () => void;
  };

  let {
    items = [],
    activeHref = "",
    radius = 110,
  }: {
    items?: RadialNavItem[];
    activeHref?: string;
    radius?: number;
  } = $props();

  let open = $state(false);
  let hoveredIndex = $state(-1); // index of item currently under finger / pointer

  const count = $derived(items.length);

  // Non-reactive flags (don't need to trigger renders)
  let fabTouchActive = false;
  let justOpened = false;

  function itemStyle(i: number): string {
    const angle = count <= 1 ? 135 : 90 + (90 / (count - 1)) * i;
    const rad = (angle * Math.PI) / 180;
    const dx = radius * Math.cos(rad);
    const dy = -radius * Math.sin(rad);
    const delay = open ? i * 55 : (count - 1 - i) * 40;
    return `--dx:${dx}px;--dy:${dy}px;--delay:${delay}ms`;
  }

  // ── FAB touch — drag-to-select gesture ───────────────────────────────
  // touchstart: open menu immediately so items appear while finger is held
  function onFabTouchStart(e: TouchEvent) {
    e.preventDefault(); // prevents synthetic click and page scroll
    justOpened = !open;
    open = true;
    fabTouchActive = true;
    hoveredIndex = -1;
  }

  // touchmove: detect which item is under the finger using coordinates
  function onFabTouchMove(e: TouchEvent) {
    e.preventDefault();
    const t = e.changedTouches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    const navEl = el?.closest("[data-nav-index]") as HTMLElement | null;
    hoveredIndex = navEl !== null ? parseInt(navEl.dataset.navIndex!) : -1;
  }

  // touchend: navigate if finger is on an item, cancel if back on FAB
  function onFabTouchEnd(e: TouchEvent) {
    e.preventDefault();
    fabTouchActive = false;
    const idx = hoveredIndex;
    hoveredIndex = -1;

    if (idx >= 0) {
      // Released on item → navigate and close
      const item = items[idx];
      open = false;
      if (item.href) goto(item.href);
      item.onclick?.();
    } else if (!justOpened) {
      // Released on FAB (not a fresh open) → cancel = close menu
      open = false;
    }
    // If justOpened and no item selected → leave menu open for browsing
    justOpened = false;
  }

  function onFabTouchCancel() {
    fabTouchActive = false;
    hoveredIndex = -1;
    justOpened = false;
  }

  // ── FAB click (mouse / keyboard only — touch is handled above) ────────
  function onFabClick() {
    open = !open;
  }

  // ── Individual item touch — label on press, navigate on release ───────
  function onItemTouchStart(i: number) {
    if (fabTouchActive) return; // handled by FAB drag
    hoveredIndex = i;
  }

  function onItemTouchEnd() {
    if (fabTouchActive) return;
    hoveredIndex = -1;
    // Navigation is handled by the browser's synthetic click on the <a> / <button>
  }

  function onItemTouchCancel() {
    hoveredIndex = -1;
  }

  // ── Mouse pointer — label on hover ────────────────────────────────────
  function onItemPointerEnter(i: number) {
    hoveredIndex = i;
  }

  function onItemPointerLeave(i: number) {
    if (hoveredIndex === i) hoveredIndex = -1;
  }

  // ── Keyboard ──────────────────────────────────────────────────────────
  $effect(() => {
    if (!browser) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        open = false;
        hoveredIndex = -1;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
</script>

<!-- Backdrop -->
{#if open}
  <div
    class="backdrop"
    transition:fade={{ duration: 220 }}
    onclick={() => {
      open = false;
      hoveredIndex = -1;
    }}
    role="presentation"
    aria-hidden="true"
  ></div>
{/if}

<nav class="radial-nav" class:open aria-label="Navigation mobile">
  <!-- Items rendered before FAB so FAB stays on top -->
  {#each items as item, i}
    {@const isActive = item.active ?? (!!activeHref && activeHref === item.href)}

    {#if item.href}
      <a
        href={item.href}
        class="nav-item"
        class:active={isActive}
        class:touch-hovered={hoveredIndex === i}
        style={itemStyle(i)}
        data-nav-index={i}
        aria-label={item.label}
        onclick={() => {
          open = false;
          item.onclick?.();
        }}
        ontouchstart={() => onItemTouchStart(i)}
        ontouchend={onItemTouchEnd}
        ontouchcancel={onItemTouchCancel}
        onpointerenter={() => onItemPointerEnter(i)}
        onpointerleave={() => onItemPointerLeave(i)}
      >
        <span class="item-icon"><item.icon size={20} /></span>
        <span class="item-label">{item.label}</span>
      </a>
    {:else}
      <button
        type="button"
        class="nav-item"
        class:active={isActive}
        class:touch-hovered={hoveredIndex === i}
        style={itemStyle(i)}
        data-nav-index={i}
        aria-label={item.label}
        onclick={() => {
          open = false;
          item.onclick?.();
        }}
        ontouchstart={() => onItemTouchStart(i)}
        ontouchend={onItemTouchEnd}
        ontouchcancel={onItemTouchCancel}
        onpointerenter={() => onItemPointerEnter(i)}
        onpointerleave={() => onItemPointerLeave(i)}
      >
        <span class="item-icon"><item.icon size={20} /></span>
        <span class="item-label">{item.label}</span>
      </button>
    {/if}
  {/each}

  <!-- FAB toggle -->
  <button
    type="button"
    class="fab"
    onclick={onFabClick}
    ontouchstart={onFabTouchStart}
    ontouchmove={onFabTouchMove}
    ontouchend={onFabTouchEnd}
    ontouchcancel={onFabTouchCancel}
    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
    aria-expanded={open}
    aria-haspopup="true"
  >
    <span class="fab-menu"><Menu size={22} /></span>
    <span class="fab-close"><X size={22} /></span>
  </button>
</nav>

<style>
  /* ── Backdrop ── */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 998;
  }

  /* ── Container ── */
  .radial-nav {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    z-index: 999;
  }

  /* ── FAB ── */
  .fab {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-fg);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 4px 16px color-mix(in srgb, var(--primary) 50%, transparent),
      0 2px 8px rgba(0, 0, 0, 0.2);
    transition:
      transform var(--transition-base),
      background var(--transition-fast),
      box-shadow var(--transition-fast);
    z-index: 1;
    /* Prevent text selection on long press */
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;

    &:hover {
      background: var(--primary-hover);
      transform: scale(1.07);
      box-shadow:
        0 6px 22px color-mix(in srgb, var(--primary) 60%, transparent),
        0 3px 10px rgba(0, 0, 0, 0.25);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 3px;
    }
  }

  /* Icon crossfade: Menu → X */
  .fab-menu,
  .fab-close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 0.22s ease,
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .fab-menu {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
  .fab-close {
    opacity: 0;
    transform: rotate(-90deg) scale(0.4);
  }

  .open .fab-menu {
    opacity: 0;
    transform: rotate(90deg) scale(0.4);
  }
  .open .fab-close {
    opacity: 1;
    transform: rotate(0) scale(1);
  }

  /* ── Nav items ── */
  .nav-item {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg-base);
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    user-select: none;
    -webkit-user-select: none;

    /* Closed state */
    transform: translate(0, 0) scale(0);
    opacity: 0;
    pointer-events: none;

    transition:
      transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.25s ease,
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
    transition-delay: 0ms;
  }

  /* Open state */
  .open .nav-item {
    transform: translate(var(--dx), var(--dy)) scale(1);
    opacity: 1;
    pointer-events: auto;
    transition-delay: var(--delay);
  }

  /* Hover / touch-hovered — scale up */
  .open .nav-item:hover,
  .open .nav-item.touch-hovered {
    background: var(--bg-hover);
    color: var(--text-base);
    transform: translate(var(--dx), var(--dy)) scale(1.14);
    box-shadow: var(--shadow-lg);
    transition-delay: 0ms;
    z-index: 2;
  }

  /* Active item */
  .open .nav-item.active {
    background: var(--primary-subtle);
    color: var(--primary);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }

  .open .nav-item.active:hover,
  .open .nav-item.active.touch-hovered {
    background: var(--primary-subtle);
  }

  /* ── Item icon ── */
  .item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* ── Label pill ── */
  .item-label {
    position: absolute;
    right: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%);
    background: var(--text-heading);
    color: var(--bg-base);
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-sans);
    padding: 5px 12px;
    border-radius: var(--radius-full);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 10;
    /* Hidden by default */
    opacity: 0;
    transition: opacity 0.15s ease;
    z-index: 999;

    /* Arrow pointing right toward the item */
    &::after {
      content: "";
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-left-color: var(--text-heading);
    }
  }

  /* Show label on pointer hover (mouse) or touch-hovered (touch drag / press) */
  .open .nav-item:hover .item-label,
  .open .nav-item.touch-hovered .item-label {
    opacity: 1;
  }
</style>
