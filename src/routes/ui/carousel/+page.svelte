<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Carousel from '$lib/components/ui/Carousel.svelte';

  const colorSlides = [
    { bg: 'linear-gradient(135deg, #2563eb, #7c3aed)', label: 'Slide 1 — Bleu → Violet' },
    { bg: 'linear-gradient(135deg, #059669, #0891b2)', label: 'Slide 2 — Vert → Cyan' },
    { bg: 'linear-gradient(135deg, #d97706, #dc2626)', label: 'Slide 3 — Ambre → Rouge' },
    { bg: 'linear-gradient(135deg, #db2777, #9333ea)', label: 'Slide 4 — Rose → Violet' },
  ];

  const cardSlides = [
    { title: 'SvelteKit', desc: 'Framework full-stack basé sur Svelte — routing, SSR, endpoints.', icon: '⚡' },
    { title: 'Tailwind CSS 4', desc: 'Utility-first CSS avec variables CSS natives et Vite plugin.', icon: '🎨' },
    { title: 'TypeScript', desc: 'Typage statique pour un code plus robuste et maintenable.', icon: '🔷' },
    { title: 'Lucide Icons', desc: 'Bibliothèque d\'icônes SVG cohérentes et légères.', icon: '✦' },
  ];
</script>

<svelte:head>
  <title>Carousel — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Carousel</h1>
    <p>
      Carrousel de diapositives avec flèches, points de navigation, autoplay, swipe tactile
      et navigation au clavier (← →).
    </p>
  </div>

  <section class="variant">
    <h2>Basique</h2>
    <div class="carousel-wrap">
      <Carousel items={colorSlides}>
        {#snippet item(slide)}
          {@const s = slide as typeof colorSlides[0]}
          <div class="color-slide" style="background: {s.bg}">
            <span>{s.label}</span>
          </div>
        {/snippet}
      </Carousel>
    </div>
  </section>

  <section class="variant">
    <h2>Autoplay (3s) — pause au survol</h2>
    <div class="carousel-wrap">
      <Carousel items={colorSlides} autoplay interval={3000}>
        {#snippet item(slide)}
          {@const s = slide as typeof colorSlides[0]}
          <div class="color-slide" style="background: {s.bg}">
            <span>{s.label}</span>
          </div>
        {/snippet}
      </Carousel>
    </div>
  </section>

  <section class="variant">
    <h2>Cartes — sans loop</h2>
    <div class="carousel-wrap">
      <Carousel items={cardSlides} loop={false}>
        {#snippet item(slide)}
          {@const s = slide as typeof cardSlides[0]}
          <div class="card-slide">
            <div class="card-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        {/snippet}
      </Carousel>
    </div>
  </section>

  <section class="variant">
    <h2>Sans flèches ni points</h2>
    <div class="carousel-wrap">
      <Carousel items={colorSlides} showArrows={false} showDots={false} autoplay interval={2000}>
        {#snippet item(slide)}
          {@const s = slide as typeof colorSlides[0]}
          <div class="color-slide" style="background: {s.bg}">
            <span>{s.label}</span>
          </div>
        {/snippet}
      </Carousel>
    </div>
  </section>
</div>

<style>
  .carousel-wrap {
    max-width: 600px;
  }

  .color-slide {
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
  }

  .color-slide span {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .card-slide {
    padding: 40px 32px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
  }

  .card-icon {
    font-size: 36px;
    line-height: 1;
  }

  .card-slide h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .card-slide p {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
    max-width: 340px;
  }
</style>
