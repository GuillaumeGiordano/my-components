<script lang="ts">
  import { onMount } from "svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Modal from "$lib/components/ui/Modal.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import { ChevronLeft, ChevronRight } from "@lucide/svelte";

  let {
    badge,
    title,
    description,
    images,
    columns = 3,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
  } = $props();

  // Track which image is open in the lightbox
  let selectedIndex: number = $state(0);

  const MODAL_ID = "gallery-lightbox";

  function openLightbox(index: number) {
    selectedIndex = index;
    const dialog = document.getElementById(MODAL_ID) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  function prev() {
    selectedIndex = (selectedIndex - 1 + images.length) % images.length;
  }

  function next() {
    selectedIndex = (selectedIndex + 1) % images.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    const dialog = document.getElementById(MODAL_ID) as HTMLDialogElement | null;
    if (!dialog?.open) return;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });

  const current = $derived(images[selectedIndex]);
</script>

<section class="gallery {withBackground}">
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

    <!-- Image grid -->
    <div class="gallery-grid cols-{columns}">
      {#each images as image, i}
        <button
          class="gallery-item"
          style="animation-delay: {i * 0.05}s"
          onclick={() => openLightbox(i)}
          aria-label="Ouvrir {image.alt}"
          type="button"
        >
          <img src={image.src} alt={image.alt} class="gallery-img" loading="lazy" />
          {#if image.caption}
            <div class="gallery-overlay">
              <span class="gallery-caption">{image.caption}</span>
            </div>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Lightbox modal — a single instance controlled by selectedIndex state -->
<Modal id={MODAL_ID} size="lg" overlayClose={true}>
  {#snippet children()}
    <div class="lightbox-body">
      {#if current}
        <img src={current.src} alt={current.alt} class="lightbox-img" />
        {#if current.caption}
          <p class="lightbox-caption">{current.caption}</p>
        {/if}
        <div class="lightbox-counter">
          {selectedIndex + 1} / {images.length}
        </div>
      {/if}
    </div>
  {/snippet}

  {#snippet footer(close)}
    <div class="lightbox-nav">
      <Button variant="secondary" size="sm" icon={ChevronLeft} onclick={prev}>
        Précédent
      </Button>
      <Button variant="ghost" size="sm" onclick={close}>Fermer</Button>
      <Button variant="secondary" size="sm" iconRight={ChevronRight} onclick={next}>
        Suivant
      </Button>
    </div>
  {/snippet}
</Modal>

<style>
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
    margin-bottom: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .section-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    letter-spacing: -0.02em;
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

  /* ---- Grid ---- */
  .gallery-grid {
    display: grid;
    gap: 12px;
  }

  .cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  /* ---- Gallery item (button) ---- */
  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-lg);
    border: none;
    padding: 0;
    cursor: pointer;
    aspect-ratio: 4 / 3;
    background: var(--bg-muted);
    animation: fade-in 0.5s ease both;
    transition: box-shadow var(--transition-base);
  }

  .gallery-item:hover {
    box-shadow: var(--shadow-lg);
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
    transition: transform var(--transition-base);
  }

  .gallery-item:hover .gallery-img {
    transform: scale(1.05);
  }

  /* ---- Overlay caption on hover ---- */
  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 60%);
    display: flex;
    align-items: flex-end;
    padding: 16px;
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  .gallery-item:hover .gallery-overlay {
    opacity: 1;
  }

  .gallery-caption {
    font-size: 13px;
    color: #fff;
    font-weight: 500;
    text-align: left;
  }

  /* ---- Lightbox ---- */
  .lightbox-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .lightbox-img {
    width: 100%;
    max-height: 60vh;
    object-fit: contain;
    border-radius: var(--radius-md);
    display: block;
  }

  .lightbox-caption {
    font-size: 14px;
    color: var(--text-muted);
    text-align: center;
    margin: 0;
  }

  .lightbox-counter {
    font-size: 13px;
    color: var(--text-subtle);
  }

  .lightbox-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    justify-content: space-between;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    .cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
    .cols-3 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 540px) {
    .gallery {
      padding: 64px 20px;
    }

    .cols-2,
    .cols-3,
    .cols-4 {
      grid-template-columns: 1fr;
    }
  }

  .bg-base {
    padding: 1rem 0;
    background: var(--bg-base);
  }
</style>
