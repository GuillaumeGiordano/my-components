<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import HeroSectionG2 from "$lib/components/g2-webdev/HeroSectionG2.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import ContactSection from "$lib/components/sections/ContactSection.svelte";
  import CTABannerSection from "$lib/components/sections/CTABannerSection.svelte";
  import FAQSection from "$lib/components/sections/FAQSection.svelte";
  import FeaturesSection from "$lib/components/sections/FeaturesSection.svelte";
  import ProcessSection from "$lib/components/sections/ProcessSection.svelte";
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";
  import {
    LayoutDashboard,
    FileText,
    Settings,
    Users,
    Target,
    Compass,
    ClipboardList,
    Lightbulb,
    Video,
    CheckCircle2,
    Gift,
    Map,
  } from "@lucide/svelte";

  function handleSubmit(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    // Simulate API call
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  }

  const faqs = [
    {
      question: "L'atelier est-il vraiment gratuit ?",
      answer:
        "Oui, totalement. L'atelier d'expression du besoin est offert et sans engagement. Son objectif est de bien comprendre votre projet avant d'établir un devis précis et adapté.",
    },
    {
      question: "Combien de temps dure l'atelier ?",
      answer:
        "Environ 20 minutes. Un format court et efficace, en visio ou par téléphone, suffisant pour cerner vos objectifs et vous orienter vers la bonne solution.",
    },
    {
      question: "Dois-je préparer quelque chose à l'avance ?",
      answer:
        "Aucune préparation n'est nécessaire. Quelques idées sur vos objectifs, votre cible et des exemples de sites que vous aimez suffisent. Nous nous chargeons de structurer l'échange.",
    },
    {
      question: "Que se passe-t-il après l'atelier ?",
      answer:
        "Vous recevez une synthèse écrite du périmètre défini ainsi qu'un devis détaillé sous 48h. Libre à vous de poursuivre ou non : l'atelier ne vous engage à rien.",
    },
  ];
</script>

<svelte:head>
  <title>Atelier d'expression du besoin — G2 Webdev</title>
  <meta
    name="description"
    content="Un atelier offert de 20 minutes pour comprendre vos objectifs, vos cibles et vos contraintes, et définir ensemble le périmètre de votre projet web."
  />
</svelte:head>

<Navbar
  items={[
    { icon: LayoutDashboard, label: "Dashboard", href: "/g2webdev" },
    { icon: FileText, label: "Articles", href: "/articles" },
    { icon: Users, label: "Équipe", href: "/team" },
    { icon: Settings, label: "Paramètres", href: "/settings" },
  ]}
>
  {#snippet brand()}
    <LogoGG width={28} height={28} open={false} />
  {/snippet}

  {#snippet actionBtn()}
    <Button size="sm" variant="primary" href="#contact">Prendre rendez-vous</Button>
  {/snippet}
</Navbar>

<ParticleBackground>
  <HeroSectionG2
    title="Atelier d'expression du besoin"
    highlight="expression du besoin"
    description="Un échange de 20 minutes, offert et sans engagement, pour comprendre vos objectifs, vos cibles et vos contraintes, puis définir ensemble le périmètre exact de votre projet web. La première étape pour partir sur des bases claires."
    primaryCta={{ label: "Réserver mon atelier offert", href: "#contact" }}
    secondaryCta={{ label: "Retour à l'accueil", href: "/g2webdev" }}
    align="center"
  />
</ParticleBackground>

<ParticleBackground>
  <FeaturesSection
    title="Pourquoi cet atelier ?"
    description="Un projet web réussi commence par une bonne compréhension du besoin. Cet atelier pose les fondations avant toute proposition chiffrée."
    columns={3}
    features={[
      {
        icon: Target,
        title: "Clarifier vos objectifs",
        description:
          "Vendre, prendre des rendez-vous, gagner en visibilité… Nous définissons précisément ce que votre site doit accomplir.",
      },
      {
        icon: Users,
        title: "Identifier vos cibles",
        description:
          "Comprendre à qui s'adresse votre site permet d'orienter le design, le contenu et les fonctionnalités au bon endroit.",
      },
      {
        icon: Compass,
        title: "Définir le périmètre",
        description:
          "Pages, fonctionnalités, contenus : nous délimitons ensemble ce qui est essentiel pour votre première version.",
      },
      {
        icon: Lightbulb,
        title: "Vous conseiller",
        description:
          "Profitez de retours concrets et de recommandations adaptées à votre activité et à votre budget.",
      },
      {
        icon: ClipboardList,
        title: "Cadrer le projet",
        description:
          "Un périmètre clair évite les mauvaises surprises et permet d'établir un devis juste et transparent.",
      },
      {
        icon: Gift,
        title: "Sans engagement",
        description:
          "L'atelier est entièrement offert. Vous repartez avec une vision claire, que vous décidiez ou non de continuer.",
      },
    ]}
  />
</ParticleBackground>

<ParticleBackground>
  <ProcessSection
    title="Comment se déroule l'atelier"
    description="Un format court et efficace, en visio ou par téléphone, en quatre temps."
    steps={[
      {
        icon: Video,
        title: "Prise de contact, 5 min",
        description:
          "Présentation de votre activité et de votre projet. Nous vous écoutons pour bien comprendre votre contexte.",
      },
      {
        icon: Map,
        title: "Exploration du besoin, 10 min",
        description:
          "Questions ciblées sur vos objectifs, vos cibles, vos contraintes et vos préférences visuelles.",
      },
      {
        icon: ClipboardList,
        title: "Définition du périmètre, 5 min",
        description:
          "Nous délimitons ensemble les pages et fonctionnalités essentielles pour votre première version.",
      },
      {
        icon: CheckCircle2,
        title: "Synthèse & devis sous 48h",
        description:
          "Vous recevez un récapitulatif écrit du périmètre défini, accompagné d'un devis détaillé et sans engagement.",
      },
    ]}
    layout="vertical"
  />
</ParticleBackground>

<CTABannerSection
  title="Un atelier offert pour démarrer du bon pied"
  description="20 minutes pour y voir clair sur votre projet web, sans engagement. Réservez votre créneau dès maintenant."
  primaryCta={{ label: "Réserver mon atelier offert", href: "#contact" }}
/>

<ParticleBackground>
  <FAQSection
    title="Questions fréquentes"
    description="Tout ce que vous devez savoir avant de réserver votre atelier."
    columns={2}
    {faqs}
  />
</ParticleBackground>

<ParticleBackground>
  <ContactSection
    title="Réservez votre atelier offert"
    description="Remplissez ce formulaire pour planifier votre atelier d'expression du besoin. Nous vous répondons en moins de 24 heures."
    onsubmit={handleSubmit}
    variant="centered"
  />
</ParticleBackground>
