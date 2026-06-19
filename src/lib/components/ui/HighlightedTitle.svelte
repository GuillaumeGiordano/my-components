<script lang="ts">
  let {
    text,
    highlight,
  }: {
    text: string;
    highlight?: string;
  } = $props();

  // Split the text around the highlight word(s) to colorize it
  function buildParts(
    t: string,
    h?: string,
  ): { before: string; hl: string; after: string } {
    if (!h) return { before: t, hl: "", after: "" };
    const idx = t.indexOf(h);
    if (idx === -1) return { before: t, hl: "", after: "" };
    return { before: t.slice(0, idx), hl: h, after: t.slice(idx + h.length) };
  }

  const parts = $derived(buildParts(text, highlight));
</script>

{parts.before}{#if parts.hl}<span class="highlight">{parts.hl}</span>{/if}{parts.after}

<style>
  .highlight {
    color: var(--primary);
    position: relative;
  }
</style>
