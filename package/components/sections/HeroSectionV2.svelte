<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ArrowRight } from '@lucide/svelte';

  let {
    badge,
    title,
    highlight,
    description,
    primaryCta,
    secondaryCta,
    stats,
    align = 'center',
    visual,
  }: {
    badge?: string;
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    stats?: { value: string; label: string }[];
    align?: 'left' | 'center';
    visual?: Snippet;
  } = $props();

  function buildTitleParts(t: string, h?: string) {
    if (!h) return { before: t, hl: '', after: '' };
    const idx = t.indexOf(h);
    if (idx === -1) return { before: t, hl: '', after: '' };
    return { before: t.slice(0, idx), hl: h, after: t.slice(idx + h.length) };
  }

  const parts = $derived(buildTitleParts(title, highlight));
</script>

<section class="hero align-{align}">
  <!-- Decorative grid -->
  <div class="grid-overlay" aria-hidden="true"></div>

  <!-- Animated ambient orbs -->
  <div class="orb orb-top" aria-hidden="true"></div>
  <div class="orb orb-left" aria-hidden="true"></div>
  <div class="orb orb-right" aria-hidden="true"></div>

  <div class="hero-inner">
    <div class="hero-content">
      {#if badge}
        <a href={primaryCta?.href ?? '#'} class="hero-badge">
          <span class="badge-dot" aria-hidden="true"></span>
          {badge}
          <ArrowRight size={12} strokeWidth={2.5} />
        </a>
      {/if}

      <h1 class="hero-title">
        {parts.before}{#if parts.hl}<span class="highlight">{parts.hl}</span>{/if}{parts.after}
      </h1>

      <p class="hero-description">{description}</p>

      {#if primaryCta || secondaryCta}
        <div class="hero-actions">
          {#if primaryCta}
            <a href={primaryCta.href} class="cta-primary">
              {primaryCta.label}
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          {/if}
          {#if secondaryCta}
            <a href={secondaryCta.href} class="cta-ghost">
              {secondaryCta.label}
            </a>
          {/if}
        </div>
      {/if}

      {#if stats && stats.length > 0}
        <div class="hero-stats">
          {#each stats as stat, i}
            {#if i > 0}<span class="stats-divider" aria-hidden="true"></span>{/if}
            <div class="stat">
              <span class="stat-value">{stat.value}</span>
              <span class="stat-label">{stat.label}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    {#if visual && align === 'left'}
      <div class="hero-visual">
        <div class="visual-ring" aria-hidden="true"></div>
        {@render visual()}
      </div>
    {/if}
  </div>

  {#if visual && align === 'center'}
    <div class="hero-visual-center">
      {@render visual()}
    </div>
  {/if}
</section>

<style>
  /* ---- Root ---- */
  .hero {
    position: relative;
    padding: 128px 24px 112px;
    overflow: hidden;
    background: var(--bg-base);
    isolation: isolate;
  }

  /* ---- Grid overlay ---- */
  .grid-overlay {
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image:
      linear-gradient(color-mix(in srgb, var(--border) 60%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in srgb, var(--border) 60%, transparent) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 90% 75% at 50% 0%, black 20%, transparent 80%);
    pointer-events: none;
  }

  /* ---- Ambient orbs ---- */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(72px);
    pointer-events: none;
    z-index: 0;
  }

  .orb-top {
    width: 720px;
    height: 480px;
    top: -180px;
    left: 50%;
    transform: translateX(-50%);
    background: color-mix(in srgb, var(--primary) 16%, transparent);
    animation: drift-top 14s ease-in-out infinite alternate;
  }

  .orb-left {
    width: 320px;
    height: 320px;
    bottom: -80px;
    left: -80px;
    background: color-mix(in srgb, var(--primary) 9%, transparent);
    animation: drift-left 18s ease-in-out infinite alternate;
  }

  .orb-right {
    width: 260px;
    height: 260px;
    top: 30%;
    right: -60px;
    background: color-mix(in srgb, var(--primary) 7%, transparent);
    animation: drift-right 16s ease-in-out infinite alternate;
  }

  @keyframes drift-top {
    from { transform: translateX(-50%) translateY(0); }
    to   { transform: translateX(calc(-50% + 40px)) translateY(30px); }
  }
  @keyframes drift-left {
    from { transform: translate(0, 0); }
    to   { transform: translate(24px, -28px); }
  }
  @keyframes drift-right {
    from { transform: translate(0, 0); }
    to   { transform: translate(-20px, 20px); }
  }

  /* ---- Layout ---- */
  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 80px;
  }

  .align-center .hero-inner   { flex-direction: column; text-align: center; }
  .align-center .hero-content { max-width: 780px; }
  .align-center .hero-actions { justify-content: center; }
  .align-center .hero-stats   { justify-content: center; }

  .align-left .hero-inner   { flex-direction: row; text-align: left; }
  .align-left .hero-content { flex: 1; max-width: 560px; }
  .align-left .hero-visual  {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* ---- Badge ---- */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px 5px 10px;
    border-radius: var(--radius-full);
    border: 1px solid color-mix(in srgb, var(--primary) 35%, transparent);
    background: color-mix(in srgb, var(--primary) 7%, var(--bg-base));
    font-size: 13px;
    font-weight: 500;
    color: var(--primary);
    text-decoration: none;
    margin-bottom: 32px;
    transition: background var(--transition-fast), border-color var(--transition-fast);
    animation: fade-up 0.5s ease both 0.05s;
  }

  .hero-badge:hover {
    background: color-mix(in srgb, var(--primary) 12%, var(--bg-base));
    border-color: color-mix(in srgb, var(--primary) 55%, transparent);
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    flex-shrink: 0;
    animation: pulse 2.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 color-mix(in srgb, var(--primary) 50%, transparent); }
    50%       { opacity: 0.7; box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 0%, transparent); }
  }

  /* ---- Title ---- */
  .hero-title {
    font-size: clamp(2.5rem, 5.5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.07;
    letter-spacing: -0.04em;
    color: var(--text-heading);
    margin: 0 0 24px;
    animation: fade-up 0.55s ease both 0.12s;
  }

  .highlight {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      color-mix(in srgb, var(--primary) 65%, #a78bfa) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: inline-block;
  }

  .highlight::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 3px;
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(
      135deg,
      var(--primary),
      color-mix(in srgb, var(--primary) 65%, #a78bfa)
    );
    opacity: 0.3;
    transform-origin: left center;
    animation: underline-in 0.6s ease both 0.5s;
  }

  @keyframes underline-in {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 0.3; }
  }

  /* ---- Description ---- */
  .hero-description {
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    line-height: 1.8;
    color: var(--text-muted);
    margin: 0 0 40px;
    animation: fade-up 0.55s ease both 0.2s;
  }

  /* ---- CTAs ---- */
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 40px;
    animation: fade-up 0.55s ease both 0.28s;
  }

  .cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: var(--radius-full);
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 4px 24px color-mix(in srgb, var(--primary) 45%, transparent);
    transition:
      background var(--transition-fast),
      transform var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .cta-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px color-mix(in srgb, var(--primary) 55%, transparent);
  }

  .cta-primary:active { transform: translateY(0); }

  .cta-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border-strong);
    background: transparent;
    color: var(--text-base);
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast),
      color var(--transition-fast),
      transform var(--transition-fast);
  }

  .cta-ghost:hover {
    background: var(--bg-hover);
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-1px);
  }

  /* ---- Stats ---- */
  .hero-stats {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 24px;
    animation: fade-up 0.55s ease both 0.36s;
  }

  .stats-divider {
    width: 1px;
    height: 32px;
    background: var(--border-strong);
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--text-heading);
  }

  .stat-label {
    font-size: 13px;
    color: var(--text-subtle);
    font-weight: 500;
  }

  /* ---- Visual (left align) ---- */
  .hero-visual {
    position: relative;
  }

  .visual-ring {
    position: absolute;
    inset: -24px;
    border-radius: calc(var(--radius-xl) + 24px);
    background: color-mix(in srgb, var(--primary) 20%, transparent);
    filter: blur(48px);
    animation: glow-breathe 5s ease-in-out infinite;
    z-index: 0;
  }

  .hero-visual > :global(*:not(.visual-ring)) {
    position: relative;
    z-index: 1;
  }

  @keyframes glow-breathe {
    0%, 100% { opacity: 0.6; transform: scale(0.97); }
    50%       { opacity: 1;   transform: scale(1.03); }
  }

  /* ---- Visual (center align) ---- */
  .hero-visual-center {
    position: relative;
    z-index: 1;
    margin-top: 72px;
    max-width: 980px;
    margin-left: auto;
    margin-right: auto;
    animation: fade-up 0.6s ease both 0.42s;
  }

  /* ---- Shared keyframes ---- */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: none; }
  }

  /* ---- Responsive ---- */
  @media (max-width: 900px) {
    .hero { padding: 88px 20px 72px; }

    .align-left .hero-inner {
      flex-direction: column;
    }

    .align-left .hero-content {
      max-width: 100%;
      text-align: center;
    }

    .align-left .hero-actions,
    .align-left .hero-stats {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .stats-divider { display: none; }
    .hero-stats { gap: 16px 28px; }
  }
</style>
