<script lang="ts">
  import type { Component } from "svelte";
  import { onMount } from "svelte";
  import Badge from "../ui/Badge.svelte";
  import Button from "../buttons/Button.svelte";
  import Card from "../ui/Card.svelte";

  let {
    id,
    title,
    description,
    steps,
    withBackground = "",
    gap = "40px",
    minHeight = "auto",
  }: {
    id?: string;
    title: string;
    description?: string;
    steps: Array<{
      icon: Component;
      title: string;
      description: string;
      badge?: string;
      cta?: { label: string; href: string };
    }>;
    withBackground?: "bg-base" | "";
    /** Vertical gap between rows — any CSS length. Negative values overlap the rows (e.g. "-60px"). */
    gap?: string;
    /** Minimum section height — keeps the frame full even when a negative gap shrinks the content (e.g. "100vh"). */
    minHeight?: string;
  } = $props();

  // Per-step reveal flags, filled in by the scroll observer (sparse, indexed by step)
  let visible = $state<boolean[]>([]);

  // Progressive enhancement: cards stay visible until JS hides them for the reveal
  let enhanced = $state(false);
  onMount(() => {
    enhanced = true;
  });

  // Attachment factory: reveal a row once when it scrolls into view
  function reveal(index: number) {
    return (node: Element) => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible[index] = true;
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -12% 0px" },
      );
      observer.observe(node);
      return () => observer.disconnect();
    };
  }
</script>

<section
  {id}
  class="section timeline-section {withBackground}"
  style="--row-gap: {gap}; --section-min-h: {minHeight}"
>
  <div class="inner">
    <div class="section-header">
      <h2 class="section-title">{title}</h2>
      {#if description}
        <p class="section-description">{description}</p>
      {/if}
    </div>

    <div class="timeline" class:is-enhanced={enhanced}>
      {#each steps as step, i (i)}
        {@const side = i % 2 === 0 ? "left" : "right"}
        <div class="row {side}" class:visible={visible[i]} {@attach reveal(i)}>
          <div class="node" aria-hidden="true">{i + 1}</div>

          <div class="card-wrap">
            <Card padding="lg">
              <div class="card-head">
                <div class="step-icon">
                  <step.icon size={20} />
                </div>
                <div class="title-row">
                  <h3 class="step-title">{step.title}</h3>
                  {#if step.badge}
                    <Badge label={step.badge} variant="primary" size="sm" />
                  {/if}
                </div>
              </div>

              <p class="step-description">{step.description}</p>

              {#if step.cta}
                <div class="step-cta">
                  <Button variant="primary" size="sm" href={step.cta.href}>
                    {step.cta.label}
                  </Button>
                </div>
              {/if}
            </Card>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .timeline-section {
    display: flex;
    min-height: var(--section-min-h, auto);
    /* Contain the reveal animation: cards start shifted on the X axis (translateX),
       which would otherwise push past the viewport and create a horizontal scrollbar
       until the IntersectionObserver reveals them. `clip` avoids a scroll container
       (keeps the parent sticky/vertical scroll intact). */
    overflow-x: clip;
  }

  .bg-base {
    background: var(--bg-base);
  }

  .inner {
    max-width: 1000px;
    width: 100%;
    margin: auto;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  /* ---- Header ---- */
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

  /* ---- Timeline ---- */
  .timeline {
    position: relative;
  }

  /* The central vertical line */
  .timeline::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: var(--border);
  }

  .row {
    position: relative;
    display: flex;
    margin-bottom: var(--row-gap, 40px);
  }

  .row:last-child {
    margin-bottom: 0;
  }

  .row.left {
    justify-content: flex-start;
  }

  .row.right {
    justify-content: flex-end;
  }

  .card-wrap {
    width: calc(50% - 44px);
  }

  /* Numbered node sitting on the central line */
  .node {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-sans);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 5px var(--bg-base);
    z-index: 1;
  }

  /* ---- Card content ---- */
  .card-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .step-icon {
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

  .title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .step-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0;
  }

  .step-description {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .step-cta {
    margin-top: 16px;
  }

  /* ---- Reveal animation (only once JS has enhanced the section) ---- */
  .is-enhanced .card-wrap,
  .is-enhanced .node {
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  .is-enhanced .card-wrap {
    opacity: 0;
  }

  .is-enhanced .row.left .card-wrap {
    transform: translateX(-40px);
  }

  .is-enhanced .row.right .card-wrap {
    transform: translateX(40px);
  }

  .is-enhanced .node {
    opacity: 0;
    transform: translateX(-50%) scale(0.5);
  }

  .is-enhanced .row.visible .card-wrap {
    opacity: 1;
    transform: none;
  }

  .is-enhanced .row.visible .node {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  /* ---- Mobile: line on the left, cards stacked to the right ---- */
  @media (max-width: 768px) {
    .timeline::before {
      left: 19px;
      transform: none;
    }

    .row,
    .row.left,
    .row.right {
      justify-content: flex-start;
      padding-left: 56px;
      /* Stacked full-width cards must not overlap on mobile: override any negative
         --row-gap used for the desktop alternating-overlap effect. */
      margin-bottom: 32px;
    }

    .row:last-child {
      margin-bottom: 0;
    }

    .card-wrap {
      width: 100%;
    }

    .node {
      left: 19px;
    }

    .is-enhanced .row.left .card-wrap,
    .is-enhanced .row.right .card-wrap {
      transform: translateX(24px);
    }

    .is-enhanced .row.visible .card-wrap {
      transform: none;
    }
  }

  @container (max-width: 768px) {
    .timeline::before {
      left: 19px;
      transform: none;
    }

    .row,
    .row.left,
    .row.right {
      justify-content: flex-start;
      padding-left: 56px;
      /* Stacked full-width cards must not overlap on mobile: override any negative
         --row-gap used for the desktop alternating-overlap effect. */
      margin-bottom: 32px;
    }

    .row:last-child {
      margin-bottom: 0;
    }

    .card-wrap {
      width: 100%;
    }

    .node {
      left: 19px;
    }

    .is-enhanced .row.left .card-wrap,
    .is-enhanced .row.right .card-wrap {
      transform: translateX(24px);
    }

    .is-enhanced .row.visible .card-wrap {
      transform: none;
    }
  }

  /* ---- Respect reduced-motion: reveal without sliding ---- */
  @media (prefers-reduced-motion: reduce) {
    .is-enhanced .card-wrap,
    .is-enhanced .node {
      transition: opacity 0.3s ease;
    }

    .is-enhanced .row.left .card-wrap,
    .is-enhanced .row.right .card-wrap {
      transform: none;
    }

    .is-enhanced .node {
      transform: translateX(-50%);
    }
  }
</style>
