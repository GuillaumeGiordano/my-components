<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    starCount = 250,
    speed = 1,
    color = "#ffffff",
    background = "#000010",
  }: {
    children?: Snippet;
    starCount?: number;
    speed?: number;
    color?: string;
    background?: string;
  } = $props();

  type Star = { x: number; y: number; z: number; pz: number };

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let stars: Star[] = [];
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;

  function mkStar(): Star {
    return {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      pz: 1,
    };
  }

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
    stars = Array.from({ length: starCount }, mkStar);
  }

  function draw() {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2,
      cy = H / 2;

    for (const s of stars) {
      s.pz = s.z;
      s.z -= speed * 0.002;

      if (s.z <= 0) {
        s.x = (Math.random() - 0.5) * 2;
        s.y = (Math.random() - 0.5) * 2;
        s.z = 1;
        s.pz = 1;
        continue;
      }

      const sx = (s.x / s.z) * cx + cx;
      const sy = (s.y / s.z) * cy + cy;
      const psx = (s.x / s.pz) * cx + cx;
      const psy = (s.y / s.pz) * cy + cy;

      ctx.globalAlpha = Math.min(1, (1 - s.z) * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.4, (1 - s.z) * 2.2);
      ctx.beginPath();
      ctx.moveTo(psx, psy);
      ctx.lineTo(sx, sy);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    animFrame = requestAnimationFrame(draw);
  }

  onMount(() => {
    ctx = canvas.getContext("2d")!;
    init();
    animFrame = requestAnimationFrame(draw);
    ro = new ResizeObserver(init);
    ro.observe(wrapEl);
  });

  onDestroy(() => {
    if (!browser) return;
    cancelAnimationFrame(animFrame);
    ro?.disconnect();
  });
</script>

<div class="sf" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="sf-canvas" aria-hidden="true"></canvas>
  {#if children}
    <div class="sf-content">{@render children()}</div>
  {/if}
</div>

<style>
  .sf {
    position: relative;
    overflow: hidden;
  }
  .sf-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .sf-content {
    position: relative;
    z-index: 1;
  }
</style>
