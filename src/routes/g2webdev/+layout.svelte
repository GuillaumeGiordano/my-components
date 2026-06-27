<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import Chatbot from "$lib/components/ui/Chatbot.svelte";
  import ScrollProgressBar from "$lib/components/ui/ScrollProgressBar.svelte";
  import ScrollToTop from "$lib/components/ui/ScrollToTop.svelte";
  import SectionNavDock from "$lib/components/ui/SectionNavDock.svelte";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
  import {
    AppWindow,
    CalendarCheck,
    HelpCircle,
    Home,
    Image,
    Mail,
    Monitor,
    ShoppingCart,
    Sparkles,
  } from "@lucide/svelte";
  import knowledge from "./knowledge.json";
  import ThemeToggle from "$lib/components/ui/ThemeToggle.svelte";

  let { children } = $props();

  const items = [
    { icon: Home, label: "Accueil", href: "#hero" },
    { icon: CalendarCheck, label: "Méthode", href: "#process" },
    { icon: Sparkles, label: "Services", href: "#features" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  const dockPages = {
    "/g2webdev": items,
    "/g2webdev/offres": [
      { icon: Monitor, label: "Site vitrine", href: "#site-vitrine" },
      { icon: Image, label: "Portfolio", href: "#portfolio" },
      { icon: ShoppingCart, label: "E-commerce", href: "#e-commerce" },
      { icon: AppWindow, label: "Application web", href: "#application-web" },
    ],
  };

  const navItems = [
    {
      link: "/g2webdev/offres",
      section: [
        { icon: Monitor, label: "Site vitrine", href: "#site-vitrine" },
        { icon: Image, label: "Portfolio", href: "#portfolio" },
        { icon: ShoppingCart, label: "E-commerce", href: "#e-commerce" },
        { icon: AppWindow, label: "Application web", href: "#application-web" },
      ],
    },
    {
      link: "/g2webdev/offres",
      section: [
        { icon: Monitor, label: "Site vitrine", href: "#site-vitrine" },
        { icon: Image, label: "Portfolio", href: "#portfolio" },
        { icon: ShoppingCart, label: "E-commerce", href: "#e-commerce" },
        { icon: AppWindow, label: "Application web", href: "#application-web" },
      ],
    },
  ];

  let open = $state(false);

  let railSide = $state<"left" | "right">("right");
</script>

<ScrollProgressBar />

<Navbar burger={false} position="top" {items}>
  {#snippet brand()}
    <LogoGG width={36} height={36} open={false} />
  {/snippet}
  {#snippet actionBtn()}
    <ThemeToggle />

    <Button size="sm" variant="primary" href="/g2webdev#contact">
      Prendre rendez-vous
    </Button>
  {/snippet}
</Navbar>

<main class="content">
  {@render children()}
</main>

<Footer
  tagline="Agence web dans le Var, création de sites sur mesure."
  columns={[
    {
      heading: "Offres",
      links: [
        { label: "Site vitrine", href: "/g2webdev/offres/site-vitrine" },
        { label: "Portfolio", href: "/g2webdev/offres/portfolio" },
        { label: "E-commerce", href: "/g2webdev/offres/e-commerce" },
        { label: "Application web", href: "/g2webdev/offres/application-web" },
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

<FloatingGroup position={railSide === "left" ? "left" : "right"}>
  <SectionNavDock
    bind:side={railSide}
    pages={dockPages}
    home={{ icon: Home, label: "Accueil", href: "/g2webdev" }}
    mode="auto"
  />
</FloatingGroup>

<FloatingGroup position="bottom-right">
  <Chatbot
    {open}
    {knowledge}
    title="G2webdev — Assistant"
    initialMessage="Bonjour ! Je peux vous renseigner sur G2webdev et les composants de la bibliothèque. Comment puis-je vous aider ?"
  />
  <ScrollToTop />
</FloatingGroup>

<style>
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: clip;
    margin: 0 auto;
  }
</style>
