<script lang="ts">
  import '$lib/styles/demo-page.css';
  import CommandPalette from '$lib/components/ui/CommandPalette.svelte';
  import type { CommandItem } from '$lib/components/ui/CommandPalette.svelte';
  import { goto } from '$app/navigation';

  const items: CommandItem[] = [
    { id: 'home',       label: 'Aller à l\'accueil',        icon: '🏠', group: 'Navigation',  action: () => goto('/') },
    { id: 'ui',         label: 'Composants UI',              icon: '🎨', group: 'Navigation',  shortcut: 'G U', action: () => goto('/ui') },
    { id: 'forms',      label: 'Composants formulaires',     icon: '📝', group: 'Navigation',  shortcut: 'G F', action: () => goto('/forms') },
    { id: 'dark',       label: 'Activer le mode sombre',     icon: '🌙', group: 'Apparence',   action: () => document.documentElement.classList.toggle('dark') },
    { id: 'light',      label: 'Activer le mode clair',      icon: '☀️', group: 'Apparence',   action: () => document.documentElement.classList.remove('dark') },
    { id: 'fire',       label: 'Fire Background',            icon: '🔥', group: 'Backgrounds', action: () => goto('/ui/fire-background') },
    { id: 'ocean',      label: 'Ocean Background',           icon: '🌊', group: 'Backgrounds', action: () => goto('/ui/ocean-background') },
    { id: 'matrix',     label: 'Matrix Background',          icon: '💻', group: 'Backgrounds', action: () => goto('/ui/matrix-background') },
    { id: 'neon',       label: 'NeonGrid Background',        icon: '🕹', group: 'Backgrounds', action: () => goto('/ui/neon-grid-background') },
    { id: 'confetti',   label: 'Confetti Button',            icon: '🎉', group: 'Interactions',action: () => goto('/ui/confetti-button') },
    { id: 'scratch',    label: 'Scratch Card',               icon: '🎰', group: 'Interactions',action: () => goto('/ui/scratch-card') },
    { id: 'glitch',     label: 'Glitch Text',                icon: '⚡', group: 'Texte',       action: () => goto('/ui/glitch-text') },
  ];

  let open = $state(false);
</script>
<svelte:head><title>Command Palette</title></svelte:head>

<CommandPalette {items} />

<div class="page">
  <div class="page-header"><h1>Command Palette</h1><p>Palette de commandes façon <kbd>⌘K</kbd> — recherche fuzzy, navigation clavier, groupes, raccourcis.</p></div>
  <section class="variant">
    <h2>Démo interactive</h2>
    <div class="trigger-zone">
      <p>Appuie sur <kbd>⌘K</kbd> ou <kbd>Ctrl+K</kbd> pour ouvrir la palette.</p>
      <button class="trigger-btn" onclick={() => { const e = new KeyboardEvent('keydown',{key:'k',ctrlKey:true,bubbles:true}); window.dispatchEvent(e); }}>
        Ouvrir la palette <kbd>Ctrl+K</kbd>
      </button>
    </div>
    <ul class="notes" style="margin-top:16px">
      <li><kbd>↑↓</kbd> pour naviguer dans les résultats</li>
      <li><kbd>↵</kbd> pour exécuter l'action sélectionnée</li>
      <li><kbd>Esc</kbd> pour fermer</li>
      <li>Tape un mot pour filtrer instantanément</li>
    </ul>
  </section>
</div>
<style>
  .trigger-zone { display:flex;flex-direction:column;align-items:center;gap:16px;padding:40px 32px;background:var(--bg-subtle);border-radius:var(--radius-lg);text-align:center; }
  .trigger-zone p { margin:0;font-size:14px;color:var(--text-muted); }
  .trigger-btn { display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:var(--radius-md);border:1px solid var(--border);background:var(--bg-base);color:var(--text-base);font-size:14px;font-weight:600;cursor:pointer;transition:background 150ms ease; }
  .trigger-btn:hover { background:var(--bg-hover); }
  kbd { padding:2px 6px;border-radius:4px;border:1px solid var(--border);background:var(--bg-subtle);font-size:11px;color:var(--text-muted);font-family:var(--font-mono); }
  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
