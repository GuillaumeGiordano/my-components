<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import StandardLayout from "$lib/components/layout/StandardLayout.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { LayoutDashboard, FolderOpen, Users } from "@lucide/svelte";
  import "$lib/styles/demo-page.css";

  const navLinks = [
    { label: "Accueil", href: "#" },
    { label: "Produits", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const sidebarGroups = [
    {
      label: "Navigation",
      items: [
        { label: "Tableau de bord", href: "#", icon: LayoutDashboard },
        { label: "Projets", href: "#", icon: FolderOpen },
        { label: "Équipe", href: "#", icon: Users },
      ],
    },
  ];

  const footerColumns = [
    {
      heading: "Liens",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
  ];
</script>

<svelte:head>
  <title>Standard Layout — Layout — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Standard Layout</h1>
    <p>Combinaison Navbar + Sidebar + Main + Footer via snippets Svelte 5.</p>
  </div>

  <section class="variant">
    <h2>Complet (navbar + sidebar + footer)</h2>
    <ComponentPreview>
      <StandardLayout>
        {#snippet header()}
          <Navbar links={navLinks} ctaLabel="Action" ctaHref="#">
            {#snippet brand()}
              <span class="text-lg font-bold">Acme</span>
            {/snippet}
          </Navbar>
        {/snippet}
        {#snippet sidebar()}
          <Sidebar groups={sidebarGroups} />
        {/snippet}
        {#snippet main()}
          <div class="demo-content">
            <h3>Contenu principal</h3>
            <p>Sidebar à gauche, navbar en haut, footer en bas.</p>
          </div>
        {/snippet}
        {#snippet footer()}
          <Footer brand="Acme" columns={footerColumns} copyright="© 2026 Acme" />
        {/snippet}
      </StandardLayout>
    </ComponentPreview>
  </section>

  <section class="variant">
    <h2>Sans sidebar</h2>
    <ComponentPreview>
      <StandardLayout hasSidebar={false}>
        {#snippet header()}
          <Navbar links={navLinks}>
            {#snippet brand()}
              <span class="text-lg font-bold">Acme</span>
            {/snippet}
          </Navbar>
        {/snippet}
        {#snippet main()}
          <div class="demo-content">
            <h3>Contenu pleine largeur</h3>
            <p>Layout sans sidebar — idéal pour les pages de contenu.</p>
          </div>
        {/snippet}
        {#snippet footer()}
          <Footer brand="Acme" copyright="© 2026 Acme" />
        {/snippet}
      </StandardLayout>
    </ComponentPreview>
  </section>

  <div class="props-table">
    <h2>Snippets</h2>
    <table>
      <thead>
        <tr><th>Snippet</th><th>Requis</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>header</td><td>Non</td><td>Zone d'en-tête (ex. Navbar)</td></tr>
        <tr><td>sidebar</td><td>Non</td><td>Colonne latérale (ex. Sidebar)</td></tr>
        <tr><td>main</td><td>Oui</td><td>Zone de contenu principal</td></tr>
        <tr><td>footer</td><td>Non</td><td>Zone de pied de page (ex. Footer)</td></tr>
      </tbody>
    </table>

    <h2>Props</h2>
    <table>
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr
          ><td>hasSidebar</td><td>boolean</td><td>true</td><td
            >Active/désactive la zone sidebar</td
          ></tr
        >
      </tbody>
    </table>
  </div>
</div>

<style>
  .demo-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 0;
  }

  .demo-content h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-base);
  }

  .demo-content p {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }
</style>
