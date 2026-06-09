<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    text,
    readingLine = 0.72,
    class: cls = "",
  }: {
    text: string;
    /** Position de la "ligne de lecture" dans le viewport (0-1). */
    readingLine?: number;
    class?: string;
  } = $props();

  const words = text.trim().split(/\s+/);
  let containerEl: HTMLElement;
  let wordEls: HTMLSpanElement[] = [];

  function onScroll() {
    if (!browser || !wordEls.length) return;
    const viewH = window.innerHeight;
    const line = viewH * readingLine;
    const fadeZone = viewH * 0.18;

    // Read phase — batch all getBoundingClientRect calls before any DOM writes
    const alphas = wordEls.map((span) => {
      const rect = span.getBoundingClientRect();
      const dist = line - (rect.top + rect.height / 2);
      return Math.max(0.12, Math.min(1, (dist / fadeZone) * 0.88 + 0.12));
    });

    // Write phase — apply opacities after all reads are done
    for (let i = 0; i < wordEls.length; i++) {
      wordEls[i].style.opacity = String(alphas[i]);
    }
  }

  onMount(() => {
    wordEls = Array.from(containerEl.querySelectorAll(".trw")) as HTMLSpanElement[];
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("scroll", onScroll);
  });
</script>

<p class="tr {cls}" bind:this={containerEl}>
  {#each words as word}
    <span class="trw" style="opacity:0.12">{word}&nbsp;</span>
  {/each}
</p>

<style>
  .tr {
    margin: 0;
    line-height: 1.7;
  }

  .trw {
    display: inline;
    transition: opacity 0.15s ease;
    will-change: opacity;
  }
</style>
