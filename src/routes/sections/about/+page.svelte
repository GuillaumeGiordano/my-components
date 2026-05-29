<script lang="ts">
  import '$lib/styles/demo-page.css';
  import AboutSection   from '$lib/components/sections/AboutSection.svelte';
  import AboutSectionV2 from '$lib/components/sections/AboutSectionV2.svelte';
  import AboutSectionV3 from '$lib/components/sections/AboutSectionV3.svelte';
  import {
    Target, Zap, ShieldCheck, Users, Lightbulb, Heart, Globe, Award, Code2,
  } from '@lucide/svelte';
</script>

<svelte:head>
  <title>About — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>About</h1>
    <p>3 variantes de section "À propos" — split texte + visuel, mission + stats animées, story fondateur + timeline.</p>
  </div>
</div>

<!-- ─── V1 — Split texte + visuel ───────────────────────────────────────── -->
<AboutSection
  badge="À propos"
  eyebrow="Qui sommes-nous"
  title="Nous construisons des applications web qui durent"
  description="G2webdev est un studio de développement web spécialisé dans la création d'interfaces modernes, performantes et accessibles. Chaque projet est une collaboration étroite où qualité et délais sont notre priorité."
  values={[
    { icon: Target,      label: 'Orienté résultats',   description: 'Des solutions concrètes qui répondent à vos objectifs business.' },
    { icon: Zap,         label: 'Performance first',    description: 'Code optimisé, temps de chargement maîtrisé, Core Web Vitals soignés.' },
    { icon: ShieldCheck, label: 'Accessibilité RGAA',   description: 'Interfaces inclusives et conformes aux standards d\'accessibilité.' },
  ]}
  primaryCta={{ label: 'Démarrer un projet', href: '#' }}
  secondaryCta={{ label: 'Voir nos réalisations', href: '#' }}
>
  {#snippet visual()}
    <div class="placeholder-visual">
      <div class="visual-card top-left">
        <Code2 size={20} />
        <span>Svelte 5 + TypeScript</span>
      </div>
      <div class="visual-card bottom-right">
        <Award size={20} />
        <span>50+ projets livrés</span>
      </div>
    </div>
  {/snippet}
</AboutSection>

<!-- ─── V2 — Mission + Stats + Valeurs ──────────────────────────────────── -->
<AboutSectionV2
  badge="Notre mission"
  title="Rendre le développement web accessible à tous"
  description="Nous croyons que chaque entreprise mérite des outils digitaux de qualité, quelle que soit sa taille. Notre bibliothèque de composants open-source en est la preuve."
  stats={[
    { value: '50',  suffix: '+', label: 'Projets livrés'     },
    { value: '98',  suffix: '%', label: 'Clients satisfaits'  },
    { value: '3',   suffix: ' ans', label: 'D\'expérience'   },
    { value: '12',  suffix: 'k', label: 'Lignes de code open-source' },
  ]}
  values={[
    { icon: Users,     title: 'Collaboration',   description: 'Vous êtes impliqués à chaque étape du projet. Pas de surprises, juste de la transparence.' },
    { icon: Lightbulb, title: 'Innovation',       description: 'Nous utilisons les dernières technologies pour des solutions pérennes et maintenables.' },
    { icon: Heart,     title: 'Passion',          description: 'Chaque ligne de code est écrite avec soin. La qualité n\'est pas une option.' },
    { icon: Globe,     title: 'Accessibilité',    description: 'Nos interfaces respectent les standards WCAG pour être utilisables par tous.' },
  ]}
  columns={2}
/>

<!-- ─── V3 — Story fondateur + Timeline ─────────────────────────────────── -->
<AboutSectionV3
  badge="Notre histoire"
  title="De freelance à studio"
  story="G2webdev est né d'une conviction simple : le web doit être bien fait. Après des années à constater les mêmes erreurs — code non maintenable, interfaces inaccessibles, projets livrés hors délais — j'ai décidé de construire un studio où l'excellence technique n'est pas négociable. Chaque projet est une opportunité de faire mieux."
  author={{ name: 'Guillaume G.', role: 'Fondateur & Développeur principal' }}
  milestones={[
    { year: '2021', title: 'Les débuts',          description: 'Premiers projets freelance en Svelte, focus sur la qualité du code.' },
    { year: '2022', title: 'La bibliothèque',     description: 'Création de @guillaumeg/ui, premier système de composants interne.' },
    { year: '2023', title: 'Ouverture studio',    description: 'Passage en structure officielle, premières collaborations long-terme.' },
    { year: '2024', title: 'Open-source',         description: 'Publication de la bibliothèque, +12k lignes de composants disponibles.' },
    { year: '2025', title: 'IA & automatisation', description: 'Intégration de chatbots et d\'outils IA dans les projets clients.' },
  ]}
/>

<style>
  /* ── Placeholder visuel pour la V1 ── */
  .placeholder-visual {
    position: relative;
    width: 100%;
    max-width: 420px;
    aspect-ratio: 4/3;
    background: linear-gradient(
      135deg,
      var(--primary-subtle) 0%,
      color-mix(in srgb, var(--primary) 15%, transparent) 100%
    );
    border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
    border-radius: var(--radius-xl);
  }

  .visual-card {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 10px 14px;
    box-shadow: var(--shadow-md);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-base);
  }

  .visual-card :global(svg) { color: var(--primary); }

  .top-left    { top: -12px;    left: -12px; }
  .bottom-right { bottom: -12px; right: -12px; }
</style>
