<script lang="ts">
  import type { Component } from "svelte";
  import Badge from "../ui/Badge.svelte";
  import Card from "../ui/Card.svelte";

  let {
    badge,
    title,
    description,
    steps,
    layout = "horizontal",
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    steps: Array<{
      icon: Component;
      title: string;
      description: string;
      badge?: string;
    }>;
    layout?: "horizontal" | "vertical";
    withBackground?: "bg-base" | "";
  } = $props();
</script>

<section class="process {withBackground}">
  <div class="process-inner">
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

    <!-- Steps: horizontal layout -->
    {#if layout === "horizontal"}
      <div class="steps-horizontal">
        {#each steps as step, i}
          <!-- Step card -->
          <div class="step-wrap" style="animation-delay: {i * 0.1}s">
            <Card padding="lg">
              {#snippet children()}
                <div class="step-number-badge">{i + 1}</div>
                <div class="step-icon-wrap">
                  <step.icon size={24} />
                </div>
                <h3 class="step-title">{step.title}</h3>
                {#if step.badge}
                  <div class="step-badge-wrap">
                    <Badge label={step.badge} variant="primary" size="sm" />
                  </div>
                {/if}
                <p class="step-description">{step.description}</p>
              {/snippet}
            </Card>
          </div>

          <!-- Connector between steps (not after last) -->
          {#if i < steps.length - 1}
            <div class="connector" aria-hidden="true">
              <div class="connector-line"></div>
            </div>
          {/if}
        {/each}
      </div>

      <!-- Steps: vertical layout -->
    {:else}
      <div class="steps-vertical">
        {#each steps as step, i}
          <div class="step-vertical" style="animation-delay: {i * 0.1}s">
            <!-- Left: number + vertical line -->
            <div class="step-aside">
              <div class="step-number-circle">{i + 1}</div>
              {#if i < steps.length - 1}
                <div class="vertical-line" aria-hidden="true"></div>
              {/if}
            </div>

            <!-- Right: content -->
            <div class="step-content">
              <div class="step-icon-inline">
                <step.icon size={20} />
              </div>
              <div class="step-body">
                <div class="step-title-row">
                  <h3 class="step-title">{step.title}</h3>
                  {#if step.badge}
                    <Badge label={step.badge} variant="primary" size="sm" />
                  {/if}
                </div>
                <p class="step-description">{step.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .process {
    padding: 100px 24px;
    background: var(--bg-base);
  }

  .process-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 64px;
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

  /* ---- Horizontal layout ---- */
  .steps-horizontal {
    display: flex;
    align-items: stretch;
    gap: 0;
  }

  .step-wrap {
    flex: 1;
    opacity: 0;
    animation: fade-up 0.5s ease forwards;
  }

  /* The connector between cards */
  .connector {
    display: flex;
    align-items: center;
    padding: 0 4px;
    flex-shrink: 0;
    margin-top: 40px; /* align with center of card */
  }

  .connector-line {
    width: 32px;
    border-top: 2px dashed var(--border-strong);
  }

  /* Number badge in top-right of horizontal card */
  .step-number-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sans);
    box-shadow: 0 0 0 4px var(--bg-base);
  }

  /* Override Card to allow positioning of number badge */
  .step-wrap :global(.card) {
    position: relative;
    padding-top: 28px;
    height: 100%;
  }

  .step-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    background: var(--primary-subtle);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .step-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0 0 8px;
  }

  .step-badge-wrap {
    margin-bottom: 8px;
  }

  .step-description {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  /* ---- Vertical layout ---- */
  .steps-vertical {
    display: flex;
    flex-direction: column;
    max-width: 680px;
    margin: 0 auto;
    width: 100%;
  }

  .step-vertical {
    display: flex;
    gap: 24px;
    opacity: 0;
    animation: fade-up 0.5s ease forwards;
  }

  .step-aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .step-number-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sans);
    flex-shrink: 0;
    box-shadow: 0 0 0 4px var(--primary-subtle);
  }

  .vertical-line {
    width: 2px;
    flex: 1;
    min-height: 40px;
    background: var(--border);
    margin: 8px 0;
    border-radius: 1px;
  }

  .step-content {
    display: flex;
    gap: 16px;
    padding-bottom: 40px;
    flex: 1;
  }

  .step-vertical:last-child .step-content {
    padding-bottom: 0;
  }

  .step-icon-inline {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--primary-subtle);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-body {
    flex: 1;
    padding-top: 8px;
  }

  .step-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  /* ---- Animation ---- */
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ---- Mobile: horizontal becomes vertical ---- */
  @media (max-width: 768px) {
    .process {
      padding: 64px 16px;
    }

    .steps-horizontal {
      flex-direction: column;
      align-items: stretch;
      gap: 24px;
    }

    .connector {
      display: none;
    }

    .step-number-badge {
      top: -14px;
      left: 20px;
      transform: none;
    }
  }

  .bg-base {
    padding: 1rem 0;
    background: var(--bg-base);
  }
</style>
