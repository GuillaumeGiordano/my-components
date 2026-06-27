<script lang="ts">
  import '$lib/styles/demo-page.css';
  import StickyStory from '$lib/components/ui/StickyStory.svelte';
  import type { StorySlide } from '$lib/components/ui/StickyStory.svelte';

  const slides: StorySlide[] = [
    {
      step:   '01 — Réactivité',
      title:  'Svelte 5 Runes',
      body:   '$state, $derived, $effect — une réactivité explicite, compacte et sans magie. Fini les stores implicites.',
      visual: '⚡',
      color:  '#6366f1',
    },
    {
      step:   '02 — Styling',
      title:  'Design Tokens CSS',
      body:   'Variables CSS cohérentes pour couleurs, espacements, ombres et transitions. Dark mode via .dark, 8 thèmes via .theme-{color}.',
      visual: '🎨',
      color:  '#ec4899',
    },
    {
      step:   '03 — Accessibilité',
      title:  'ARIA natif',
      body:   'Rôles, labels, focus trap, navigation clavier — chaque composant respecte les standards WCAG 2.1 AA.',
      visual: '♿',
      color:  '#22c55e',
    },
    {
      step:   '04 — Performance',
      title:  'Zéro dépendance JS',
      body:   'Icônes Lucide uniquement. Canvas natif pour les animations. CSS pur pour les effets statiques. Bundle minimal.',
      visual: '🚀',
      color:  '#f59e0b',
    },
    {
      step:   '05 — Distribution',
      title:  'GitHub install',
      body:   'npm install github:GuillaumeGiordano/my-components — installe depuis Git, pas de registre npm. Toujours à jour.',
      visual: '📦',
      color:  '#8b5cf6',
    },
  ];
</script>

<svelte:head><title>Sticky Story — UI</title></svelte:head>

<!-- Intro — avant la section sticky -->
<div class="intro">
  <h1>Sticky Story</h1>
  <p>La section ci-dessous se colle au viewport pendant que tu scrolles — chaque scroll avance d'une slide.</p>
  <div class="scroll-cue">↓ commence à scroller</div>
</div>

<StickyStory {slides} />

<!-- Outro — après la section sticky -->
<div class="outro">
  <h2>Tu es arrivé à la fin 🎉</h2>
  <p>5 slides traversées. La section sticky libère le scroll une fois la dernière slide passée.</p>
</div>

<style>
  .intro {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px 24px;
    gap: 16px;
    background: var(--bg-subtle);
  }
  .intro h1 { margin: 0; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: var(--text-heading); }
  .intro p  { margin: 0; font-size: 16px; color: var(--text-muted); max-width: 480px; line-height: 1.6; }

  .scroll-cue {
    margin-top: 24px;
    font-size: 13px;
    color: var(--text-subtle);
    letter-spacing: 0.08em;
    animation: bob 1.5s ease-in-out infinite;
  }

  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(8px); }
  }

  .outro {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px 24px;
    gap: 16px;
  }
  .outro h2 { margin: 0; font-size: 2rem; font-weight: 800; color: var(--text-heading); }
  .outro p  { margin: 0; font-size: 15px; color: var(--text-muted); max-width: 500px; line-height: 1.6; }
</style>
