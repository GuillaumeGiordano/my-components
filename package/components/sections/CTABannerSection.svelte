<script lang="ts">
  import Badge from '../ui/Badge.svelte';
  import Button from '../buttons/Button.svelte';

  let {
    badge,
    title,
    description,
    primaryCta,
    secondaryCta,
    variant = 'default',
  }: {
    badge?: string;
    title: string;
    description?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    variant?: 'default' | 'primary' | 'dark';
  } = $props();
</script>

<section class="cta-banner variant-{variant}">
  <div class="cta-inner">
    {#if badge}
      <div class="cta-badge">
        <Badge
          label={badge}
          variant={variant === 'primary' ? 'default' : 'primary'}
          dot
        />
      </div>
    {/if}

    <h2 class="cta-title">{title}</h2>

    {#if description}
      <p class="cta-description">{description}</p>
    {/if}

    {#if primaryCta || secondaryCta}
      <div class="cta-actions">
        {#if primaryCta}
          <Button
            variant={variant === 'primary' ? 'secondary' : 'primary'}
            size="lg"
            href={primaryCta.href}
          >
            {primaryCta.label}
          </Button>
        {/if}
        {#if secondaryCta}
          <Button
            variant={variant === 'primary' ? 'ghost' : 'outline'}
            size="lg"
            href={secondaryCta.href}
          >
            {secondaryCta.label}
          </Button>
        {/if}
      </div>
    {/if}
  </div>
</section>

<style>
  .cta-banner {
    padding: 88px 24px;
    position: relative;
    overflow: hidden;
  }

  /* ---- Variants ---- */
  .variant-default {
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .variant-primary {
    background: var(--primary);
  }

  .variant-dark {
    background: #0f172a;
  }

  /* Decorative radial glow for primary/dark variants */
  .variant-primary::before,
  .variant-dark::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255, 255, 255, 0.08), transparent);
    pointer-events: none;
  }

  /* ---- Inner ---- */
  .cta-inner {
    position: relative;
    z-index: 1;
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: fade-up 0.5s ease both;
  }

  .cta-badge {
    /* Override badge colors for primary variant */
  }

  .cta-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0;
  }

  .variant-default .cta-title,
  .variant-default .cta-description {
    color: var(--text-heading);
  }

  .variant-primary .cta-title,
  .variant-dark .cta-title {
    color: #fff;
  }

  .cta-description {
    font-size: 1.05rem;
    line-height: 1.7;
    max-width: 520px;
    margin: 0;
  }

  .variant-default .cta-description {
    color: var(--text-muted);
  }

  .variant-primary .cta-description,
  .variant-dark .cta-description {
    color: rgba(255, 255, 255, 0.75);
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-top: 4px;
  }

  /* Ghost button on primary/dark background needs white text */
  .variant-primary .cta-actions :global(.btn-ghost),
  .variant-dark .cta-actions :global(.btn-ghost) {
    color: rgba(255, 255, 255, 0.85);
  }

  .variant-primary .cta-actions :global(.btn-ghost:hover),
  .variant-dark .cta-actions :global(.btn-ghost:hover) {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 640px) {
    .cta-banner {
      padding: 64px 20px;
    }
  }
</style>
