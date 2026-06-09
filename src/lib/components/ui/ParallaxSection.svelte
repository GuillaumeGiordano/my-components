<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    background,
    speed = 0.4,
  }: {
    children?: Snippet;
    /** Snippet pour la couche de fond (défile plus lentement) */
    background?: Snippet;
    /** Vitesse du fond (0 = fixe, 1 = vitesse normale). Défaut 0.4 */
    speed?: number;
  } = $props();

  let containerEl: HTMLDivElement;
  let bgOffset = $state(0);

  function onScroll() {
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    const viewH = window.innerHeight;
    const h = containerEl.offsetHeight;
    // Progression : 0 quand le bas entre dans le viewport, 1 quand le haut en sort
    const prog = (viewH - rect.top) / (viewH + h);
    bgOffset = (prog - 0.5) * h * (1 - speed) * 1.4;
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

<div class="ps" bind:this={containerEl}>
  {#if background}
    <div class="ps-bg" style="transform:translateY({bgOffset}px)">
      {@render background()}
    </div>
  {/if}
  {#if children}
    <div class="ps-content">{@render children()}</div>
  {/if}
</div>

<style>
  .ps {
    position: relative;
    overflow: hidden;
  }

  .ps-bg {
    position: absolute;
    inset: -15% 0;
    will-change: transform;
    pointer-events: none;
  }

  /* La couche bg doit couvrir toute la zone même après décalage */
  .ps-bg :global(img),
  .ps-bg :global(video),
  .ps-bg :global(> *) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .ps-content {
    position: relative;
    z-index: 1;
  }
</style>
