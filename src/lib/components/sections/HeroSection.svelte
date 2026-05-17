<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from '$lib/components/buttons/Button.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  let {
    badge,
    title,
    highlight,
    description,
    primaryCta,
    secondaryCta,
    align = 'center',
    visual,
  }: {
    badge?: string;
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    align?: 'left' | 'center';
    visual?: Snippet;
  } = $props();

  // Split the title around the highlight word(s) to colorize it
  function buildTitleParts(t: string, h?: string): { before: string; hl: string; after: string } {
    if (!h) return { before: t, hl: '', after: '' };
    const idx = t.indexOf(h);
    if (idx === -1) return { before: t, hl: '', after: '' };
    return { before: t.slice(0, idx), hl: h, after: t.slice(idx + h.length) };
  }

  const parts = $derived(buildTitleParts(title, highlight));
</script>

<section class="hero align-{align}">
  <div class="hero-inner">
    <div class="hero-content">
      {#if badge}
        <div class="hero-badge">
          <Badge label={badge} variant="primary" dot />
        </div>
      {/if}

      <h1 class="hero-title">
        {parts.before}{#if parts.hl}<span class="highlight">{parts.hl}</span>{/if}{parts.after}
      </h1>

      <p class="hero-description">{description}</p>

      {#if primaryCta || secondaryCta}
        <div class="hero-actions">
          {#if primaryCta}
            <Button variant="primary" size="lg" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
          {/if}
          {#if secondaryCta}
            <Button variant="outline" size="lg" href={secondaryCta.href}>
              {secondaryCta.label}
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if visual && align === 'left'}
      <div class="hero-visual">
        {@render visual()}
      </div>
    {/if}
  </div>

  {#if visual && align === 'center'}
    <div class="hero-visual-center">
      {@render visual()}
    </div>
  {/if}
</section>

<style>
  .hero {
    padding: 96px 24px 80px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle radial gradient in the background */
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--primary) 12%, transparent), transparent);
    pointer-events: none;
    z-index: 0;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 64px;
  }

  /* Center alignment */
  .align-center .hero-inner {
    flex-direction: column;
    text-align: center;
  }

  .align-center .hero-content {
    max-width: 720px;
  }

  .align-center .hero-actions {
    justify-content: center;
  }

  /* Left alignment */
  .align-left .hero-inner {
    flex-direction: row;
    text-align: left;
  }

  .align-left .hero-content {
    flex: 1;
    max-width: 580px;
  }

  .align-left .hero-visual {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-badge {
    margin-bottom: 20px;
    animation: fade-up 0.5s ease both;
    animation-delay: 0.05s;
  }

  .hero-title {
    font-size: clamp(2.2rem, 5vw, 3.75rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--text-heading);
    margin: 0 0 20px;
    animation: fade-up 0.5s ease both;
    animation-delay: 0.1s;
  }

  .highlight {
    color: var(--primary);
    position: relative;
  }

  .hero-description {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0 0 36px;
    animation: fade-up 0.5s ease both;
    animation-delay: 0.18s;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    animation: fade-up 0.5s ease both;
    animation-delay: 0.26s;
  }

  .hero-visual-center {
    position: relative;
    z-index: 1;
    margin-top: 56px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    animation: fade-up 0.6s ease both;
    animation-delay: 0.32s;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 64px 20px 56px;
    }

    .align-left .hero-inner {
      flex-direction: column;
    }

    .align-left .hero-content {
      max-width: 100%;
    }
  }
</style>
