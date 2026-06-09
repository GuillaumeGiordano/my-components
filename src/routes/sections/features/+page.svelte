<script lang="ts">
  import FeaturesSection from "$lib/components/sections/FeaturesSection.svelte";
  import { Zap, Shield, BarChart2, Globe, Lock, Sparkles } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Features — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Features</h1>
    <p>
      Grille de fonctionnalités avec icônes, titres et descriptions. Supporte 2, 3 ou 4
      colonnes et un badge optionnel par feature.
    </p>
  </div>

  <FeaturesSection
    badge="Fonctionnalités"
    title="Tout ce dont votre équipe a besoin"
    description="Une plateforme pensée pour les équipes modernes : rapide, sécurisée et facile à intégrer dans vos workflows existants."
    columns={3}
    features={[
      {
        icon: Zap,
        title: "Performance optimale",
        description:
          "Architecture légère et rendu côté serveur pour des temps de chargement inférieurs à 200 ms, même sur mobile.",
      },
      {
        icon: Shield,
        title: "Sécurité renforcée",
        description:
          "Chiffrement bout en bout, authentification à deux facteurs et audits de sécurité trimestriels inclus dans tous les plans.",
      },
      {
        icon: BarChart2,
        title: "Analytiques avancées",
        description:
          "Tableaux de bord en temps réel, rapports exportables et alertes personnalisées pour suivre vos métriques clés.",
        badge: "Nouveau",
      },
      {
        icon: Globe,
        title: "Multi-région",
        description:
          "Déployez vos données dans la région de votre choix (Europe, Amérique, Asie) pour respecter les obligations légales.",
      },
      {
        icon: Lock,
        title: "Conformité RGPD",
        description:
          "Gestion des consentements, droit à l'oubli et registre des traitements intégrés nativement dans la plateforme.",
      },
      {
        icon: Sparkles,
        title: "IA intégrée",
        description:
          "Suggestions intelligentes, classification automatique et résumés générés par IA pour accélérer vos processus métier.",
      },
    ]}
  />
</div>
