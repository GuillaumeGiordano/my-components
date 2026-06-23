<script lang="ts">
  import type { Component } from "svelte";
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { ArrowRight } from "@lucide/svelte";

  const browser = typeof window !== "undefined";

  type Offer = {
    label: string;
    price: number;
    tagline: string;
    href: string;
    accent?: string;
    icon?: Component;
  };

  let {
    offers = [],
    prefix = "à partir de",
    suffix = "€",
    interval = 4000,
  }: {
    offers?: Offer[];
    prefix?: string;
    suffix?: string;
    /** Auto-rotation delay in ms. */
    interval?: number;
  } = $props();

  let index = $state(0);
  let paused = $state(false);

  const current = $derived(offers[index] ?? { label: "", price: 0, tagline: "", href: "#" });
  const CurrentIcon = $derived(offers[index]?.icon);
  const accent = $derived(current.accent ?? "var(--primary)");

  // Animated price (counts from 0 on load, then up/down to the current offer)
  const price = new Tween(0, { duration: 700, easing: cubicOut });
  $effect(() => {
    price.set(current.price);
  });
  const display = $derived(Math.round(price.current));

  // Auto-rotation (pauses on hover/focus)
  $effect(() => {
    if (!browser || offers.length < 2) return;
    const id = setInterval(() => {
      if (!paused) index = (index + 1) % offers.length;
    }, interval);
    return () => clearInterval(id);
  });

  function select(i: number) {
    index = i;
  }
</script>

<div
  class="offer"
  style="--accent:{accent}"
  role="group"
  aria-label="Nos offres"
  onmouseenter={() => (paused = true)}
  onmouseleave={() => (paused = false)}
  onfocusin={() => (paused = true)}
  onfocusout={() => (paused = false)}
>
  <div class="offer-glow" aria-hidden="true"></div>

  <div class="offer-card">
    <span class="offer-eyebrow">{prefix}</span>

    <div class="offer-price">
      <span class="offer-amount">{display}</span>
      <span class="offer-cur">{suffix}</span>
    </div>

    {#key index}
      <div class="offer-swap" in:fly={{ y: 16, duration: 350, easing: cubicOut }}>
        <div class="offer-label-row">
          {#if CurrentIcon}
            <span class="offer-icon"><CurrentIcon size={20} /></span>
          {/if}
          <h3 class="offer-label">{current.label}</h3>
        </div>
        <p class="offer-tagline">{current.tagline}</p>
      </div>
    {/key}

    <a class="offer-cta" href={current.href}>
      En savoir plus
      <ArrowRight size={16} />
    </a>

    {#if offers.length > 1}
      <div class="offer-dots">
        {#each offers as offer, i (offer.href)}
          <button
            class="offer-dot"
            class:active={i === index}
            onclick={() => select(i)}
            aria-label="Voir l'offre : {offer.label}"
            aria-current={i === index ? "true" : undefined}
          ></button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .offer {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /* Pulsing glow behind the card */
  .offer-glow {
    position: absolute;
    inset: 10% 15%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--accent) 45%, transparent),
      transparent 70%
    );
    filter: blur(40px);
    z-index: 0;
    animation: glow-pulse 4s ease-in-out infinite;
    transition: background var(--transition-base);
  }

  .offer-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 32px;
    border-radius: var(--radius-xl);
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-top: 3px solid var(--accent);
    box-shadow: var(--shadow-lg);
    animation: float 6s ease-in-out infinite;
  }

  .offer-eyebrow {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .offer-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
    color: var(--accent);
    line-height: 1;
  }

  .offer-amount {
    font-size: clamp(48px, 7vw, 64px);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .offer-cur {
    font-size: 28px;
    font-weight: 700;
  }

  .offer-swap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }

  .offer-label-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .offer-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--accent) 14%, transparent);
    color: var(--accent);
    flex-shrink: 0;
  }

  .offer-label {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .offer-tagline {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .offer-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    padding: 12px 22px;
    border-radius: var(--radius-md);
    background: var(--accent);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition:
      filter var(--transition-fast),
      transform var(--transition-fast);
  }

  .offer-cta:hover {
    filter: brightness(0.92);
    transform: translateX(2px);
  }

  .offer-dots {
    display: flex;
    gap: 8px;
    margin-top: 22px;
  }

  .offer-dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: var(--radius-full);
    background: var(--border-strong);
    cursor: pointer;
    transition:
      width var(--transition-fast),
      background var(--transition-fast);
  }

  .offer-dot.active {
    width: 22px;
    background: var(--accent);
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes glow-pulse {
    0%,
    100% {
      opacity: 0.55;
      transform: scale(1);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.08);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .offer-card {
      animation: none;
    }
    .offer-glow {
      animation: none;
    }
  }
</style>
