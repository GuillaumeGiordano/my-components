<script lang="ts">
  import { Settings } from "@lucide/svelte";

  // Pure-CSS illustration of a web application: an app window with a sidebar and a
  // dashboard (stat cards + bar chart), plus a slowly spinning gear. Decorative only.
  let { accent = "#f59e0b" }: { accent?: string } = $props();

  // Relative bar heights for the dashboard chart.
  const bars = [45, 70, 38, 88, 60, 76];
</script>

<div class="app" style="--accent:{accent}" role="img" aria-label="Aperçu d'une application web">
  <div class="app-glow" aria-hidden="true"></div>

  <!-- App window -->
  <div class="win" aria-hidden="true">
    <!-- Sidebar -->
    <div class="win-side">
      <span class="side-logo"></span>
      <span class="side-item side-item--active"></span>
      <span class="side-item"></span>
      <span class="side-item"></span>
      <span class="side-item"></span>
    </div>

    <!-- Main area -->
    <div class="win-main">
      <div class="main-head">
        <span class="head-title"></span>
        <span class="head-avatar"></span>
      </div>

      <div class="stats">
        <div class="stat"></div>
        <div class="stat"></div>
        <div class="stat"></div>
      </div>

      <div class="chart">
        {#each bars as h (h)}
          <span class="bar" style="height:{h}%"></span>
        {/each}
      </div>
    </div>
  </div>

  <!-- Floating spinning gear -->
  <div class="app-badge" aria-hidden="true"><Settings size={26} /></div>
</div>

<style>
  .app {
    position: relative;
    width: 100%;
    max-width: 480px;
    margin: auto;
    aspect-ratio: 16 / 11;
  }

  .app-glow {
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
    animation: app-pulse 5s ease-in-out infinite;
  }

  /* ── App window ── */
  .win {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-base);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
  }

  /* ── Sidebar ── */
  .win-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 22%;
    padding: 14px 0;
    background: var(--bg-subtle);
    border-right: 1px solid var(--border);
  }

  .side-logo {
    width: 26px;
    height: 26px;
    border-radius: var(--radius-md);
    background: var(--accent);
    margin-bottom: 6px;
  }

  .side-item {
    width: 56%;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--bg-hover);
  }

  .side-item--active {
    background: color-mix(in srgb, var(--accent) 55%, transparent);
  }

  /* ── Main ── */
  .win-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    min-width: 0;
  }

  .main-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .head-title {
    width: 44%;
    height: 12px;
    border-radius: var(--radius-full);
    background: var(--bg-hover);
  }

  .head-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 30%, var(--bg-hover));
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .stat {
    height: 38px;
    border-radius: var(--radius-md);
    background: var(--bg-muted);
    border-top: 3px solid color-mix(in srgb, var(--accent) 55%, transparent);
  }

  .chart {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    padding: 12px;
    border-radius: var(--radius-md);
    background: var(--bg-muted);
    min-height: 0;
  }

  .bar {
    flex: 1;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(
      var(--accent),
      color-mix(in srgb, var(--accent) 40%, transparent)
    );
  }

  /* ── Floating gear badge ── */
  .app-badge {
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
    animation: app-spin 12s linear infinite;
  }

  @keyframes app-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes app-pulse {
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
    .app-glow,
    .app-badge {
      animation: none;
    }
  }
</style>
