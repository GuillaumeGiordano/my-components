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
    position: "left" | "right";
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
    bottom: 28px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: opacity 0.4s ease;
  }

  .right {
    right: 24px;
    align-items: flex-end;
  }

  .left {
    left: 24px;
    align-items: flex-start;
  }
</style>
