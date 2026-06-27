<script lang="ts">
  import ServiceDetailSection from "$lib/components/sections/ServiceDetailSection.svelte";
  import WebsiteShowcase from "$lib/components/ui/WebsiteShowcase.svelte";
  import PortfolioShowcase from "$lib/components/ui/PortfolioShowcase.svelte";
  import EcommerceShowcase from "$lib/components/ui/EcommerceShowcase.svelte";
  import AppShowcase from "$lib/components/ui/AppShowcase.svelte";
  import { Monitor, Image, ShoppingCart, AppWindow } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Nos offres — G2 Webdev</title>
  <meta
    name="description"
    content="Découvrez toutes les offres G2 Webdev : site vitrine, portfolio, e-commerce et application web sur mesure, pour chaque besoin et chaque budget."
  />
</svelte:head>

<ServiceDetailSection
  id="site-vitrine"
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
>
  {#snippet visual()}
    <WebsiteShowcase />
  {/snippet}
</ServiceDetailSection>

<ServiceDetailSection
  id="portfolio"
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
>
  {#snippet visual()}
    <PortfolioShowcase />
  {/snippet}
</ServiceDetailSection>

<ServiceDetailSection
  id="e-commerce"
  eyebrow="Vente en ligne"
  icon={ShoppingCart}
  accent="#22c55e"
  title="Vendez en ligne, partout et 24h/24"
  description="Une boutique sécurisée et performante pour vendre vos produits sans limite d'horaire. Paiement chiffré, gestion des stocks et tableau de bord clair : vous gardez la main sur votre activité."
  points={[
    "Paiement en ligne sécurisé (Stripe)",
    "Gestion des produits, stocks et promotions",
    "Tunnel de commande optimisé pour la conversion",
    "Tableau de bord des ventes en temps réel",
  ]}
  cta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
>
  {#snippet visual()}
    <EcommerceShowcase />
  {/snippet}
</ServiceDetailSection>

<ServiceDetailSection
  id="application-web"
  eyebrow="Sur mesure"
  icon={AppWindow}
  accent="#f59e0b"
  reverse
  title="Des applications web taillées pour votre métier"
  description="Des outils sur mesure, accessibles partout et conçus pour vos processus : espaces clients, tableaux de bord, gestion interne. Sécurisés, évolutifs et intégrés à vos outils existants."
  points={[
    "Fonctionnalités pensées pour vos processus",
    "Authentification et gestion des rôles",
    "Intégrations API (CRM, facturation, paiement…)",
    "Architecture évolutive et sécurisée (RGPD)",
  ]}
  cta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
>
  {#snippet visual()}
    <AppShowcase />
  {/snippet}
</ServiceDetailSection>

<style lang="scss">
  /* Offset anchor targets so they land below the sticky navbar */
  :global(#hero),
  :global(#stats),
  :global(#process),
  :global(#cta-banner),
  :global(#features),
  :global(#faq),
  :global(#contact),
  :global(#site-vitrine),
  :global(#portfolio),
  :global(#e-commerce),
  :global(#application-web) {
    scroll-margin-top: var(--header-height);
  }
</style>
