<script lang="ts">
  import type { Component } from 'svelte';
  import Badge from '../ui/Badge.svelte';
  import Card from '../ui/Card.svelte';

  let {
    badge,
    title,
    description,
    features,
    columns = 3,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    features: Array<{
      icon: Component;
      title: string;
      description: string;
      badge?: string;
    }>;
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
  } = $props();

</script>

<section class="features {withBackground}">
  <div class="features-inner">
    <!-- Section header -->
    <div class="section-header">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      <h2 class="section-title">{title}</h2>
      {#if description}
        <p class="section-description">{description}</p>
      {/if}
    </div>

    <!-- Features grid -->
    <div class="features-grid cols-{columns}">
      {#each features as feature, i}
        <div class="feature-card-wrap" style="animation-delay: {i * 0.07}s">
          <Card hoverable padding="lg">
            {#snippet children()}
              <div class="feature-icon-wrap">
                <feature.icon size={22} />
              </div>
              <div class="feature-meta">
                <div class="feature-title-row">
                  <h3 class="feature-title">{feature.title}</h3>
                  {#if feature.badge}
                    <Badge label={feature.badge} variant="primary" size="sm" />
                  {/if}
                </div>
                <p class="feature-description">{feature.description}</p>
              </div>
            {/snippet}
          </Card>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .features {
    padding: 88px 24px;
    background: var(--bg-base);
  }

  .features-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ---- Header ---- */
  .section-header {
    text-align: center;
    margin-bottom: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .section-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-heading);
    margin: 0;
  }

  .section-description {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 560px;
    margin: 0;
  }

  /* ---- Grid ---- */
  .features-grid {
    display: grid;
    gap: 20px;
  }

  .cols-2 { grid-template-columns: repeat(2, 1fr); }
  .cols-3 { grid-template-columns: repeat(3, 1fr); }
  .cols-4 { grid-template-columns: repeat(4, 1fr); }

  /* ---- Card content ---- */
  .feature-card-wrap {
    animation: fade-up 0.45s ease both;
  }

  .feature-icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: var(--primary-subtle);
    color: var(--primary);
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .feature-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .feature-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .feature-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0;
  }

  .feature-description {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.65;
    margin: 0;
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

  @media (max-width: 1024px) {
    .cols-4 { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .features {
      padding: 64px 20px;
    }

    .cols-2,
    .cols-3,
    .cols-4 {
      grid-template-columns: 1fr;
    }
  }

  .withBackground { background: var(--bg-base); }
</style>
