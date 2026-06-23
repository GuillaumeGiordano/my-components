<script lang="ts">
  import ServiceDetailSection from "$lib/components/sections/ServiceDetailSection.svelte";
  import { AppWindow } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Application web — G2 Webdev</title>
  <meta
    name="description"
    content="Des outils métier sur mesure, accessibles partout et taillés pour votre organisation : authentification, tableau de bord, API et montée en charge."
  />
</svelte:head>

<ServiceDetailSection
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
/>
