<script lang="ts">
  import type { Component } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  export type SectionNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    onclick?: () => void;
  };

  let {
    items = [],
    activeHref = '',
    // Height of the visible strip in px (≈ 25vh on an 800px screen)
    size = 200,
  }: {
    items?: SectionNavItem[];
    activeHref?: string;
    size?: number;
  } = $props();

  // Geometry:
  //   Circle center: (CLIP_W, size/2) — right edge, vertical center of strip.
  //   VISUAL_STEP = 22.5° between slots.
  //   k=-2 → 135° → item center at y=0 (top clip edge) = half cut ✓
  //   k=+2 → 225° → item center at y=size (bottom clip edge) = half cut ✓
  //   radius = (size/2) / sin(2 × VISUAL_STEP_RAD)
  const VISUAL_STEP = 22.5; // degrees between each visual slot
  const ACTIVE_ANGLE = 180; // slot k=0 — directly left of circle center
  const ITEM_SIZE = 52;
  const CLIP_W = 280; // wide enough to hold items + labels

  const radius = $derived((size / 2) / Math.sin((2 * VISUAL_STEP * Math.PI) / 180));
  const CX = CLIP_W; // circle center x = right edge of clip
  const CY = $derived(size / 2); // circle center y = vertical center

  // Active slot position in clip coords
  const SLOT_X = $derived(CX + radius * Math.cos((ACTIVE_ANGLE * Math.PI) / 180));
  const SLOT_Y = $derived(CY - radius * Math.sin((ACTIVE_ANGLE * Math.PI) / 180));

  let scrollPos = $state(0);
  let hoveredSlot = $state(99);
  let snapping = false;

  const count = $derived(items.length);

  function slotItem(k: number): number {
    const n = Math.round(scrollPos);
    return ((n + k) % count + count) % count;
  }

  function slotAngle(k: number): number {
    const frac = scrollPos - Math.round(scrollPos);
    return ACTIVE_ANGLE + (k - frac) * VISUAL_STEP;
  }

  function slotPos(k: number) {
    const rad = (slotAngle(k) * Math.PI) / 180;
    return {
      x: CX + radius * Math.cos(rad) - ITEM_SIZE / 2,
      y: CY - radius * Math.sin(rad) - ITEM_SIZE / 2,
    };
  }

  const activeIndex = $derived(((Math.round(scrollPos)) % count + count) % count);

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

  const itemsPerPx = $derived(1 / (radius * (VISUAL_STEP * Math.PI) / 180));

  let animId = 0;

  function snapToIndex(i: number) {
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
      const e = 1 - Math.pow(1 - p, 3);
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

  function navigateTo(item: SectionNavItem | undefined) {
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
  let dragActive = $state(false);
  let dragY0 = 0;
  let scroll0 = 0;
  let lastDY = 0;
  let lastDT = 0;
  let velPx = 0;
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
    scrollPos = scroll0 - dy * itemsPerPx;
  }

  function onDragEnd(e: PointerEvent) {
    if (!dragActive) return;
    dragActive = false;

    if (!hasMoved) {
      const el = (e.target as HTMLElement)?.closest('[data-slot]') as HTMLElement | null;
      if (el !== null) snapToIndex(slotItem(parseInt(el.dataset.slot!)));
      return;
    }

    const projected = scrollPos + (-velPx) * 100 * itemsPerPx;
    const target = Math.round(projected);
    snapToIndex(((target % count) + count) % count);
  }

  // Mouse wheel rotation
  function onWheelEvent(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY * itemsPerPx * 0.4;
    scrollPos += delta;
    // Debounced snap after 200ms of inactivity
    clearTimeout(wheelSnapTimer);
    wheelSnapTimer = setTimeout(() => {
      snapToIndex(((Math.round(scrollPos) % count) + count) % count);
    }, 200);
  }
  let wheelSnapTimer: ReturnType<typeof setTimeout>;

  // Arrow keys when the strip is focused
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); snapToIndex((activeIndex + 1) % count); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); snapToIndex((activeIndex - 1 + count) % count); }
  }

  // ── Page scroll → wheel sync ─────────────────────────────────────────
  $effect(() => {
    if (!browser) return;
    const obs: IntersectionObserver[] = [];
    items.forEach((item, i) => {
      if (!item.href?.startsWith('#')) return;
      const el = document.getElementById(item.href.slice(1));
      if (!el) return;
      const o = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !snapping && i !== activeIndex) snapToIndex(i);
      }, { threshold: 0.5 });
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  });

  // Init
  $effect(() => {
    const i = items.findIndex(it => it.href === activeHref || it.active);
    if (i >= 0) scrollPos = i;
  });
</script>

<nav
  class="nsw-strip"
  style="--size:{size}px; --clip-w:{CLIP_W}px"
  aria-label="Navigation par sections"
  onpointerdown={onDragStart}
  onpointermove={onDragMove}
  onpointerup={onDragEnd}
  onpointercancel={onDragEnd}
  onwheel={onWheelEvent}
  onkeydown={onKeyDown}
  tabindex="0"
  role="navigation"
>
  <!-- Active slot ring -->
  <div class="nsw-ring" style="left:{SLOT_X}px; top:{SLOT_Y}px"></div>

  <!-- Top & bottom gradient fade to soften the cut edges -->
  <div class="nsw-fade nsw-fade--top"></div>
  <div class="nsw-fade nsw-fade--bottom"></div>

  <!--
    Grooved arc knob — same visual language as NavbarMobileWheel's qknob.
    Semi-circle (180°), center at right edge / vertical center of the strip.
    stroke-dashoffset animates with scrollPos to show the wheel turning.
  -->
  <svg
    class="nsw-knob"
    class:nsw-knob--dragging={dragActive}
    viewBox="0 0 56 {size}"
    width="56"
    height={size}
    aria-hidden="true"
  >
    <path
      class="nk-base"
      d="M 56 {size / 2 - 38} A 38 38 0 0 0 56 {size / 2 + 38}"
      fill="none"
      stroke-width="22"
      stroke-linecap="butt"
    />
    <path
      class="nk-ridges"
      d="M 56 {size / 2 - 38} A 38 38 0 0 0 56 {size / 2 + 38}"
      fill="none"
      stroke-width="20"
      stroke-linecap="butt"
      stroke-dasharray="6 5"
      style="stroke-dashoffset: {scrollPos * 11}px"
    />
    <path
      class="nk-edge"
      d="M 56 {size / 2 - 27} A 27 27 0 0 0 56 {size / 2 + 27}"
      fill="none"
      stroke-width="1"
      stroke-linecap="butt"
    />
    <path
      class="nk-edge"
      d="M 56 {size / 2 - 49} A 49 49 0 0 0 56 {size / 2 + 49}"
      fill="none"
      stroke-width="1"
      stroke-linecap="butt"
    />
  </svg>

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
          class="nsw-item"
          class:active
          class:hovered
          style="--x:{pos.x}px; --y:{pos.y}px"
          data-slot={k}
          aria-label={item.label}
          aria-current={active ? 'page' : undefined}
          onclick={(e) => e.preventDefault()}
          onpointerenter={() => (hoveredSlot = k)}
          onpointerleave={() => { if (hoveredSlot === k) hoveredSlot = 99; }}
        >
          <span class="nsw-icon"><item.icon size={20} /></span>
          <span class="nsw-label">{item.label}</span>
        </a>
      {:else}
        <button
          type="button"
          class="nsw-item"
          class:active
          class:hovered
          style="--x:{pos.x}px; --y:{pos.y}px"
          data-slot={k}
          aria-label={item.label}
          onclick={(e) => e.preventDefault()}
          onpointerenter={() => (hoveredSlot = k)}
          onpointerleave={() => { if (hoveredSlot === k) hoveredSlot = 99; }}
        >
          <span class="nsw-icon"><item.icon size={20} /></span>
          <span class="nsw-label">{item.label}</span>
        </button>
      {/if}
    {/if}
  {/each}
</nav>

<style>
  /* ── Strip container ── */
  .nsw-strip {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: var(--clip-w);
    height: var(--size);
    overflow: hidden;
    z-index: 50;
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    /* Frosted glass background */
    background: color-mix(in srgb, var(--bg-base) 75%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-left: 1px solid var(--border);
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
    box-shadow: var(--shadow-lg);
    outline: none;

    &:active { cursor: grabbing; }
    &:focus-visible { box-shadow: var(--shadow-lg), 0 0 0 2px var(--primary); }
  }

  /* ── Gradient fade at top & bottom edges ── */
  .nsw-fade {
    position: absolute;
    left: 0;
    right: 0;
    height: 36px;
    pointer-events: none;
    z-index: 5;
  }

  .nsw-fade--top {
    top: 0;
    background: linear-gradient(to bottom,
      color-mix(in srgb, var(--bg-base) 80%, transparent),
      transparent
    );
  }

  .nsw-fade--bottom {
    bottom: 0;
    background: linear-gradient(to top,
      color-mix(in srgb, var(--bg-base) 80%, transparent),
      transparent
    );
  }

  /* ── Grooved arc knob ── */
  .nsw-knob {
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    z-index: 6;
  }

  .nk-base {
    stroke: color-mix(in srgb, var(--bg-hover) 85%, var(--border));
    transition: stroke var(--transition-fast);
  }

  .nk-ridges {
    stroke: color-mix(in srgb, var(--border) 80%, transparent);
    transition: stroke var(--transition-fast);
  }

  .nk-edge {
    stroke: var(--border);
    opacity: 0.6;
  }

  .nsw-strip:hover .nk-base,
  .nsw-knob--dragging .nk-base {
    stroke: color-mix(in srgb, var(--primary) 15%, var(--bg-hover));
  }

  .nsw-strip:hover .nk-ridges,
  .nsw-knob--dragging .nk-ridges {
    stroke: color-mix(in srgb, var(--primary) 55%, var(--border));
  }

  .nsw-strip:hover .nk-edge,
  .nsw-knob--dragging .nk-edge {
    stroke: color-mix(in srgb, var(--primary) 40%, var(--border));
    opacity: 1;
  }

  /* ── Active slot ring ── */
  .nsw-ring {
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

  /* ── Items ── */
  .nsw-item {
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
    z-index: 3;

    &.active {
      background: var(--primary-subtle);
      color: var(--primary);
      border-color: color-mix(in srgb, var(--primary) 35%, transparent);
      z-index: 4;
    }

    &.hovered {
      background: var(--bg-hover);
      color: var(--text-base);
      transform: scale(1.1);
      box-shadow: var(--shadow-lg);
      z-index: 5;
    }

    &.active.hovered {
      background: var(--primary-subtle);
    }
  }

  .nsw-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* ── Label pill — appears to the LEFT of each item ── */
  .nsw-label {
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

    /* Arrow pointing right toward the item */
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

  .nsw-item.active .nsw-label,
  .nsw-item.hovered .nsw-label {
    opacity: 1;
  }
</style>
