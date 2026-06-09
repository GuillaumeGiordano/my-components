<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    background = "linear-gradient(to bottom, #0d0020 0%, #1a0040 45%, #2d0060 60%, #1a0030 100%)",
    gridColor = "#cc00ff",
    horizonColor = "#ff2080",
    sunColor = "#ff6030",
    speed = 1,
  }: {
    children?: Snippet;
    background?: string;
    gridColor?: string;
    horizonColor?: string;
    sunColor?: string;
    speed?: number;
  } = $props();

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;
  let offset = 0;

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
  }

  function draw() {
    offset = (offset + 0.008 * speed) % 1;
    ctx.clearRect(0, 0, W, H);

    const horizon = H * 0.48;
    const vp = { x: W / 2, y: horizon };

    // Retro sun
    const sunY = horizon - H * 0.02;
    const sunR = Math.min(W, H) * 0.14;
    const sunGrad = ctx.createLinearGradient(vp.x, sunY - sunR, vp.x, sunY + sunR);
    sunGrad.addColorStop(0, sunColor);
    sunGrad.addColorStop(0.5, horizonColor);
    sunGrad.addColorStop(1, "transparent");
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(vp.x, sunY, sunR, Math.PI, 0); // half circle
    ctx.fill();

    // Horizontal scan lines on sun
    ctx.fillStyle = background.includes("#")
      ? background.split(" ")[0].replace("(", "")
      : "#0d0020";
    for (let i = 0; i < 8; i++) {
      const ly = sunY - sunR + (i / 8) * sunR * 1.05;
      ctx.fillRect(vp.x - sunR, ly, sunR * 2, 3 + i * 0.5);
    }

    // Horizon glow
    const hGlow = ctx.createLinearGradient(0, horizon - 20, 0, horizon + 30);
    hGlow.addColorStop(0, "transparent");
    hGlow.addColorStop(0.5, horizonColor + "44");
    hGlow.addColorStop(1, "transparent");
    ctx.fillStyle = hGlow;
    ctx.fillRect(0, horizon - 20, W, 50);

    // Vertical grid lines (perspective)
    const numV = 14;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= numV; i++) {
      const t = i / numV;
      const endX = t * W;
      const alpha = 0.15 + Math.abs(t - 0.5) * 0.3;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 6;
      ctx.shadowColor = gridColor;
      ctx.beginPath();
      ctx.moveTo(vp.x, vp.y);
      ctx.lineTo(endX, H);
      ctx.stroke();
    }

    // Horizontal grid lines (perspective, moving forward)
    const numH = 10;
    ctx.shadowBlur = 4;
    for (let i = 0; i < numH; i++) {
      const p = (i / numH + offset) % 1;
      if (p <= 0.005) continue; // skip lines near horizon
      const y = horizon + (H - horizon) * Math.pow(p, 2.2);
      const xSpan = ((y - horizon) / (H - horizon)) * W * 0.5;
      const alpha = 0.12 + p * 0.5;

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(vp.x - xSpan, y);
      ctx.lineTo(vp.x + xSpan, y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
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

<div class="ng" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="ng-canvas" aria-hidden="true"></canvas>
  {#if children}<div class="ng-content">{@render children()}</div>{/if}
</div>

<style>
  .ng {
    position: relative;
    overflow: hidden;
  }
  .ng-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .ng-content {
    position: relative;
    z-index: 1;
  }
</style>
