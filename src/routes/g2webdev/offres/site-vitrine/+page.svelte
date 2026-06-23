<script lang="ts">
  import ServiceDetailSection from "$lib/components/sections/ServiceDetailSection.svelte";
  import { Monitor } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Site vitrine — G2 Webdev</title>
  <meta
    name="description"
    content="Un site vitrine élégant, rapide et optimisé pour le référencement, pensé pour présenter votre activité et convertir vos visiteurs."
  />
</svelte:head>

<ServiceDetailSection
  eyebrow="Le plus demandé"
  icon={Monitor}
  title="Un site vitrine qui présente et convertit"
  description="Présentez votre activité avec un site élégant, rapide et pensé pour transformer vos visiteurs en clients. Sur mesure, optimisé pour le référencement et impeccable sur mobile."
  points={[
    "Design sur mesure, sans template revendu",
    "Référencement (SEO) et performances optimisés",
    "Responsive sur smartphone, tablette et ordinateur",
    "Nom de domaine et hébergement inclus la 1ʳᵉ année",
  ]}
  cta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
/>
