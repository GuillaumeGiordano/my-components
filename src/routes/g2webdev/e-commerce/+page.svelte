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
    CreditCard,
    Package,
    ShoppingCart,
    Truck,
    BarChart3,
    ShieldCheck,
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
      question: "Quels moyens de paiement sont supportés ?",
      answer:
        "Cartes bancaires, Apple Pay, Google Pay et virements via des prestataires sécurisés comme Stripe. Le paiement est chiffré et conforme aux normes PCI-DSS.",
    },
    {
      question: "Pourrai-je gérer mes produits et mes stocks ?",
      answer:
        "Oui. Vous disposez d'un tableau de bord pour ajouter des produits, gérer les stocks, les prix, les promotions et suivre les commandes en temps réel.",
    },
    {
      question: "La boutique gère-t-elle la TVA et la livraison ?",
      answer:
        "Oui. Calcul de la TVA, frais de port par zone ou par poids, et intégration avec les transporteurs peuvent être configurés selon votre activité.",
    },
    {
      question: "Quel est le délai pour une boutique en ligne ?",
      answer:
        "Comptez 4 à 8 semaines selon le nombre de produits et les fonctionnalités. Un calendrier précis est défini lors de l'atelier de cadrage.",
    },
  ];
</script>

<svelte:head>
  <title>Création de boutique e-commerce — G2 Webdev</title>
  <meta
    name="description"
    content="Une boutique en ligne sécurisée et performante pour vendre vos produits partout, 24h/24 : paiement, gestion des stocks et tableau de bord."
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
    title="Vendez en ligne, partout et 24h/24"
    highlight="en ligne"
    description="Une boutique sécurisée et performante pour vendre vos produits sans limite d'horaire. Paiement chiffré, gestion des stocks et tableau de bord clair : vous gardez la main sur votre activité."
    primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
    secondaryCta={{ label: "Retour à l'accueil", href: "/g2webdev" }}
    align="center"
  />
</ParticleBackground>

<FeaturesSection
  id="atouts"
  title="Tout pour vendre sereinement"
  description="Une boutique pensée pour la conversion, la sécurité et la simplicité de gestion."
  columns={3}
  features={[
    {
      icon: CreditCard,
      title: "Paiement sécurisé",
      description:
        "Cartes, Apple Pay, Google Pay via Stripe. Transactions chiffrées et conformes PCI-DSS.",
    },
    {
      icon: Package,
      title: "Gestion des produits",
      description:
        "Ajoutez produits, variantes, prix et promotions depuis un tableau de bord intuitif.",
    },
    {
      icon: ShoppingCart,
      title: "Panier & checkout",
      description:
        "Un tunnel d'achat fluide et optimisé pour réduire les abandons de panier.",
    },
    {
      icon: Truck,
      title: "Livraison & TVA",
      description:
        "Frais de port par zone, calcul de la TVA et intégration des transporteurs.",
    },
    {
      icon: BarChart3,
      title: "Suivi des ventes",
      description:
        "Commandes, chiffre d'affaires et stocks suivis en temps réel dans votre dashboard.",
    },
    {
      icon: ShieldCheck,
      title: "Sécurité & RGPD",
      description:
        "HTTPS, sauvegardes et conformité RGPD pour protéger vos clients et vos données.",
    },
  ]}
/>

<ChecklistSection
  id="inclus"
  title="Ce qui est inclus"
  description="Une boutique complète, prête à vendre dès la mise en ligne."
  withBackground="bg-base"
  columns={2}
  items={[
    { label: "Catalogue produits & catégories" },
    { label: "Paiement en ligne sécurisé (Stripe)" },
    { label: "Panier & tunnel de commande optimisé" },
    { label: "Tableau de bord de gestion" },
    { label: "Gestion des stocks et des promotions" },
    { label: "Frais de livraison & TVA configurables" },
    { label: "Référencement & version mobile soignée" },
    { label: "Formation à la gestion de la boutique" },
  ]}
/>

<ProcessSection
  title="De l'idée à la première vente"
  description="Un accompagnement structuré pour lancer votre boutique en confiance."
  layout="vertical"
  steps={[
    {
      icon: CalendarCheck,
      title: "Cadrage du projet",
      description:
        "Catalogue, modes de paiement, livraison : on définit ensemble le périmètre de la boutique.",
    },
    {
      icon: PencilRuler,
      title: "Design & maquettes",
      description:
        "Validation de l'expérience d'achat et de l'identité visuelle avant développement.",
    },
    {
      icon: ShoppingCart,
      title: "Développement & paiement",
      description:
        "Intégration du catalogue, du panier et des paiements sécurisés, testés de bout en bout.",
    },
    {
      icon: Rocket,
      title: "Mise en ligne & formation",
      description:
        "Mise en production, configuration et formation pour gérer vos ventes en autonomie.",
    },
  ]}
/>

<CTABannerSection
  title="Lancez votre boutique en ligne"
  description="Recevez un devis gratuit et sans engagement sous 48h. Parlons de votre projet e-commerce."
  primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
/>

<FAQSection
  id="faq"
  title="Questions fréquentes"
  description="Les réponses aux questions les plus posées sur l'e-commerce."
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
