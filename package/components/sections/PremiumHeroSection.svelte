<script lang="ts">
  import type { Component } from 'svelte';
  import { onMount } from 'svelte';
  import { ArrowRight, Sparkles } from '@lucide/svelte';

  export type PremiumCard = {
    icon: Component;
    title: string;
    description: string;
    accent?: string; // CSS color for the card accent
  };

  let {
    badge,
    title,
    highlight,
    description,
    primaryCta,
    secondaryCta,
    stats,
    cards = [],
  }: {
    badge?: string;
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    stats?: Array<{ value: string; suffix?: string; label: string }>;
    cards?: PremiumCard[];
  } = $props();

  // Split title words for staggered reveal
  const words = $derived(
    title.split(' ').map((word, i) => ({
      text: word,
      highlighted: highlight?.toLowerCase().split(' ').some(h =>
        word.toLowerCase().includes(h)
      ) ?? false,
      delay: i * 0.09,
    }))
  );

  let titleEl:   HTMLElement | null = $state(null);
  let sectionEl: HTMLElement | null = $state(null);
  let revealed = $state(false);

  // Stat animation
  let displayStats = $state((stats ?? []).map(s => s.value));
  let statsAnimated = $state(false);

  function animateCounter(index: number, target: string) {
    const n = parseFloat(target.replace(/[^\d.]/g, ''));
    if (isNaN(n)) { displayStats[index] = target; return; }
    const decimals = target.includes('.') ? (target.split('.')[1]?.length ?? 0) : 0;
    const start = performance.now();
    const duration = 1800;
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      displayStats[index] = (eased * n).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
      else displayStats[index] = target;
    }
    requestAnimationFrame(tick);
  }

  // Tilt 3D action
  function tilt(node: HTMLElement) {
    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      node.style.setProperty('--tx', `${-y * 9}deg`);
      node.style.setProperty('--ty', `${x * 9}deg`);
      node.style.setProperty('--gx', `${(x + 1) * 50}%`);
      node.style.setProperty('--gy', `${(y + 1) * 50}%`);
    };
    const onLeave = () => {
      node.style.setProperty('--tx', '0deg');
      node.style.setProperty('--ty', '0deg');
    };
    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return {
      destroy() {
        node.removeEventListener('mousemove', onMove);
        node.removeEventListener('mouseleave', onLeave);
      },
    };
  }

  // Magnetic button action
  function magnet(node: HTMLElement) {
    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
      node.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => { node.style.transform = 'translate(0,0)'; };
    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return {
      destroy() {
        node.removeEventListener('mousemove', onMove);
        node.removeEventListener('mouseleave', onLeave);
      },
    };
  }

  onMount(() => {
    // Title word reveal
    if (titleEl) {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { revealed = true; obs.disconnect(); }
      }, { threshold: 0.2 });
      obs.observe(titleEl);
    }

    // Stats counter
    if (sectionEl && stats?.length) {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          stats!.forEach((s, i) => animateCounter(i, s.value));
          obs.disconnect();
        }
      }, { threshold: 0.4 });
      obs.observe(sectionEl);
    }
  });
</script>

<section class="premium" bind:this={sectionEl}>

  <!-- ── Animated background ── -->
  <div class="bg" aria-hidden="true">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="grid-overlay"></div>
  </div>

  <div class="inner">

    <!-- ── Text column ── -->
    <div class="text-col">

      {#if badge}
        <div class="badge-pill">
          <Sparkles size={13} />
          <span>{badge}</span>
        </div>
      {/if}

      <h1 class="title" class:revealed bind:this={titleEl}>
        {#each words as word, i}
          <span
            class="word"
            class:highlight={word.highlighted}
            style="--delay: {word.delay}s"
          >{word.text}{' '}</span>
        {/each}
      </h1>

      <p class="desc" class:revealed>{description}</p>

      {#if stats && stats.length > 0}
        <div class="stats-row">
          {#each stats as stat, i}
            <div class="stat">
              <span class="stat-val">
                {displayStats[i]}{stat.suffix ?? ''}
              </span>
              <span class="stat-label">{stat.label}</span>
            </div>
          {/each}
        </div>
      {/if}

      {#if primaryCta || secondaryCta}
        <div class="ctas">
          {#if primaryCta}
            <div class="magnetic-wrap" use:magnet>
              <a class="btn-primary" href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight size={16} />
              </a>
            </div>
          {/if}
          {#if secondaryCta}
            <a class="btn-ghost" href={secondaryCta.href}>
              {secondaryCta.label}
            </a>
          {/if}
        </div>
      {/if}

    </div>

    <!-- ── Bento grid ── -->
    {#if cards.length > 0}
      <div class="bento" style="--total: {cards.length}">
        {#each cards as card, i}
          <div
            class="bento-card"
            class:large={i === 0}
            style="--delay: {i * 0.1}s; --accent: {card.accent ?? 'var(--primary)'}"
            use:tilt
          >
            <div class="shimmer-border"></div>
            <div class="card-inner">
              <span class="card-icon">
                <card.icon size={i === 0 ? 26 : 20} />
              </span>
              <div class="card-text">
                <h3 class="card-title">{card.title}</h3>
                <p class="card-desc">{card.description}</p>
              </div>
            </div>
            <!-- Inner glow follows tilt -->
            <div class="inner-glow"></div>
          </div>
        {/each}
      </div>
    {/if}

  </div>
</section>

<style>
  /* ══════════════════════════════════════════════════════════
     Root
  ══════════════════════════════════════════════════════════ */
  .premium {
    position: relative;
    background: #08090e;
    overflow: hidden;
    padding: 110px 64px 120px;
    min-height: 90vh;
    display: flex;
    align-items: center;
  }

  .inner {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: 72px;
    align-items: center;
  }

  /* ══════════════════════════════════════════════════════════
     Animated background
  ══════════════════════════════════════════════════════════ */
  .bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.55;
    will-change: transform;
  }

  .orb-1 {
    width: 520px; height: 520px;
    background: radial-gradient(circle, #4f35ea, transparent 70%);
    top: -120px; left: -80px;
    animation: drift-1 14s ease-in-out infinite;
  }

  .orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #0d7ff5, transparent 70%);
    bottom: -60px; right: 10%;
    animation: drift-2 18s ease-in-out infinite;
  }

  .orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #a855f7, transparent 70%);
    top: 50%; right: 30%;
    transform: translateY(-50%);
    animation: drift-3 22s ease-in-out infinite;
  }

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
  }

  @keyframes drift-1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(60px,-40px) scale(1.07); }
    66%      { transform: translate(-30px,50px) scale(0.93); }
  }

  @keyframes drift-2 {
    0%,100% { transform: translate(0,0) scale(1); }
    40%      { transform: translate(-50px,30px) scale(1.1); }
    70%      { transform: translate(40px,-20px) scale(0.9); }
  }

  @keyframes drift-3 {
    0%,100% { transform: translateY(-50%) translate(0,0) scale(1); }
    50%      { transform: translateY(-50%) translate(-60px,40px) scale(1.15); }
  }

  /* ══════════════════════════════════════════════════════════
     Badge pill
  ══════════════════════════════════════════════════════════ */
  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(139, 92, 246, 0.4);
    background: rgba(139, 92, 246, 0.12);
    color: #c4b5fd;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 28px;
    width: fit-content;
    animation: fade-up 0.6s ease both;
  }

  /* ══════════════════════════════════════════════════════════
     Title — word reveal
  ══════════════════════════════════════════════════════════ */
  .title {
    font-size: clamp(32px, 4.5vw, 58px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 24px;
    color: #fff;
  }

  .word {
    display: inline-block;
    opacity: 0;
    transform: translateY(22px);
    transition:
      opacity 0.55s ease,
      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--delay, 0s);
  }

  .title.revealed .word {
    opacity: 1;
    transform: none;
  }

  .word.highlight {
    background: linear-gradient(135deg, #818cf8, #c084fc, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ══════════════════════════════════════════════════════════
     Description
  ══════════════════════════════════════════════════════════ */
  .desc {
    font-size: 17px;
    color: rgba(255,255,255,0.55);
    line-height: 1.75;
    margin: 0 0 36px;
    max-width: 480px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
  }

  .desc.revealed {
    opacity: 1;
    transform: none;
  }

  /* ══════════════════════════════════════════════════════════
     Stats
  ══════════════════════════════════════════════════════════ */
  .stats-row {
    display: flex;
    gap: 32px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-val {
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .stat-label {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    font-weight: 500;
  }

  /* ══════════════════════════════════════════════════════════
     CTAs
  ══════════════════════════════════════════════════════════ */
  .ctas {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .magnetic-wrap {
    display: inline-flex;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 0 24px rgba(99, 102, 241, 0.5), 0 4px 12px rgba(0,0,0,0.3);
    transition: box-shadow 0.25s ease, transform 0.25s ease;

    &:hover {
      box-shadow: 0 0 40px rgba(99, 102, 241, 0.7), 0 4px 20px rgba(0,0,0,0.3);
      transform: translateY(-1px);
    }
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 13px 24px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.65);
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s, background 0.2s;

    &:hover {
      border-color: rgba(255,255,255,0.3);
      color: #fff;
      background: rgba(255,255,255,0.06);
    }
  }

  /* ══════════════════════════════════════════════════════════
     Bento grid
  ══════════════════════════════════════════════════════════ */
  .bento {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    grid-template-rows: auto auto;
    gap: 14px;
  }

  /* ── Card base ── */
  .bento-card {
    position: relative;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(16px);
    padding: 28px;
    cursor: default;
    overflow: hidden;
    transform: perspective(700px) rotateX(var(--tx,0deg)) rotateY(var(--ty,0deg));
    transition: transform 0.15s ease, box-shadow 0.3s ease;
    animation: card-in 0.6s cubic-bezier(0.16,1,0.3,1) both;
    animation-delay: var(--delay, 0s);

    &:hover {
      box-shadow: 0 0 30px rgba(99,102,241,0.15);
      border-color: rgba(255,255,255,0.14);
    }
  }

  /* First card spans 2 rows */
  .bento-card.large {
    grid-row: span 2;
  }

  /* ── Shimmer rotating border ── */
  @property --shimmer-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  .shimmer-border {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: conic-gradient(
      from var(--shimmer-angle),
      transparent 0%,
      transparent 60%,
      rgba(139, 92, 246, 0.9) 75%,
      rgba(99, 102, 241, 0.9) 85%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
    pointer-events: none;
    animation: shimmer-spin 3s linear infinite;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
  }

  .bento-card:hover .shimmer-border { opacity: 1; }

  @keyframes shimmer-spin {
    to { --shimmer-angle: 360deg; }
  }

  /* ── Inner glow (follows tilt via CSS vars) ── */
  .inner-glow {
    position: absolute;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent, var(--primary)), transparent 70%);
    opacity: 0;
    pointer-events: none;
    top: var(--gy, 50%);
    left: var(--gx, 50%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s, top 0.1s, left 0.1s;
    filter: blur(20px);
    z-index: 0;
  }

  .bento-card:hover .inner-glow { opacity: 0.2; }

  /* ── Card content ── */
  .card-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
  }

  .card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(99,102,241,0.15);
    color: #818cf8;
    flex-shrink: 0;
  }

  .large .card-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    margin: 0;
    line-height: 1.3;
  }

  .large .card-title { font-size: 20px; }

  .card-desc {
    font-size: 13.5px;
    color: rgba(255,255,255,0.42);
    line-height: 1.65;
    margin: 0;
  }

  /* ══════════════════════════════════════════════════════════
     Entrance animations
  ══════════════════════════════════════════════════════════ */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: none; }
  }

  @keyframes card-in {
    from { opacity: 0; transform: perspective(700px) translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: perspective(700px) translateY(0) scale(1); }
  }

  /* ══════════════════════════════════════════════════════════
     Responsive
  ══════════════════════════════════════════════════════════ */
  @media (max-width: 900px) {
    .premium { padding: 80px 24px 90px; min-height: auto; }
    .inner   { grid-template-columns: 1fr; gap: 56px; }
    .desc    { max-width: 100%; }
  }

  @media (max-width: 500px) {
    .bento { grid-template-columns: 1fr; }
    .bento-card.large { grid-row: auto; }
  }
</style>
