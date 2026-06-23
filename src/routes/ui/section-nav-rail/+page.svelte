<script lang="ts">
  import "$lib/styles/demo-page.css";
  import SectionNavRail from "$lib/components/ui/SectionNavRail.svelte";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
  import { Home, User, FolderGit2, Mail } from "@lucide/svelte";

  const sections = [
    { label: "Home", href: "#nr-home", icon: Home },
    { label: "Moi", href: "#nr-about", icon: User },
    { label: "Projets", href: "#nr-projects", icon: FolderGit2 },
    { label: "Contact", href: "#nr-contact", icon: Mail },
  ];

  const demoParts = [
    { id: "nr-home", h: "Home", t: "Survolez le rail à gauche : les libellés glissent et apparaissent." },
    { id: "nr-about", h: "Moi", t: "L'élément actif suit la section visible au scroll." },
    { id: "nr-projects", h: "Projets", t: "Cliquez sur une icône pour défiler jusqu'à la section." },
    { id: "nr-contact", h: "Contact", t: "Le rail reste fixe, centré verticalement." },
  ];
</script>

<svelte:head>
  <title>Section Nav Rail — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Section Nav Rail</h1>
    <p>
      Rail de navigation vertical fixé à gauche. Au repos, seules les <strong>icônes</strong>
      sont visibles ; au survol, les <strong>libellés</strong> glissent et apparaissent.
      Un clic défile jusqu'à la section et l'élément actif suit le scroll.
    </p>
  </div>

  {#each demoParts as { id, h, t }}
    <section class="variant demo-section" {id}>
      <h2>{h}</h2>
      <p class="filler">{t}</p>
    </section>
  {/each}
</div>

<FloatingGroup position="left">
  <SectionNavRail {sections} />
</FloatingGroup>

<style>
  .demo-section {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .filler {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }
</style>
