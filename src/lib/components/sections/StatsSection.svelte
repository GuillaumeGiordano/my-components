<script lang="ts">
  import { onMount } from 'svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  let {
    badge,
    title,
    description,
    stats,
  }: {
    badge?: string;
    title?: string;
    description?: string;
    stats: Array<{
      value: string;
      label: string;
      description?: string;
      prefix?: string;
      suffix?: string;
    }>;
  } = $props();

  // Track animated display values for each stat
  let displayValues: string[] = $state(stats.map(() => '0'));
  let hasAnimated = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  /**
   * Attempt to parse a numeric value from a string like "98", "1.5", "12 000".
   * Returns null if not purely numeric.
   */
  function parseNumeric(val: string): number | null {
    const cleaned = val.replace(/[\s,]/g, '').replace(',', '.');
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
  }

  function animateStat(index: number, targetStr: string) {
    const target = parseNumeric(targetStr);
    if (target === null) {
      // Not a plain number — show immediately
      displayValues[index] = targetStr;
      return;
    }

    const isDecimal = targetStr.includes('.') || targetStr.includes(',');
    const decimals = isDecimal ? (targetStr.split(/[.,]/)[1]?.length ?? 0) : 0;
    const duration = 1600;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      displayValues[index] = current.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        displayValues[index] = targetStr;
      }
    }

    requestAnimationFrame(tick);
  }

  function startAnimation() {
    if (hasAnimated) return;
    hasAnimated = true;
    stats.forEach((stat, i) => {
      // Stagger start per stat
      setTimeout(() => animateStat(i, stat.value), i * 120);
    });
  }

  onMount(() => {
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section class="stats" bind:this={sectionEl}>
  <div class="stats-inner">
    <!-- Optional header -->
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

    <!-- Stats row -->
    <div class="stats-grid" style="--count: {stats.length}">
      {#each stats as stat, i}
        <div class="stat-item" style="animation-delay: {i * 0.1}s">
          <div class="stat-value-row">
            {#if stat.prefix}
              <span class="stat-prefix">{stat.prefix}</span>
            {/if}
            <span class="stat-value">{displayValues[i]}</span>
            {#if stat.suffix}
              <span class="stat-suffix">{stat.suffix}</span>
            {/if}
          </div>
          <span class="stat-label">{stat.label}</span>
          {#if stat.description}
            <span class="stat-description">{stat.description}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .stats {
    padding: 80px 24px;
  }

  .stats-inner {
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

  /* ---- Stats grid ---- */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(var(--count, 4), 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 6px;
    padding: 40px 24px;
    background: var(--bg-base);
    animation: fade-in 0.6s ease both;
    transition: background var(--transition-fast);
  }

  .stat-item:hover {
    background: var(--bg-subtle);
  }

  .stat-value-row {
    display: flex;
    align-items: baseline;
    gap: 2px;
  }

  .stat-value {
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--primary);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .stat-prefix,
  .stat-suffix {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary);
    line-height: 1;
  }

  .stat-prefix {
    align-self: flex-start;
    margin-top: 4px;
  }

  .stat-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-heading);
    margin-top: 4px;
  }

  .stat-description {
    font-size: 12px;
    color: var(--text-subtle);
    line-height: 1.5;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 900px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 520px) {
    .stats {
      padding: 56px 20px;
    }

    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }

    .stat-item {
      padding: 28px 16px;
    }
  }
</style>
