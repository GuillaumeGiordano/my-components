<script lang="ts">
  import { Image } from "@lucide/svelte";

  // Pure-CSS illustration of a portfolio website: a browser window showing an
  // image gallery, with a floating image-icon badge. Decorative only.
  let { accent = "#8b5cf6" }: { accent?: string } = $props();
</script>

<div class="pf" style="--accent:{accent}" role="img" aria-label="Aperçu d'un site portfolio">
  <div class="pf-glow" aria-hidden="true"></div>

  <!-- Browser window -->
  <div class="win" aria-hidden="true">
    <div class="win-bar">
      <span class="win-dot"></span>
      <span class="win-dot"></span>
      <span class="win-dot"></span>
      <span class="win-url"></span>
    </div>
    <div class="win-body">
      <div class="gallery">
        <div class="tile tile--tall"><Image size={18} /></div>
        <div class="tile"><Image size={16} /></div>
        <div class="tile"><Image size={16} /></div>
        <div class="tile tile--wide"><Image size={18} /></div>
      </div>
    </div>
  </div>

  <!-- Floating icon badge -->
  <div class="pf-badge" aria-hidden="true"><Image size={26} /></div>
</div>

<style>
  .pf {
    position: relative;
    width: 100%;
    max-width: 480px;
    margin: auto;
    aspect-ratio: 16 / 11;
    container-type: inline-size;
  }

  .pf-glow {
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
    animation: pf-pulse 5s ease-in-out infinite;
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
    padding: 14px;
    min-height: 0;
  }

  /* ── Gallery ── */
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    height: 100%;
  }

  .tile {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    color: color-mix(in srgb, var(--accent) 70%, transparent);
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 26%, transparent),
      color-mix(in srgb, var(--accent) 8%, transparent)
    );
    border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
  }

  .tile--tall {
    grid-row: span 2;
  }

  .tile--wide {
    grid-column: span 2;
  }

  /* ── Floating badge ── */
  .pf-badge {
    position: absolute;
    right: -10px;
    bottom: -10px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(44px, 13cqi, 56px);
    height: clamp(44px, 13cqi, 56px);
    border-radius: var(--radius-lg);
    color: #fff;
    background: var(--accent);
    box-shadow: var(--shadow-lg);
    animation: pf-float 6s ease-in-out infinite;
  }

  @keyframes pf-float {
    0%,
    100% {
      transform: translateY(0) rotate(-4deg);
    }
    50% {
      transform: translateY(-8px) rotate(4deg);
    }
  }

  @keyframes pf-pulse {
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
    .pf-glow,
    .pf-badge {
      animation: none;
    }
  }
</style>
