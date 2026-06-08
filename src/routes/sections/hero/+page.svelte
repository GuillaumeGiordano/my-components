<script lang="ts">
  import HeroSection from "$lib/components/sections/HeroSection.svelte";
  import HeroSectionV2 from "$lib/components/sections/HeroSectionV2.svelte";
  import BubbleBackground from "$lib/components/ui/BubbleBackground.svelte";
  import Carousel from "$lib/components/ui/Carousel.svelte";
  import MatrixBackground from "$lib/components/ui/MatrixBackground.svelte";
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";

  const cardSlides = [
    {
      title: "SvelteKit",
      desc: "Framework full-stack basé sur Svelte — routing, SSR, endpoints.",
      icon: "⚡",
    },
    {
      title: "Tailwind CSS 4",
      desc: "Utility-first CSS avec variables CSS natives et Vite plugin.",
      icon: "🎨",
    },
    {
      title: "TypeScript",
      desc: "Typage statique pour un code plus robuste et maintenable.",
      icon: "🔷",
    },
    {
      title: "Lucide Icons",
      desc: "Bibliothèque d'icônes SVG cohérentes et légères.",
      icon: "✦",
    },
  ];
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
  <HeroSection
    badge="Nouveau"
    title="Créez des interfaces modernes en un rien de temps"
    highlight="interfaces modernes"
    description="Une bibliothèque de composants Svelte 5 soignés, accessibles et prêts à l'emploi. Concentrez-vous sur votre produit, pas sur les détails d'implémentation."
    primaryCta={{ label: "Commencer gratuitement", href: "#" }}
    secondaryCta={{ label: "Voir la démo", href: "#" }}
    withBackground=""
  />

  <!-- Example 2: left-aligned hero with visual -->
  <ParticleBackground>
    <HeroSection
      title="Déployez plus vite avec des composants fiables"
      highlight="plus vite"
      description="Chaque composant est construit avec Svelte 5, pensé pour l'accessibilité (RGAA) et stylisé avec des tokens CSS cohérents. Intégrez-les en quelques lignes."
      primaryCta={{ label: "Explorer les composants", href: "#" }}
      secondaryCta={{ label: "Lire la documentation", href: "#" }}
      align="left"
    >
      {#snippet visual()}
        <Carousel items={cardSlides} autoplay interval={3000}>
          {#snippet item(slide)}
            {@const s = slide as (typeof cardSlides)[0]}
            <div class="card-slide">
              <div class="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          {/snippet}
        </Carousel>
      {/snippet}
    </HeroSection>
  </ParticleBackground>

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

<style>
  .card-slide {
    /* padding: 40px 32px; */
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
  }

  .card-icon {
    font-size: 36px;
    line-height: 1;
  }

  .card-slide h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .card-slide p {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
    max-width: 340px;
  }
</style>
