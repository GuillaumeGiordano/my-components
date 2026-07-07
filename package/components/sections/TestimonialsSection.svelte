<script lang="ts">
  import Badge from "../ui/Badge.svelte";
  import Avatar from "../ui/Avatar.svelte";
  import Card from "../ui/Card.svelte";

  let {
    badge,
    title,
    description,
    testimonials,
    addClass,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    testimonials: Array<{
      name: string;
      role: string;
      company?: string;
      initials?: string;
      content: string;
      rating?: number;
    }>;
    addClass?: string;
    withBackground?: "bg-base" | "";
  } = $props();

  // Build an array of 5 stars filled/empty
  function stars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
</script>

<section class="testimonials {addClass} {withBackground}">
  <div class="testimonials-inner">
    <!-- Header -->
    <div class="section-header">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      <h2 class="section-title">{title}</h2>
      {#if description}
        <p class="section-description">{description}</p>
      {/if}
    </div>

    <!-- Masonry-style grid via CSS columns -->
    <div class="testimonials-grid">
      {#each testimonials as t, i}
        <div class="testimonial-item" style="animation-delay: {i * 0.07}s">
          <Card padding="lg">
            {#snippet children()}
              <!-- Rating -->
              {#if t.rating}
                <div class="stars" aria-label="{t.rating} étoiles sur 5">
                  {#each stars(t.rating) as filled}
                    <span class="star" class:filled>{filled ? "★" : "☆"}</span>
                  {/each}
                </div>
              {/if}

              <!-- Quote -->
              <blockquote class="quote">
                <span class="quote-mark">"</span>{t.content}<span class="quote-mark"
                  >"</span
                >
              </blockquote>

              <!-- Author -->
              <div class="author">
                <Avatar name={t.name} size="sm" shape="circle" />
                <div class="author-info">
                  <span class="author-name">{t.name}</span>
                  <span class="author-role">
                    {t.role}{#if t.company}
                      · {t.company}{/if}
                  </span>
                </div>
              </div>
            {/snippet}
          </Card>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .testimonials {
    padding: 88px 24px;
    background: var(--bg-base);
  }

  .testimonials-inner {
    max-width: 1100px;
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
    max-width: 520px;
    margin: 0;
  }

  /* ---- Grid (CSS columns for masonry effect) ---- */
  .testimonials-grid {
    columns: 3;
    column-gap: 20px;
  }

  .testimonial-item {
    break-inside: avoid;
    margin-bottom: 20px;
    animation: fade-up 0.45s ease both;
  }

  /* ---- Card content ---- */
  .stars {
    display: flex;
    gap: 2px;
    margin-bottom: 12px;
  }

  .star {
    font-size: 16px;
    color: var(--border-strong);
    line-height: 1;
  }

  .star.filled {
    color: #f59e0b;
  }

  .quote {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-base);
    margin: 0 0 20px;
    font-style: italic;
  }

  .quote-mark {
    color: var(--primary);
    font-size: 1.3em;
    font-style: normal;
    font-weight: 700;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .author-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-heading);
  }

  .author-role {
    font-size: 12px;
    color: var(--text-subtle);
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 900px) {
    .testimonials-grid {
      columns: 2;
    }
  }

  @container (max-width: 900px) {
    .testimonials-grid {
      columns: 2;
    }
  }

  @media (max-width: 580px) {
    .testimonials {
      padding: 64px 20px;
    }

    .testimonials-grid {
      columns: 1;
    }
  }

  @container (max-width: 580px) {
    .testimonials {
      padding: 64px 20px;
    }

    .testimonials-grid {
      columns: 1;
    }
  }

  .bg-base {
    padding: 1rem 0;
    background: var(--bg-base);
  }
</style>
