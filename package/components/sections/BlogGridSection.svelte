<script lang="ts">
  import Badge from "../ui/Badge.svelte";
  import Card from "../ui/Card.svelte";
  import Avatar from "../ui/Avatar.svelte";
  import Button from "../buttons/Button.svelte";
  import { Clock } from "@lucide/svelte";

  let {
    badge,
    title,
    description,
    posts,
    columns = 3,
    showCta = false,
    ctaLabel = "Voir tous les articles",
    ctaHref,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    posts: Array<{
      title: string;
      excerpt: string;
      category: string;
      author: { name: string; avatar?: string };
      date: string;
      readTime?: string;
      image?: string;
      href?: string;
    }>;
    columns?: 2 | 3;
    showCta?: boolean;
    ctaLabel?: string;
    ctaHref?: string;
    withBackground?: "bg-base" | "";
  } = $props();
</script>

<section class="blog-grid {withBackground}">
  <div class="blog-grid-inner">
    <!-- Section header -->
    <div class="section-header">
      <div class="header-left">
        {#if badge}
          <Badge label={badge} variant="primary" dot />
        {/if}
        <h2 class="section-title">{title}</h2>
        {#if description}
          <p class="section-description">{description}</p>
        {/if}
      </div>

      {#if showCta}
        <div class="header-cta">
          <Button variant="outline" size="md" href={ctaHref}>
            {#snippet children()}{ctaLabel}{/snippet}
          </Button>
        </div>
      {/if}
    </div>

    <!-- Posts grid -->
    <div class="posts-grid cols-{columns}">
      {#each posts as post, i}
        <article class="post-wrap" style="animation-delay: {i * 0.07}s">
          {#if post.href}
            <a href={post.href} class="post-link" tabindex="-1" aria-hidden="true"></a>
          {/if}

          <Card hoverable padding="none">
            {#snippet children()}
              <!-- Cover image -->
              <div class="post-image-wrap">
                {#if post.image}
                  <img
                    src={post.image}
                    alt={post.title}
                    class="post-image"
                    loading="lazy"
                  />
                {:else}
                  <div class="post-image-placeholder"></div>
                {/if}
                <div class="post-image-overlay"></div>
                <div class="post-category-badge">
                  <Badge label={post.category} variant="primary" size="sm" />
                </div>
              </div>

              <!-- Card content -->
              <div class="post-content">
                <h3 class="post-title">
                  {#if post.href}
                    <a href={post.href} class="post-title-link">{post.title}</a>
                  {:else}
                    {post.title}
                  {/if}
                </h3>
                <p class="post-excerpt">{post.excerpt}</p>

                <!-- Author row -->
                <div class="post-meta">
                  <Avatar
                    name={post.author.name}
                    src={post.author.avatar}
                    size="sm"
                    shape="circle"
                  />
                  <div class="post-meta-text">
                    <span class="post-author">{post.author.name}</span>
                    <span class="post-date">{post.date}</span>
                  </div>
                  {#if post.readTime}
                    <div class="post-read-time">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  {/if}
                </div>
              </div>
            {/snippet}
          </Card>
        </article>
      {/each}
    </div>

    <!-- Bottom CTA for mobile / centered variant -->
    {#if showCta}
      <div class="bottom-cta">
        <Button variant="outline" size="md" href={ctaHref}>
          {#snippet children()}{ctaLabel}{/snippet}
        </Button>
      </div>
    {/if}
  </div>
</section>

<style>
  .blog-grid {
    padding: 100px 24px;
    background: var(--bg-base);
  }

  .blog-grid-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  /* Section header */
  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 560px;
  }

  .header-cta {
    flex-shrink: 0;
  }

  .section-title {
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
    line-height: 1.2;
  }

  .section-description {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  /* Posts grid */
  .posts-grid {
    display: grid;
    gap: 24px;
  }

  .cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Post article */
  .post-wrap {
    position: relative;
    opacity: 0;
    animation: fade-up 0.5s ease forwards;
  }

  .post-link {
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: var(--radius-xl);
  }

  /* Ensure title link stays above the full-card link */
  .post-title-link {
    position: relative;
    z-index: 2;
    color: inherit;
    text-decoration: none;
  }

  .post-title-link:hover {
    color: var(--primary);
  }

  /* Cover image */
  .post-image-wrap {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    background: var(--bg-muted);
  }

  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .post-wrap:hover .post-image {
    transform: scale(1.04);
  }

  .post-image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      var(--primary-subtle) 0%,
      color-mix(in srgb, var(--primary) 15%, var(--bg-muted)) 100%
    );
  }

  /* Subtle overlay on hover */
  .post-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.18) 0%, transparent 60%);
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  .post-wrap:hover .post-image-overlay {
    opacity: 1;
  }

  .post-category-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
  }

  /* Card content */
  .post-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .post-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0;
    line-height: 1.4;
  }

  .post-excerpt {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
    /* Clamp to 3 lines */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Author row */
  .post-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }

  .post-meta-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    min-width: 0;
  }

  .post-author {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-base);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-date {
    font-size: 12px;
    color: var(--text-subtle);
  }

  .post-read-time {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--text-subtle);
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* Bottom CTA (hidden on desktop if header-cta is shown) */
  .bottom-cta {
    display: none;
    justify-content: center;
  }

  /* Animation */
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 900px) {
    .cols-3 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .blog-grid {
      padding: 64px 16px;
    }

    .cols-3,
    .cols-2 {
      grid-template-columns: 1fr;
    }

    .section-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .header-cta {
      display: none;
    }

    .bottom-cta {
      display: flex;
    }
  }

  .bg-base {
    padding: 1rem 0;
    background: var(--bg-base);
  }
</style>
