<script lang="ts">
  import type { Component } from 'svelte';
  import { browser } from '$app/environment';

  export type ScrollSection = {
    label: string;
    href: string; // '#section-id'
    icon?: Component;
  };

  let {
    sections = [],
    size = 300,
  }: {
    sections?: ScrollSection[];
    size?: number; // height of the bar in px
  } = $props();

  // ── State ──────────────────────────────────────────────────────────────
  let scrollY = $state(0);
  let pageH = $state(1000);
  let winH = $state(800);
  let tops = $state<number[]>([]); // offsetTop of each section
  let activeIndex = $state(-1);
  let hoveredIndex = $state(-1);
  let barEl: HTMLElement | null = null;
  let dragging = $state(false);
  let dragOffset = 0; // pointer Y offset from thumb top at pointerdown

  // ── Derived ────────────────────────────────────────────────────────────
  const maxScroll = $derived(Math.max(1, pageH - winH));
  const THUMB_H = 6; // px

  // Usable bar range: leave THUMB_H at the bottom so thumb never overflows
  const BAR = $derived(size - THUMB_H);

  // Thumb top — maps scrollY to [0, BAR]
  const thumbTop = $derived(Math.max(0, Math.min(BAR, (scrollY / maxScroll) * BAR)));

  // Dot centers — same denominator (maxScroll) so they align with the thumb center.
  // Dot CSS uses transform: translate(-50%,-50%) so `top` = center.
  // Thumb center = thumbTop + THUMB_H/2, so dots get the same +THUMB_H/2 offset.
  const dotPx = $derived(tops.map(t => {
    const r = Math.min(1, t / maxScroll);
    return r * BAR + THUMB_H / 2;
  }));

  // ── Measurement ────────────────────────────────────────────────────────
  function measure() {
    pageH = document.documentElement.scrollHeight;
    winH = window.innerHeight;
    tops = sections.map(s => {
      const id = s.href.startsWith('#') ? s.href.slice(1) : s.href;
      return document.getElementById(id)?.offsetTop ?? 0;
    });
  }

  $effect(() => {
    if (!browser) return;
    measure();

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });

    const resizeObs = new ResizeObserver(measure);
    resizeObs.observe(document.documentElement);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      resizeObs.disconnect();
    };
  });

  // Re-measure when sections prop changes (new hrefs)
  $effect(() => {
    sections; // track dependency
    if (browser) measure();
  });

  // ── Active section tracking ────────────────────────────────────────────
  $effect(() => {
    if (!browser) return;
    const obs: IntersectionObserver[] = [];
    sections.forEach((s, i) => {
      const id = s.href.startsWith('#') ? s.href.slice(1) : s.href;
      const el = document.getElementById(id);
      if (!el) return;
      // Fires when the top of the section crosses 30% from top of viewport
      const o = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) activeIndex = i;
      }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  });

  // ── Thumb drag ─────────────────────────────────────────────────────────
  function onThumbDown(e: PointerEvent) {
    e.stopPropagation();
    dragging = true;
    if (barEl) {
      const rect = barEl.getBoundingClientRect();
      dragOffset = e.clientY - rect.top - thumbTop;
    }
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onThumbMove(e: PointerEvent) {
    if (!dragging || !barEl) return;
    const rect = barEl.getBoundingClientRect();
    const newTop = e.clientY - rect.top - dragOffset;
    const ratio = Math.max(0, Math.min(1, newTop / BAR));
    window.scrollTo(0, ratio * maxScroll);
  }

  function onThumbUp() { dragging = false; }

  // ── Track click (not on dots/thumb) ────────────────────────────────────
  function onBarClick(e: MouseEvent) {
    if (!barEl || dragging) return;
    const rect = barEl.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / BAR));
    window.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' });
  }

  // ── Dot click ─────────────────────────────────────────────────────────
  function onDotClick(s: ScrollSection, e: MouseEvent) {
    e.stopPropagation();
    const id = s.href.startsWith('#') ? s.href.slice(1) : s.href;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<div
  class="ssb"
  bind:this={barEl}
  style="--size:{size}px"
  onclick={onBarClick}
  aria-label="Navigation par sections"
  role="scrollbar"
  aria-valuenow={Math.round((scrollY / maxScroll) * 100)}
  aria-valuemin={0}
  aria-valuemax={100}
>
  <!-- Track -->
  <div class="ssb-track"></div>

  <!-- Section dots -->
  {#each sections as section, i}
    {@const top = dotPx[i] ?? 0}
    <button
      class="ssb-dot"
      class:active={activeIndex === i}
      class:hovered={hoveredIndex === i}
      style="top:{top}px"
      onclick={(e) => onDotClick(section, e)}
      onpointerenter={() => (hoveredIndex = i)}
      onpointerleave={() => { if (hoveredIndex === i) hoveredIndex = -1; }}
      aria-label="Aller à : {section.label}"
      tabindex="0"
    >
      <span class="ssb-label">{section.label}</span>
    </button>
  {/each}

  <!-- Thumb (horizontal scrubber) -->
  <div
    class="ssb-thumb"
    class:dragging
    style="top:{thumbTop}px"
    onpointerdown={onThumbDown}
    onpointermove={onThumbMove}
    onpointerup={onThumbUp}
    onpointercancel={onThumbUp}
    onclick={(e) => e.stopPropagation()}
    role="slider"
    tabindex="0"
    aria-label="Position de scroll"
    aria-valuenow={Math.round((scrollY / maxScroll) * 100)}
    aria-valuemin={0}
    aria-valuemax={100}
    onkeydown={(e) => {
      if (e.key === 'ArrowDown') window.scrollBy(0, 80);
      if (e.key === 'ArrowUp') window.scrollBy(0, -80);
    }}
  ></div>
</div>

<style>
  /* ── Container ── */
  .ssb {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: var(--size, 300px);
    z-index: 100;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  /* ── Vertical track ── */
  .ssb-track {
    position: absolute;
    left: 50%;
    top: 12px;
    bottom: 12px;
    width: 2px;
    transform: translateX(-50%);
    background: var(--border);
    border-radius: 1px;
    pointer-events: none;
  }

  /* ── Section dots ── */
  .ssb-dot {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--text-muted) 50%, transparent);
    border: none;
    padding: 0;
    cursor: pointer;
    transition:
      background var(--transition-fast),
      transform var(--transition-fast);

    &.active {
      background: var(--primary);
      transform: translate(-50%, -50%) scale(1.5);
    }

    &.hovered {
      background: var(--primary);
      transform: translate(-50%, -50%) scale(1.35);
    }
  }

  /* ── Dot label pill ── */
  .ssb-label {
    position: absolute;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%) scale(0.9);
    background: var(--text-heading);
    color: var(--bg-base);
    font-size: 11px;
    font-weight: 600;
    font-family: var(--font-sans);
    padding: 4px 10px;
    border-radius: var(--radius-full);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;

    &::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 4px solid transparent;
      border-left-color: var(--text-heading);
    }
  }

  .ssb-dot.active .ssb-label,
  .ssb-dot.hovered .ssb-label {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

  /* ── Thumb (horizontal scrubber bar) ── */
  .ssb-thumb {
    position: absolute;
    left: 0;
    right: 0;
    height: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--text-heading) 30%, transparent);
    cursor: ns-resize;
    transition: background var(--transition-fast);
    z-index: 2;

    &::before {
      /* Extend the hit target vertically without affecting visual */
      content: '';
      position: absolute;
      inset: -8px 0;
    }

    &:hover {
      background: color-mix(in srgb, var(--text-heading) 50%, transparent);
    }

    &.dragging {
      background: color-mix(in srgb, var(--primary) 70%, transparent);
      cursor: grabbing;
    }
  }
</style>
