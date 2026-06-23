<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import HeroSection from "$lib/components/sections/HeroSection.svelte";
  import FeaturesSection from "$lib/components/sections/FeaturesSection.svelte";
  import ChecklistSection from "$lib/components/sections/ChecklistSection.svelte";
  import ProcessSection from "$lib/components/sections/ProcessSection.svelte";
  import FAQSection from "$lib/components/sections/FAQSection.svelte";
  import CTABannerSection from "$lib/components/sections/CTABannerSection.svelte";
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";
  import {
    Home,
    Sparkles,
    ListChecks,
    HelpCircle,
    Paintbrush,
    Search,
    Smartphone,
    Zap,
    MessageSquare,
    Globe,
    CalendarCheck,
    PencilRuler,
    Rocket,
  } from "@lucide/svelte";

  const navItems = [
    { icon: Home, label: "Accueil", href: "/g2webdev" },
    { icon: Sparkles, label: "Atouts", href: "#atouts" },
    { icon: ListChecks, label: "Inclus", href: "#inclus" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
  ];

  const faqs = [
    {
      question: "Combien de pages comprend un site vitrine ?",
      answer:
        "En général de 3 à 7 pages (accueil, services, à propos, contact…). Le périmètre exact est défini ensemble lors de l'atelier d'expression du besoin, selon votre activité.",
    },
    {
      question: "Pourrai-je modifier mes contenus moi-même ?",
      answer:
        "Oui, si vous le souhaitez. Nous pouvons intégrer un système de gestion de contenu simple et vous former à son utilisation à la livraison.",
    },
    {
      question: "Le site sera-t-il bien référencé sur Google ?",
      answer:
        "Chaque site vitrine est livré avec les bases du SEO : balises méta, structure sémantique, sitemap, vitesse optimisée et version mobile soignée. Un accompagnement plus poussé est possible.",
    },
    {
      question: "Quel est le délai de réalisation ?",
      answer:
        "Comptez 2 à 4 semaines pour un site vitrine, selon le nombre de pages et la disponibilité des contenus. Le calendrier est fixé au démarrage.",
    },
  ];
</script>

<svelte:head>
  <title>Site vitrine sur mesure — G2 Webdev</title>
  <meta
    name="description"
    content="Un site vitrine élégant, rapide et optimisé pour le référencement, pensé pour présenter votre activité et convertir vos visiteurs."
  />
</svelte:head>

<Navbar items={navItems} spy>
  {#snippet brand()}
    <LogoGG width={36} height={36} open={false} />
  {/snippet}
  {#snippet actionBtn()}
    <Button size="sm" variant="primary" href="/g2webdev#contact">Demander un devis</Button>
  {/snippet}
</Navbar>

<ParticleBackground>
  <HeroSection
    id="presentation"
    title="Un site vitrine qui présente et convertit"
    highlight="présente et convertit"
    description="Présentez votre activité avec un site élégant, rapide et pensé pour transformer vos visiteurs en clients. Sur mesure, optimisé pour le référencement et impeccable sur mobile."
    primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
    secondaryCta={{ label: "Retour à l'accueil", href: "/g2webdev" }}
    align="center"
  />
</ParticleBackground>

<FeaturesSection
  id="atouts"
  title="Pourquoi un site vitrine G2 Webdev"
  description="Chaque site est développé sur mesure, sans template revendu, pour servir vos objectifs et votre image."
  columns={3}
  features={[
    {
      icon: Paintbrush,
      title: "Design sur mesure",
      description:
        "Une identité visuelle unique, alignée sur votre marque et pensée pour inspirer confiance.",
    },
    {
      icon: Search,
      title: "Optimisé SEO",
      description:
        "Structure sémantique, balises et performances soignées pour gagner en visibilité sur Google.",
    },
    {
      icon: Smartphone,
      title: "Mobile-first",
      description:
        "Une expérience fluide et soignée sur smartphone, tablette et ordinateur.",
    },
    {
      icon: Zap,
      title: "Ultra rapide",
      description:
        "Développé avec SvelteKit pour des temps de chargement minimes et un excellent score PageSpeed.",
    },
    {
      icon: MessageSquare,
      title: "Formulaire de contact",
      description:
        "Un formulaire clair avec validation et protection anti-spam pour capter vos prospects.",
    },
    {
      icon: Globe,
      title: "Domaine & hébergement",
      description:
        "Nom de domaine, hébergement et mise en ligne pris en charge — vous restez propriétaire de tout.",
    },
  ]}
/>

<ChecklistSection
  id="inclus"
  title="Ce qui est inclus"
  description="Une offre claire et transparente, sans surprise."
  withBackground="bg-base"
  columns={2}
  items={[
    { label: "Jusqu'à 7 pages sur mesure" },
    { label: "Design responsive (mobile, tablette, desktop)" },
    { label: "Référencement naturel de base" },
    { label: "Formulaire de contact sécurisé" },
    { label: "Nom de domaine + hébergement (1ʳᵉ année)" },
    { label: "Certificat HTTPS" },
    { label: "Formation à la prise en main" },
    { label: "Code source livré, 100 % à vous" },
  ]}
/>

<ProcessSection
  title="Comment se déroule votre projet"
  description="De l'écoute de votre besoin à la mise en ligne, un accompagnement à chaque étape."
  layout="vertical"
  steps={[
    {
      icon: CalendarCheck,
      title: "Atelier d'expression du besoin",
      description:
        "On clarifie vos objectifs, vos cibles et le périmètre du site. Offert et sans engagement.",
    },
    {
      icon: PencilRuler,
      title: "Maquettes & design",
      description:
        "Vous validez l'identité visuelle et la structure avant tout développement.",
    },
    {
      icon: Zap,
      title: "Développement",
      description:
        "Intégration sur mesure, rapide et optimisée pour le référencement.",
    },
    {
      icon: Rocket,
      title: "Mise en ligne",
      description:
        "Tests sur tous les écrans, mise en production et formation à la prise en main.",
    },
  ]}
/>

<CTABannerSection
  title="Votre site vitrine à partir de 1 200€"
  description="Recevez un devis gratuit et sans engagement sous 48h. Parlons de votre projet."
  primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
/>

<FAQSection
  id="faq"
  title="Questions fréquentes"
  description="Tout ce qu'il faut savoir avant de lancer votre site vitrine."
  withBackground="bg-base"
  columns={2}
  {faqs}
/>

<Footer
  tagline="Agence web dans le Var, création de sites sur mesure."
  columns={[
    {
      heading: "Offres",
      links: [
        { label: "Site vitrine", href: "/g2webdev/site-vitrine" },
        { label: "Portfolio", href: "/g2webdev/portfolio" },
        { label: "E-commerce", href: "/g2webdev/e-commerce" },
        { label: "Application web", href: "/g2webdev/application-web" },
      ],
    },
    {
      heading: "Navigation",
      links: [
        { label: "Accueil", href: "/g2webdev" },
        { label: "Méthode", href: "/g2webdev#process" },
        { label: "Contact", href: "/g2webdev#contact" },
      ],
    },
  ]}
  copyright={`© ${new Date().getFullYear()} G2 Webdev. Tous droits réservés.`}
>
  {#snippet brand()}
    <LogoGG width={32} height={32} open={true} />
  {/snippet}
</Footer>

<style>
  :global(#presentation),
  :global(#atouts),
  :global(#inclus),
  :global(#faq) {
    scroll-margin-top: var(--header-height);
  }
</style>
