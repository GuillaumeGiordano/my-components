<script lang="ts">
  import '$lib/styles/demo-page.css';
  import CursorTrail from '$lib/components/ui/CursorTrail.svelte';
</script>
<svelte:head><title>Cursor Trail</title></svelte:head>

<!-- Composant global — canvas fixed sur toute la page -->
<CursorTrail color="var(--primary)" size={10} length={22} />

<div class="page">
  <div class="page-header">
    <h1>Cursor Trail</h1>
    <p>Traînée de particules qui suit le curseur — canvas <code>position:fixed</code>, <code>pointer-events:none</code>.</p>
  </div>
  <section class="variant">
    <h2>Démo active</h2>
    <div class="demo-zone">
      <p class="hint">Bouge ta souris dans cette zone — la traînée suit le curseur sur toute la page.</p>
      <div class="drawing-area">
        <span>✦ Dessine ici ✦</span>
      </div>
    </div>
  </section>
  <section class="variant">
    <h2>Usage</h2>
    <div class="code-block"><pre><code>{`<!-- Dans +layout.svelte pour un effet global -->
<CursorTrail color="var(--primary)" size={10} length={22} />`}</code></pre></div>
    <ul class="notes">
      <li>Le composant est un canvas <code>position:fixed</code> — place-le une seule fois dans le layout.</li>
      <li><code>length</code> = nombre de points dans la traînée.</li>
      <li>La taille décroît linéairement du premier (pleine taille) au dernier (0).</li>
    </ul>
  </section>
</div>
<style>
  .demo-zone { display:flex;flex-direction:column;gap:16px;align-items:center;padding:24px;background:var(--bg-subtle);border-radius:var(--radius-lg); }
  .hint { font-size:13px;color:var(--text-muted);margin:0;text-align:center; }
  .drawing-area { width:100%;height:200px;border:2px dashed var(--border);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--text-subtle);cursor:crosshair; }
  .code-block { background:var(--bg-subtle);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:auto;margin-bottom:16px; }
  .code-block pre { margin:0;padding:16px; }
  .code-block code { font-family:var(--font-mono);font-size:12px;color:var(--text-base); }
  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
