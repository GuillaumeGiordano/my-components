<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { Smartphone, Monitor, Globe } from "@lucide/svelte";
  import Badge from "$lib/components/ui/Badge.svelte";

  type Platform = "ios" | "android" | "windows" | "mac" | "linux" | "web";

  type Store = {
    platform: Platform;
    label: string;
    sublabel?: string;
    href: string;
    icon?: Component;
  };

  let {
    badge,
    title,
    description,
    stores,
    visual,
    stats,
    align = "center",
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    stores: Store[];
    visual?: Snippet;
    stats?: Array<{ value: string; label: string }>;
    align?: "center" | "split";
    withBackground?: "bg-base" | "";
  } = $props();

  // Fallback icon per platform
  function platformIcon(store: Store): Component {
    if (store.icon) return store.icon;
    if (store.platform === "ios" || store.platform === "android") return Smartphone;
    if (store.platform === "web") return Globe;
    return Monitor;
  }

  // Background color per platform
  function platformBg(platform: Platform): string {
    if (platform === "ios") return "#000000";
    if (platform === "android") return "#3ddc84";
    if (platform === "windows") return "#0078d4";
    if (platform === "mac") return "#1d1d1f";
    if (platform === "linux") return "#e95420";
    return "#1a1a2e"; // web
  }

  // Text color per platform
  function platformColor(platform: Platform): string {
    if (platform === "android") return "#000000";
    return "#ffffff";
  }
</script>

<section class="download-section {withBackground}" class:split={align === "split"}>
  <div class="container" class:split-layout={align === "split"}>
    <!-- Text + actions block -->
    <div class="content" class:centered={align === "center"}>
      {#if badge}
        <div class="badge-wrap">
          <Badge label={badge} variant="primary" />
        </div>
      {/if}
      <h2 class="section-title">{title}</h2>
      {#if description}
        <p class="section-desc">{description}</p>
      {/if}

      <!-- Store buttons -->
      <div class="stores" class:centered={align === "center"}>
        {#each stores as store}
          {@const Icon = platformIcon(store)}
          <a
            href={store.href}
            class="store-btn"
            style="background: {platformBg(store.platform)}; color: {platformColor(
              store.platform,
            )};"
          >
            <span class="store-icon">
              <Icon size={22} />
            </span>
            <span class="store-text">
              {#if store.sublabel}
                <span class="store-sublabel">{store.sublabel}</span>
              {/if}
              <span class="store-label">{store.label}</span>
            </span>
          </a>
        {/each}
      </div>

      <!-- Stats row -->
      {#if stats && stats.length > 0}
        <div class="stats" class:centered={align === "center"}>
          {#each stats as stat, i}
            {#if i > 0}
              <span class="stat-divider"></span>
            {/if}
            <div class="stat-item">
              <span class="stat-value">{stat.value}</span>
              <span class="stat-label">{stat.label}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Visual snippet (split layout only) -->
    {#if visual && align === "split"}
      <div class="visual-area">
        {@render visual()}
      </div>
    {/if}
  </div>

  <!-- Center layout: visual below (if present) -->
  {#if visual && align === "center"}
    <div class="visual-center">
      {@render visual()}
    </div>
  {/if}
</section>

<style>
  .download-section {
    padding: 100px 24px;
    background: var(--bg-base);
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* --- Split layout --- */
  .split-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  /* --- Content block --- */
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .content.centered {
    align-items: center;
    text-align: center;
  }

  .badge-wrap {
    /* No extra margin needed — gap handles it */
  }

  .section-title {
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 700;
    color: var(--text-heading);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .section-desc {
    font-size: 17px;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 520px;
    margin: 0;
  }

  /* --- Store buttons --- */
  .stores {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  .stores.centered {
    justify-content: center;
  }

  .store-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-radius: var(--radius-lg);
    text-decoration: none;
    min-width: 170px;
    transition:
      transform var(--transition-fast),
      box-shadow var(--transition-fast),
      opacity var(--transition-fast);
  }

  .store-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    opacity: 0.92;
  }

  .store-btn:active {
    transform: translateY(0);
  }

  .store-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .store-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .store-sublabel {
    font-size: 10px;
    opacity: 0.7;
    letter-spacing: 0.04em;
    line-height: 1;
  }

  .store-label {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  /* --- Stats --- */
  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    margin-top: 12px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }

  .stats.centered {
    justify-content: center;
  }

  .stat-divider {
    width: 1px;
    background: var(--border);
    margin: 0 24px;
    align-self: stretch;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-heading);
    letter-spacing: -0.02em;
  }

  .stat-label {
    font-size: 13px;
    color: var(--text-muted);
  }

  /* --- Visual areas --- */
  .visual-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .visual-center {
    display: flex;
    justify-content: center;
    margin-top: 56px;
  }

  /* --- Mobile --- */
  @media (max-width: 768px) {
    .download-section {
      padding: 64px 16px;
    }

    .split-layout {
      grid-template-columns: 1fr;
      gap: 48px;
    }

    .store-btn {
      min-width: 150px;
    }
  }

  .bg-base {
    padding: 1rem 0;
    background: var(--bg-base);
  }
</style>
