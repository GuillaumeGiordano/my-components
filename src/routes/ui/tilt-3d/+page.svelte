<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Tilt3D from '$lib/components/ui/Tilt3D.svelte';
  import { Star, Zap, Shield } from '@lucide/svelte';
</script>
<svelte:head><title>Tilt 3D</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Tilt 3D</h1><p>Carte qui pivote en 3D selon la position du curseur — <code>rotateX/Y</code> + reflet glare optionnel.</p></div>
  <section class="variant"><h2>Cartes avec glare</h2>
    <div class="demo">
      <Tilt3D>
        <div class="card">
          <div class="card-icon"><Zap size={22} /></div>
          <h3>Performance</h3>
          <p>Svelte 5 compile to vanilla JS.</p>
        </div>
      </Tilt3D>
      <Tilt3D>
        <div class="card card--b">
          <div class="card-icon"><Star size={22} /></div>
          <h3>Élégance</h3>
          <p>Design tokens cohérents.</p>
        </div>
      </Tilt3D>
      <Tilt3D>
        <div class="card card--c">
          <div class="card-icon"><Shield size={22} /></div>
          <h3>Accessibilité</h3>
          <p>ARIA, focus, contraste.</p>
        </div>
      </Tilt3D>
    </div>
  </section>
  <section class="variant"><h2>Sans glare — <code>glare={false}</code> — <code>maxTilt={25}</code></h2>
    <div class="demo">
      <Tilt3D glare={false} maxTilt={25}>
        <div class="card card--dark">
          <h3 style="color:#f8fafc">Tilt fort</h3>
          <p style="color:rgba(255,255,255,0.5)">maxTilt = 25, sans glare.</p>
        </div>
      </Tilt3D>
    </div>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:24px;padding:48px 32px;background:var(--bg-subtle);border-radius:var(--radius-lg); }
  .card { padding:24px;border-radius:12px;background:var(--bg-base);border:1px solid var(--border);width:180px;display:flex;flex-direction:column;gap:8px; }
  .card--b { border-color:color-mix(in srgb,#f59e0b 40%,var(--border)); }
  .card--c { border-color:color-mix(in srgb,#22c55e 40%,var(--border)); }
  .card--dark { background:#0f172a;border-color:#334155; }
  .card-icon { width:36px;height:36px;border-radius:8px;background:color-mix(in srgb,var(--primary) 12%,transparent);color:var(--primary);display:flex;align-items:center;justify-content:center; }
  .card h3 { margin:0;font-size:14px;font-weight:700;color:var(--text-heading); }
  .card p  { margin:0;font-size:12px;color:var(--text-muted);line-height:1.4; }
</style>
