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
  import ComponentPreview from "$lib/ComponentPreview.svelte";

  let { children } = $props();

  // Navbar items — anchors match each section's `id`; scroll spy is handled by <Navbar spy>
  const items = [
    { icon: Home, label: "Accueil", href: "#hero" },
    { icon: CalendarCheck, label: "Méthode", href: "#process" },
    { icon: Sparkles, label: "Services", href: "#features" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  // Section nav dock — items resolved per route. Home reuses navItems; the offres
  // page lists its ServiceDetailSection anchors.
  const dockPages = {
    "/g2webdev": items,
    "/g2webdev/offres": [
      { icon: Monitor, label: "Site vitrine", href: "#site-vitrine" },
      { icon: Image, label: "Portfolio", href: "#portfolio" },
      { icon: ShoppingCart, label: "E-commerce", href: "#e-commerce" },
      { icon: AppWindow, label: "Application web", href: "#application-web" },
    ],
  };

  let open = $state(false);

  // User preference: which edge the section nav rail sits on (right/left-handed)
  let railSide = $state<"left" | "right">("right");
</script>

<ComponentPreview>
  <ScrollProgressBar />

  <Navbar {items}>
    {#snippet brand()}
      <LogoGG width={36} height={36} open={false} />
    {/snippet}
    {#snippet actionBtn()}
      <Button size="sm" variant="primary" href="/g2webdev#contact"
        >Demander un devis</Button
      >
    {/snippet}
  </Navbar>

  {@render children()}

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
</ComponentPreview>
