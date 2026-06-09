<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    color = "var(--primary)",
    size = 10,
    length = 22,
  }: {
    color?: string;
    size?: number;
    length?: number;
  } = $props();

  type Point = { x: number; y: number };

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let trail: Point[] = [];
  let animFrame: number;
  let resolved = "#6366f1";

  function addPoint(x: number, y: number) {
    trail.unshift({ x, y });
    if (trail.length > length) trail.pop();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      const prog = 1 - i / trail.length;
      ctx.globalAlpha = prog * 0.75;
      ctx.fillStyle = resolved;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * prog * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    animFrame = requestAnimationFrame(draw);
  }

  onMount(() => {
    ctx = canvas.getContext("2d")!;

    if (color.startsWith("var(")) {
      const name = color.match(/var\((--[^,)]+)/)?.[1] ?? "";
      resolved =
        getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
        "#6366f1";
    } else {
      resolved = color;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onMove = (e: MouseEvent) => addPoint(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  });

  onDestroy(() => {
    if (!browser) return;
    cancelAnimationFrame(animFrame);
  });
</script>

<canvas bind:this={canvas} class="ct-canvas" aria-hidden="true"></canvas>

<style>
  .ct-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
  }
</style>
