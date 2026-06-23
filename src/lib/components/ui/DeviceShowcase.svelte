<script lang="ts">
  import { untrack } from "svelte";
  import { ArrowRight } from "@lucide/svelte";
  import MorphText from "./MorphText.svelte";
  import ScrambleText from "./ScrambleText.svelte";
  import Tilt3D from "./Tilt3D.svelte";

  // `price` may be a string (e.g. "Sur devis") for offers without a fixed price.
  type Offer = { label: string; price: number | string; accent?: string };

  let {
    offers = [],
    prefix = "à partir de",
    suffix = "€",
    buttonLabel = "Voir toutes les offres",
    buttonHref,
    interval = 3200,
  }: {
    offers?: Offer[];
    prefix?: string;
    suffix?: string;
    buttonLabel?: string;
    /** Where the call-to-action button links to (the page grouping every offer). */
    buttonHref?: string;
    /** Delay between two offers in the automatic loop, in ms. */
    interval?: number;
  } = $props();

  const browser = typeof window !== "undefined";

  let index = $state(0);
  let paused = $state(false);
  const current = $derived(offers[index] ?? { label: "", price: 0 });
  const accent = $derived(current.accent ?? "var(--primary)");
  const labels = $derived(offers.map((o) => o.label));
  // Show "à partir de … €" only for numeric prices; a string price (e.g. "Sur devis")
  // is displayed on its own, without prefix or suffix.
  const numericPrice = $derived(typeof current.price === "number");

  // Automatically loop through the offers. Pauses on hover/focus and respects
  // the user's reduced-motion preference.
  $effect(() => {
    if (!browser || paused || offers.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      index = (index + 1) % offers.length;
    }, interval);
    return () => clearInterval(id);
  });

  // Re-scramble the price each time the offer changes.
  // `untrack` keeps this effect depending only on `index` — without it, calling
  // scramble() would subscribe to ScrambleText's internal `running` state and loop forever.
  let scrambler = $state<{ scramble: () => void } | undefined>();
  $effect(() => {
    index;
    untrack(() => scrambler?.scramble());
  });
</script>

<!-- Reusable skeleton UI rendered inside each device screen -->
{#snippet screen()}
  <div class="skel">
    <div class="skel-hero"></div>
    <div class="skel-line skel-w70"></div>
    <div class="skel-line skel-w40"></div>
    <div class="skel-row">
      <div class="skel-card"></div>
      <div class="skel-card"></div>
      <div class="skel-card"></div>
    </div>
  </div>
{/snippet}

<div
  class="ds"
  style="--accent:{accent}"
  onmouseenter={() => (paused = true)}
  onmouseleave={() => (paused = false)}
  onfocusin={() => (paused = true)}
  onfocusout={() => (paused = false)}
  role="group"
>
  <!-- Desktop monitor in the background -->
  <div class="ds-desktop" aria-hidden="true">
    <div class="ds-monitor">
      <div class="ds-screen">{@render screen()}</div>
    </div>
    <div class="ds-neck"></div>
    <div class="ds-base"></div>
  </div>

  <!-- Phone overlapping on the left -->
  <div class="ds-phone" aria-hidden="true">
    <div class="ds-notch"></div>
    <div class="ds-screen ds-screen--phone">{@render screen()}</div>
  </div>

  <!-- Title (top-right) — 3D tilt card -->
  <div class="ds-title">
    <Tilt3D maxTilt={12} scale={1.04} perspective={800}>
      <div class="ds-title-card">
        <span class="ds-name"><MorphText words={labels} {index} duration={500} /></span>
        <span class="ds-price">
          {#if numericPrice}{prefix} {/if}
          <strong
            ><ScrambleText
              bind:this={scrambler}
              text={`${current.price}`}
              autoplay={false}
              speed={35}
              stagger={45}
            />{#if numericPrice}{suffix}{/if}</strong
          >
        </span>
      </div>
    </Tilt3D>
  </div>

  <!-- Button (bottom-right) — opens the page grouping every offer -->
  {#if buttonHref && offers.length > 1}
    <a class="ds-btn" href={buttonHref}>
      {buttonLabel}
      <ArrowRight size={16} />
    </a>
  {/if}
</div>

<style>
  .ds {
    position: relative;
    width: 100%;
    max-width: 560px;
    margin: auto;
    aspect-ratio: 5 / 4;
    /* Let inner pieces respond to the component's own width, not the viewport */
    container-type: inline-size;
  }

  /* ── Desktop ── */
  .ds-desktop {
    position: absolute;
    top: 8%;
    left: 16%;
    width: 84%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ds-monitor {
    width: 100%;
    aspect-ratio: 16 / 10;
    padding: 3%;
    border-radius: 14px;
    background: #1f2330;
    box-shadow: var(--shadow-lg);
  }

  .ds-neck {
    width: 12%;
    height: 18px;
    background: linear-gradient(var(--border-strong), var(--border));
  }

  .ds-base {
    width: 30%;
    height: 8px;
    border-radius: 0 0 6px 6px;
    background: var(--border-strong);
  }

  /* ── Phone ── */
  .ds-phone {
    position: absolute;
    bottom: 2%;
    left: 0;
    width: 27%;
    aspect-ratio: 1 / 2;
    padding: 6px;
    border-radius: 26px;
    background: #1f2330;
    box-shadow: var(--shadow-lg);
    z-index: 2;
  }

  .ds-notch {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 34%;
    height: 7px;
    border-radius: var(--radius-full);
    background: #11141c;
    z-index: 1;
  }

  /* ── Screens ── */
  .ds-screen {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    overflow: hidden;
    background: var(--bg-base);
  }

  .ds-screen--phone {
    border-radius: 20px;
  }

  .skel {
    height: 100%;
    padding: 9%;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .skel-hero {
    height: 34%;
    border-radius: 6px;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 85%, transparent),
      color-mix(in srgb, var(--accent) 35%, transparent)
    );
  }

  .skel-line {
    height: 7px;
    border-radius: 4px;
    background: var(--bg-hover);
  }
  .skel-w70 {
    width: 70%;
  }
  .skel-w40 {
    width: 40%;
  }

  .skel-row {
    display: flex;
    gap: 6px;
    margin-top: auto;
  }

  .skel-card {
    flex: 1;
    height: 26px;
    border-radius: 5px;
    background: var(--bg-muted);
    border-top: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
  }

  /* ── Title (3D tilt card) ── */
  .ds-title {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    max-width: 64%;
  }

  /* Round the tilt layer so its glare matches the card */
  .ds-title :global(.t3d) {
    border-radius: var(--radius-xl);
  }

  .ds-title-card {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    gap: 4px;
    padding: 18px 22px;
    border-radius: var(--radius-xl);
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-top: 3px solid var(--accent);
    box-shadow: var(--shadow-lg);
    margin-right: 2rem;
  }

  .ds-name {
    font-size: clamp(18px, 2.6vw, 26px);
    font-weight: 800;
    color: var(--text-heading);
    line-height: 1.15;
  }

  .ds-price {
    font-size: 14px;
    color: var(--text-muted);
  }

  .ds-price strong {
    color: var(--accent);
    font-size: 18px;
  }

  /* ── Button ── */
  .ds-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    background: var(--bg-base);
    color: var(--text-base);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition:
      border-color var(--transition-fast),
      color var(--transition-fast),
      transform var(--transition-fast);
  }

  .ds-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-1px);
  }

  .ds-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* ── Narrow container (e.g. mobile hero) ── */
  @container (max-width: 440px) {
    .ds-title {
      max-width: 72%;
    }
    .ds-title-card {
      padding: 10px 12px;
      margin-right: 0;
      gap: 2px;
    }
    .ds-name {
      font-size: 15px;
    }
    .ds-price {
      font-size: 11px;
    }
    .ds-price strong {
      font-size: 13px;
    }
    .ds-btn {
      padding: 7px 12px;
      font-size: 12px;
      gap: 5px;
    }
  }
</style>
