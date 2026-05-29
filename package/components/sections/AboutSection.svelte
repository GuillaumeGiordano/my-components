<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import Badge from '../ui/Badge.svelte';
  import Button from '../buttons/Button.svelte';

  let {
    badge,
    eyebrow,
    title,
    description,
    values,
    primaryCta,
    secondaryCta,
    imagePosition = 'right',
    visual,
  }: {
    badge?: string;
    eyebrow?: string;
    title: string;
    description: string;
    values?: Array<{ icon: Component; label: string; description?: string }>;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    imagePosition?: 'right' | 'left';
    visual?: Snippet;
  } = $props();
</script>

<section class="about" class:image-left={imagePosition === 'left'}>
  <div class="about-inner">

    <div class="text-side">
      {#if badge}
        <div class="badge-wrap">
          <Badge label={badge} variant="primary" dot />
        </div>
      {/if}
      {#if eyebrow}
        <p class="eyebrow">{eyebrow}</p>
      {/if}
      <h2 class="title">{title}</h2>
      <p class="description">{description}</p>

      {#if values && values.length > 0}
        <ul class="values">
          {#each values as v}
            <li class="value-item">
              <span class="value-icon">
                <v.icon size={18} />
              </span>
              <div class="value-text">
                <span class="value-label">{v.label}</span>
                {#if v.description}
                  <span class="value-desc">{v.description}</span>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      {/if}

      {#if primaryCta || secondaryCta}
        <div class="cta-row">
          {#if primaryCta}
            <Button href={primaryCta.href} variant="primary">{primaryCta.label}</Button>
          {/if}
          {#if secondaryCta}
            <Button href={secondaryCta.href} variant="outline">{secondaryCta.label}</Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if visual}
      <div class="visual-side">
        {@render visual()}
      </div>
    {/if}

  </div>
</section>

<style>
  .about {
    padding: 96px 64px;
    border-top: 1px solid var(--border);
    background: var(--bg-base);
  }

  .about-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .about.image-left .text-side  { order: 2; }
  .about.image-left .visual-side { order: 1; }

  /* ── Text ── */
  .badge-wrap { margin-bottom: 16px; }

  .eyebrow {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--primary);
    margin: 0 0 12px;
  }

  .title {
    font-size: clamp(26px, 3.5vw, 42px);
    font-weight: 700;
    color: var(--text-heading);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
  }

  .description {
    font-size: 17px;
    color: var(--text-muted);
    line-height: 1.75;
    margin: 0 0 32px;
  }

  /* ── Values list ── */
  .values {
    list-style: none;
    margin: 0 0 36px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .value-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .value-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-lg);
    background: var(--primary-subtle);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }

  .value-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .value-label {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-base);
  }

  .value-desc {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* ── CTAs ── */
  .cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  /* ── Visual ── */
  .visual-side {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .about { padding: 64px 24px; }
    .about-inner { grid-template-columns: 1fr; gap: 40px; }
    .about.image-left .text-side  { order: 1; }
    .about.image-left .visual-side { order: 2; }
  }
</style>
