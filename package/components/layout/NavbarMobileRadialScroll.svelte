<script lang="ts" module>
  import type { Component } from 'svelte';

  export type RadialScrollItem = {
    icon:     Component;
    label:    string;
    href?:    string;
    active?:  boolean;
    onclick?: () => void;
  };
</script>

<script lang="ts">
  import { Menu, X } from '@lucide/svelte';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let {
    items      = [],
    activeHref = '',
    radius     = 150,
  }: {
    items?:      RadialScrollItem[];
    activeHref?: string;
    /** Arc radius in px. */
    radius?:     number;
  } = $props();

  // ── Geometry ──────────────────────────────────────────────────────────
  // 4 slots centered around 135° (the quarter-circle diagonal).
  // VISUAL_STEP = 27° → arc spans ≈ 94.5° – 175.5°, fully within the quadrant.
  const N_VISIBLE    = 4;
  const VISUAL_STEP  = 27;                       // degrees between adjacent slots
  const CENTER_ANGLE = 135;                      // center of the visible arc
  const SLOT_OFFSET  = (N_VISIBLE - 1) / 2;     // 1.5 — centers 4 slots

  let open        = $state(false);
  let scrollPos   = $state(0);   // continuous; integer n = item[n] at slot 0
  let hoveredSlot = $state(-1);

  const count      = $derived(items.length);
  const itemsPerPx = $derived(1 / (radius * (VISUAL_STEP * Math.PI) / 180));

  function slotItem(k: number): number {
    const n = Math.round(scrollPos);
    return (((n + k) % count) + count) % count;
  }

  function slotAngle(k: number): number {
    const frac = scrollPos - Math.round(scrollPos);
    return CENTER_ANGLE + (k - SLOT_OFFSET - frac) * VISUAL_STEP;
  }

  function slotDelta(k: number): { dx: number; dy: number } {
    const rad = (slotAngle(k) * Math.PI) / 180;
    return {
      dx:  radius * Math.cos(rad),
      dy: -radius * Math.sin(rad), // CSS y-axis is inverted
    };
  }

  // Dedup: never show the same item twice (matters when count < 4)
  const visibleSlots = $derived.by(() => {
    if (count === 0) return [] as number[];
    const seen   = new Set<number>();
    const result: number[] = [];
    for (const k of [0, 1, 2, 3]) {
      const i = slotItem(k);
      if (!seen.has(i)) { seen.add(i); result.push(k); }
    }
    return result;
  });

  // ── Snap / animate ────────────────────────────────────────────────────
  let animId   = 0;
  let snapping = false;

  function animateTo(target: number) {
    const start = scrollPos;
    const delta = target - start;
    if (Math.abs(delta) < 0.001) { scrollPos = target; return; }
    const dur = 320;
    const t0  = performance.now();
    snapping  = true;
    cancelAnimationFrame(animId);

    function step(t: number) {
      const p = Math.min((t - t0) / dur, 1);
      scrollPos = start + delta * (1 - Math.pow(1 - p, 3));
      if (p < 1) {
        animId = requestAnimationFrame(step);
      } else {
        scrollPos = target;
        setTimeout(() => { snapping = false; }, 200);
      }
    }
    animId = requestAnimationFrame(step);
  }

  // ── Drag ─────────────────────────────────────────────────────────────
  let dragActive = $state(false);
  let dragY0   = 0;
  let scroll0  = 0;
  let lastDY   = 0;
  let lastDT   = 0;
  let velPx    = 0;
  let hasMoved = false;

  function onDragStart(e: PointerEvent) {
    if (!open) return;
    if ((e.target as HTMLElement).closest('.fab')) return;
    dragActive = true;
    hasMoved   = false;
    dragY0     = e.clientY;
    lastDY     = e.clientY;
    lastDT     = Date.now();
    scroll0    = scrollPos;
    velPx      = 0;
    cancelAnimationFrame(animId);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onDragMove(e: PointerEvent) {
    if (!dragActive) return;
    const now = Date.now();
    const dt  = now - lastDT;
    if (dt > 0) velPx = (e.clientY - lastDY) / dt;
    lastDY    = e.clientY;
    lastDT    = now;
    const dy  = e.clientY - dragY0;
    if (Math.abs(dy) > 5) hasMoved = true;
    scrollPos = scroll0 - dy * itemsPerPx;
  }

  function onDragEnd(e: PointerEvent) {
    if (!dragActive) return;
    dragActive = false;

    if (!hasMoved) {
      // Tap — setPointerCapture redirects e.target, use coordinates instead
      const el = document.elementFromPoint(e.clientX, e.clientY)
        ?.closest('[data-slot]') as HTMLElement | null;
      if (el) navigateTo(slotItem(parseInt(el.dataset.slot!)));
      return;
    }

    // Inertia snap
    const projected = scrollPos + (-velPx) * 100 * itemsPerPx;
    const raw    = Math.round(projected);
    const target = ((raw % count) + count) % count;
    const k      = Math.round((scrollPos - target) / count);
    animateTo(target + k * count);
  }

  function navigateTo(i: number) {
    const item = items[i];
    if (!item) return;
    open = false;
    hoveredSlot = -1;
    if (item.href) {
      if (item.href.startsWith('#')) {
        document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      } else {
        goto(item.href);
      }
    }
    item.onclick?.();
  }

  // ── FAB ──────────────────────────────────────────────────────────────
  function onFabClick() {
    open = !open;
    if (!open) hoveredSlot = -1;
  }

  // ── Keyboard ─────────────────────────────────────────────────────────
  $effect(() => {
    if (!browser) return;
    const h = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape')    { open = false; hoveredSlot = -1; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); animateTo(Math.round(scrollPos) - 1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); animateTo(Math.round(scrollPos) + 1); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  // Init from activeHref / active flag
  $effect(() => {
    const i = items.findIndex(it => it.href === activeHref || it.active);
    if (i >= 0) scrollPos = i;
  });
</script>

{#if open}
  <div
    class="backdrop"
    role="presentation"
    aria-hidden="true"
    transition:fade={{ duration: 220 }}
    onclick={() => { open = false; hoveredSlot = -1; }}
  ></div>
{/if}

<nav
  class="rnav"
  class:open
  aria-label="Navigation mobile"
  onpointerdown={onDragStart}
  onpointermove={onDragMove}
  onpointerup={onDragEnd}
  onpointercancel={onDragEnd}
>
  <!--
    Grooved arc knob — visual affordance for scroll.
    Quarter-circle SVG, center at (88,88) = FAB center (right:28px, bottom:28px).
    radius 75px, between FAB edge (~26px) and items (~150px).
    stroke-dashoffset animates with scrollPos to show the arc turning.
  -->
  {#if open}
    <svg
      class="qknob"
      class:qknob--dragging={dragActive}
      viewBox="0 0 88 88"
      width="88"
      height="88"
      transition:fade={{ duration: 180 }}
      aria-hidden="true"
    >
      <path class="qk-base"   d="M 88 13 A 75 75 0 0 0 13 88" fill="none" stroke-width="18" stroke-linecap="butt" />
      <path class="qk-ridges" d="M 88 13 A 75 75 0 0 0 13 88" fill="none" stroke-width="16" stroke-linecap="butt"
            stroke-dasharray="6 5" style="stroke-dashoffset:{-scrollPos * 12}px" />
      <path class="qk-edge"   d="M 88 22 A 66 66 0 0 0 22 88" fill="none" stroke-width="1"  stroke-linecap="butt" />
      <path class="qk-edge"   d="M 88  4 A 84 84 0 0 0  4 88" fill="none" stroke-width="1"  stroke-linecap="butt" />
    </svg>
  {/if}

  {#each visibleSlots as k}
    {@const i      = slotItem(k)}
    {@const item   = items[i]}
    {@const delta  = slotDelta(k)}
    {@const isActive = item.active ?? (!!activeHref && activeHref === item.href)}
    {@const delay  = open ? k * 55 : (N_VISIBLE - 1 - k) * 35}
    {@const isPill = k === 3}

    {#if item}
      {#if item.href}
        <a
          href={item.href}
          class="nav-item"
          class:active={isActive}
          class:hovered={hoveredSlot === k}
          class:pill={isPill}
          style="--dx:{delta.dx}px; --dy:{delta.dy}px; --delay:{delay}ms"
          data-slot={k}
          aria-label={item.label}
          onclick={(e) => e.preventDefault()}
          onpointerenter={() => { hoveredSlot = k; }}
          onpointerleave={() => { if (hoveredSlot === k) hoveredSlot = -1; }}
        >
          <span class="nav-icon"><item.icon size={20} /></span>
          <span class="nav-label">{item.label}</span>
        </a>
      {:else}
        <button
          type="button"
          class="nav-item"
          class:active={isActive}
          class:hovered={hoveredSlot === k}
          class:pill={isPill}
          style="--dx:{delta.dx}px; --dy:{delta.dy}px; --delay:{delay}ms"
          data-slot={k}
          aria-label={item.label}
          onclick={() => {}}
          onpointerenter={() => { hoveredSlot = k; }}
          onpointerleave={() => { if (hoveredSlot === k) hoveredSlot = -1; }}
        >
          <span class="nav-icon"><item.icon size={20} /></span>
          <span class="nav-label">{item.label}</span>
        </button>
      {/if}
    {/if}
  {/each}

  <button
    type="button"
    class="fab"
    class:open
    onclick={onFabClick}
    aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
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
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 998;
  }

  /* ── Container ─────────────────────────────────────────────────────────
     No position: fixed here — wrap in <FloatingGroup position="bottom-right">
     for proper page-level anchoring.
  ── */
  .rnav {
    position: relative;
    width: 56px;
    height: 56px;
    z-index: 999;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
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
    width: 52px;
    height: 52px;
    box-shadow:
      0 4px 16px color-mix(in srgb, var(--primary) 50%, transparent),
      0 2px 8px rgba(0, 0, 0, 0.2);
    transition:
      transform var(--transition-base),
      background var(--transition-fast),
      box-shadow var(--transition-fast);
    z-index: 1;
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

  .fab-menu { opacity: 1; transform: rotate(0)   scale(1); }
  .fab-close { opacity: 0; transform: rotate(-90deg) scale(0.4); }

  .open .fab-menu { opacity: 0; transform: rotate(90deg)  scale(0.4); }
  .open .fab-close { opacity: 1; transform: rotate(0)     scale(1); }

  /* ── Nav items ──────────────────────────────────────────────────────────
     Uses individual CSS transform properties:
       translate — no transition, updates in real-time with scrollPos
       scale     — transitions for the open/close pop animation
  ── */
  .nav-item {
    position: absolute;
    bottom: 2px;
    right: 2px;
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
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
    will-change: translate;

    translate: var(--dx) var(--dy);
    scale: 0;
    opacity: 0;

    transition:
      scale        0.38s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay),
      opacity      0.25s ease                               var(--delay),
      background   var(--transition-fast),
      color        var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow   var(--transition-fast);
  }

  .open .nav-item {
    scale: 1;
    opacity: 1;
    pointer-events: auto;
  }

  .open .nav-item.active {
    background: var(--primary-subtle);
    color: var(--primary);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }

  .open .nav-item:hover,
  .open .nav-item.hovered {
    background: var(--bg-hover);
    color: var(--text-base);
    scale: 1.12;
    box-shadow: var(--shadow-lg);
    transition-delay: 0ms;
    z-index: 2;
  }

  .open .nav-item.active:hover,
  .open .nav-item.active.hovered {
    background: var(--primary-subtle);
  }

  /* ── Icon ── */
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
    user-select: none;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.15s ease;

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

  .open .nav-item:hover .nav-label,
  .open .nav-item.hovered .nav-label {
    opacity: 1;
  }

  /* ── Arc knob ──────────────────────────────────────────────────────────
     Positioned at right:28px; bottom:28px so its SVG center (88,88) aligns
     with the FAB center. Arc spans 90°→180°, the same quadrant as the items.
  ── */
  .qknob {
    position: absolute;
    right: 28px;
    bottom: 28px;
    z-index: 0;
    pointer-events: none;
  }

  .qk-base   { stroke: color-mix(in srgb, var(--bg-hover) 85%, var(--border)); transition: stroke var(--transition-fast); }
  .qk-ridges { stroke: color-mix(in srgb, var(--border) 80%, transparent);     transition: stroke var(--transition-fast); }
  .qk-edge   { stroke: var(--border); opacity: 0.6; }

  .qknob--dragging .qk-base   { stroke: color-mix(in srgb, var(--primary) 15%, var(--bg-hover)); }
  .qknob--dragging .qk-ridges { stroke: color-mix(in srgb, var(--primary) 55%, var(--border)); }
  .qknob--dragging .qk-edge   { stroke: color-mix(in srgb, var(--primary) 40%, var(--border)); opacity: 1; }

  /* ── k=3 pill — icon (right) + label always visible (left) ─────────────
     flex-direction: row-reverse puts the icon on the right (anchor side)
     and the label extending left toward open screen space.
  ── */
  .nav-item.pill {
    width: auto;
    border-radius: var(--radius-full);
    padding: 0 12px 0 16px;
    gap: 8px;
    flex-direction: row-reverse;
  }

  .nav-item.pill .nav-label {
    position: static;
    transform: none;
    opacity: 1;
    background: transparent;
    color: inherit;
    font-size: 13px;
    font-weight: 500;
    padding: 0;
    border-radius: 0;
    transition: color var(--transition-fast);

    &::after { display: none; }
  }

  .open .nav-item.pill:hover .nav-label,
  .open .nav-item.pill.hovered .nav-label {
    opacity: 1;
  }
</style>
