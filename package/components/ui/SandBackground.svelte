<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    background = "linear-gradient(to bottom, #c2924a 0%, #a0722a 50%, #8b5e1a 100%)",
    grainCount = 200,
    windSpeed = 1,
  }: {
    children?: Snippet;
    background?: string;
    grainCount?: number;
    windSpeed?: number;
  } = $props();

  type Grain = {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    opacity: number;
    color: string;
  };

  const COLORS = ["#f5deb3", "#d4a464", "#c8962e", "#e8c88a", "#f0c060"];

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let grains: Grain[] = [];
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;
  let t = 0;

  function mkGrain(scatter = false): Grain {
    const depth = Math.random();
    return {
      x: scatter ? Math.random() * W : W + Math.random() * 80,
      y: (0.1 + Math.random() * 0.8) * H,
      r: 0.4 + depth * 2.5,
      vx: -(0.5 + depth * 3) * windSpeed,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: 0.2 + depth * 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
    grains = Array.from({ length: grainCount }, (_, i) => mkGrain(i < grainCount * 0.9));
  }

  function draw() {
    t += 0.03;
    ctx.clearRect(0, 0, W, H);

    for (const g of grains) {
      g.x += g.vx + Math.sin(t * 1.5 + g.y * 0.02) * 0.3;
      g.y += g.vy + Math.sin(t * 2 + g.x * 0.01) * 0.15;

      if (g.x < -g.r * 2) {
        const ng = mkGrain(false);
        g.x = ng.x;
        g.y = ng.y;
      }

      ctx.globalAlpha = g.opacity;
      ctx.fillStyle = g.color;
      ctx.beginPath();
      ctx.ellipse(g.x, g.y, g.r, g.r * 0.6, Math.sin(t + g.x) * 0.5, 0, Math.PI * 2);
      ctx.fill();
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

<div class="sandb" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="sandb-canvas" aria-hidden="true"></canvas>
  {#if children}<div class="sandb-content">{@render children()}</div>{/if}
</div>

<style>
  .sandb {
    position: relative;
    overflow: hidden;
  }
  .sandb-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .sandb-content {
    position: relative;
    z-index: 1;
  }
</style>
