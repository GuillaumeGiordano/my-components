<script lang="ts">
  import '$lib/styles/demo-page.css';
  import DragSort from '$lib/components/ui/DragSort.svelte';
  import { GripVertical } from '@lucide/svelte';

  type Task = { id: number; label: string; priority: 'haute' | 'moyenne' | 'basse' };

  let tasks = $state<Task[]>([
    { id: 1, label: 'Revoir la maquette homepage',    priority: 'haute'   },
    { id: 2, label: 'Implémenter le composant Modal', priority: 'haute'   },
    { id: 3, label: 'Écrire la doc des composants',   priority: 'moyenne' },
    { id: 4, label: 'Optimiser les images',           priority: 'moyenne' },
    { id: 5, label: 'Mettre à jour les dépendances',  priority: 'basse'   },
    { id: 6, label: 'Faire la revue de code',         priority: 'basse'   },
  ]);

  type Step = { id: number; label: string; done: boolean };

  let steps = $state<Step[]>([
    { id: 1, label: 'Créer le composant',     done: true  },
    { id: 2, label: 'Ajouter les tests',      done: false },
    { id: 3, label: 'Écrire la documentation',done: false },
    { id: 4, label: 'Publier la version',     done: false },
  ]);

  const PRIORITY_COLOR: Record<string, string> = {
    haute:   '#ef4444',
    moyenne: '#f59e0b',
    basse:   '#22c55e',
  };
</script>

<svelte:head><title>Drag Sort — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Drag Sort</h1>
    <p>Liste réordonnée par glisser-déposer — HTML5 Drag & Drop natif, sans dépendance. Composant générique <code>&lt;T&gt;</code>.</p>
  </div>

  <div class="grid-2">
    <section class="variant">
      <h2>Liste de tâches</h2>
      <p class="hint">Glisse les items pour les réordonner par priorité.</p>
      <DragSort bind:items={tasks}>
        {#snippet renderItem(task: Task)}
          <div class="task-item">
            <span
              class="task-priority"
              style="background:{PRIORITY_COLOR[task.priority]}20;color:{PRIORITY_COLOR[task.priority]}"
            >{task.priority}</span>
            <span class="task-label">{task.label}</span>
          </div>
        {/snippet}
      </DragSort>
    </section>

    <section class="variant">
      <h2>Étapes d'un workflow</h2>
      <p class="hint">Réordonne les étapes selon tes besoins.</p>
      <DragSort bind:items={steps}>
        {#snippet renderItem(step: Step, i: number)}
          <div class="step-item">
            <span class="step-num" class:step-num--done={step.done}>{i + 1}</span>
            <span class="step-label" class:step-label--done={step.done}>{step.label}</span>
            {#if step.done}
              <span class="step-badge">✓</span>
            {/if}
          </div>
        {/snippet}
      </DragSort>
    </section>
  </div>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['items',      'T[] (bindable)', '[]', 'Tableau d\'items — mis à jour après chaque drop'],
        ['renderItem', 'Snippet<[T, number]>', '—', 'Snippet pour le rendu de chaque item (item, index)'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>Utilise le Drag & Drop HTML5 natif — pas de lib tierce.</li>
      <li>Composant générique Svelte 5 (<code>generics="T"</code>) — les types sont inférés depuis <code>items</code>.</li>
      <li>L'item survol est mis en évidence avec une bordure primaire.</li>
    </ul>
  </section>
</div>

<style>
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }

  .hint { font-size: 13px; color: var(--text-muted); margin-bottom: 12px; }

  .task-item { display: flex; align-items: center; gap: 10px; flex: 1; }
  .task-priority {
    font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
    padding: 2px 7px; border-radius: var(--radius-full); white-space: nowrap;
  }
  .task-label { font-size: 13px; color: var(--text-base); }

  .step-item { display: flex; align-items: center; gap: 10px; flex: 1; }
  .step-num {
    width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--text-muted); flex-shrink: 0;
  }
  .step-num--done { border-color: var(--primary); color: var(--primary); }
  .step-label { font-size: 13px; color: var(--text-base); flex: 1; }
  .step-label--done { text-decoration: line-through; color: var(--text-subtle); }
  .step-badge { font-size: 12px; color: var(--primary); font-weight: 700; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 110px 190px 60px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }

  .notes { display: flex; flex-direction: column; gap: 8px; padding-left: 20px; font-size: 14px; color: var(--text-muted); line-height: 1.6; }
</style>
