<script lang="ts">
  import "$lib/styles/demo-page.css";
  import ProcessTimelineSection from "$lib/components/sections/ProcessTimelineSection.svelte";
  import { CalendarCheck, FileText, Sparkles, Rocket, Settings } from "@lucide/svelte";

  const steps = [
    {
      icon: CalendarCheck,
      title: "Prendre rendez-vous",
      description:
        "Réservez un premier échange, en visio ou sur place, pour nous présenter votre projet.",
      badge: "Gratuit",
      cta: { label: "Prendre rendez-vous", href: "#" },
    },
    {
      icon: FileText,
      title: "Atelier d'expression du besoin",
      description:
        "Un échange pour comprendre vos objectifs, vos cibles et vos contraintes, et définir ensemble le périmètre du projet.",
      badge: "Offert",
    },
    {
      icon: Sparkles,
      title: "Conception, design & développement",
      description:
        "Maquettes, identité visuelle puis développement de votre site, validés avec vous à chaque étape.",
    },
    {
      icon: Rocket,
      title: "Mise en ligne",
      description:
        "Tests sur tous les écrans, mise en ligne et optimisation pour le référencement (SEO).",
    },
    {
      icon: Settings,
      title: "Maintenance & suivi",
      description:
        "Mises à jour, sauvegardes et conseils pour faire évoluer votre site au rythme de votre activité.",
    },
  ];
</script>

<svelte:head>
  <title>Process Timeline — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Process Timeline</h1>
    <p>
      Timeline verticale centrée. Faites défiler : les étapes apparaissent en alternance
      à gauche puis à droite de la ligne.
    </p>
  </div>

  <section class="variant">
    <ProcessTimelineSection
      title="Votre projet, étape par étape"
      description="De l'écoute de votre besoin à la mise en ligne, nous vous accompagnons à chaque étape de votre projet web."
      {steps}
    />
  </section>
</div>
