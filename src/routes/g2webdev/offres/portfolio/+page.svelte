<script lang="ts">
  import ServiceDetailSection from "$lib/components/sections/ServiceDetailSection.svelte";
  import { Image } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Portfolio — G2 Webdev</title>
  <meta
    name="description"
    content="Mettez vos réalisations en valeur dans une galerie soignée, responsive et rapide, avec lightbox et filtres par catégorie."
  />
</svelte:head>

<ServiceDetailSection
  eyebrow="Créatifs"
  icon={Image}
  accent="#8b5cf6"
  reverse
  title="Un portfolio qui met vos réalisations en lumière"
  description="Mettez vos projets en valeur dans une galerie élégante et entièrement responsive. Lightbox plein écran, filtres par catégorie et images ultra-optimisées : vos créations parlent d'elles-mêmes."
  points={[
    "Galerie responsive avec lightbox plein écran",
    "Filtres par catégorie ou par tag",
    "Images optimisées (WebP/AVIF), chargement rapide",
    "Liens et partage vers vos réseaux",
  ]}
  cta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
/>
