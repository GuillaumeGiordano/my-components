<script lang="ts">
  import CTABannerSection from "$lib/components/sections/CTABannerSection.svelte";
  import GradientBackground from "$lib/components/ui/GradientBackground.svelte";
  import "$lib/styles/demo-page.css";
</script>

<svelte:head>
  <title>CTA Banner — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>CTA Banner</h1>
    <p>
      Bandeau d'appel à l'action centré avec trois variantes : default (fond neutre),
      primary (couleur accent) et dark (fond sombre).
    </p>
  </div>

  <CTABannerSection
    title="Prêt à transformer votre workflow ?"
    description="Rejoignez plus de 10 000 équipes qui utilisent notre plateforme chaque jour pour livrer plus vite et mieux."
    primaryCta={{ label: "Commencer gratuitement", href: "#" }}
    secondaryCta={{ label: "Voir une démo", href: "#" }}
  />

  <GradientBackground>
    <CTABannerSection
      badge="Offre limitée"
      title="2 mois offerts sur le plan Pro"
      description="Passez au plan annuel avant le 31 mai et économisez l'équivalent de deux mois d'abonnement. L'offre prend fin bientôt."
      primaryCta={{ label: "Profiter de l'offre", href: "#" }}
      secondaryCta={{ label: "Comparer les plans", href: "#" }}
    />
  </GradientBackground>

  <CTABannerSection
    title="Une question ? Parlons-en."
    description="Notre équipe est disponible du lundi au vendredi pour vous aider à choisir la solution adaptée à vos besoins."
    primaryCta={{ label: "Contacter les ventes", href: "#" }}
    secondaryCta={{ label: "Consulter la FAQ", href: "#" }}
  />
</div>
