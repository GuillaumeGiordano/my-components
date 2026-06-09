<script lang="ts" module>
  export type ProgressSection = { id: string; label: string };
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  const browser = typeof window !== "undefined";

  let {
    sections = [] as ProgressSection[],
    side = "right" as "left" | "right",
    showLabels = true,
  }: {
    sections?: ProgressSection[];
    side?: "left" | "right";
    showLabels?: boolean;
  } = $props();

  let progress = $state(0);
  let activeSec = $state("");

  function onScroll() {
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    progress = scrollH > 0 ? window.scrollY / scrollH : 0;

    if (sections.length) {
      const threshold = window.innerHeight * 0.45;
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          activeSec = s.id;
          return;
        }
      }
      activeSec = sections[0]?.id ?? "";
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

<nav class="sp sp--{side}" aria-label="Progression de page">
  <!-- Ligne verticale -->
  <div class="sp-track" aria-hidden="true">
    <div class="sp-fill" style="height:{progress * 100}%"></div>
  </div>

  <!-- Dots de section -->
  {#if sections.length}
    <ul class="sp-list">
      {#each sections as sec}
        <li>
          <button
            class="sp-dot"
            class:sp-dot--active={sec.id === activeSec}
            onclick={() => scrollTo(sec.id)}
            title={sec.label}
            aria-label="Aller à : {sec.label}"
          >
            <span class="sp-dot-pip"></span>
            {#if showLabels}
              <span class="sp-dot-label">{sec.label}</span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</nav>

<style>
  .sp {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sp--right {
    right: 24px;
    flex-direction: row-reverse;
  }
  .sp--left {
    left: 24px;
    flex-direction: row;
  }

  /* ── Ligne de progression ── */
  .sp-track {
    width: 2px;
    height: 120px;
    background: var(--border);
    border-radius: 1px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .sp-fill {
    width: 100%;
    background: var(--primary);
    border-radius: inherit;
    transition: height 0.1s linear;
  }

  /* ── Dots ── */
  .sp-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sp-dot {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 0;
  }

  .sp--right .sp-dot {
    flex-direction: row-reverse;
  }
  .sp--left .sp-dot {
    flex-direction: row;
  }

  .sp-dot-pip {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid var(--border);
    background: var(--bg-base);
    transition:
      border-color 200ms ease,
      background 200ms ease,
      transform 200ms ease;
    flex-shrink: 0;
  }

  .sp-dot--active .sp-dot-pip {
    border-color: var(--primary);
    background: var(--primary);
    transform: scale(1.4);
  }

  .sp-dot-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-subtle);
    letter-spacing: 0.04em;
    white-space: nowrap;
    opacity: 0;
    transition:
      opacity 200ms ease,
      color 200ms ease;
  }

  .sp-dot:hover .sp-dot-label,
  .sp-dot--active .sp-dot-label {
    opacity: 1;
  }

  .sp-dot--active .sp-dot-label {
    color: var(--primary);
  }
</style>
