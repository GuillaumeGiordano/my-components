<script lang="ts">
  import "$lib/styles/demo-page.css";
  import ServiceDetailSection from "$lib/components/sections/ServiceDetailSection.svelte";
  import { Monitor, Image } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Service Detail — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Service Detail</h1>
    <p>
      Une section explicative autonome pour décrire une offre en une seule vue : accroche,
      titre, description, points clés, CTA et mockup CSS teinté par couleur d'accent.
      Idéale pour une page détail légère.
    </p>
  </div>
</div>

<!-- Exemple : page détail "Site vitrine" -->
<ServiceDetailSection
  eyebrow="Le plus demandé"
  icon={Monitor}
  title="Un site vitrine qui présente et convertit"
  description="Présentez votre activité avec un site élégant, rapide et pensé pour transformer vos visiteurs en clients. Sur mesure, optimisé pour le référencement et impeccable sur mobile."
  points={[
    "Design sur mesure, sans template",
    "Optimisé SEO et ultra rapide",
    "Responsive sur tous les écrans",
    "Nom de domaine & hébergement inclus",
  ]}
  cta={{ label: "Demander un devis gratuit", href: "#" }}
/>

<!-- Exemple : page détail "Portfolio" (accent violet, visuel à gauche) -->
<ServiceDetailSection
  eyebrow="Créatifs"
  icon={Image}
  accent="#8b5cf6"
  reverse
  title="Un portfolio qui met vos réalisations en lumière"
  description="Mettez vos projets en valeur dans une galerie élégante et entièrement responsive : lightbox plein écran, filtres par catégorie et images ultra-optimisées."
  points={[
    "Galerie responsive avec lightbox",
    "Filtres par catégorie",
    "Images optimisées (WebP/AVIF)",
    "Partage facile vers vos réseaux",
  ]}
  cta={{ label: "En savoir plus", href: "#" }}
/>
