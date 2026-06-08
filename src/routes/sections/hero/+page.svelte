<script lang="ts">
  import HeroSection from "$lib/components/sections/HeroSection.svelte";
  import HeroSectionV2 from "$lib/components/sections/HeroSectionV2.svelte";
  import MatrixBackground from "$lib/components/ui/MatrixBackground.svelte";
</script>

<svelte:head>
  <title>Hero — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Hero</h1>
    <p>
      Section d'accroche principale avec badge, titre colorisé, description et boutons
      d'action. Deux alignements disponibles : centré et gauche avec visuel.
    </p>
  </div>

  <!-- Example 1: centered hero with badge -->
  <MatrixBackground>
    <HeroSection
      badge="Nouveau"
      title="Créez des interfaces modernes en un rien de temps"
      highlight="interfaces modernes"
      description="Une bibliothèque de composants Svelte 5 soignés, accessibles et prêts à l'emploi. Concentrez-vous sur votre produit, pas sur les détails d'implémentation."
      primaryCta={{ label: "Commencer gratuitement", href: "#" }}
      secondaryCta={{ label: "Voir la démo", href: "#" }}
      withBackground=""
    />
  </MatrixBackground>

  <!-- Example 2: left-aligned hero with visual -->
  <HeroSection
    title="Déployez plus vite avec des composants fiables"
    highlight="plus vite"
    description="Chaque composant est construit avec Svelte 5, pensé pour l'accessibilité (RGAA) et stylisé avec des tokens CSS cohérents. Intégrez-les en quelques lignes."
    primaryCta={{ label: "Explorer les composants", href: "#" }}
    secondaryCta={{ label: "Lire la documentation", href: "#" }}
    align="left"
  >
    {#snippet visual()}
      <div
        style="
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
      "
      >
        Aperçu de l'interface
      </div>
    {/snippet}
  </HeroSection>

  <div class="page-header" style="margin-top: 64px;">
    <h2>HeroSection V2</h2>
    <p>
      Variante premium avec grille décorative, orbes animés, texte highlight en gradient,
      badge interactif et ligne de stats.
    </p>
  </div>

  <!-- V2 — centered with stats -->
  <HeroSectionV2
    badge="Nouveauté"
    title="Des interfaces qui impressionnent dès le premier regard"
    highlight="impressionnent"
    description="Une bibliothèque de composants Svelte 5 soignés, accessibles et prêts à l'emploi. Concentrez-vous sur votre produit, pas sur les détails d'implémentation."
    primaryCta={{ label: "Commencer gratuitement", href: "#" }}
    secondaryCta={{ label: "Voir la démo", href: "#" }}
    stats={[
      { value: "80+", label: "Composants" },
      { value: "100%", label: "TypeScript" },
      { value: "MIT", label: "Licence" },
    ]}
  />

  <!-- V2 — left with visual -->
  <HeroSectionV2
    title="Déployez plus vite avec des composants fiables"
    highlight="plus vite"
    description="Chaque composant est construit avec Svelte 5, pensé pour l'accessibilité et stylisé avec des tokens CSS cohérents. Intégrez-les en quelques lignes."
    primaryCta={{ label: "Explorer les composants", href: "#" }}
    secondaryCta={{ label: "Lire la documentation", href: "#" }}
    align="left"
    stats={[
      { value: "5★", label: "Qualité" },
      { value: "v5", label: "Svelte" },
    ]}
  >
    {#snippet visual()}
      <div
        style="
        width: 100%;
        max-width: 520px;
        aspect-ratio: 4/3;
        border-radius: var(--radius-xl);
        background: linear-gradient(135deg, var(--primary-subtle) 0%, color-mix(in srgb, var(--primary) 18%, transparent) 100%);
        border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: var(--primary);
        font-weight: 600;
        letter-spacing: 0.02em;
      "
      >
        Aperçu de l'interface
      </div>
    {/snippet}
  </HeroSectionV2>
</div>
