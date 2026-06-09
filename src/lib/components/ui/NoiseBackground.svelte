<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    /** Couleurs des blobs — hex, rgb ou hsl uniquement (pas de var()) */
    colors = ["#6366f1", "#ec4899", "#f97316", "#06b6d4"] as string[],
    background = "#0f172a",
    blurAmount = 90,
    speed = 0.4,
  }: {
    children?: Snippet;
    colors?: string[];
    background?: string;
    blurAmount?: number;
    speed?: number;
  } = $props();

  type Blob = { x: number; y: number; r: number; vx: number; vy: number; color: string };

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let blobs: Blob[] = [];
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
    blobs = colors.map((color, i) => ({
      x: W * (0.15 + (i / colors.length) * 0.7) + (Math.random() - 0.5) * W * 0.25,
      y: H * (0.15 + Math.random() * 0.7),
      r: Math.min(W, H) * (0.28 + Math.random() * 0.28),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      color,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.globalAlpha = 0.65;

    for (const b of blobs) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.r * 0.4) b.vx = Math.abs(b.vx);
      if (b.x > W + b.r * 0.4) b.vx = -Math.abs(b.vx);
      if (b.y < -b.r * 0.4) b.vy = Math.abs(b.vy);
      if (b.y > H + b.r * 0.4) b.vy = -Math.abs(b.vy);

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
    }

    ctx.filter = "none";
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

<div class="nb" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="nb-canvas" aria-hidden="true"></canvas>
  {#if children}
    <div class="nb-content">{@render children()}</div>
  {/if}
</div>

<style>
  .nb {
    position: relative;
    overflow: hidden;
  }
  .nb-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .nb-content {
    position: relative;
    z-index: 1;
  }
</style>
