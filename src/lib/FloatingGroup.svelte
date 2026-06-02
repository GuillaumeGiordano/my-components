<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    position,
  }: {
    children: Snippet;
    position: "left" | "right";
  } = $props();
</script>

<div class="wrapper {position}">
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
