<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    fromScale = 0.72,
    startAt = 0.92,
    endAt = 0.35,
  }: {
    children?: Snippet;
    /** Scale de départ (avant entrée dans le viewport) */
    fromScale?: number;
    /** Position viewport (0-1) où l'animation commence */
    startAt?: number;
    /** Position viewport (0-1) où l'animation se termine */
    endAt?: number;
  } = $props();

  let containerEl: HTMLDivElement;
  let scale = $state(fromScale);
  let opacity = $state(0);

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 2.5);
  }

  function onScroll() {
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    const viewH = window.innerHeight;
    const mid = rect.top + rect.height / 2;
    const start = viewH * startAt;
    const end = viewH * endAt;
    const prog = Math.max(0, Math.min(1, (start - mid) / (start - end)));
    const eased = easeOut(prog);
    scale = fromScale + (1 - fromScale) * eased;
    opacity = Math.min(1, prog * 2.2);
  }

  onMount(() => {
    if (!browser) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("scroll", onScroll);
  });
</script>

<div class="zr" bind:this={containerEl}>
  <div class="zr-inner" style="transform:scale({scale});opacity:{opacity}">
    {#if children}{@render children()}{/if}
  </div>
</div>

<style>
  .zr {
    overflow: visible;
  }

  .zr-inner {
    will-change: transform, opacity;
    transform-origin: center bottom;
  }
</style>
