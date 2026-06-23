<script lang="ts">
  import { page } from "$app/state";
  import type { ScrollSection } from "./SectionScrollbar.svelte";
  const browser = typeof window !== "undefined";

  let {
    sections = [],
    pages = {},
    home,
    side = $bindable("left"),
  }: {
    sections?: ScrollSection[];
    /** Route → sections map. When `sections` is omitted, the dock auto-selects the
     *  entry whose key matches the current pathname ("*" acts as a default). */
    pages?: Record<string, ScrollSection[]>;
    /** Permanent button pinned in first position (a real link, e.g. back to home).
     *  Sits outside the scroll-spy/puck mechanics. */
    home?: ScrollSection;
    /** Edge the dock sits on — controls which side the tooltips appear. */
    side?: "left" | "right";
  } = $props();

  // Explicit `sections` wins; otherwise resolve the list from the current route.
  const normalize = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
  const items = $derived(
    sections.length ? sections : (pages[normalize(page.url.pathname)] ?? pages["*"] ?? []),
  );

  // Geometry (kept in sync with CSS via custom properties below)
  const ITEM = 44; // circle diameter (px)
  const GAP = 12; // space between circles (px)
  const PAD = 6; // list padding (px)

  let activeIndex = $state(0);
  let dragging = $state(false);
  let dragTop = $state(0);
  let listEl = $state<HTMLElement>();

  const idOf = (s: ScrollSection) => (s.href.startsWith("#") ? s.href.slice(1) : s.href);
  // The permanent home button (when set) takes the first slot, shifting section rows down.
  const headOffset = $derived(home ? 1 : 0);
  const slotTop = (i: number) => PAD + (i + headOffset) * (ITEM + GAP);
  const clampIndex = (i: number) => Math.max(0, Math.min(items.length - 1, i));
  // Section index sitting under a given puck pixel position.
  const indexAt = (top: number) =>
    clampIndex(Math.round((top - PAD) / (ITEM + GAP)) - headOffset);

  // Where the puck rests (active section) and where it is while dragging.
  // Clamp in case the active index is stale right after a page change.
  const restTop = $derived(slotTop(clampIndex(activeIndex)));
  const puckTop = $derived(dragging ? dragTop : restTop);
  // Item currently under the puck
  const targetIndex = $derived(dragging ? indexAt(dragTop) : activeIndex);

  function go(s: ScrollSection | undefined) {
    if (s) document.getElementById(idOf(s))?.scrollIntoView({ behavior: "smooth" });
  }

  // ── Puck drag ──────────────────────────────────────────────────────────
  function onPuckDown(e: PointerEvent) {
    dragging = true;
    dragTop = restTop;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPuckMove(e: PointerEvent) {
    if (!dragging || !listEl) return;
    const rect = listEl.getBoundingClientRect();
    const t = e.clientY - rect.top - ITEM / 2;
    dragTop = Math.max(slotTop(0), Math.min(slotTop(items.length - 1), t));
  }

  function onPuckUp() {
    if (!dragging) return;
    const idx = indexAt(dragTop);
    dragging = false;
    go(items[idx]);
  }

  function onPuckKey(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      go(items[clampIndex(activeIndex + 1)]);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      go(items[clampIndex(activeIndex - 1)]);
    }
  }

  // ── Scroll spy ─────────────────────────────────────────────────────────
  $effect(() => {
    if (!browser) return;

    const els = items.map((s) => document.getElementById(idOf(s)));
    if (els.every((el) => el === null)) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      if (dragging) return; // don't fight the user while dragging
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
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  });
</script>

{#if home || items.length}
  <nav
    class="dock dock--{side}"
    class:is-dragging={dragging}
    aria-label="Navigation par sections"
    style="--item:{ITEM}px; --gap:{GAP}px; --pad:{PAD}px"
  >
    <ul class="dock-list" bind:this={listEl}>
      {#if home}
        <li>
          <a class="dock-item dock-home" href={home.href} aria-label={home.label}>
            {#if home.icon}
              <span class="dock-icon"><home.icon size={20} /></span>
            {/if}
            <span class="dock-label">{home.label}</span>
          </a>
        </li>
      {/if}

      {#each items as section, i (section.href)}
        <li>
          <button
            class="dock-item"
            class:active={activeIndex === i}
            class:targeted={dragging && targetIndex === i}
            onclick={() => go(section)}
            aria-label={section.label}
            aria-current={activeIndex === i ? "true" : undefined}
          >
            {#if section.icon}
              <span class="dock-icon"><section.icon size={20} /></span>
            {/if}
            <span class="dock-label">{section.label}</span>
          </button>
        </li>
      {/each}

      <!-- Draggable puck: rests on the active item, drop it on another to navigate -->
      {#if items.length}
        <div
          class="dock-puck"
          class:dragging
          style="top:{puckTop}px"
          onpointerdown={onPuckDown}
          onpointermove={onPuckMove}
          onpointerup={onPuckUp}
          onpointercancel={onPuckUp}
          onkeydown={onPuckKey}
          role="slider"
          tabindex="0"
          aria-label="Glisser pour naviguer entre les sections"
          aria-valuemin={0}
          aria-valuemax={items.length - 1}
          aria-valuenow={targetIndex}
        ></div>
      {/if}
    </ul>
  </nav>
{/if}

<style>
  .dock {
    user-select: none;
    -webkit-user-select: none;
  }

  .dock-list {
    position: relative;
    list-style: none;
    margin: 0;
    padding: var(--pad);
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }

  /* ── Circular items ── */
  .dock-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--item);
    height: var(--item);
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--bg-base);
    color: var(--text-muted);
    text-decoration: none;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      transform var(--transition-fast);
  }

  /* Permanent home button — tinted to stand apart from the section items */
  .dock-home {
    color: var(--primary);
    border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
  }

  .dock-home:hover {
    background: var(--primary);
    color: var(--primary-fg);
  }

  .dock-item:hover {
    background: var(--bg-hover);
    color: var(--text-base);
    transform: scale(1.05);
  }

  .dock-item:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .dock-icon {
    display: flex;
  }

  /* ── Tooltip label (dark pill that slides out) ── */
  .dock-label {
    position: absolute;
    top: 50%;
    background: var(--text-heading);
    color: var(--bg-base);
    font-size: 12px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: var(--radius-full);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  .dock--left .dock-label {
    left: calc(100% + 14px);
    transform: translateY(-50%) translateX(-6px);
  }
  .dock--right .dock-label {
    right: calc(100% + 14px);
    transform: translateY(-50%) translateX(6px);
  }

  /* Tooltip arrow */
  .dock-label::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
  }
  .dock--left .dock-label::after {
    right: 100%;
    border-right-color: var(--text-heading);
  }
  .dock--right .dock-label::after {
    left: 100%;
    border-left-color: var(--text-heading);
  }

  .dock-item:hover .dock-label,
  .dock-item.targeted .dock-label {
    opacity: 1;
  }
  .dock--left .dock-item:hover .dock-label,
  .dock--left .dock-item.targeted .dock-label {
    transform: translateY(-50%) translateX(0);
  }
  .dock--right .dock-item:hover .dock-label,
  .dock--right .dock-item.targeted .dock-label {
    transform: translateY(-50%) translateX(0);
  }

  /* ── Draggable puck: empty ring that frames the item beneath it ── */
  .dock-puck {
    position: absolute;
    left: var(--pad);
    width: var(--item);
    height: var(--item);
    box-sizing: border-box;
    border-radius: 50%;
    background: transparent;
    border: 3px solid var(--primary);
    cursor: grab;
    touch-action: none;
    /* Slightly larger than the item so the icon button nests inside the ring */
    transform: scale(1.2);
    transition:
      top 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      transform var(--transition-fast),
      box-shadow var(--transition-fast);
    z-index: 3;
  }

  .dock-puck:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
  }

  .dock-puck.dragging {
    cursor: grabbing;
    transform: scale(1.35);
    box-shadow: 0 6px 20px color-mix(in srgb, var(--primary) 40%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    .dock-puck {
      transition: none;
    }
    .dock-item {
      transition: none;
    }
  }
</style>
