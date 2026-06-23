<script lang="ts">
  import type { ScrollSection } from "./SectionScrollbar.svelte";
  const browser = typeof window !== "undefined";

  let {
    sections = [],
  }: {
    sections?: ScrollSection[];
  } = $props();

  let activeIndex = $state(0);

  const idOf = (s: ScrollSection) => (s.href.startsWith("#") ? s.href.slice(1) : s.href);

  // Scroll spy: active = the last section whose top has scrolled past the viewport center
  $effect(() => {
    if (!browser) return;

    const els = sections.map((s) => document.getElementById(idOf(s)));
    if (els.every((el) => el === null)) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const center = window.innerHeight / 2;
      let current = 0;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el && el.getBoundingClientRect().top <= center) current = i;
      }
      activeIndex = current;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  });

  function go(s: ScrollSection) {
    document.getElementById(idOf(s))?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<nav class="rail" aria-label="Navigation par sections">
  <ul class="rail-list">
    {#each sections as section, i (section.href)}
      <li>
        <button
          class="rail-item"
          class:active={activeIndex === i}
          onclick={() => go(section)}
          aria-label={section.label}
          aria-current={activeIndex === i ? "true" : undefined}
        >
          {#if section.icon}
            <span class="rail-icon"><section.icon size={20} /></span>
          {/if}
          <span class="rail-label">{section.label}</span>
        </button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  /* Positioning is delegated to a wrapper (e.g. <FloatingGroup position="left">) */
  .rail-list {
    list-style: none;
    margin: 0;
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
  }

  .rail-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    border-radius: var(--radius-lg);
    cursor: pointer;
    font: inherit;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .rail-item:hover {
    background: var(--bg-hover);
    color: var(--text-base);
  }

  .rail-item:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .rail-item.active {
    background: var(--primary-subtle);
    color: var(--primary-subtle-fg);
  }

  .rail-icon {
    display: flex;
    flex-shrink: 0;
  }

  /* Label hidden at rest, slides in when the rail is hovered/focused */
  .rail-label {
    max-width: 0;
    margin-left: 0;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 600;
    transform: translateX(-6px);
    transition:
      max-width 0.3s ease,
      margin-left 0.3s ease,
      opacity 0.2s ease,
      transform 0.3s ease;
  }

  .rail:hover .rail-label,
  .rail:focus-within .rail-label {
    max-width: 160px;
    margin-left: 12px;
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .rail-label {
      transition: opacity 0.2s ease;
    }
  }
</style>
