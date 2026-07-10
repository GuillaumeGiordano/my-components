<script lang="ts">
  import type { Snippet } from "svelte";
  import { Check } from "@lucide/svelte";
  import Badge from "../ui/Badge.svelte";
  import Button from "../buttons/Button.svelte";

  type Feature = {
    id?: string;
    badge?: string;
    title: string;
    description: string;
    bullets?: string[];
    cta?: { label: string; href: string };
    visual: Snippet;
    imageFirst?: boolean;
  };

  let {
    features,
    withBackground = "",
  }: {
    features: Feature[];
    withBackground?: "bg-base" | "";
  } = $props();
</script>

<div class="split-feature-section {withBackground}">
  {#each features as feature, i}
    <!-- imageFirst prop takes priority; fallback: alternate by index (even = text left) -->
    {@const imageLeft = feature.imageFirst ?? i % 2 === 1}
    <div id={feature.id} class="feature-row" class:image-left={imageLeft}>
      <div class="text-side">
        {#if feature.badge}
          <div class="badge-wrap">
            <Badge label={feature.badge} variant="primary" />
          </div>
        {/if}
        <h2 class="feature-title">{feature.title}</h2>
        <p class="feature-desc">{feature.description}</p>
        {#if feature.bullets && feature.bullets.length > 0}
          <ul class="bullets">
            {#each feature.bullets as bullet}
              <li>
                <span class="check-icon"><Check size={16} /></span>
                <span>{bullet}</span>
              </li>
            {/each}
          </ul>
        {/if}
        {#if feature.cta}
          <div class="cta-wrap">
            <Button href={feature.cta.href} variant="primary" size="md">
              {feature.cta.label}
            </Button>
          </div>
        {/if}
      </div>
      <div class="visual-side">
        {@render feature.visual()}
      </div>
    </div>
  {/each}
</div>

<style>
  .split-feature-section {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - var(--header-height) - 1px);
  }

  .bg-base {
    background: var(--bg-base);
  }

  /* --- Row --- */
  .feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
    max-width: 1100px;
    width: 100%;
    padding: 60px 24px;
    margin: auto;
    border-top: 1px solid var(--border);
  }

  .feature-row:first-child {
    border-top: none;
  }

  /* When image is on the left, swap the columns visually */
  .feature-row.image-left .text-side {
    order: 2;
  }

  .feature-row.image-left .visual-side {
    order: 1;
  }

  /* --- Text side --- */
  .badge-wrap {
    margin-bottom: 16px;
  }

  .feature-title {
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 700;
    color: var(--text-heading);
    line-height: 1.2;
    margin: 0 0 16px;
    letter-spacing: -0.02em;
  }

  .feature-desc {
    font-size: 17px;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0 0 24px;
  }

  /* --- Bullet list --- */
  .bullets {
    list-style: none;
    margin: 0 0 28px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bullets li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 15px;
    color: var(--text-base);
    line-height: 1.5;
  }

  .check-icon {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--primary-subtle);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  .cta-wrap {
    margin-top: 8px;
  }

  /* --- Visual side --- */
  .visual-side {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* --- Mobile --- */
  @media (max-width: 768px) {
    .feature-row {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 64px 24px;
    }

    /* On mobile: text always on top, visual always below */
    .feature-row.image-left .text-side {
      order: 1;
    }

    .feature-row.image-left .visual-side {
      order: 2;
    }
  }

  @container (max-width: 768px) {
    .feature-row {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 24px 24px;
    }

    /* On mobile: text always on top, visual always below */
    .feature-row.image-left .text-side {
      order: 1;
    }

    .feature-row.image-left .visual-side {
      order: 2;
    }
  }

  .bg-base {
    padding: 1rem 0;
    background: var(--bg-base);
  }
</style>
