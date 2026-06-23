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
    Wrench,
    LockKeyhole,
    LayoutDashboard,
    Plug,
    RefreshCw,
    TrendingUp,
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
      question: "Qu'est-ce qu'une application web sur mesure ?",
      answer:
        "C'est un outil métier développé spécifiquement pour vos processus : gestion interne, espace client, tableau de bord, réservation… Accessible depuis un navigateur, sans installation.",
    },
    {
      question: "Mes données seront-elles sécurisées ?",
      answer:
        "Oui. Authentification, gestion des rôles et permissions, chiffrement des échanges (HTTPS), sauvegardes régulières et conformité RGPD font partie intégrante du développement.",
    },
    {
      question: "L'application pourra-t-elle évoluer ?",
      answer:
        "Absolument. L'architecture est pensée pour monter en charge et accueillir de nouvelles fonctionnalités au rythme de votre croissance.",
    },
    {
      question: "Peut-on l'intégrer à mes outils existants ?",
      answer:
        "Oui. Connexion à vos services via API (CRM, facturation, paiement, email…) pour automatiser vos flux et éviter les doubles saisies.",
    },
  ];
</script>

<svelte:head>
  <title>Application web sur mesure — G2 Webdev</title>
  <meta
    name="description"
    content="Des outils métier sur mesure, accessibles partout et taillés pour votre organisation : authentification, tableau de bord, API et montée en charge."
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
    title="Des applications web taillées pour votre métier"
    highlight="pour votre métier"
    description="Des outils sur mesure, accessibles partout et conçus pour vos processus : espaces clients, tableaux de bord, gestion interne. Sécurisés, évolutifs et intégrés à vos outils existants."
    primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
    secondaryCta={{ label: "Retour à l'accueil", href: "/g2webdev" }}
    align="center"
  />
</ParticleBackground>

<FeaturesSection
  id="atouts"
  title="Un outil qui travaille pour vous"
  description="Conçu autour de vos processus pour vous faire gagner du temps au quotidien."
  columns={3}
  features={[
    {
      icon: Wrench,
      title: "Sur mesure",
      description:
        "Chaque fonctionnalité est pensée pour vos processus réels, pas l'inverse.",
    },
    {
      icon: LockKeyhole,
      title: "Authentification & rôles",
      description:
        "Connexion sécurisée, gestion fine des permissions et des accès par profil.",
    },
    {
      icon: LayoutDashboard,
      title: "Tableau de bord",
      description:
        "Vos indicateurs clés réunis dans une interface claire et exploitable.",
    },
    {
      icon: Plug,
      title: "Intégrations API",
      description:
        "Connexion à vos outils (CRM, facturation, paiement, email) pour automatiser vos flux.",
    },
    {
      icon: RefreshCw,
      title: "Temps réel",
      description:
        "Données synchronisées et mises à jour instantanées entre vos utilisateurs.",
    },
    {
      icon: TrendingUp,
      title: "Évolutif",
      description:
        "Une architecture qui monte en charge et accueille de nouvelles fonctionnalités.",
    },
  ]}
/>

<ChecklistSection
  id="inclus"
  title="Ce qui est inclus"
  description="Une base solide pour un outil métier fiable et durable."
  withBackground="bg-base"
  columns={2}
  items={[
    { label: "Analyse des besoins & cahier des charges" },
    { label: "Authentification & gestion des rôles" },
    { label: "Tableau de bord sur mesure" },
    { label: "Base de données sécurisée" },
    { label: "Intégrations API selon vos outils" },
    { label: "Déploiement sur serveur ou VM dédiée" },
    { label: "Sauvegardes & conformité RGPD" },
    { label: "Code source livré, 100 % à vous" },
  ]}
/>

<ProcessSection
  title="De votre besoin à l'outil en production"
  description="Une démarche itérative, avec des validations à chaque étape."
  layout="vertical"
  steps={[
    {
      icon: CalendarCheck,
      title: "Analyse & cadrage",
      description:
        "On modélise vos processus et on rédige le cahier des charges fonctionnel.",
    },
    {
      icon: PencilRuler,
      title: "Maquettes & architecture",
      description:
        "Validation des écrans clés et choix techniques avant le développement.",
    },
    {
      icon: Wrench,
      title: "Développement itératif",
      description:
        "Livraisons régulières avec preview pour valider l'avancement en continu.",
    },
    {
      icon: Rocket,
      title: "Déploiement & suivi",
      description:
        "Mise en production sur VM dédiée, formation et maintenance évolutive.",
    },
  ]}
/>

<CTABannerSection
  title="Donnons vie à votre outil métier"
  description="Recevez un devis gratuit et sans engagement sous 48h. Parlons de votre application."
  primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
/>

<FAQSection
  id="faq"
  title="Questions fréquentes"
  description="Les réponses aux questions les plus posées sur les applications web."
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
