<script lang="ts">
  import type { Component } from 'svelte';
  import { Check, X } from '@lucide/svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/buttons/Button.svelte';
  import Tooltip from '$lib/components/ui/Tooltip.svelte';

  let {
    badge,
    title,
    description,
    plans,
    features,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    plans: Array<{
      name: string;
      highlighted?: boolean;
      badge?: string;
      cta?: { label: string; href?: string };
    }>;
    features: Array<{
      category?: string;
      label: string;
      tooltip?: string;
      values: Array<string | boolean | null>;
    }>;
    withBackground?: "bg-base" | "";
  } = $props();

</script>

<section class="comparison {withBackground}">
  <div class="comparison-inner">
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

    <!-- Table wrapper: horizontal scroll on mobile -->
    <div class="table-scroll">
      <table class="comparison-table">
        <!-- Sticky plan header row -->
        <thead>
          <tr>
            <!-- Empty first cell -->
            <th class="feature-col" scope="col"></th>

            {#each plans as plan}
              <th
                class="plan-col"
                class:highlighted={plan.highlighted}
                scope="col"
              >
                <div class="plan-header">
                  <span class="plan-name">{plan.name}</span>
                  {#if plan.badge}
                    <Badge label={plan.badge} variant="primary" size="sm" />
                  {/if}
                  {#if plan.cta}
                    <div class="plan-cta">
                      <Button
                        variant={plan.highlighted ? 'primary' : 'outline'}
                        size="sm"
                        href={plan.cta.href}
                      >
                        {#snippet children()}
                          {plan.cta!.label}
                        {/snippet}
                      </Button>
                    </div>
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>

        <tbody>
          {#each features as feature, rowIndex}
            {#if feature.category}
              <!-- Category separator row -->
              <tr class="category-row">
                <td colspan={plans.length + 1} class="category-label">
                  {feature.category}
                </td>
              </tr>
            {:else}
              <!-- Feature row -->
              <tr class="feature-row" class:even={rowIndex % 2 === 0}>
                <td class="feature-label-cell">
                  {#if feature.tooltip}
                    <Tooltip tip={feature.tooltip} position="right">
                      <span class="feature-label underline-hint">{feature.label}</span>
                    </Tooltip>
                  {:else}
                    <span class="feature-label">{feature.label}</span>
                  {/if}
                </td>

                {#each feature.values as value, colIndex}
                  <td
                    class="value-cell"
                    class:highlighted={plans[colIndex]?.highlighted}
                  >
                    {#if value === true}
                      <span class="icon-check" aria-label="Inclus">
                        <Check size={18} />
                      </span>
                    {:else if value === false}
                      <span class="icon-cross" aria-label="Non inclus">
                        <X size={18} />
                      </span>
                    {:else if value === null}
                      <span class="dash" aria-label="Non applicable">—</span>
                    {:else}
                      <span class="value-text">{value}</span>
                    {/if}
                  </td>
                {/each}
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
  .comparison {
    padding: 100px 24px;
    background: var(--bg-base);
  }

  .comparison-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  /* Section header */
  .section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
    max-width: 640px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
    line-height: 1.2;
  }

  .section-description {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  /* Table scroll container */
  .table-scroll {
    overflow-x: auto;
    border-radius: var(--radius-xl);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }

  /* Table */
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-sans);
    min-width: 580px;
  }

  /* Sticky header */
  thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  thead tr {
    background: var(--bg-subtle);
  }

  /* Column widths */
  .feature-col {
    width: 38%;
    padding: 0;
  }

  .plan-col {
    text-align: center;
    vertical-align: bottom;
    padding: 24px 16px 20px;
    border-left: 1px solid var(--border);
  }

  .plan-col.highlighted {
    background: var(--primary);
    color: var(--primary-fg);
  }

  .plan-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .plan-name {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  /* Override badge color in highlighted column */
  .plan-col.highlighted :global(.badge) {
    background: color-mix(in srgb, var(--primary-fg) 20%, transparent);
    color: var(--primary-fg);
    border-color: color-mix(in srgb, var(--primary-fg) 30%, transparent);
  }

  .plan-cta {
    margin-top: 4px;
  }

  /* Override button in highlighted column */
  .plan-col.highlighted :global(.btn-outline) {
    border-color: var(--primary-fg);
    color: var(--primary-fg);
  }

  .plan-col.highlighted :global(.btn-outline:hover) {
    background: color-mix(in srgb, var(--primary-fg) 15%, transparent);
  }

  /* Category separator row */
  .category-row td {
    padding: 10px 20px;
    background: var(--bg-muted);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .category-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-subtle);
  }

  /* Feature rows */
  .feature-row {
    border-bottom: 1px solid var(--border);
    transition: background var(--transition-fast);
  }

  .feature-row:last-child {
    border-bottom: none;
  }

  .feature-row.even {
    background: var(--bg-subtle);
  }

  .feature-row:hover {
    background: var(--bg-hover);
  }

  .feature-label-cell {
    padding: 14px 20px;
  }

  .feature-label {
    font-size: 14px;
    color: var(--text-base);
  }

  .underline-hint {
    text-decoration: underline dotted;
    text-underline-offset: 3px;
    cursor: help;
  }

  /* Value cells */
  .value-cell {
    text-align: center;
    padding: 14px 16px;
    border-left: 1px solid var(--border);
    vertical-align: middle;
  }

  .value-cell.highlighted {
    background: color-mix(in srgb, var(--primary) 6%, transparent);
  }

  .feature-row:hover .value-cell.highlighted {
    background: color-mix(in srgb, var(--primary) 10%, transparent);
  }

  .icon-check {
    display: inline-flex;
    color: #16a34a;
  }

  .icon-cross {
    display: inline-flex;
    color: #dc2626;
    opacity: 0.5;
  }

  .dash {
    color: var(--text-subtle);
    font-size: 16px;
  }

  .value-text {
    font-size: 13px;
    color: var(--text-base);
    font-weight: 500;
  }

  @media (max-width: 640px) {
    .comparison {
      padding: 64px 12px;
    }

    .table-scroll {
      border-radius: var(--radius-lg);
    }
  }

  .withBackground { background: var(--bg-base); }
</style>
