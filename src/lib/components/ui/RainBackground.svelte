<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    background = "#0a0f1a",
    color = "rgba(180, 220, 255, 0.6)",
    dropCount = 150,
    windAngle = 15,
    speed = 1,
  }: {
    children?: Snippet;
    background?: string;
    color?: string;
    dropCount?: number;
    /** Angle de vent en degrés */
    windAngle?: number;
    speed?: number;
  } = $props();

  type Drop = { x: number; y: number; len: number; vx: number; vy: number };
  type Ripple = { x: number; y: number; r: number; alpha: number };

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let drops: Drop[] = [];
  let ripples: Ripple[] = [];
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;

  const RAD = Math.PI / 180;

  function mkDrop(scatter = false): Drop {
    const spd = (6 + Math.random() * 10) * speed;
    return {
      x: Math.random() * (W + 200) - 100,
      y: scatter ? Math.random() * H : -Math.random() * H * 0.5,
      len: 8 + Math.random() * 16,
      vx: Math.sin(windAngle * RAD) * spd,
      vy: Math.cos(windAngle * RAD) * spd,
    };
  }

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
    drops = Array.from({ length: dropCount }, (_, i) => mkDrop(i < dropCount * 0.9));
    ripples = [];
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Drops
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (const d of drops) {
      d.x += d.vx;
      d.y += d.vy;

      if (d.y > H + 20) {
        // Spawn ripple at bottom
        if (d.y < H + 30) {
          ripples.push({ x: d.x, y: H, r: 0, alpha: 0.5 });
        }
        const nd = mkDrop(false);
        d.x = nd.x;
        d.y = nd.y;
      }

      ctx.globalAlpha = 0.5 + Math.random() * 0.3;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - (d.vx / d.vy) * d.len, d.y - d.len);
      ctx.stroke();
    }

    // Ripples
    ctx.lineWidth = 1;
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.r += 1.5;
      r.alpha -= 0.04;
      if (r.alpha <= 0) {
        ripples.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = r.alpha;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.ellipse(r.x, r.y, r.r, r.r * 0.35, 0, 0, Math.PI * 2);
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

<div class="rb" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="rb-canvas" aria-hidden="true"></canvas>
  {#if children}<div class="rb-content">{@render children()}</div>{/if}
</div>

<style>
  .rb {
    position: relative;
    overflow: hidden;
  }
  .rb-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .rb-content {
    position: relative;
    z-index: 1;
  }
</style>
