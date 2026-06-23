<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    background,
    children,
    height = "100vh",
  }: {
    background: Snippet;
    children: Snippet;
    height?: string;
  } = $props();
</script>

<section class="sos">
  <div class="sos-bg" style="height:{height}" aria-hidden="true">
    {@render background()}
  </div>

  <div class="sos-content" style="margin-top:-{height}">
    {@render children()}
  </div>
</section>

<style>
  .sos {
    position: relative;
  }

  .sos-bg {
    position: sticky;
    top: 0;
    z-index: 0;
    overflow: hidden;
  }

  .sos-bg > :global(*) {
    width: 100%;
    height: 100%;
  }

  .sos-content {
    position: relative;
    z-index: 1;
  }
</style>
