<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    bubbleCount = 20,
    color = "var(--primary)",
    background = "var(--bg-base)",
  }: {
    children?: Snippet;
    bubbleCount?: number;
    color?: string;
    background?: string;
  } = $props();

  type Bubble = { x: number; y: number; r: number; vx: number; vy: number; op: number };

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let bubbles: Bubble[] = [];
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;
  let resolvedColor = "#6366f1";

  function mkBubble(scatter = false): Bubble {
    return {
      x: Math.random() * W,
      y: scatter ? Math.random() * H : H + Math.random() * 80,
      r: 8 + Math.random() * 44,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(0.25 + Math.random() * 0.65),
      op: 0.06 + Math.random() * 0.14,
    };
  }

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
    bubbles = Array.from({ length: bubbleCount }, (_, i) =>
      mkBubble(i < bubbleCount * 0.7),
    );
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const b of bubbles) {
      b.x += b.vx;
      b.y += b.vy;
      // Slight horizontal drift
      b.vx += (Math.random() - 0.5) * 0.025;
      b.vx = Math.max(-0.9, Math.min(0.9, b.vx));

      if (b.y + b.r < 0) {
        const nb = mkBubble(false);
        b.x = nb.x;
        b.y = nb.y;
        b.r = nb.r;
        b.vx = nb.vx;
        b.vy = nb.vy;
      }

      ctx.globalAlpha = b.op;

      // Outer ring
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = resolvedColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Specular highlight
      ctx.beginPath();
      ctx.arc(b.x - b.r * 0.27, b.y - b.r * 0.27, b.r * 0.17, 0, Math.PI * 2);
      ctx.fillStyle = resolvedColor;
      ctx.globalAlpha = b.op * 0.55;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    animFrame = requestAnimationFrame(draw);
  }

  onMount(() => {
    ctx = canvas.getContext("2d")!;

    if (color.startsWith("var(")) {
      const name = color.match(/var\((--[^,)]+)/)?.[1] ?? "";
      resolvedColor = getComputedStyle(wrapEl).getPropertyValue(name).trim() || "#6366f1";
    } else {
      resolvedColor = color;
    }

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

<div class="bb" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="bb-canvas" aria-hidden="true"></canvas>
  {#if children}
    <div class="bb-content">{@render children()}</div>
  {/if}
</div>

<style>
  .bb {
    position: relative;
    overflow: hidden;
  }
  .bb-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .bb-content {
    position: relative;
    z-index: 1;
  }
</style>
