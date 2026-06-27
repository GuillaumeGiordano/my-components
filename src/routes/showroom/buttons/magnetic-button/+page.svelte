<script lang="ts">
  import '$lib/styles/demo-page.css';
  import MagneticButton from '$lib/components/ui/MagneticButton.svelte';
  import { Zap, Star, ArrowRight } from '@lucide/svelte';
</script>
<svelte:head><title>Magnetic Button</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Magnetic Button</h1><p>Le bouton s'attire vers le curseur dans un rayon configurable. Approche la souris lentement.</p></div>
  <section class="variant"><h2>Défaut</h2>
    <div class="demo">
      <MagneticButton><Zap size={16} />Magnétique</MagneticButton>
      <MagneticButton><Star size={16} />Étoile</MagneticButton>
      <MagneticButton>Approche ta souris <ArrowRight size={16} /></MagneticButton>
    </div>
  </section>
  <section class="variant"><h2>Force accrue — <code>strength={0.8} radius={140}</code></h2>
    <div class="demo">
      <MagneticButton strength={0.8} radius={140}><Zap size={16} />Très magnétique</MagneticButton>
    </div>
  </section>
  <section class="variant"><h2>Notes</h2>
    <ul class="notes">
      <li>Le calcul de la force est proportionnel à la proximité — plus le curseur est proche, plus l'attraction est forte.</li>
      <li>Le retour à la position d'origine utilise une transition CSS <code>cubic-bezier(0.23, 1, 0.32, 1)</code> (spring-like).</li>
      <li>L'écoute de <code>mousemove</code> est globale (window) pour détecter l'approche avant le survol.</li>
    </ul>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:32px;padding:60px 32px;background:var(--bg-subtle);border-radius:var(--radius-lg);min-height:160px; }
  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
