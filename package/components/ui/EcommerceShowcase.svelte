<script lang="ts">
  import { ShoppingCart, Plus } from "@lucide/svelte";

  // Pure-CSS illustration of an e-commerce website: a browser window with a grid
  // of product cards (price in €), and a floating cart badge. Decorative only.
  let { accent = "#22c55e" }: { accent?: string } = $props();

  const products = [
    { price: "29 €" },
    { price: "49 €" },
    { price: "19 €" },
    { price: "89 €" },
  ];
</script>

<div class="ec" style="--accent:{accent}" role="img" aria-label="Aperçu d'un site e-commerce">
  <div class="ec-glow" aria-hidden="true"></div>

  <!-- Browser window -->
  <div class="win" aria-hidden="true">
    <div class="win-bar">
      <span class="win-dot"></span>
      <span class="win-dot"></span>
      <span class="win-dot"></span>
      <span class="win-url"></span>
    </div>
    <div class="win-body">
      <div class="grid">
        {#each products as product (product.price)}
          <div class="product">
            <div class="product-img"></div>
            <div class="product-line"></div>
            <div class="product-foot">
              <span class="product-price">{product.price}</span>
              <span class="product-add"><Plus size={13} /></span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Floating cart badge -->
  <div class="ec-badge" aria-hidden="true">
    <ShoppingCart size={24} />
    <span class="ec-count">3</span>
  </div>
</div>

<style>
  .ec {
    position: relative;
    width: 100%;
    max-width: 480px;
    margin: auto;
    aspect-ratio: 16 / 11;
    container-type: inline-size;
  }

  .ec-glow {
    position: absolute;
    inset: 12% 8%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--accent) 40%, transparent),
      transparent 70%
    );
    filter: blur(40px);
    z-index: 0;
    animation: ec-pulse 5s ease-in-out infinite;
  }

  /* ── Browser window ── */
  .win {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-base);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
  }

  .win-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px;
    background: color-mix(in srgb, var(--accent) 8%, var(--bg-subtle));
    border-bottom: 1px solid var(--border);
  }

  .win-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 35%, var(--border));
  }

  .win-url {
    flex: 1;
    height: 12px;
    margin-left: 8px;
    border-radius: var(--radius-full);
    background: var(--bg-muted);
  }

  .win-body {
    flex: 1;
    padding: 14px;
    min-height: 0;
  }

  /* ── Product grid ── */
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    height: 100%;
  }

  .product {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px;
    border-radius: var(--radius-md);
    background: var(--bg-base);
    border: 1px solid var(--border);
  }

  .product-img {
    flex: 1;
    min-height: 0;
    border-radius: var(--radius-sm);
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 28%, transparent),
      color-mix(in srgb, var(--accent) 8%, transparent)
    );
  }

  .product-line {
    height: 6px;
    width: 70%;
    border-radius: 3px;
    background: var(--bg-hover);
  }

  .product-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .product-price {
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    font-variant-numeric: tabular-nums;
  }

  .product-add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: var(--radius-sm);
    color: #fff;
    background: var(--accent);
  }

  /* ── Floating cart badge ── */
  .ec-badge {
    position: absolute;
    right: -10px;
    bottom: -10px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(44px, 13cqi, 56px);
    height: clamp(44px, 13cqi, 56px);
    border-radius: var(--radius-lg);
    color: #fff;
    background: var(--accent);
    box-shadow: var(--shadow-lg);
    animation: ec-float 6s ease-in-out infinite;
  }

  .ec-count {
    position: absolute;
    top: -6px;
    right: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: var(--radius-full);
    background: var(--bg-base);
    color: var(--accent);
    border: 2px solid var(--accent);
    font-size: 11px;
    font-weight: 700;
  }

  @keyframes ec-float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes ec-pulse {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 0.85;
      transform: scale(1.06);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ec-glow,
    .ec-badge {
      animation: none;
    }
  }
</style>
