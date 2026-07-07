<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "../buttons/Button.svelte";
  import HighlightedTitle from "../ui/HighlightedTitle.svelte";

  let {
    id,
    title,
    highlight,
    description,
    primaryCta,
    secondaryCta,
    align = "center",
    withBackground = "",
    visual,
  }: {
    id?: string;
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    align?: "left" | "center";
    withBackground?: "bg-base" | "";
    visual?: Snippet;
  } = $props();
</script>

<section {id} class="hero radial {withBackground} align-{align}">
  <div class="hero-inner">
    <div class="hero-content">
      <h1 class="hero-title">
        <HighlightedTitle text={title} {highlight} />
      </h1>

      <p class="hero-description">{description}</p>

      {#if primaryCta || secondaryCta}
        <div class="hero-actions">
          {#if primaryCta}
            <Button variant="primary" size="lg" addClass="test" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
          {/if}
          {#if secondaryCta}
            <Button variant="outline" size="lg" addClass="test" href={secondaryCta.href}>
              {secondaryCta.label}
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if visual && align === "left"}
      <div class="hero-visual">
        {@render visual()}
      </div>
    {/if}
  </div>

  {#if visual && align === "center"}
    <div class="hero-visual-center">
      {@render visual()}
    </div>
  {/if}
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - var(--header-height) - 1px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Subtle radial gradient in the background */
  .radial::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 50% at 50% -10%,
      color-mix(in srgb, var(--primary) 12%, transparent),
      transparent
    );
    pointer-events: none;
    z-index: 0;
  }

  .bg-base {
    background: var(--bg-base);
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 64px;
    padding: 0 20px;
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
  }

  .align-left .hero-visual {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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
    text-align: center;
  }

  .hero-description {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0 0 36px;
    animation: fade-up 0.5s ease both;
    animation-delay: 0.18s;
    text-align: justify;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    animation: fade-up 0.5s ease both;
    animation-delay: 0.26s;
  }
  :global(.test) {
    flex: 1;
  }
  .test {
    flex: 1;
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
      min-height: calc(100vh - 1px);
    }

    .align-left .hero-inner {
      flex-direction: column;
    }

    .align-left .hero-content {
      max-width: 100%;
    }
  }

  @container (max-width: 768px) {
    .hero {
      min-height: calc(100vh - 1px);
    }

    .align-left .hero-inner {
      flex-direction: column;
    }

    .align-left .hero-content {
      max-width: 100%;
    }
  }
</style>
