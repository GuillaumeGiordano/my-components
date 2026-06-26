<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { Check } from "@lucide/svelte";

  let {
    id,
    eyebrow,
    title,
    description,
    points = [],
    cta,
    icon: Icon,
    accent = "var(--primary)",
    reverse = false,
    withBackground = "",
    visual,
  }: {
    id?: string;
    eyebrow?: string;
    title: string;
    description: string;
    points?: string[];
    cta?: { label: string; href: string };
    icon?: Component;
    accent?: string;
    reverse?: boolean;
    withBackground?: "bg-base" | "";
    visual?: Snippet;
  } = $props();
</script>

<section {id} class="sd {withBackground}" class:reverse style="--accent:{accent}">
  <div class="sd-inner">
    <!-- Text -->
    <div class="sd-text">
      {#if eyebrow}
        <span class="sd-eyebrow">
          {#if Icon}<span class="sd-eyebrow-icon"><Icon size={14} /></span>{/if}
          {eyebrow}
        </span>
      {/if}

      <h2 class="sd-title">{title}</h2>
      <p class="sd-description">{description}</p>

      {#if points.length}
        <ul class="sd-points">
          {#each points as point (point)}
            <li>
              <span class="sd-check"><Check size={14} /></span>
              {point}
            </li>
          {/each}
        </ul>
      {/if}

      {#if cta}
        <a class="sd-cta" href={cta.href}>{cta.label}</a>
      {/if}
    </div>

    <!-- Visual: custom illustration if provided, else a default CSS browser mockup -->
    <div class="sd-visual" aria-hidden={visual ? undefined : "true"}>
      {#if visual}
        {@render visual()}
      {:else}
        <div class="mockup">
          <div class="mockup-bar">
            <span></span><span></span><span></span>
          </div>
          <div class="mockup-body">
            <div class="mk-line mk-w70"></div>
            <div class="mk-line mk-w40"></div>
            <div class="mk-hero"></div>
            <div class="mk-cards">
              <div class="mk-card"></div>
              <div class="mk-card"></div>
              <div class="mk-card"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .sd {
    display: flex;
    min-height: calc(100vh - var(--header-height) - 1px);
  }

  .bg-base {
    background: var(--bg-base);
  }

  .sd-inner {
    max-width: 1100px;
    width: 100%;
    padding: 80px 24px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 56px;
  }

  .sd.reverse .sd-text {
    order: 2;
  }

  /* ── Text ── */
  .sd-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sd-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }

  .sd-eyebrow-icon {
    display: flex;
  }

  .sd-title {
    font-size: clamp(26px, 4vw, 40px);
    font-weight: 700;
    line-height: 1.15;
    color: var(--text-heading);
    margin: 0;
  }

  .sd-description {
    font-size: 17px;
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0;
  }

  .sd-points {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sd-points li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: var(--text-base);
  }

  .sd-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
  }

  .sd-cta {
    align-self: flex-start;
    margin-top: 8px;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    background: var(--accent);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition:
      filter var(--transition-fast),
      transform var(--transition-fast);
  }

  .sd-cta:hover {
    filter: brightness(0.92);
    transform: translateY(-1px);
  }

  /* ── Visual mockup ── */
  .sd-visual {
    display: flex;
    justify-content: center;
  }

  .mockup {
    width: 100%;
    max-width: 440px;
    border-radius: var(--radius-xl);
    background: var(--bg-base);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    rotate: 1.5deg;
    transition: rotate var(--transition-base);
  }

  .sd-visual:hover .mockup {
    rotate: 0deg;
  }

  .mockup-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 14px;
    background: color-mix(in srgb, var(--accent) 10%, var(--bg-subtle));
    border-bottom: 1px solid var(--border);
  }

  .mockup-bar span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 35%, var(--border));
  }

  .mockup-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .mk-line {
    height: 12px;
    border-radius: 6px;
    background: var(--bg-hover);
  }
  .mk-w70 {
    width: 70%;
  }
  .mk-w40 {
    width: 40%;
  }

  .mk-hero {
    height: 96px;
    border-radius: var(--radius-lg);
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 80%, transparent),
      color-mix(in srgb, var(--accent) 35%, transparent)
    );
  }

  .mk-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .mk-card {
    height: 56px;
    border-radius: var(--radius-md);
    background: var(--bg-muted);
    border-top: 3px solid color-mix(in srgb, var(--accent) 60%, transparent);
  }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .sd-inner {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .sd.reverse .sd-text {
      order: 0;
    }
    .sd-visual {
      order: -1;
    }
  }

  @container (max-width: 860px) {
    .sd-inner {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .sd.reverse .sd-text {
      order: 0;
    }
    .sd-visual {
      order: -1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mockup {
      rotate: 0deg;
    }
  }
</style>
