<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    title,
    subtitle,
  }: {
    children: Snippet;
    title?: string;
    subtitle?: string;
  } = $props();

  let containerEl: HTMLDivElement;
  let trackEl: HTMLDivElement;
  let height = $state(2000);
  let translateX = $state(0);
  let progress = $state(0);

  function update() {
    if (!containerEl || !trackEl) return;

    // Undo current transform to measure the track's natural right edge.
    // This handles constrained layouts (max-width container, sidebar, etc.)
    // where window.innerWidth would give an incorrect overflow value.
    const trackNaturalRight = trackEl.getBoundingClientRect().right - translateX;
    const containerRight = containerEl.getBoundingClientRect().right;
    const overflow = Math.max(0, trackNaturalRight - containerRight);

    height = window.innerHeight + overflow;

    const rect = containerEl.getBoundingClientRect();
    const scrolled = Math.max(0, -rect.top);
    if (overflow <= 0) return;
    progress = Math.min(1, scrolled / overflow);
    translateX = -progress * overflow;
  }

  onMount(() => {
    if (!browser) return;
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  });
</script>

<div class="hs-outer" bind:this={containerEl} style="height:{height}px">
  <div class="hs-sticky">
    {#if title || subtitle}
      <div class="hs-header">
        {#if title}<h2 class="hs-title">{title}</h2>{/if}
        {#if subtitle}<p class="hs-subtitle">{subtitle}</p>{/if}
      </div>
    {/if}

    <div class="hs-viewport">
      <div
        class="hs-track"
        bind:this={trackEl}
        style="transform:translateX({translateX}px)"
      >
        {@render children()}
      </div>
    </div>

    <!-- Progress bar -->
    <div class="hs-progress" aria-hidden="true">
      <div class="hs-progress-fill" style="width:{progress * 100}%"></div>
    </div>
  </div>
</div>

<style>
  .hs-outer {
    position: relative;
  }

  .hs-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: var(--bg-base);
  }

  .hs-header {
    padding: 32px clamp(24px, 6vw, 72px) 20px;
    flex-shrink: 0;
  }

  .hs-title {
    margin: 0;
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 800;
    color: var(--text-heading);
  }
  .hs-subtitle {
    margin: 4px 0 0;
    font-size: 14px;
    color: var(--text-muted);
  }

  .hs-viewport {
    flex: 1;
    overflow: visible;
    display: flex;
    align-items: center;
    padding: 0 clamp(24px, 6vw, 72px);
  }

  .hs-track {
    display: flex;
    align-items: stretch;
    gap: 24px;
    will-change: transform;
    transition: transform 0.05s linear;
  }

  /* Progress bar */
  .hs-progress {
    height: 3px;
    background: var(--border);
    flex-shrink: 0;
  }

  .hs-progress-fill {
    height: 100%;
    background: var(--primary);
    border-radius: 0 2px 2px 0;
    transition: width 0.05s linear;
  }
</style>
