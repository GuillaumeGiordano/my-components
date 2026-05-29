<script lang="ts">
  import '$lib/styles/demo-page.css';
  import PremiumHeroSection from '$lib/components/sections/PremiumHeroSection.svelte';
  import {
    Zap, Shield, Globe, BarChart3, Code2, Layers,
  } from '@lucide/svelte';
</script>

<svelte:head>
  <title>Premium Hero — Sections</title>
</svelte:head>

<!-- Pas de .page wrapper — la section prend toute la largeur -->
<PremiumHeroSection
  badge="Nouveau · v2.0"
  title="Créez des interfaces qui impressionnent vraiment"
  highlight="impressionnent vraiment"
  description="Une bibliothèque de composants Svelte 5 soignés, animés et accessibles. Stoppez de repartir de zéro — concentrez-vous sur votre produit."
  primaryCta={{ label: 'Démarrer maintenant', href: '#' }}
  secondaryCta={{ label: 'Voir les composants', href: '/' }}
  stats={[
    { value: '50', suffix: '+', label: 'Composants' },
    { value: '98', suffix: '%', label: 'Satisfaction' },
    { value: '0', suffix: ' dep', label: 'Dépendances lourdes' },
  ]}
  cards={[
    {
      icon: Zap,
      title: 'Performance native',
      description: 'Svelte 5 compile vos composants en JavaScript pur. Pas de Virtual DOM, pas d\'overhead — juste la vitesse.',
      accent: '#f59e0b',
    },
    {
      icon: Shield,
      title: 'Accessible RGAA',
      description: 'Rôles ARIA, focus visible, navigation clavier — chaque composant respecte les standards.',
      accent: '#10b981',
    },
    {
      icon: Globe,
      title: 'Thémable',
      description: 'Variables CSS globales — changez une couleur, tout se met à jour.',
      accent: '#3b82f6',
    },
    {
      icon: Layers,
      title: 'Composable',
      description: 'Snippets Svelte 5 pour tout personnaliser sans fork.',
      accent: '#a855f7',
    },
  ]}
/>

<div class="page" style="margin-top: 64px;">
  <div class="page-header">
    <h2>Effets inclus</h2>
    <p>Scroll sur la section ci-dessus pour voir les animations.</p>
  </div>

  <section class="variant">
    <ul class="effects-list">
      <li><strong>Orbes flottants</strong> — 3 sphères lumineuses qui dérivent en fond (CSS @keyframes, GPU)</li>
      <li><strong>Grille de fond</strong> — overlay quadrillé avec masque radial</li>
      <li><strong>Scroll reveal mot par mot</strong> — chaque mot du titre s'anime individuellement à l'entrée dans le viewport</li>
      <li><strong>Tilt 3D</strong> — les cartes pivotent en perspective au mouvement de la souris (<code>use:tilt</code> action)</li>
      <li><strong>Shimmer border</strong> — bordure lumineuse rotative au hover (CSS <code>@property</code> + conic-gradient)</li>
      <li><strong>Inner glow</strong> — lueur interne qui suit la position de la souris dans la carte</li>
      <li><strong>Bouton magnétique</strong> — le CTA se déplace légèrement vers le curseur (<code>use:magnet</code> action)</li>
      <li><strong>Compteurs animés</strong> — stats avec ease-out quartique au scroll</li>
      <li><strong>Gradient text</strong> — les mots surlignés ont un gradient indigo → violet → bleu</li>
    </ul>
  </section>
</div>

<style>
  .effects-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .effects-list strong {
    color: var(--text-base);
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.85em;
    background: var(--bg-subtle);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
  }
</style>
