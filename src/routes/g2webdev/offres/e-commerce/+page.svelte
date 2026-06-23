<script lang="ts">
  import ServiceDetailSection from "$lib/components/sections/ServiceDetailSection.svelte";
  import { ShoppingCart } from "@lucide/svelte";
</script>

<svelte:head>
  <title>E-commerce — G2 Webdev</title>
  <meta
    name="description"
    content="Une boutique en ligne sécurisée et performante pour vendre vos produits partout, 24h/24 : paiement, gestion des stocks et tableau de bord."
  />
</svelte:head>

<ServiceDetailSection
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
/>
