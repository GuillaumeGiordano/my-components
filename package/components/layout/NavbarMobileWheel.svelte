<script lang="ts">
  import type { Component } from 'svelte';
  import { Menu, X } from '@lucide/svelte';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  export type WheelNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    onclick?: () => void;
  };

  let {
    items = [],
    activeHref = '',
    radius = 170,
  }: {
    items?: WheelNavItem[];
    activeHref?: string;
    radius?: number;
  } = $props();

  // Clip container: 320×240px, circle center at its bottom-right corner.
  // At slot step 22.5°:
  //   k=-2 → angle 90°  → item center at clip right edge  = half cut ✓
  //   k=+2 → angle 180° → item center at clip bottom edge = half cut ✓
  const CLIP_W = 320;
  const CLIP_H = 240;
  const CX = CLIP_W;
  const CY = CLIP_H;
  const ACTIVE_ANGLE = 135; // degrees — slot k=0 (active)
  const VISUAL_STEP = 22.5; // degrees between each visual slot
  const ITEM_SIZE = 52;

  // Active ring position in clip coords (stays static, always at ACTIVE_ANGLE)
  const SLOT_X = $derived(CX + radius * Math.cos((ACTIVE_ANGLE * Math.PI) / 180));
  const SLOT_Y = $derived(CY - radius * Math.sin((ACTIVE_ANGLE * Math.PI) / 180));

  let open = $state(false);
  // Continuous scroll position: integer n means item n is in the active slot.
  let scrollPos = $state(0);
  let hoveredSlot = $state(99); // k of hovered slot (-2..2), 99 = none
  let snapping = false;

  const count = $derived(items.length);

  // Item index at visual slot k
  function slotItem(k: number): number {
    const n = Math.round(scrollPos);
    return ((n + k) % count + count) % count;
  }

  // Visual angle for slot k (moves smoothly with scrollPos)
  function slotAngle(k: number): number {
    const frac = scrollPos - Math.round(scrollPos); // in [-0.5, 0.5]
    return ACTIVE_ANGLE + (k - frac) * VISUAL_STEP;
  }

  // Top-left position of slot k in clip coords
  function slotPos(k: number) {
    const rad = (slotAngle(k) * Math.PI) / 180;
    return {
      x: CX + radius * Math.cos(rad) - ITEM_SIZE / 2,
      y: CY - radius * Math.sin(rad) - ITEM_SIZE / 2,
    };
  }

  // Which item is currently active (at k=0)
  const activeIndex = $derived(((Math.round(scrollPos)) % count + count) % count);

  // Slots to render — dedup so the same item never appears twice
  // (needed for count < 5 where items cycle through the 5-slot window)
  const visibleSlots = $derived.by(() => {
    if (count === 0) return [] as number[];
    const seen = new Set<number>();
    const result: number[] = [];
    for (const k of [0, -1, 1, -2, 2]) {
      const i = slotItem(k);
      if (!seen.has(i)) { seen.add(i); result.push(k); }
    }
    return result;
  });

  // Arc length per degree at this radius → items/px conversion
  const itemsPerPx = $derived(1 / (radius * (VISUAL_STEP * Math.PI) / 180));

  let animId = 0;

  function snapToIndex(i: number) {
    // Find nearest integer n where n % count === i
    const k = Math.round((scrollPos - i) / count);
    const target = i + k * count;
    animateTo(target, i);
  }

  function animateTo(target: number, i: number) {
    const start = scrollPos;
    const delta = target - start;
    const dur = 340;
    const t0 = performance.now();
    snapping = true;

    cancelAnimationFrame(animId);
    function step(t: number) {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      scrollPos = start + delta * e;
      if (p < 1) {
        animId = requestAnimationFrame(step);
      } else {
        scrollPos = target;
        navigateTo(items[i]);
        setTimeout(() => { snapping = false; }, 500);
      }
    }
    animId = requestAnimationFrame(step);
  }

  function navigateTo(item: WheelNavItem | undefined) {
    if (!item) return;
    if (item.href) {
      if (item.href.startsWith('#')) {
        document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      } else {
        goto(item.href);
      }
    }
    item.onclick?.();
  }

  // ── Drag ────────────────────────────────────────────────────────────────
  let dragActive = false;
  let dragY0 = 0;
  let scroll0 = 0;
  let lastDY = 0;
  let lastDT = 0;
  let velPx = 0; // pixels/ms (negative = upward swipe)
  let hasMoved = false;

  function onDragStart(e: PointerEvent) {
    dragActive = true;
    hasMoved = false;
    dragY0 = e.clientY;
    lastDY = e.clientY;
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
    if (dt > 0) velPx = (e.clientY - lastDY) / dt;
    lastDY = e.clientY;
    lastDT = now;
    const dy = e.clientY - dragY0;
    if (Math.abs(dy) > 5) hasMoved = true;
    // Drag up (dy < 0) → scrollPos increases (next items come from below)
    scrollPos = scroll0 - dy * itemsPerPx;
  }

  function onDragEnd(e: PointerEvent) {
    if (!dragActive) return;
    dragActive = false;

    if (!hasMoved) {
      // Tap: navigate to tapped slot
      const el = (e.target as HTMLElement)?.closest('[data-slot]') as HTMLElement | null;
      if (el !== null) {
        const k = parseInt(el.dataset.slot!);
        snapToIndex(slotItem(k));
      }
      return;
    }

    // Inertia: project ~100ms forward
    const projected = scrollPos + (-velPx) * 100 * itemsPerPx;
    const target = Math.round(projected);
    snapToIndex(((target % count) + count) % count);
  }

  // ── Page scroll → wheel sync ─────────────────────────────────────────
  $effect(() => {
    if (!browser || !open) return;
    const obs: IntersectionObserver[] = [];
    items.forEach((item, i) => {
      if (!item.href?.startsWith('#')) return;
      const el = document.getElementById(item.href.slice(1));
      if (!el) return;
      const o = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !snapping && i !== activeIndex) {
          snapToIndex(i);
        }
      }, { threshold: 0.5 });
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  });

  // ── Init from activeHref ─────────────────────────────────────────────
  $effect(() => {
    const i = items.findIndex(it => it.href === activeHref || it.active);
    if (i >= 0) scrollPos = i;
  });

  // ── Keyboard ─────────────────────────────────────────────────────────
  $effect(() => {
    if (!browser) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') open = false; };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });
</script>

{#if open}
  <div
    class="backdrop"
    role="presentation"
    aria-hidden="true"
    transition:fade={{ duration: 200 }}
    onclick={() => { open = false; }}
  ></div>

  <div
    class="wheel-clip"
    role="presentation"
    aria-hidden="true"
    transition:fade={{ duration: 180 }}
    onpointerdown={onDragStart}
    onpointermove={onDragMove}
    onpointerup={onDragEnd}
    onpointercancel={onDragEnd}
  >
    <!-- Static active slot ring -->
    <div class="active-ring" style="left:{SLOT_X}px; top:{SLOT_Y}px"></div>

    {#each visibleSlots as k}
      {@const i = slotItem(k)}
      {@const pos = slotPos(k)}
      {@const item = items[i]}
      {@const active = k === 0}
      {@const hovered = hoveredSlot === k}

      {#if item}
        {#if item.href}
          <a
            href={item.href}
            class="nav-item"
            class:active
            class:hovered
            style="--x:{pos.x}px; --y:{pos.y}px"
            data-slot={k}
            aria-label={item.label}
            onclick={(e) => e.preventDefault()}
            onpointerenter={() => (hoveredSlot = k)}
            onpointerleave={() => { if (hoveredSlot === k) hoveredSlot = 99; }}
          >
            <span class="nav-icon"><item.icon size={20} /></span>
            <span class="nav-label">{item.label}</span>
          </a>
        {:else}
          <button
            type="button"
            class="nav-item"
            class:active
            class:hovered
            style="--x:{pos.x}px; --y:{pos.y}px"
            data-slot={k}
            aria-label={item.label}
            onclick={(e) => e.preventDefault()}
            onpointerenter={() => (hoveredSlot = k)}
            onpointerleave={() => { if (hoveredSlot === k) hoveredSlot = 99; }}
          >
            <span class="nav-icon"><item.icon size={20} /></span>
            <span class="nav-label">{item.label}</span>
          </button>
        {/if}
      {/if}
    {/each}
  </div>
{/if}

<nav class="wheel-nav" aria-label="Navigation mobile par roue">
  <button
    type="button"
    class="fab"
    class:open
    onclick={() => (open = !open)}
    aria-label={open ? 'Fermer la navigation' : 'Ouvrir la navigation'}
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

  /* ── Wheel clip container ──
     Right edge and bottom edge are at the FAB center (right:52, bottom:52).
     Circle center is at clip's bottom-right corner = FAB center.
     overflow:hidden is the only clipping needed.
  ── */
  .wheel-clip {
    position: fixed;
    right: 52px;
    bottom: 52px;
    width: 320px;
    height: 240px;
    overflow: hidden;
    z-index: 999;
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;

    &:active { cursor: grabbing; }
  }

  /* ── Active slot ring (always at ACTIVE_ANGLE = 135°) ── */
  .active-ring {
    position: absolute;
    width: 68px;
    height: 68px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid var(--primary);
    background: color-mix(in srgb, var(--primary) 10%, transparent);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent),
      0 0 20px color-mix(in srgb, var(--primary) 22%, transparent);
    pointer-events: none;
    z-index: 2;
  }

  /* ── Nav items ── */
  .nav-item {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: 52px;
    height: 52px;
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
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast),
      transform var(--transition-fast),
      box-shadow var(--transition-fast);
    z-index: 1;

    &.active {
      background: var(--primary-subtle);
      color: var(--primary);
      border-color: color-mix(in srgb, var(--primary) 35%, transparent);
      z-index: 3;
    }

    &.hovered {
      background: var(--bg-hover);
      color: var(--text-base);
      transform: scale(1.1);
      box-shadow: var(--shadow-lg);
      z-index: 4;
    }

    &.active.hovered {
      background: var(--primary-subtle);
    }
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* ── Label pill ── */
  .nav-label {
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
    opacity: 0;
    transition: opacity 0.15s ease;
    z-index: 10;

    &::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-left-color: var(--text-heading);
    }
  }

  .nav-item.active .nav-label,
  .nav-item.hovered .nav-label {
    opacity: 1;
  }

  /* ── FAB container ── */
  .wheel-nav {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    z-index: 1000;
  }

  /* ── FAB button ── */
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
    user-select: none;
    -webkit-user-select: none;

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

  .fab-menu { opacity: 1; transform: rotate(0) scale(1); }
  .fab-close { opacity: 0; transform: rotate(-90deg) scale(0.4); }

  .open .fab-menu { opacity: 0; transform: rotate(90deg) scale(0.4); }
  .open .fab-close { opacity: 1; transform: rotate(0) scale(1); }
</style>
