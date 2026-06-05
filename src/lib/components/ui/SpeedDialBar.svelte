<script lang="ts" module>
  import type { Component } from "svelte";

  export type SpeedDialBarSubItem = {
    icon: Component;
    label: string;
    onclick?: () => void;
  };

  export type SpeedDialBarItem = {
    icon: Component;
    label: string;
    onclick?: () => void;
    active?: boolean;

    children?: SpeedDialBarSubItem[];
  };
</script>

<script lang="ts">
  import { Settings, X } from "@lucide/svelte";
  import { browser } from "$app/environment";
  import { fade, fly } from "svelte/transition";

  let {
    items = [],
    icon: TriggerIcon = Settings,
    nVisible = 5,
  }: {
    items?: SpeedDialBarItem[];
    /** FAB trigger icon. */
    icon?: Component;
    /** Number of item slots visible simultaneously. */
    nVisible?: number;
  } = $props();

  // ── Geometry ──────────────────────────────────────────────────────────
  const ITEM_SIZE = 48;
  const ITEM_GAP = 10;
  const ITEM_STEP = ITEM_SIZE + ITEM_GAP;

  // Clip width = space for nVisible items + left/right padding
  const clipWidth = $derived(nVisible * ITEM_STEP + ITEM_GAP);

  // Scrollbar thumb geometry
  const trackWidth = $derived(count > 0 ? clipWidth - 2 * ITEM_GAP : 0);
  const thumbW = $derived(count > 0 ? trackWidth / count : 0);
  const thumbX = $derived(
    count > 0 ? (((scrollPos % count) + count) % count) * thumbW : 0,
  );

  let open = $state(false);
  let scrollPos = $state(0);
  let openSubIdx = $state(-1);
  let subAnchorX = $state(0);
  let subAnchorBottom = $state(0);

  const count = $derived(items.length);
  const itemsPerPx = 1 / ITEM_STEP;

  function slotItem(k: number): number {
    const n = Math.round(scrollPos);
    return (((n + k) % count) + count) % count;
  }

  function slotX(k: number): number {
    const frac = scrollPos - Math.round(scrollPos);
    return (k - frac) * ITEM_STEP + ITEM_GAP;
  }

  const visibleSlots = $derived.by(() => {
    if (count === 0) return [] as number[];
    const seen = new Set<number>();
    const result: number[] = [];
    for (let k = -1; k <= nVisible; k++) {
      const i = slotItem(k);
      if (!seen.has(i)) {
        seen.add(i);
        result.push(k);
      }
    }
    return result;
  });

  // ── Snap / animate ────────────────────────────────────────────────────
  let animId = 0;
  let snapping = false;

  function animateTo(target: number) {
    const start = scrollPos;
    const delta = target - start;
    if (Math.abs(delta) < 0.001) {
      scrollPos = target;
      return;
    }
    const dur = 280;
    const t0 = performance.now();
    snapping = true;
    cancelAnimationFrame(animId);

    function step(t: number) {
      const p = Math.min((t - t0) / dur, 1);
      scrollPos = start + delta * (1 - Math.pow(1 - p, 3));
      if (p < 1) {
        animId = requestAnimationFrame(step);
      } else {
        scrollPos = target;
        setTimeout(() => {
          snapping = false;
        }, 150);
      }
    }
    animId = requestAnimationFrame(step);
  }

  // ── Drag ─────────────────────────────────────────────────────────────
  let dragActive = $state(false);
  let dragX0 = 0;
  let scroll0 = 0;
  let lastDX = 0;
  let lastDT = 0;
  let velPx = 0;
  let hasMoved = false;

  function onDragStart(e: PointerEvent) {
    if (!open) return;
    dragActive = true;
    hasMoved = false;
    dragX0 = e.clientX;
    lastDX = e.clientX;
    lastDT = Date.now();
    scroll0 = scrollPos;
    velPx = 0;
    cancelAnimationFrame(animId);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onDragMove(e: PointerEvent) {
    if (!dragActive) return;
    const now = Date.now();
    const dt = now - lastDT;
    if (dt > 0) velPx = (e.clientX - lastDX) / dt;
    lastDX = e.clientX;
    lastDT = now;
    const dx = e.clientX - dragX0;
    if (Math.abs(dx) > 5) hasMoved = true;
    scrollPos = scroll0 - dx * itemsPerPx;
  }

  function onDragEnd(e: PointerEvent) {
    if (!dragActive) return;
    dragActive = false;

    if (!hasMoved) {
      const el = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest("[data-slot]") as HTMLElement | null;
      if (el) {
        const k = parseInt(el.dataset.slot!);
        const i = slotItem(k);
        const rect = el.getBoundingClientRect();
        subAnchorX = rect.left + rect.width / 2;
        subAnchorBottom = window.innerHeight - rect.top + 6;
        handleItemTap(i);
      } else {
        openSubIdx = -1;
      }
      return;
    }

    openSubIdx = -1;

    const projected = scrollPos + -velPx * 80 * itemsPerPx;
    const raw = Math.round(projected);
    const target = ((raw % count) + count) % count;
    const k = Math.round((scrollPos - target) / count);
    animateTo(target + k * count);
  }

  function handleItemTap(i: number) {
    const item = items[i];
    if (!item) return;
    if (item.children?.length) {
      openSubIdx = openSubIdx === i ? -1 : i;
    } else {
      openSubIdx = -1;
      item.onclick?.();
    }
  }

  function handleSubClick(sub: SpeedDialBarSubItem) {
    openSubIdx = -1;
    sub.onclick?.();
  }

  function toggleOpen() {
    open = !open;
    if (!open) openSubIdx = -1;
  }

  $effect(() => {
    if (!browser) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openSubIdx >= 0) {
          openSubIdx = -1;
          return;
        }
        open = false;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
</script>

<!-- Main backdrop — closes menu on outside click -->
{#if open}
  <div
    class="backdrop"
    role="presentation"
    aria-hidden="true"
    transition:fade={{ duration: 220 }}
    onclick={toggleOpen}
  ></div>
{/if}

<!-- Sub-items backdrop -->
{#if open && openSubIdx >= 0}
  <div
    class="sub-backdrop"
    role="presentation"
    aria-hidden="true"
    transition:fade={{ duration: 150 }}
    onclick={() => {
      openSubIdx = -1;
    }}
  ></div>
{/if}

<!-- Sub-items panel — floats above the tapped item -->
{#if open && openSubIdx >= 0}
  {@const subItems = items[openSubIdx]?.children ?? []}
  {#if subItems.length > 0}
    <div
      class="sub-panel"
      style="left:{subAnchorX}px; bottom:{subAnchorBottom}px"
      role="menu"
      transition:fly={{ y: 14, duration: 200 }}
    >
      {#each subItems as sub}
        <button
          type="button"
          class="sub-item"
          role="menuitem"
          aria-label={sub.label}
          onclick={() => handleSubClick(sub)}
        >
          <span class="sub-icon"><sub.icon size={18} /></span>
          <span class="sub-label">{sub.label}</span>
        </button>
      {/each}
    </div>
  {/if}
{/if}

<!-- FAB + sliding pill tray -->
<div
  class="sdb"
  class:open
  style="--clip-width:{clipWidth}px"
  aria-label="Actions rapides"
>
  <!-- Pill — slides out to the left from behind the FAB -->
  <div class="sdb-pill">
    <div
      class="sdb-clip"
      onpointerdown={onDragStart}
      onpointermove={onDragMove}
      onpointerup={onDragEnd}
      onpointercancel={onDragEnd}
    >
      <!-- Scroll track + thumb -->
      <div class="sdb-track">
        <div class="sdb-thumb" style="--thumb-w:{thumbW}px; --thumb-x:{thumbX}px"></div>
      </div>

      {#each visibleSlots as k}
        {@const i = slotItem(k)}
        {@const item = items[i]}
        {@const x = slotX(k)}
        {@const isActive = (item.active ?? false) || openSubIdx === i}
        {@const hasChildren = (item.children?.length ?? 0) > 0}

        {#if item}
          <button
            type="button"
            class="sdb-item"
            class:active={isActive}
            class:has-children={hasChildren}
            style="--x:{x}px"
            data-slot={k}
            aria-label={item.label}
            aria-haspopup={hasChildren || undefined}
            aria-expanded={hasChildren ? openSubIdx === i : undefined}
            onclick={() => {}}
          >
            <span class="sdb-icon"><item.icon size={20} /></span>
            <span class="sdb-label">{item.label}</span>
          </button>
        {/if}
      {/each}
    </div>
  </div>

  <!-- FAB — sits above the pill (z-index: 1) -->
  <button
    type="button"
    class="fab"
    class:open
    onclick={toggleOpen}
    aria-label={open ? "Fermer" : "Ouvrir le menu"}
    aria-expanded={open}
    aria-haspopup="true"
  >
    <span class="fab-open"><TriggerIcon size={22} /></span>
    <span class="fab-close"><X size={22} /></span>
  </button>
</div>

<style>
  /* ── Main backdrop ── */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 997;
  }

  /* ── Sub-items backdrop ── */
  .sub-backdrop {
    position: fixed;
    inset: 0;
    z-index: 999;
  }

  /* ── Sub-items panel ────────────────────────────────────────────────────
     Anchored via viewport coordinates captured on tap (subAnchorX/Bottom).
  ── */
  .sub-panel {
    position: fixed;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 6px;
    z-index: 1000;
  }

  .sub-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px 8px 12px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    color: var(--text-muted);
    cursor: pointer;
    white-space: nowrap;
    box-shadow: var(--shadow-md);
    font-size: 13px;
    font-weight: 500;
    font-family: var(--font-sans);
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      box-shadow var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
      box-shadow: var(--shadow-lg);
    }
  }

  .sub-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sub-label {
    font-size: 13px;
    font-weight: 500;
  }

  /* ── Container ──────────────────────────────────────────────────────────
     No position: fixed — wrap in <FloatingGroup> for page-level anchoring.
  ── */
  .sdb {
    position: relative;
    width: 56px;
    height: 56px;
    z-index: 998;
    user-select: none;
    -webkit-user-select: none;
  }

  /* ── Pill — slides out to the left ──────────────────────────────────────
     border-radius: 31px left cap (pill height / 2), 28px right cap (FAB radius).
     The FAB (z-index: 1) sits on top and masks the right end.
  ── */
  .sdb-pill {
    position: absolute;
    right: -3px;
    top: 50%;
    translate: 0 -50%;
    height: 62px;
    width: 0;
    overflow: hidden;
    background: var(--bg-base);
    /* border: 1px solid var(--border); */
    border-radius: 31px 28px 28px 31px;
    box-shadow: var(--shadow-md);
    pointer-events: none;
    transition: width 0.38s cubic-bezier(0.34, 1.1, 0.64, 1);
  }

  .open .sdb-pill {
    width: var(--clip-width);
    pointer-events: auto;
  }

  /* ── Clip — right-aligned inside the pill ── */
  .sdb-clip {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: var(--clip-width);
    touch-action: none;
  }

  /* ── Scroll track + thumb ── */
  .sdb-track {
    position: absolute;
    bottom: 4px;
    left: 10px;
    right: 10px;
    height: 3px;
    background: color-mix(in srgb, var(--border) 80%, transparent);
    border-radius: 2px;
    pointer-events: none;
  }

  .open .sdb-track {
    opacity: 1;
  }

  .sdb-thumb {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--thumb-w);
    translate: var(--thumb-x) 0;
    background: var(--primary);
    border-radius: 2px;
    will-change: translate;
  }

  /* ── Items ──────────────────────────────────────────────────────────────
     `translate` updates instantly — real-time scroll tracking.
     The pill's overflow:hidden handles the open/close reveal.
  ── */
  .sdb-item {
    position: absolute;
    top: 50%;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    background: var(--bg-base);
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    will-change: translate;
    pointer-events: none;

    translate: var(--x) -50%;

    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast);
  }

  .open .sdb-item {
    pointer-events: auto;
  }

  .open .sdb-item:hover {
    background: var(--bg-hover);
    color: var(--text-base);
    scale: 1.08;
  }

  .open .sdb-item.active {
    background: var(--primary-subtle);
    color: var(--primary);
    border-color: color-mix(in srgb, var(--primary) 25%, transparent);
  }

  .open .sdb-item.active:hover {
    background: var(--primary-subtle);
  }

  .sdb-item.has-children::after {
    content: "";
    position: absolute;
    top: 5px;
    right: 5px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--primary);
    opacity: 0;
    transition: opacity var(--transition-fast);
  }

  .open .sdb-item.has-children::after {
    opacity: 1;
  }

  .sdb-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .sdb-label {
    font-size: 10px;
    font-weight: 600;
    font-family: var(--font-sans);
    color: inherit;
    pointer-events: none;
    max-width: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1;
  }

  /* ── FAB ── */
  .fab {
    position: absolute;
    inset: 0;
    z-index: 1;
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
      opacity 0.22s ease,
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .fab-open {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  .fab-close {
    opacity: 0;
    transform: rotate(-90deg) scale(0.4);
  }

  .open .fab-open {
    opacity: 0;
    transform: rotate(90deg) scale(0.4);
  }
  .open .fab-close {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
</style>
