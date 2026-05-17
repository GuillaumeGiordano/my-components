<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';

  let {
    badge,
    title,
    logos,
    marquee = false,
    variant = 'default',
  }: {
    badge?: string;
    title?: string;
    logos: Array<{
      name: string;
      src?: string;
      href?: string;
      width?: number;
    }>;
    marquee?: boolean;
    variant?: 'default' | 'muted';
  } = $props();

  // Duplicate logos for seamless marquee loop
  const marqueeLogos = $derived([...logos, ...logos]);
</script>

<section class="logo-cloud variant-{variant}">
  <div class="logo-cloud-inner">
    {#if badge || title}
      <div class="section-header">
        {#if badge}
          <Badge label={badge} variant="primary" dot />
        {/if}
        {#if title}
          <p class="section-title">{title}</p>
        {/if}
      </div>
    {/if}

    {#if marquee}
      <!-- Infinite scrolling marquee -->
      <div class="marquee-track" aria-label="Logos partenaires">
        <div class="marquee-inner">
          {#each marqueeLogos as logo}
            <div class="logo-item">
              {#if logo.href}
                <a href={logo.href} target="_blank" rel="noopener noreferrer" class="logo-link">
                  {#if logo.src}
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width ?? 120}
                      class="logo-img"
                    />
                  {:else}
                    <span class="logo-text">{logo.name}</span>
                  {/if}
                </a>
              {:else}
                <div class="logo-link">
                  {#if logo.src}
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width ?? 120}
                      class="logo-img"
                    />
                  {:else}
                    <span class="logo-text">{logo.name}</span>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Static flex row -->
      <div class="logo-row" aria-label="Logos partenaires">
        {#each logos as logo}
          <div class="logo-item">
            {#if logo.href}
              <a href={logo.href} target="_blank" rel="noopener noreferrer" class="logo-link">
                {#if logo.src}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width ?? 120}
                    class="logo-img"
                  />
                {:else}
                  <span class="logo-text">{logo.name}</span>
                {/if}
              </a>
            {:else}
              <div class="logo-link">
                {#if logo.src}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width ?? 120}
                    class="logo-img"
                  />
                {:else}
                  <span class="logo-text">{logo.name}</span>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .logo-cloud {
    padding: 80px 24px;
    background: var(--bg-base);
  }

  .logo-cloud-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
  }

  /* Section header */
  .section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-align: center;
  }

  .section-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-muted);
    margin: 0;
    letter-spacing: 0.01em;
  }

  /* --- Static logo row --- */
  .logo-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 32px 48px;
  }

  .logo-item {
    display: flex;
    align-items: center;
  }

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: opacity var(--transition-fast);
  }

  .logo-img {
    height: 28px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  .logo-text {
    font-weight: 700;
    font-size: 18px;
    color: var(--text-subtle);
    font-family: var(--font-sans);
    white-space: nowrap;
    transition:
      color var(--transition-fast),
      opacity var(--transition-fast);
  }

  /* Muted variant: low opacity, restore on hover */
  .variant-muted .logo-link {
    opacity: 0.4;
  }

  .variant-muted .logo-link:hover {
    opacity: 1;
  }

  /* Default variant: subtle hover */
  .variant-default .logo-link:hover {
    opacity: 0.7;
  }

  /* --- Marquee --- */
  .marquee-track {
    width: 100%;
    overflow: hidden;
    /* Fade edges */
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
  }

  .marquee-inner {
    display: flex;
    align-items: center;
    gap: 64px;
    width: max-content;
    animation: marquee-scroll 28s linear infinite;
  }

  .marquee-inner:hover {
    animation-play-state: paused;
  }

  @keyframes marquee-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  @media (max-width: 600px) {
    .logo-cloud {
      padding: 56px 16px;
    }

    .logo-row {
      gap: 24px 32px;
    }

    .logo-text {
      font-size: 15px;
    }
  }
</style>
