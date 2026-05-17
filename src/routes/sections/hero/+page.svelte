<script lang="ts">
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Hero — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Hero</h1>
    <p>Section d'accroche principale avec badge, titre colorisé, description et boutons d'action. Deux alignements disponibles : centré et gauche avec visuel.</p>
  </div>

  <!-- Example 1: centered hero with badge -->
  <HeroSection
    badge="Nouveau"
    title="Créez des interfaces modernes en un rien de temps"
    highlight="interfaces modernes"
    description="Une bibliothèque de composants Svelte 5 soignés, accessibles et prêts à l'emploi. Concentrez-vous sur votre produit, pas sur les détails d'implémentation."
    primaryCta={{ label: 'Commencer gratuitement', href: '#' }}
    secondaryCta={{ label: 'Voir la démo', href: '#' }}
  />

  <!-- Example 2: left-aligned hero with visual -->
  <HeroSection
    title="Déployez plus vite avec des composants fiables"
    highlight="plus vite"
    description="Chaque composant est construit avec Svelte 5, pensé pour l'accessibilité (RGAA) et stylisé avec des tokens CSS cohérents. Intégrez-les en quelques lignes."
    primaryCta={{ label: 'Explorer les composants', href: '#' }}
    secondaryCta={{ label: 'Lire la documentation', href: '#' }}
    align="left"
  >
    {#snippet visual()}
      <div style="
        width: 100%;
        max-width: 480px;
        aspect-ratio: 16/10;
        border-radius: var(--radius-xl);
        background: linear-gradient(135deg, var(--primary-subtle) 0%, color-mix(in srgb, var(--primary) 20%, transparent) 100%);
        border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: var(--primary);
        font-weight: 600;
        letter-spacing: 0.02em;
      ">
        Aperçu de l'interface
      </div>
    {/snippet}
  </HeroSection>
</div>
