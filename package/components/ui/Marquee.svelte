<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";

  let {
    children,
    speed = 40,
    direction = "left" as "left" | "right",
    gap = 32,
    pauseOnHover = true,
  }: {
    children: Snippet;
    speed?: number;
    direction?: "left" | "right";
    gap?: number;
    pauseOnHover?: boolean;
  } = $props();

  let trackEl: HTMLDivElement;
  let contentEl: HTMLDivElement;
  let duration = $state(10);

  onMount(() => {
    if (contentEl) {
      duration = contentEl.offsetWidth / speed;
    }
  });
</script>

<div class="mq" class:mq--pause={pauseOnHover} style="--mq-gap:{gap}px">
  <div
    class="mq-track"
    bind:this={trackEl}
    style="
			animation-duration:{duration}s;
			animation-direction:{direction === 'right' ? 'reverse' : 'normal'};
		"
  >
    <div class="mq-set" bind:this={contentEl} style="gap:{gap}px">
      {@render children()}
    </div>
    <div class="mq-set" aria-hidden="true" style="gap:{gap}px">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .mq {
    overflow: hidden;
    width: 70%;
    margin: auto;
  }

  .mq-track {
    display: flex;
    width: max-content;
    animation: mq-scroll linear infinite;
  }

  .mq--pause .mq-track:hover {
    animation-play-state: paused;
  }

  .mq-set {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding-right: var(--mq-gap);
  }

  @keyframes mq-scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
</style>
