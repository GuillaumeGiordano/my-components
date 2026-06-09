<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    background = "linear-gradient(to bottom, #0f1a2e, #1a2a40)",
    flakeCount = 120,
    speed = 1,
    wind = 0.3,
  }: {
    children?: Snippet;
    background?: string;
    flakeCount?: number;
    speed?: number;
    wind?: number;
  } = $props();

  type Flake = {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    wobble: number;
    phase: number;
    opacity: number;
  };

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let flakes: Flake[] = [];
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;
  let t = 0;

  function mkFlake(scatter = false): Flake {
    return {
      x: Math.random() * W,
      y: scatter ? Math.random() * H : -10,
      r: 0.5 + Math.random() * 3.5,
      vx: wind + (Math.random() - 0.5) * 0.3,
      vy: (0.3 + Math.random() * 1.2) * speed,
      wobble: 0.3 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.4 + Math.random() * 0.6,
    };
  }

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
    flakes = Array.from({ length: flakeCount }, (_, i) => mkFlake(i < flakeCount * 0.85));
  }

  function draw() {
    t += 0.02;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";

    for (const f of flakes) {
      f.x += f.vx + Math.sin(t * f.wobble + f.phase) * 0.4;
      f.y += f.vy;

      if (f.y > H + 10) {
        const nf = mkFlake(false);
        f.x = nf.x;
        f.y = nf.y;
      }
      if (f.x > W + 10) f.x = -10;
      if (f.x < -10) f.x = W + 10;

      ctx.globalAlpha = f.opacity;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
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

<div class="sb" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="sb-canvas" aria-hidden="true"></canvas>
  {#if children}<div class="sb-content">{@render children()}</div>{/if}
</div>

<style>
  .sb {
    position: relative;
    overflow: hidden;
  }
  .sb-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .sb-content {
    position: relative;
    z-index: 1;
  }
</style>
