<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/buttons/Button.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { Home, Monitor, Image, ShoppingCart, AppWindow } from "@lucide/svelte";

  let { children } = $props();

  const links = [
    { icon: Home, label: "Accueil", href: "/g2webdev" },
    { icon: Monitor, label: "Site vitrine", href: "/g2webdev/offres/site-vitrine" },
    { icon: Image, label: "Portfolio", href: "/g2webdev/offres/portfolio" },
    { icon: ShoppingCart, label: "E-commerce", href: "/g2webdev/offres/e-commerce" },
    { icon: AppWindow, label: "Application web", href: "/g2webdev/offres/application-web" },
  ];

  // Highlight the current offer in the navbar
  const items = $derived(links.map((l) => ({ ...l, active: page.url.pathname === l.href })));
</script>

<Navbar {items}>
  {#snippet brand()}
    <LogoGG width={36} height={36} open={false} />
  {/snippet}
  {#snippet actionBtn()}
    <Button size="sm" variant="primary" href="/g2webdev#contact">Demander un devis</Button>
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
