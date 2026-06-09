<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    from = 0,
    to,
    decimals = 0,
    prefix = "",
    suffix = "",
    startAt = 0.85,
    endAt = 0.25,
  }: {
    from?: number;
    to: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    /** Position viewport (0-1) où le compteur commence à bouger */
    startAt?: number;
    /** Position viewport (0-1) où le compteur atteint sa valeur finale */
    endAt?: number;
  } = $props();

  let el: HTMLSpanElement;
  let value = $state(from);

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 2);
  }

  function onScroll() {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    const mid = rect.top + rect.height / 2;
    const prog = Math.max(
      0,
      Math.min(1, (viewH * startAt - mid) / (viewH * (startAt - endAt))),
    );
    value = from + (to - from) * easeOut(prog);
  }

  function fmt(n: number): string {
    return prefix + n.toFixed(decimals) + suffix;
  }

  onMount(() => {
    if (!browser) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("scroll", onScroll);
  });
</script>

<span bind:this={el} class="scnt">{fmt(value)}</span>

<style>
  .scnt {
    font-variant-numeric: tabular-nums;
  }
</style>
