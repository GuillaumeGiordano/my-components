<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    children,
    color = "#00ff41",
    headColor = "#ccffcc",
    background = "#000000",
    fontSize = 14,
    speed = 2,
  }: {
    children?: Snippet;
    color?: string;
    headColor?: string;
    background?: string;
    fontSize?: number;
    /** 1 = lent, 2 = normal, 3 = rapide */
    speed?: number;
  } = $props();

  const CHARS = "ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01234567890";

  let wrapEl: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let drops: number[] = [];
  let animFrame: number;
  let W = 0,
    H = 0;
  let ro: ResizeObserver;
  let tick = 0;

  const interval = $derived(Math.max(1, 4 - Math.round(speed)));

  function init() {
    W = canvas.width = wrapEl.offsetWidth;
    H = canvas.height = wrapEl.offsetHeight;
    drops = Array.from({ length: Math.floor(W / fontSize) }, () =>
      Math.floor(Math.random() * -(H / fontSize)),
    );
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, W, H);
  }

  function draw() {
    tick++;

    // Fade trail — every frame for smooth effect
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;

    // Advance drops every N ticks (controls speed)
    if (tick % interval === 0) {
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i];
        if (y >= 0) {
          // Head character (bright)
          ctx.fillStyle = headColor;
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            i * fontSize,
            y * fontSize,
          );
          // Previous character (green)
          if (y > 0) {
            ctx.fillStyle = color;
            ctx.fillText(
              CHARS[Math.floor(Math.random() * CHARS.length)],
              i * fontSize,
              (y - 1) * fontSize,
            );
          }
        }
        drops[i]++;
        if (drops[i] * fontSize > H && Math.random() > 0.975) {
          drops[i] = Math.floor(-Math.random() * 25);
        }
      }
    }

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

<div class="mx" bind:this={wrapEl} style="background:{background}">
  <canvas bind:this={canvas} class="mx-canvas" aria-hidden="true"></canvas>
  {#if children}
    <div class="mx-content">{@render children()}</div>
  {/if}
</div>

<style>
  .mx {
    position: relative;
    overflow: hidden;
  }
  .mx-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .mx-content {
    position: relative;
    z-index: 1;
  }
</style>
