<script lang="ts">
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';
  import type { Snippet } from 'svelte';

  let {
    items,
    item: itemSnippet,
    autoplay = false,
    interval = 4000,
    loop = true,
    showDots = true,
    showArrows = true,
    aspectRatios,
  }: {
    items: unknown[];
    item: Snippet<[unknown, number]>;
    autoplay?: boolean;
    interval?: number;
    loop?: boolean;
    showDots?: boolean;
    showArrows?: boolean;
    /**
     * Optional width/height ratio for each slide. When provided, the carousel
     * height adapts to the current slide's real aspect ratio (media shown in
     * its true format, no crop). Omit for the default fixed behavior.
     */
    aspectRatios?: number[];
  } = $props();

  let current = $state(0);
  let paused = $state(false);
  let touchStartX = 0;

  const count = $derived(items.length);
  const canPrev = $derived(loop || current > 0);
  const canNext = $derived(loop || current < count - 1);

  // Adaptive height mode: only active when ratios are supplied.
  const adaptive = $derived(Array.isArray(aspectRatios) && aspectRatios.length > 0);
  const currentRatio = $derived(
    adaptive ? (aspectRatios![current] ?? aspectRatios![0]) : null,
  );

  function prev() {
    if (!canPrev) return;
    current = current === 0 ? count - 1 : current - 1;
  }

  function next() {
    if (!canNext) return;
    current = current === count - 1 ? 0 : current + 1;
  }

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }

  function onTouchEnd(e: TouchEvent) {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  $effect(() => {
    if (!autoplay || paused || count <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="carousel"
  class:adaptive
  style={currentRatio ? `aspect-ratio: ${currentRatio};` : undefined}
  role="region"
  aria-label="Carrousel"
  tabindex="0"
  onkeydown={onKeydown}
  onmouseenter={() => (paused = true)}
  onmouseleave={() => (paused = false)}
  ontouchstart={onTouchStart}
  ontouchend={onTouchEnd}
>
  <!-- Sliding track -->
  <div class="track" style="transform: translateX(-{current * 100}%)">
    {#each items as slide, i}
      <div class="slide" aria-hidden={i !== current}>
        {@render itemSnippet(slide, i)}
      </div>
    {/each}
  </div>

  <!-- Arrows -->
  {#if showArrows && count > 1}
    <button
      class="arrow arrow-prev"
      onclick={prev}
      disabled={!canPrev}
      aria-label="Diapositive précédente"
    >
      <ChevronLeft size={20} />
    </button>
    <button
      class="arrow arrow-next"
      onclick={next}
      disabled={!canNext}
      aria-label="Diapositive suivante"
    >
      <ChevronRight size={20} />
    </button>
  {/if}

  <!-- Dots -->
  {#if showDots && count > 1}
    <div class="dots" role="tablist" aria-label="Diapositives">
      {#each items as _, i}
        <button
          class="dot"
          class:active={i === current}
          onclick={() => (current = i)}
          role="tab"
          aria-selected={i === current}
          aria-label="Diapositive {i + 1}"
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-lg);
    outline: none;
    user-select: none;

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 3px;
    }
  }

  /* ── Track ── */
  .track {
    display: flex;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }

  .slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  /* ── Adaptive height (opt-in via aspectRatios) ── */
  .carousel.adaptive {
    transition: aspect-ratio 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .carousel.adaptive .track,
  .carousel.adaptive .slide {
    height: 100%;
  }

  /* ── Arrows ── */
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg-base);
    color: var(--text-base);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    transition:
      background var(--transition-fast),
      opacity var(--transition-fast),
      transform var(--transition-fast);
    z-index: 2;

    &:hover:not(:disabled) {
      background: var(--bg-hover);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }

  .arrow-prev { left: 10px; }
  .arrow-next { right: 10px; }

  /* ── Dots ── */
  .dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 2;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    border: none;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0;
    transition:
      background var(--transition-fast),
      transform var(--transition-fast),
      width var(--transition-fast);

    &.active {
      background: #fff;
      width: 20px;
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }
</style>
