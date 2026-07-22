<script lang="ts">
  const browser = typeof window !== "undefined";

  let {
    height = "3px",
    color = "var(--primary)",
  }: {
    /** Thickness of the bar — any CSS length. */
    height?: string;
    /** Fill color — any CSS color or token. */
    color?: string;
  } = $props();

  let progress = $state(0);

  $effect(() => {
    if (!browser) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  });
</script>

<div
  class="spb"
  style="height:{height}"
  role="progressbar"
  aria-label="Progression de lecture de la page"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={Math.round(progress * 100)}
>
  <div class="spb-fill" style="background:{color}; transform:scaleX({progress})"></div>
</div>

<style>
  .spb {
    position: fixed;
    top: 0;
    /* Anchor to both edges instead of width:100%: a fixed element's percentage
       width can exceed the visible viewport on mobile (scrollbar / layout
       viewport quirks) and create a page-wide horizontal scroll. */
    left: 0;
    right: 0;
    z-index: 200;
    pointer-events: none;
  }

  .spb-fill {
    height: 100%;
    width: 100%;
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 0.1s linear;
  }

  @media (prefers-reduced-motion: reduce) {
    .spb-fill {
      transition: none;
    }
  }
</style>
