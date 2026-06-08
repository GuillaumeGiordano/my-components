<script lang="ts">
  import Badge from '../ui/Badge.svelte';
  import Button from '../buttons/Button.svelte';
  import { Check } from '@lucide/svelte';

  let {
    badge,
    title,
    description,
    plans,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    plans: Array<{
      name: string;
      price: string;
      period?: string;
      description?: string;
      features: string[];
      cta: string;
      href?: string;
      highlighted?: boolean;
      badge?: string;
    }>;
    withBackground?: "bg-base" | "";
  } = $props();

</script>

<section class="pricing {withBackground}">
  <div class="pricing-inner">
    <!-- Section header -->
    <div class="section-header">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      <h2 class="section-title">{title}</h2>
      {#if description}
        <p class="section-description">{description}</p>
      {/if}
    </div>

    <!-- Plans -->
    <div class="plans-row">
      {#each plans as plan, i}
        <div
          class="plan-card"
          class:highlighted={plan.highlighted}
          style="animation-delay: {i * 0.08}s"
        >
          {#if plan.badge}
            <div class="plan-badge-row">
              <Badge label={plan.badge} variant="primary" size="sm" />
            </div>
          {/if}

          <div class="plan-header">
            <span class="plan-name">{plan.name}</span>
            <div class="plan-price-row">
              <span class="plan-price">{plan.price}</span>
              {#if plan.period}
                <span class="plan-period">/{plan.period}</span>
              {/if}
            </div>
            {#if plan.description}
              <p class="plan-description">{plan.description}</p>
            {/if}
          </div>

          <div class="plan-divider"></div>

          <ul class="plan-features">
            {#each plan.features as feature}
              <li class="plan-feature">
                <span class="check-icon">
                  <Check size={14} />
                </span>
                {feature}
              </li>
            {/each}
          </ul>

          <div class="plan-cta">
            <Button
              variant={plan.highlighted ? 'primary' : 'outline'}
              size="lg"
              href={plan.href}
            >
              {plan.cta}
            </Button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .pricing {
    padding: 88px 24px;
    background: var(--bg-base);
  }

  .pricing-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ---- Header ---- */
  .section-header {
    text-align: center;
    margin-bottom: 56px;
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

  /* ---- Plans row ---- */
  .plans-row {
    display: flex;
    gap: 20px;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* ---- Plan card ---- */
  .plan-card {
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
    min-width: 260px;
    max-width: 340px;
    transition:
      box-shadow var(--transition-base),
      border-color var(--transition-base),
      transform var(--transition-base);
    animation: fade-up 0.45s ease both;
    position: relative;
  }

  .plan-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
  }

  /* Highlighted card */
  .plan-card.highlighted {
    border-color: var(--primary);
    border-width: 2px;
    background: var(--bg-subtle);
    box-shadow: var(--shadow-lg);
    transform: scale(1.03);
    z-index: 1;
  }

  .plan-card.highlighted:hover {
    box-shadow: 0 20px 48px -8px color-mix(in srgb, var(--primary) 25%, transparent);
  }

  .plan-badge-row {
    margin-bottom: 12px;
  }

  .plan-header {
    margin-bottom: 24px;
  }

  .plan-name {
    display: block;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .plan-price-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 8px;
  }

  .plan-price {
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--text-heading);
    line-height: 1;
  }

  .plan-period {
    font-size: 14px;
    color: var(--text-subtle);
  }

  .plan-description {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
  }

  .plan-divider {
    height: 1px;
    background: var(--border);
    margin-bottom: 20px;
  }

  /* ---- Feature list ---- */
  .plan-features {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    margin-bottom: 28px;
  }

  .plan-feature {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: var(--text-base);
    line-height: 1.5;
  }

  .check-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary-subtle);
    color: var(--primary);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .plan-cta {
    display: flex;
  }

  .plan-cta :global(.btn) {
    width: 100%;
    justify-content: center;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .plan-card.highlighted {
    animation: fade-up-hl 0.45s ease both;
  }

  @keyframes fade-up-hl {
    from {
      opacity: 0;
      transform: translateY(16px) scale(1.03);
    }
    to {
      opacity: 1;
      transform: scale(1.03);
    }
  }

  @media (max-width: 768px) {
    .pricing {
      padding: 64px 20px;
    }

    .plan-card {
      max-width: 100%;
    }

    .plan-card.highlighted {
      transform: none;
    }

    @keyframes fade-up-hl {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
  }

  .withBackground { background: var(--bg-base); }
</style>
