<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';
  import { ArrowRight } from '@lucide/svelte';

  let {
    badge,
    title,
    description,
    cards = [],
    columns = 3,
    withBackground = "",
  }: {
    badge?: string;
    title?: string;
    description?: string;
    cards: Array<{
      src: string;
      alt: string;
      title: string;
      text?: string;
      href?: string;
    }>;
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
  } = $props();

</script>

<section class="image-cards-section {withBackground}">
  {#if badge || title || description}
    <div class="section-header">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      {#if title}
        <h2 class="section-title">{title}</h2>
      {/if}
      {#if description}
        <p class="section-description">{description}</p>
      {/if}
    </div>
  {/if}

  <div class="cards-grid" style="--cols: {columns}">
    {#each cards as card}
      <div
        class="image-card"
        style="background-image: url('{card.src}')"
        role="img"
        aria-label={card.alt}
      >
        <div class="card-overlay" aria-hidden="true"></div>
        <div class="card-content">
          <div class="card-accent"></div>
          <h3 class="card-title">{card.title}</h3>
          {#if card.text}
            <p class="card-text">{card.text}</p>
          {/if}
          {#if card.href}
            <a href={card.href} class="card-link">
              <span>En savoir plus</span>
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .image-cards-section {
    background: var(--bg-base);
  }

  /* ── Optional header ── */
  .section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 72px 24px 48px;
    max-width: 680px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.2;
    color: var(--text-heading);
    margin: 0;
  }

  .section-description {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0;
  }

  /* ── Grid ── */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), 1fr);
  }

  /* ── Card ── */
  .image-card {
    position: relative;
    min-height: 520px;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    cursor: default;
  }

  /* Dark overlay */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.82) 0%,
      rgba(0, 0, 0, 0.45) 45%,
      rgba(0, 0, 0, 0.25) 100%
    );
    transition: background var(--transition-base, 0.25s ease);
  }

  .image-card:hover .card-overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.88) 0%,
      rgba(0, 0, 0, 0.55) 45%,
      rgba(0, 0, 0, 0.30) 100%
    );
  }

  /* Bottom-aligned content */
  .card-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 36px 32px;
    gap: 10px;
  }

  /* Yellow accent line */
  .card-accent {
    width: 40px;
    height: 3px;
    background: var(--primary);
    border-radius: 2px;
    margin-bottom: 4px;
    transition: width var(--transition-base, 0.25s ease);
  }

  .image-card:hover .card-accent {
    width: 64px;
  }

  .card-title {
    font-size: clamp(1.15rem, 2vw, 1.45rem);
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #ffffff;
    margin: 0;
    line-height: 1.25;
  }

  .card-text {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.65;
    margin: 0;
    max-width: 28ch;
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: gap var(--transition-fast, 0.15s ease), color var(--transition-fast, 0.15s ease);
  }

  .card-link:hover {
    gap: 10px;
    color: color-mix(in srgb, var(--primary) 80%, #fff 20%);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .image-card {
      min-height: 380px;
    }
  }

  @media (max-width: 560px) {
    .cards-grid {
      grid-template-columns: 1fr;
    }

    .image-card {
      min-height: 340px;
    }

    .card-content {
      padding: 28px 24px;
    }
  }

  .withBackground { background: var(--bg-base); }
</style>
