<script lang="ts">
  import type { Component } from "svelte";
  import { onMount } from "svelte";
  import Badge from "../ui/Badge.svelte";
  import Card from "../ui/Card.svelte";

  let {
    badge,
    title,
    description,
    stats,
    values,
    columns = 2,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description: string;
    stats?: Array<{ value: string; label: string; prefix?: string; suffix?: string }>;
    values?: Array<{ icon: Component; title: string; description: string }>;
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
  } = $props();

  let sectionEl: HTMLElement | null = $state(null);
  let displayValues: string[] = $state((stats ?? []).map(() => "0"));
  let hasAnimated = $state(false);

  function parseNumeric(val: string): number | null {
    const n = parseFloat(val.replace(/[\s,]/g, "").replace(",", "."));
    return isNaN(n) ? null : n;
  }

  function animateStat(index: number, targetStr: string) {
    const target = parseNumeric(targetStr);
    if (target === null) {
      displayValues[index] = targetStr;
      return;
    }
    const decimals =
      targetStr.includes(".") || targetStr.includes(",")
        ? (targetStr.split(/[.,]/)[1]?.length ?? 0)
        : 0;
    const duration = 1600;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayValues[index] = (eased * target).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
      else displayValues[index] = targetStr;
    }
    requestAnimationFrame(tick);
  }

  onMount(() => {
    if (!sectionEl || !stats?.length) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          stats!.forEach((s, i) => animateStat(i, s.value));
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section class="about-v2 {withBackground}" bind:this={sectionEl}>
  <div class="inner">
    <!-- Header -->
    <div class="header">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      <h2 class="title">{title}</h2>
      <p class="description">{description}</p>
    </div>

    <!-- Stats -->
    {#if stats && stats.length > 0}
      <div class="stats-row">
        {#each stats as stat, i}
          <div class="stat">
            <span class="stat-value">
              {#if stat.prefix}<span class="stat-affix">{stat.prefix}</span>{/if}
              {displayValues[i]}
              {#if stat.suffix}<span class="stat-affix">{stat.suffix}</span>{/if}
            </span>
            <span class="stat-label">{stat.label}</span>
          </div>
          {#if i < stats.length - 1}
            <div class="stat-divider"></div>
          {/if}
        {/each}
      </div>
    {/if}

    <!-- Values grid -->
    {#if values && values.length > 0}
      <div class="values-grid cols-{columns}">
        {#each values as v}
          <Card padding="lg">
            {#snippet children()}
              <div class="value-inner">
                <span class="value-icon"><v.icon size={20} /></span>
                <h3 class="value-title">{v.title}</h3>
                <p class="value-desc">{v.description}</p>
              </div>
            {/snippet}
          </Card>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .about-v2 {
    padding: 96px 64px;
    border-top: 1px solid var(--border);
    background: var(--bg-base);
  }

  .inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  /* ── Header ── */
  .header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .title {
    font-size: clamp(26px, 3.5vw, 42px);
    font-weight: 700;
    color: var(--text-heading);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .description {
    font-size: 17px;
    color: var(--text-muted);
    line-height: 1.75;
    margin: 0;
    max-width: 620px;
  }

  /* ── Stats ── */
  .stats-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 32px 40px;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 120px;
    padding: 8px 24px;
  }

  .stat-value {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 800;
    color: var(--primary);
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .stat-affix {
    font-size: 0.65em;
    font-weight: 700;
  }

  .stat-label {
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 500;
    text-align: center;
  }

  .stat-divider {
    width: 1px;
    height: 48px;
    background: var(--border);
    flex-shrink: 0;
  }

  /* ── Values grid ── */
  .values-grid {
    display: grid;
    gap: 20px;

    &.cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    &.cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    &.cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .value-inner {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .value-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: var(--primary-subtle);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .value-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .value-desc {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .about-v2 {
      padding: 64px 24px;
    }
    .stats-row {
      padding: 24px 16px;
      gap: 8px;
    }
    .stat-divider {
      display: none;
    }
    .values-grid {
      &.cols-2,
      &.cols-3,
      &.cols-4 {
        grid-template-columns: 1fr;
      }
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .values-grid.cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
    .values-grid.cols-3 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .bg-base {
    padding: 1rem 0;
    background: var(--bg-base);
  }
</style>
