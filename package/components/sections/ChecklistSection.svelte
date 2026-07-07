<script lang="ts">
  import { Check } from "@lucide/svelte";

  let {
    id,
    title,
    description,
    items = [],
    columns = 2,
    withBackground = "",
  }: {
    id?: string;
    title: string;
    description?: string;
    items?: Array<{ label: string; description?: string }>;
    columns?: 1 | 2 | 3;
    withBackground?: "bg-base" | "";
  } = $props();
</script>

<section {id} class="checklist {withBackground}">
  <div class="cl-inner">
    <div class="cl-header">
      <h2 class="cl-title">{title}</h2>
      {#if description}
        <p class="cl-description">{description}</p>
      {/if}
    </div>

    <ul class="cl-grid" style="--cols:{columns}">
      {#each items as item (item.label)}
        <li class="cl-item">
          <span class="cl-check"><Check size={15} /></span>
          <div class="cl-text">
            <span class="cl-label">{item.label}</span>
            {#if item.description}
              <p class="cl-desc">{item.description}</p>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .checklist {
    display: flex;
  }

  .bg-base {
    background: var(--bg-base);
  }

  .cl-inner {
    max-width: 1000px;
    width: 100%;
    margin: auto;
    padding: 60px 24px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .cl-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
    max-width: 640px;
    margin: 0 auto;
  }

  .cl-title {
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
    line-height: 1.2;
  }

  .cl-description {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .cl-grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(var(--cols, 2), 1fr);
    gap: 16px 32px;
  }

  .cl-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .cl-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--primary-subtle);
    color: var(--primary-subtle-fg);
    margin-top: 2px;
  }

  .cl-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .cl-label {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-heading);
  }

  .cl-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
  }

  @media (max-width: 700px) {
    .cl-grid {
      grid-template-columns: 1fr;
    }
  }

  @container (max-width: 700px) {
    .cl-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
