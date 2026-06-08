<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';
  import Avatar from '$lib/components/ui/Avatar.svelte';

  let {
    badge,
    title,
    story,
    author,
    milestones,
    withBackground = "",
  }: {
    badge?: string;
    title?: string;
    story: string;
    author?: { name: string; role: string; avatar?: string };
    milestones?: Array<{ year: string; title: string; description: string }>;
    withBackground?: "bg-base" | "";
  } = $props();

</script>

<section class="about-v3 {withBackground}">
  <div class="inner">

    <!-- Story side -->
    <div class="story-side">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      {#if title}
        <h2 class="title">{title}</h2>
      {/if}
      <blockquote class="story">{story}</blockquote>
      {#if author}
        <div class="author">
          <Avatar
            name={author.name}
            src={author.avatar}
            size="md"
          />
          <div class="author-info">
            <span class="author-name">{author.name}</span>
            <span class="author-role">{author.role}</span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Milestones side -->
    {#if milestones && milestones.length > 0}
      <div class="milestones-side">
        <h3 class="milestones-heading">Notre histoire</h3>
        <ol class="milestones">
          {#each milestones as milestone, i}
            <li class="milestone" style="--delay: {i * 0.08}s">
              <div class="milestone-year">{milestone.year}</div>
              <div class="milestone-body">
                <div class="milestone-dot"></div>
                <div class="milestone-content">
                  <span class="milestone-title">{milestone.title}</span>
                  <span class="milestone-desc">{milestone.description}</span>
                </div>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    {/if}

  </div>
</section>

<style>
  .about-v3 {
    padding: 96px 64px;
    border-top: 1px solid var(--border);
    background: var(--bg-base);
  }

  .inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  /* ── Story ── */
  .story-side {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .title {
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 700;
    color: var(--text-heading);
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .story {
    font-size: clamp(17px, 2vw, 21px);
    color: var(--text-base);
    line-height: 1.8;
    margin: 0;
    padding: 0 0 0 20px;
    border-left: 3px solid var(--primary);
    font-style: italic;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-top: 8px;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .author-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-heading);
  }

  .author-role {
    font-size: 13px;
    color: var(--text-subtle);
  }

  /* ── Milestones ── */
  .milestones-side {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .milestones-heading {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-subtle);
    margin: 0;
  }

  .milestones {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .milestone {
    display: grid;
    grid-template-columns: 52px 1fr;
    gap: 0 16px;
    animation: fade-in 0.4s ease both;
    animation-delay: var(--delay, 0s);
  }

  .milestone-year {
    font-size: 13px;
    font-weight: 700;
    color: var(--primary);
    padding-top: 14px;
    text-align: right;
    letter-spacing: 0.02em;
  }

  .milestone-body {
    display: flex;
    gap: 14px;
    padding-bottom: 28px;
    position: relative;
  }

  /* Vertical line between dots */
  .milestone:not(:last-child) .milestone-body::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 22px;
    bottom: 0;
    width: 2px;
    background: var(--border);
  }

  .milestone-dot {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--bg-base);
    border: 3px solid var(--primary);
    margin-top: 12px;
  }

  .milestone-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 8px;
  }

  .milestone-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-heading);
  }

  .milestone-desc {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .about-v3 { padding: 64px 24px; }
    .inner { grid-template-columns: 1fr; gap: 48px; }
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: none; }
  }

  .withBackground { background: var(--bg-base); }
</style>
