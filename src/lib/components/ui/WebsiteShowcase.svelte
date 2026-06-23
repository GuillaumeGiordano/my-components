<script lang="ts">
  import { MousePointer2 } from "@lucide/svelte";

  // Pure-CSS illustration of a showcase website: a browser window with a landing
  // page (nav, hero, feature cards) and a floating mouse-cursor badge. Decorative only.
  let { accent = "var(--primary)" }: { accent?: string } = $props();
</script>

<div class="ws" style="--accent:{accent}" role="img" aria-label="Aperçu d'un site internet">
  <div class="ws-glow" aria-hidden="true"></div>

  <!-- Browser window -->
  <div class="win" aria-hidden="true">
    <div class="win-bar">
      <span class="win-dot"></span>
      <span class="win-dot"></span>
      <span class="win-dot"></span>
      <span class="win-url"></span>
    </div>
    <div class="win-body">
      <!-- Site nav -->
      <div class="site-nav">
        <span class="nav-logo"></span>
        <span class="nav-link"></span>
        <span class="nav-link"></span>
        <span class="nav-link"></span>
        <span class="nav-cta"></span>
      </div>

      <!-- Hero -->
      <div class="site-hero">
        <span class="hero-line hero-line--lg"></span>
        <span class="hero-line hero-line--md"></span>
        <span class="hero-btn"></span>
      </div>

      <!-- Feature cards -->
      <div class="site-cards">
        <div class="site-card"></div>
        <div class="site-card"></div>
        <div class="site-card"></div>
      </div>
    </div>
  </div>

  <!-- Floating cursor badge -->
  <div class="ws-badge" aria-hidden="true"><MousePointer2 size={24} /></div>
</div>

<style>
  .ws {
    position: relative;
    width: 100%;
    max-width: 480px;
    margin: auto;
    aspect-ratio: 16 / 11;
  }

  .ws-glow {
    position: absolute;
    inset: 12% 8%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--accent) 40%, transparent),
      transparent 70%
    );
    filter: blur(40px);
    z-index: 0;
    animation: ws-pulse 5s ease-in-out infinite;
  }

  /* ── Browser window ── */
  .win {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-base);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
  }

  .win-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px;
    background: color-mix(in srgb, var(--accent) 8%, var(--bg-subtle));
    border-bottom: 1px solid var(--border);
  }

  .win-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 35%, var(--border));
  }

  .win-url {
    flex: 1;
    height: 12px;
    margin-left: 8px;
    border-radius: var(--radius-full);
    background: var(--bg-muted);
  }

  .win-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    min-height: 0;
  }

  /* ── Site nav ── */
  .site-nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-logo {
    width: 24px;
    height: 10px;
    border-radius: var(--radius-sm);
    background: var(--accent);
  }

  .nav-link {
    width: 28px;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--bg-hover);
  }

  .nav-cta {
    width: 40px;
    height: 16px;
    margin-left: auto;
    border-radius: var(--radius-full);
    background: color-mix(in srgb, var(--accent) 30%, transparent);
  }

  /* ── Hero ── */
  .site-hero {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    border-radius: var(--radius-md);
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 22%, transparent),
      color-mix(in srgb, var(--accent) 6%, transparent)
    );
  }

  .hero-line {
    height: 9px;
    border-radius: var(--radius-full);
    background: color-mix(in srgb, var(--accent) 45%, var(--bg-hover));
  }

  .hero-line--lg {
    width: 60%;
  }

  .hero-line--md {
    width: 40%;
    background: var(--bg-hover);
  }

  .hero-btn {
    width: 64px;
    height: 16px;
    margin-top: 4px;
    border-radius: var(--radius-full);
    background: var(--accent);
  }

  /* ── Feature cards ── */
  .site-cards {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    min-height: 0;
  }

  .site-card {
    border-radius: var(--radius-md);
    background: var(--bg-muted);
    border-top: 3px solid color-mix(in srgb, var(--accent) 55%, transparent);
  }

  /* ── Floating cursor badge ── */
  .ws-badge {
    position: absolute;
    right: -10px;
    bottom: -10px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: var(--radius-lg);
    color: #fff;
    background: var(--accent);
    box-shadow: var(--shadow-lg);
    animation: ws-click 4s ease-in-out infinite;
  }

  /* Gentle "hover then click" motion to evoke a cursor interacting with the page */
  @keyframes ws-click {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    45% {
      transform: translate(-4px, -8px) scale(1);
    }
    55% {
      transform: translate(-4px, -8px) scale(0.9);
    }
    65% {
      transform: translate(-4px, -8px) scale(1);
    }
  }

  @keyframes ws-pulse {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 0.85;
      transform: scale(1.06);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ws-glow,
    .ws-badge {
      animation: none;
    }
  }
</style>
