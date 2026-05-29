<script lang="ts">
  import Badge from '../ui/Badge.svelte';
  import Collapse from '../ui/Collapse.svelte';

  let {
    badge,
    title,
    description,
    faqs,
    columns = 1,
  }: {
    badge?: string;
    title: string;
    description?: string;
    faqs: Array<{ question: string; answer: string }>;
    columns?: 1 | 2;
  } = $props();

  // Split faqs into columns for 2-col layout
  const leftFaqs = $derived(columns === 2 ? faqs.filter((_, i) => i % 2 === 0) : faqs);
  const rightFaqs = $derived(columns === 2 ? faqs.filter((_, i) => i % 2 !== 0) : []);
</script>

<section class="faq">
  <div class="faq-inner">
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

    <!-- FAQ list -->
    {#if columns === 2}
      <div class="faq-two-col">
        <div class="faq-col">
          {#each leftFaqs as faq, i}
            <div class="faq-item" style="animation-delay: {i * 0.07}s">
              <Collapse title={faq.question} variant="bordered">
                {#snippet children()}
                  <p class="faq-answer">{faq.answer}</p>
                {/snippet}
              </Collapse>
            </div>
          {/each}
        </div>
        <div class="faq-col">
          {#each rightFaqs as faq, i}
            <div class="faq-item" style="animation-delay: {(i + leftFaqs.length) * 0.07}s">
              <Collapse title={faq.question} variant="bordered">
                {#snippet children()}
                  <p class="faq-answer">{faq.answer}</p>
                {/snippet}
              </Collapse>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="faq-list">
        {#each faqs as faq, i}
          <div class="faq-item" style="animation-delay: {i * 0.06}s">
            <Collapse title={faq.question} variant="bordered">
              {#snippet children()}
                <p class="faq-answer">{faq.answer}</p>
              {/snippet}
            </Collapse>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .faq {
    padding: 88px 24px;
    background: var(--bg-base);
  }

  .faq-inner {
    max-width: 860px;
    margin: 0 auto;
  }

  .faq-inner:has(.faq-two-col) {
    max-width: 1100px;
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

  /* ---- Single column ---- */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* ---- Two columns ---- */
  .faq-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 24px;
    align-items: start;
  }

  .faq-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* ---- Item animation ---- */
  .faq-item {
    animation: fade-up 0.4s ease both;
  }

  .faq-answer {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-muted);
    margin: 0;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 720px) {
    .faq {
      padding: 64px 20px;
    }

    .faq-two-col {
      grid-template-columns: 1fr;
    }
  }
</style>
