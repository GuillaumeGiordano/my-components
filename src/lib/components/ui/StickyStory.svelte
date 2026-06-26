<script lang="ts" module>
  export type StorySlide = {
    step?: string;
    title: string;
    body?: string;
    visual?: string;
    color?: string;
  };
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    slides = [] as StorySlide[],
  }: {
    slides: StorySlide[];
  } = $props();

  let containerEl: HTMLDivElement;
  let activeIdx = $state(0);
  let progress = $state(0);

  function onScroll() {
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    const total = containerEl.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const scrolled = Math.max(0, Math.min(total, -rect.top));
    const raw = scrolled / total;
    const slideF = raw * slides.length;
    activeIdx = Math.min(Math.floor(slideF), slides.length - 1);
    progress = Math.min(1, slideF - activeIdx);
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

<!-- Container height = N slides × 110vh for scroll budget -->
<div class="ss-outer" bind:this={containerEl} style="height:{slides.length * 110}vh">
  <div class="ss-sticky">
    <div class="ss-layout">
      <!-- Left — text -->
      <div class="ss-left">
        {#each slides as slide, i}
          <div
            class="ss-slide"
            class:ss-slide--active={i === activeIdx}
            class:ss-slide--past={i < activeIdx}
            style="--accent:{slide.color ?? 'var(--primary)'}"
          >
            {#if slide.step}
              <span class="ss-step">{slide.step}</span>
            {/if}
            <h2 class="ss-title">{slide.title}</h2>
            {#if slide.body}<p class="ss-body">{slide.body}</p>{/if}
          </div>
        {/each}
      </div>

      <!-- Right — visual -->
      <div class="ss-right">
        {#each slides as slide, i}
          <div
            class="ss-visual"
            class:ss-visual--active={i === activeIdx}
            class:ss-visual--past={i < activeIdx}
            style="--accent:{slide.color ?? 'var(--primary)'}"
          >
            {#if slide.visual}
              <span class="ss-emoji">{slide.visual}</span>
            {:else}
              <span class="ss-num">{String(i + 1).padStart(2, "0")}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Progress dots -->
    <div class="ss-dots" aria-hidden="true">
      {#each slides as _, i}
        <div
          class="ss-dot"
          class:ss-dot--active={i === activeIdx}
          class:ss-dot--done={i < activeIdx}
        >
          <div
            class="ss-dot-bar"
            style="transform:scaleX({i === activeIdx ? progress : i < activeIdx ? 1 : 0})"
          ></div>
        </div>
      {/each}
    </div>

    <!-- Scroll hint -->
    {#if activeIdx === 0 && progress < 0.15}
      <div class="ss-hint" aria-hidden="true">
        <span>Fais défiler</span>
        <div class="ss-hint-arrow">↓</div>
      </div>
    {/if}
  </div>
</div>

<style>
  .ss-outer {
    position: relative;
  }

  .ss-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    background: var(--bg-base);
    display: flex;
    flex-direction: column;
  }

  .ss-layout {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 48px;
    padding: 48px clamp(24px, 6vw, 80px);
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  @media (max-width: 640px) {
    .ss-layout {
      grid-template-columns: 1fr;
      padding: 32px 24px;
    }
  }

  @container (max-width: 640px) {
    .ss-layout {
      grid-template-columns: 1fr;
      padding: 32px 24px;
    }
  }

  /* ── Left (text) ── */
  .ss-left {
    position: relative;
    min-height: 280px;
  }

  .ss-slide {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
    pointer-events: none;
  }

  .ss-slide--active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .ss-slide--past {
    opacity: 0;
    transform: translateY(-32px);
  }

  .ss-step {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .ss-step::before {
    content: "";
    display: inline-block;
    width: 24px;
    height: 2px;
    background: var(--accent);
    border-radius: 1px;
  }

  .ss-title {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--text-heading);
    line-height: 1.15;
  }

  .ss-body {
    margin: 0;
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.65;
    max-width: 42ch;
  }

  /* ── Right (visual) ── */
  .ss-right {
    position: relative;
    min-height: 280px;
  }

  .ss-visual {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.85) translateX(24px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
    pointer-events: none;
  }

  .ss-visual--active {
    opacity: 1;
    transform: scale(1) translateX(0);
  }

  .ss-visual--past {
    opacity: 0;
    transform: scale(1.05) translateX(-24px);
  }

  .ss-emoji {
    font-size: clamp(80px, 15vw, 140px);
    line-height: 1;
    filter: drop-shadow(0 8px 32px color-mix(in srgb, var(--accent) 30%, transparent));
  }

  .ss-num {
    font-size: clamp(80px, 18vw, 160px);
    font-weight: 900;
    font-family: var(--font-mono);
    color: color-mix(in srgb, var(--accent) 15%, transparent);
    letter-spacing: -0.04em;
    line-height: 1;
  }

  /* ── Progress dots ── */
  .ss-dots {
    display: flex;
    gap: 8px;
    padding: 0 clamp(24px, 6vw, 80px) 24px;
  }

  .ss-dot {
    flex: 1;
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
    max-width: 80px;
  }

  .ss-dot-bar {
    height: 100%;
    background: var(--primary);
    border-radius: inherit;
    transform-origin: left;
    transition: transform 0.1s linear;
  }

  .ss-dot--done .ss-dot-bar {
    transform: scaleX(1);
  }

  /* ── Scroll hint ── */
  .ss-hint {
    position: absolute;
    bottom: 48px;
    right: clamp(24px, 6vw, 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: var(--text-subtle);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    animation: ss-hint-bob 1.5s ease-in-out infinite;
    user-select: none;
  }

  .ss-hint-arrow {
    font-size: 16px;
    animation: ss-hint-bob 1.5s ease-in-out infinite;
  }

  @keyframes ss-hint-bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }
</style>
