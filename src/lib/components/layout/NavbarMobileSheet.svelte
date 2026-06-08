<script lang="ts" module>
  import type { Component } from "svelte";

  export type SheetNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    badge?: number | string;
    onclick?: () => void;
    children?: SheetNavItem[];
  };
</script>

<script lang="ts">
  import { Menu, X, ChevronDown } from "@lucide/svelte";
  import { browser } from "$app/environment";
  import { fade, slide } from "svelte/transition";
  import { goto } from "$app/navigation";

  let {
    items = [],
    icon: TriggerIcon = Menu,
    title = "",
  }: {
    items?: SheetNavItem[];
    /** FAB trigger icon. */
    icon?: Component;
    /** Title displayed in the sheet header. */
    title?: string;
  } = $props();

  let open = $state(false);
  let expanded = $state(new Set<number>());
  let dragY = $state(0);
  let dragging = $state(false);
  let dragY0 = 0;

  function closeMenu() {
    open = false;
    dragY = 0;
  }

  function toggleExpand(i: number) {
    const next = new Set(expanded);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    expanded = next;
  }

  function navigate(item: SheetNavItem) {
    closeMenu();
    if (item.href) goto(item.href);
    else item.onclick?.();
  }

  function onHandleDown(e: PointerEvent) {
    if ((e.target as HTMLElement).closest('.close-btn')) return;
    dragging = true;
    dragY0 = e.clientY;
    dragY = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onHandleMove(e: PointerEvent) {
    if (!dragging) return;
    dragY = Math.max(0, e.clientY - dragY0);
  }

  function onHandleUp() {
    if (!dragging) return;
    dragging = false;
    if (dragY > 120) closeMenu();
    else dragY = 0;
  }

  $effect(() => {
    if (!browser) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  $effect(() => {
    if (!browser) return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  });
</script>

<!-- FAB trigger — no fixed position, wrap in <FloatingGroup> -->
<button
  type="button"
  class="fab"
  class:open
  onclick={() => { if (open) closeMenu(); else open = true; }}
  aria-label="Ouvrir le menu"
  aria-expanded={open}
  aria-haspopup="dialog"
>
  <span class="fab-open"><TriggerIcon size={22} /></span>
  <span class="fab-close"><X size={22} /></span>
</button>

<!-- Backdrop -->
{#if open}
  <div
    class="backdrop"
    role="presentation"
    aria-hidden="true"
    transition:fade={{ duration: 260 }}
    onclick={closeMenu}
  ></div>
{/if}

<!-- Sheet -->
<div
  class="sheet"
  class:open
  class:dragging
  role="dialog"
  aria-modal="true"
  aria-label={title || "Menu"}
  style="--drag-y: {dragY}px"
>
  <!-- Drag handle — initiates swipe-to-close -->
  <div
    class="sheet-handle"
    onpointerdown={onHandleDown}
    onpointermove={onHandleMove}
    onpointerup={onHandleUp}
    onpointercancel={onHandleUp}
  >
    <div class="handle-bar"></div>
    <div class="sheet-header">
      {#if title}<span class="sheet-title">{title}</span>{/if}
      <button type="button" class="close-btn" onclick={closeMenu} aria-label="Fermer">
        <X size={20} />
      </button>
    </div>
  </div>

  <!-- Scrollable item list -->
  <div class="sheet-body">
    {#each items as item, i}
      {@const hasChildren = (item.children?.length ?? 0) > 0}
      {@const isExpanded = expanded.has(i)}

      <div class="item-group">
        {#if item.href}
          <a
            href={item.href}
            class="sheet-item"
            class:active={item.active}
            onclick={(e) => {
              e.preventDefault();
              if (hasChildren) toggleExpand(i);
              else navigate(item);
            }}
          >
            <span class="item-icon"><item.icon size={20} /></span>
            <span class="item-label">{item.label}</span>
            {#if item.badge !== undefined}
              <span class="item-badge">{item.badge}</span>
            {/if}
            {#if hasChildren}
              <span class="item-chevron" class:expanded={isExpanded}
                ><ChevronDown size={16} /></span
              >
            {/if}
          </a>
        {:else}
          <button
            type="button"
            class="sheet-item"
            class:active={item.active}
            onclick={() => {
              if (hasChildren) toggleExpand(i);
              else navigate(item);
            }}
          >
            <span class="item-icon"><item.icon size={20} /></span>
            <span class="item-label">{item.label}</span>
            {#if item.badge !== undefined}
              <span class="item-badge">{item.badge}</span>
            {/if}
            {#if hasChildren}
              <span class="item-chevron" class:expanded={isExpanded}
                ><ChevronDown size={16} /></span
              >
            {/if}
          </button>
        {/if}

        {#if hasChildren && isExpanded}
          <div class="item-children" transition:slide={{ duration: 220 }}>
            {#each item.children! as child}
              {#if child.href}
                <a
                  href={child.href}
                  class="sheet-item sheet-item--child"
                  class:active={child.active}
                  onclick={(e) => {
                    e.preventDefault();
                    navigate(child);
                  }}
                >
                  <span class="item-icon"><child.icon size={18} /></span>
                  <span class="item-label">{child.label}</span>
                  {#if child.badge !== undefined}
                    <span class="item-badge">{child.badge}</span>
                  {/if}
                </a>
              {:else}
                <button
                  type="button"
                  class="sheet-item sheet-item--child"
                  class:active={child.active}
                  onclick={() => navigate(child)}
                >
                  <span class="item-icon"><child.icon size={18} /></span>
                  <span class="item-label">{child.label}</span>
                  {#if child.badge !== undefined}
                    <span class="item-badge">{child.badge}</span>
                  {/if}
                </button>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  /* ── FAB trigger ── */
  .fab {
    position: relative;
    z-index: 1001;
    width: 56px;
    height: 56px;
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

  .fab-open,
  .fab-close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity   0.22s ease,
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .fab-open  { opacity: 1; transform: rotate(0deg)   scale(1); }
  .fab-close { opacity: 0; transform: rotate(-90deg) scale(0.4); }

  .fab.open .fab-open  { opacity: 0; transform: rotate(90deg) scale(0.4); }
  .fab.open .fab-close { opacity: 1; transform: rotate(0deg)  scale(1); }

  /* ── Backdrop ── */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 998;
  }

  /* ── Sheet ─────────────────────────────────────────────────────────────────
     Slides up from the bottom. --drag-y moves it down while swiping.
  ── */
  .sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100dvh;
    background: var(--bg-base);
    border-radius: 24px 24px 0 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(100%);
    transition: transform 0.42s cubic-bezier(0.32, 0.72, 0, 1);
    will-change: transform;
  }

  .sheet.open {
    transform: translateY(var(--drag-y));
  }
  .sheet.dragging {
    transition: none;
  }

  /* ── Drag handle ── */
  .sheet-handle {
    padding: 12px 20px 8px;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: grab;
    flex-shrink: 0;

    &:active {
      cursor: grabbing;
    }
  }

  .handle-bar {
    width: 40px;
    height: 4px;
    background: var(--border-strong);
    border-radius: 2px;
    margin: 0 auto 12px;
  }

  .sheet-header {
    display: flex;
    align-items: center;
    min-height: 28px;
  }

  .sheet-title {
    font-size: 16px;
    font-weight: 700;
    font-family: var(--font-sans);
    color: var(--text-heading);
    flex: 1;
  }

  .close-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--bg-hover);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-subtle);
      color: var(--text-base);
    }
  }

  /* ── Scrollable body ── */
  .sheet-body {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: env(safe-area-inset-bottom, 16px);
  }

  /* ── Items ── */
  .sheet-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 20px;
    height: 52px;
    width: 100%;
    text-align: left;
    text-decoration: none;
    color: var(--text-muted);
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    font-family: var(--font-sans);
    position: relative;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }
  }

  .sheet-item.active {
    color: var(--primary);
    background: var(--primary-subtle);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 3px;
      background: var(--primary);
      border-radius: 0 2px 2px 0;
    }
  }

  /* Child items — indented to align with parent label */
  .sheet-item--child {
    height: 44px;
    font-size: 14px;
    font-weight: 400;
    padding-left: 54px;
  }

  .item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 24px;
  }

  .item-label {
    flex: 1;
  }

  .item-badge {
    flex-shrink: 0;
    font-size: 11px;
    font-weight: 700;
    font-family: var(--font-sans);
    background: var(--primary);
    color: var(--primary-fg);
    padding: 2px 7px;
    border-radius: var(--radius-full);
    line-height: 1.4;
    min-width: 20px;
    text-align: center;
  }

  .item-chevron {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--text-subtle);
    transition: transform 0.22s ease;
  }

  .item-chevron.expanded {
    transform: rotate(-180deg);
  }
</style>
