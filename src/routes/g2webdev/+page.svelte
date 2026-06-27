<script lang="ts">
  import ContactSection from "$lib/components/sections/ContactSection.svelte";
  import FAQSection from "$lib/components/sections/FAQSection.svelte";
  import FeaturesSection from "$lib/components/sections/FeaturesSection.svelte";
  import HeroSection from "$lib/components/sections/HeroSection.svelte";
  import StatsSection from "$lib/components/sections/StatsSection.svelte";
  import DeviceShowcase from "$lib/components/ui/DeviceShowcase.svelte";
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";
  import {
    AppWindow,
    BarChart2,
    CalendarCheck,
    FileText,
    Image,
    MessageCircle,
    Monitor,
    Rocket,
    Settings,
    ShoppingCart,
    Sparkles,
    Users,
    X,
  } from "@lucide/svelte";

  import ProcessTimelineSection from "$lib/components/sections/ProcessTimelineSection.svelte";
  import ScrollOverSection from "$lib/components/sections/ScrollOverSection.svelte";

  // Animated offer showcase shown in the hero (replaces the static cards)
  const offers = [
    {
      label: "Site vitrine",
      price: 1200,
      tagline: "Présentez votre activité et convertissez vos visiteurs.",
      href: "/g2webdev/offres/site-vitrine",
      accent: "var(--primary)",
      icon: Monitor,
    },
    {
      label: "Portfolio",
      price: 1500,
      tagline: "Mettez vos réalisations en valeur dans une galerie soignée.",
      href: "/g2webdev/offres/portfolio",
      accent: "#8b5cf6",
      icon: Image,
    },
    {
      label: "E-commerce",
      price: 2900,
      tagline: "Vendez vos produits en ligne, partout et 24h/24.",
      href: "/g2webdev/offres/e-commerce",
      accent: "#22c55e",
      icon: ShoppingCart,
    },
    {
      label: "Application web",
      price: "Sur devis",
      tagline: "Des outils métier sur mesure, taillés pour votre organisation.",
      href: "/g2webdev/offres/application-web",
      accent: "#f59e0b",
      icon: AppWindow,
    },
  ];

  function handleSubmit(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    // Simulate API call
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  }

  // FAQ visible — questions les plus décisives. Les autres restent couvertes par
  // l'assistant IA (voir knowledge.json), qui répond déjà à toutes ces questions.
  const faqs = [
    {
      question: "Combien coûte un site web sur mesure ?",
      answer:
        "Nos tarifs sont établis sur devis selon la complexité du projet. Chaque projet étant unique, nous privilégions une tarification transparente adaptée à votre budget. Nous fournissons systématiquement un devis détaillé et gratuit avant tout engagement.",
    },
    {
      question: "Quels sont les délais de réalisation ?",
      answer:
        "Comptez 1 semaine pour une landing page, 2 à 4 semaines pour un site vitrine et 4 à 12 semaines pour une application web, selon la complexité. Les délais sont définis conjointement au démarrage du projet.",
    },
    {
      question: "Proposez-vous la maintenance après livraison ?",
      answer:
        "Oui. Nous proposons des contrats de maintenance incluant les mises à jour de sécurité, la surveillance des dépendances et la correction des bugs signalés.",
    },
    {
      question: "Le référencement (SEO) est-il inclus ?",
      answer:
        "Oui. Chaque site est livré avec les bases du référencement naturel : balises méta, données structurées, sitemap, performances optimisées et version mobile soignée. Un accompagnement SEO plus poussé peut être ajouté selon vos objectifs.",
    },
    {
      question: "Mon site sera-t-il adapté aux mobiles ?",
      answer:
        'Absolument. Tous les projets sont développés en "mobile-first" et testés sur smartphones, tablettes et ordinateurs afin d\'offrir une expérience fluide sur tous les écrans.',
    },
    {
      question: "À qui appartient le site une fois livré ?",
      answer:
        "Le site vous appartient à 100 %. Vous recevez l'intégralité du code source et les accès (hébergement, nom de domaine, dépôt Git). Aucune dépendance à un abonnement propriétaire.",
    },
  ];

  // Steps for the ProcessSection and ProcessTimelineSection, describing the workflow from initial contact to maintenance.
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

  let open = $state(false);
</script>

<svelte:head>
  <title>G2 Webdev</title>
</svelte:head>

<ScrollOverSection>
  {#snippet background()}
    <ParticleBackground />
  {/snippet}

  <!-- Hero Section -->
  <HeroSection
    id="hero"
    title="Agence web dans le Var, création de sites sur mesure"
    highlight="création de sites"
    description="G2 Webdev conçoit des sites internet modernes, rapides et optimisés pour le référencement (SEO), et accompagne les entreprises, artisans et indépendants du Var dans leur croissance digitale. Une question ? Notre agent IA vous répond à tout moment, directement sur le site."
    primaryCta={{ label: "Comment ca marche ?", href: "#process" }}
    secondaryCta={{ label: "Nous contacter", href: "#contact" }}
    align="left"
  >
    {#snippet visual()}
      <DeviceShowcase {offers} buttonHref="/g2webdev/offres" />
    {/snippet}
  </HeroSection>

  <!-- Stats Section -->
  <StatsSection
    id="stats"
    withBackground="bg-base"
    stats={[
      {
        value: "4",
        suffix: "+",
        label: "Années d'expérience",
        description: "en développement web professionnel",
      },
      {
        value: "1",
        suffix: ".",
        label: "Interlocuteur unique",
        description: "du devis à la mise en ligne",
      },
      {
        value: "48",
        suffix: "h",
        label: "Délai de réponse",
        description: "garanti en jours ouvrés",
      },
      {
        value: "100",
        suffix: "%",
        label: "Sur-mesure et flexible",
        description: "aucun site sous template revendu",
      },
    ]}
  />

  <!-- Process Section -->
  <ProcessTimelineSection
    id="process"
    title="Votre projet, étape par étape"
    description="De l'écoute de votre besoin à la mise en ligne, nous vous accompagnons à chaque étape de votre projet web."
    gap="-48px"
    minHeight="calc(100vh - var(--header-height))"
    {steps}
  />

  <!-- Features Section -->
  <FeaturesSection
    id="features"
    title="Tout ce dont vous avez besoin pour votre site web"
    description="Nous proposons un accompagnement complet pour la création et la maintenance de votre site internet, afin de vous permettre de vous concentrer sur votre activité."
    columns={3}
    features={[
      {
        icon: BarChart2,
        title: "SEO",
        description:
          "Optimisation technique et éditoriale pour améliorer votre visibilité sur Google et attirer un trafic qualifié durable.",
      },
      {
        icon: Rocket,
        title: "Déploiement sur VM",
        description:
          "Mise en production sur serveur dédié ou VM, configurée, sécurisée et prête à monter en charge selon votre activité.",
        badge: "Europe",
      },
      {
        icon: Settings,
        title: "Maintenance",
        description:
          "Mises à jour, sauvegardes et surveillance continue pour garder votre site rapide, sécurisé et toujours disponible.",
      },
      {
        icon: Users,
        title: "Accompagnement digital",
        description:
          "Conseil et suivi personnalisés pour définir votre stratégie en ligne et faire évoluer vos outils au rythme de votre croissance.",
      },
      {
        icon: FileText,
        title: "Atelier d'expression du besoin",
        description:
          "Une séance de cadrage pour clarifier vos objectifs, vos cibles et vos fonctionnalités avant de lancer le projet.",
      },
      {
        icon: Sparkles,
        title: "Refonte site internet",
        description:
          "Modernisation complète de votre site existant : design actuel, performances optimisées et expérience mobile irréprochable.",
      },
    ]}
  />

  <button
    class="toggle-btn"
    onclick={() => (open = !open)}
    aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
    aria-expanded={open}
  >
    {#if open}
      <X size={22} />
    {:else}
      <MessageCircle size={22} />
    {/if}
  </button>

  <!-- FAQ Section -->
  <FAQSection
    id="faq"
    title="Vos questions, nos réponses"
    description="Pas envie de chercher ? Posez votre question à notre assistant IA, en bas à droite : il répond instantanément, 24h/24. Et si vous préférez un échange humain, je vous réponds en moins de 24 heures."
    withBackground="bg-base"
    columns={1}
    {faqs}
  />

  <!-- Contact Section -->
  <ContactSection
    id="contact"
    title="Contactez notre équipe"
    description="Vous avez une question, un retour ou une demande spécifique ? Remplissez ce formulaire et nous vous répondrons rapidement."
    onsubmit={handleSubmit}
    variant="centered"
  />
</ScrollOverSection>

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
