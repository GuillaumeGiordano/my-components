<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { ChevronLeft, ChevronRight, X, ZoomIn } from '@lucide/svelte';

  let {
    badge,
    title,
    description,
    images,
    columns = 3,
    layout = 'grid',
  }: {
    badge?: string;
    title: string;
    description?: string;
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      category?: string;
    }>;
    columns?: 2 | 3 | 4;
    layout?: 'grid' | 'masonry' | 'featured';
  } = $props();

  const allCategories = $derived(
    [...new Set(images.map(img => img.category).filter((c): c is string => !!c))]
  );

  let activeCategory = $state<string | null>(null);

  const filteredImages = $derived(
    activeCategory ? images.filter(img => img.category === activeCategory) : images
  );

  let lightboxOpen = $state(false);
  let selectedIndex = $state(0);

  function openLightbox(index: number) {
    selectedIndex = index;
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOpen = false;
    document.body.style.overflow = '';
  }

  function prev() {
    selectedIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
  }

  function next() {
    selectedIndex = (selectedIndex + 1) % filteredImages.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  });

  const current = $derived(filteredImages[selectedIndex]);
  const showDots = $derived(filteredImages.length <= 10);
</script>

<section class="gallery">
  <div class="gallery-inner">

    <!-- Header -->
    <div class="section-header">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      <h2 class="section-title">{title}</h2>
      {#if description}
        <p class="section-description">{description}</p>
      {/if}
    </div>

    <!-- Category filters -->
    {#if allCategories.length > 0}
      <div class="filters">
        <button
          class="filter-btn"
          class:active={activeCategory === null}
          onclick={() => { activeCategory = null; }}
          type="button"
        >
          Tous
        </button>
        {#each allCategories as cat}
          <button
            class="filter-btn"
            class:active={activeCategory === cat}
            onclick={() => { activeCategory = cat; }}
            type="button"
          >
            {cat}
          </button>
        {/each}
      </div>
    {/if}

    <!-- Grid -->
    {#key activeCategory}
      <div class="gallery-grid layout-{layout} cols-{columns}">
        {#each filteredImages as image, i}
          <button
            class="gallery-item"
            style="animation-delay: {i * 0.06}s"
            onclick={() => openLightbox(i)}
            aria-label="Ouvrir {image.alt}"
            type="button"
          >
            <img src={image.src} alt={image.alt} class="gallery-img" loading="lazy" />
            <div class="gallery-overlay">
              <div class="zoom-icon" aria-hidden="true">
                <ZoomIn size={18} strokeWidth={2} />
              </div>
              {#if image.caption}
                <span class="gallery-caption">{image.caption}</span>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    {/key}

  </div>
</section>

<!-- Full-screen lightbox -->
{#if lightboxOpen}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    aria-label={current?.alt ?? 'Galerie'}
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop -->
    <div class="lightbox-backdrop" onclick={closeLightbox}></div>

    <!-- Close -->
    <button class="lightbox-close" onclick={closeLightbox} aria-label="Fermer la galerie">
      <X size={18} strokeWidth={2} />
    </button>

    <!-- Counter -->
    <div class="lightbox-counter" aria-live="polite">
      {selectedIndex + 1} / {filteredImages.length}
    </div>

    <!-- Image stage -->
    <div class="lightbox-stage" onclick={(e) => e.stopPropagation()}>
      {#key selectedIndex}
        <div class="lightbox-slide" in:fade={{ duration: 160 }}>
          {#if current}
            <img src={current.src} alt={current.alt} class="lightbox-img" />
            {#if current.caption}
              <p class="lightbox-caption">{current.caption}</p>
            {/if}
          {/if}
        </div>
      {/key}
    </div>

    <!-- Prev / Next -->
    <button
      class="lightbox-nav lightbox-prev"
      onclick={(e) => { e.stopPropagation(); prev(); }}
      aria-label="Image précédente"
    >
      <ChevronLeft size={22} strokeWidth={2} />
    </button>
    <button
      class="lightbox-nav lightbox-next"
      onclick={(e) => { e.stopPropagation(); next(); }}
      aria-label="Image suivante"
    >
      <ChevronRight size={22} strokeWidth={2} />
    </button>

    <!-- Dots or progress bar -->
    <div class="lightbox-footer" onclick={(e) => e.stopPropagation()}>
      {#if showDots}
        <div class="lightbox-dots">
          {#each filteredImages as _, i}
            <button
              class="dot"
              class:active={i === selectedIndex}
              onclick={() => { selectedIndex = i; }}
              aria-label="Image {i + 1}"
            ></button>
          {/each}
        </div>
      {:else}
        <div class="lightbox-progress">
          <div
            class="lightbox-progress-bar"
            style="width: {((selectedIndex + 1) / filteredImages.length) * 100}%"
          ></div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* ---- Section ---- */
  .gallery {
    padding: 88px 24px;
    background: var(--bg-base);
  }

  .gallery-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ---- Header ---- */
  .section-header {
    text-align: center;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .section-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--text-heading);
    margin: 0;
  }

  .section-description {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 520px;
    margin: 0;
  }

  /* ---- Filters ---- */
  .filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 40px;
  }

  .filter-btn {
    padding: 7px 18px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast),
      color var(--transition-fast);
  }

  .filter-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .filter-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary-fg);
  }

  /* ---- Grid ---- */
  .gallery-grid {
    display: grid;
    gap: 12px;
  }

  /* Grid layout — standard */
  .layout-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
  .layout-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
  .layout-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }

  /* Featured layout — first item takes 2×2 */
  .layout-featured.cols-2 { grid-template-columns: repeat(2, 1fr); }
  .layout-featured.cols-3 { grid-template-columns: repeat(3, 1fr); }
  .layout-featured.cols-4 { grid-template-columns: repeat(4, 1fr); }

  .layout-featured .gallery-item:first-child {
    grid-column: span 2;
    grid-row: span 2;
  }

  /* Masonry layout — CSS columns */
  .layout-masonry {
    display: block;
    column-gap: 12px;
  }

  .layout-masonry.cols-2 { columns: 2; }
  .layout-masonry.cols-3 { columns: 3; }
  .layout-masonry.cols-4 { columns: 4; }

  .layout-masonry .gallery-item {
    break-inside: avoid;
    margin-bottom: 12px;
    width: 100%;
    aspect-ratio: unset;
    display: block;
  }

  .layout-masonry .gallery-img {
    height: auto;
  }

  /* ---- Gallery item ---- */
  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-lg);
    border: none;
    padding: 0;
    cursor: pointer;
    aspect-ratio: 4 / 3;
    background: var(--bg-muted);
    animation: reveal 0.5s ease both;
    transition: box-shadow var(--transition-base), transform var(--transition-base);
    display: block;
  }

  .gallery-item:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  .gallery-item:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
  }

  .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .gallery-item:hover .gallery-img {
    transform: scale(1.07);
  }

  /* ---- Hover overlay ---- */
  .gallery-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 14px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  .gallery-item:hover .gallery-overlay {
    opacity: 1;
  }

  .zoom-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transform: scale(0.8) translateY(-4px);
    transition: transform var(--transition-base);
  }

  .gallery-item:hover .zoom-icon {
    transform: scale(1) translateY(0);
  }

  .gallery-caption {
    font-size: 13px;
    color: #fff;
    font-weight: 500;
    transform: translateY(6px);
    transition: transform var(--transition-base);
    line-height: 1.4;
  }

  .gallery-item:hover .gallery-caption {
    transform: translateY(0);
  }

  /* ---- Lightbox ---- */
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.93);
    backdrop-filter: blur(8px);
    cursor: zoom-out;
  }

  .lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background var(--transition-fast), border-color var(--transition-fast);
  }

  .lightbox-close:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .lightbox-counter {
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    z-index: 10;
    font-variant-numeric: tabular-nums;
  }

  /* ---- Stage ---- */
  .lightbox-stage {
    position: relative;
    z-index: 5;
    max-width: min(90vw, 1000px);
    max-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .lightbox-img {
    max-width: min(90vw, 1000px);
    max-height: 72vh;
    object-fit: contain;
    border-radius: var(--radius-lg);
    display: block;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  }

  .lightbox-caption {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
    text-align: center;
    margin: 0;
  }

  /* ---- Nav buttons ---- */
  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast),
      transform var(--transition-fast);
  }

  .lightbox-nav:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .lightbox-prev { left: 20px; }
  .lightbox-prev:hover { transform: translateY(-50%) translateX(-2px); }

  .lightbox-next { right: 20px; }
  .lightbox-next:hover { transform: translateY(-50%) translateX(2px); }

  /* ---- Footer (dots / progress) ---- */
  .lightbox-footer {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .lightbox-dots {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: var(--radius-full);
    border: none;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    padding: 0;
    transition: background var(--transition-fast), transform var(--transition-fast), width var(--transition-fast);
  }

  .dot.active {
    background: #fff;
    width: 20px;
  }

  .lightbox-progress {
    width: 160px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .lightbox-progress-bar {
    height: 100%;
    background: #fff;
    border-radius: var(--radius-full);
    transition: width var(--transition-base);
  }

  /* ---- Entry animation ---- */
  @keyframes reveal {
    from { opacity: 0; transform: scale(0.97) translateY(8px); }
    to   { opacity: 1; transform: none; }
  }

  /* ---- Responsive ---- */
  @media (max-width: 900px) {
    .layout-grid.cols-4,
    .layout-featured.cols-4,
    .layout-masonry.cols-4 { grid-template-columns: repeat(2, 1fr); columns: 2; }

    .layout-grid.cols-3,
    .layout-featured.cols-3,
    .layout-masonry.cols-3 { grid-template-columns: repeat(2, 1fr); columns: 2; }
  }

  @media (max-width: 540px) {
    .gallery { padding: 64px 20px; }

    .layout-grid.cols-2,
    .layout-grid.cols-3,
    .layout-grid.cols-4,
    .layout-featured.cols-2,
    .layout-featured.cols-3,
    .layout-featured.cols-4 {
      grid-template-columns: 1fr;
    }

    .layout-masonry.cols-2,
    .layout-masonry.cols-3,
    .layout-masonry.cols-4 { columns: 1; }

    .layout-featured .gallery-item:first-child {
      grid-column: span 1;
      grid-row: span 1;
    }

    .lightbox-prev { left: 8px; }
    .lightbox-next { right: 8px; }
  }
</style>
