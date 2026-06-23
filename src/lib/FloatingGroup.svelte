<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let {
    children,
    position,
    scrollAware = false,
  }: {
    children: Snippet;
    position:
      | "top-left"
      | "top"
      | "top-right"
      | "left"
      | "left-edge"
      | "right"
      | "bottom-left"
      | "bottom"
      | "bottom-right";
    scrollAware?: boolean;
  } = $props();

  let opacity = $derived(scrollAware ? 0.3 : 1);
  let timer: ReturnType<typeof setTimeout>;

  function onScroll() {
    opacity = 1;
    clearTimeout(timer);
    timer = setTimeout(() => {
      opacity = 0.3;
    }, 1200);
  }

  onMount(() => {
    if (!browser || !scrollAware) return;
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  onDestroy(() => {
    if (!browser || !scrollAware) return;
    window.removeEventListener("scroll", onScroll);
    clearTimeout(timer);
  });
</script>

<div class="wrapper {position}" style="opacity: {opacity}">
  {@render children()}
</div>

<style lang="scss">
  .wrapper {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: opacity 0.4s ease;
  }

  /* ── Corners ── */
  .top-left {
    top: 28px;
    left: 24px;
    align-items: flex-start;
  }
  .top-right {
    top: 28px;
    right: 24px;
    align-items: flex-end;
  }
  .bottom-left {
    bottom: 28px;
    left: 24px;
    align-items: flex-start;
  }
  .bottom-right {
    bottom: 28px;
    right: 24px;
    align-items: flex-end;
  }

  /* ── Mid-sides ── */
  .top {
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
  .bottom {
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
  .left {
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    align-items: flex-start;
  }
  /* Flush against the left edge of the screen */
  .left-edge {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    align-items: flex-start;
  }
  .right {
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    align-items: flex-end;
  }
</style>
