<script lang="ts">
  import type { Component } from 'svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Avatar from '$lib/components/ui/Avatar.svelte';
  import Card from '$lib/components/ui/Card.svelte';

  let {
    badge,
    title,
    description,
    members,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    members: Array<{
      name: string;
      role: string;
      bio?: string;
      avatar?: string;
      links?: Array<{ icon: Component; href: string; label: string }>;
    }>;
    withBackground?: "bg-base" | "";
  } = $props();

</script>

<section class="team {withBackground}">
  <div class="team-inner">
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

    <!-- Members grid -->
    <div class="members-grid">
      {#each members as member, i}
        <div class="member-card-wrap" style="animation-delay: {i * 0.07}s">
          <Card hoverable padding="lg">
            {#snippet children()}
              <div class="member-layout">
                <Avatar
                  src={member.avatar}
                  name={member.name}
                  size="xl"
                  shape="circle"
                />
                <div class="member-info">
                  <span class="member-name">{member.name}</span>
                  <span class="member-role">{member.role}</span>
                  {#if member.bio}
                    <p class="member-bio">{member.bio}</p>
                  {/if}

                  {#if member.links && member.links.length > 0}
                    <div class="member-links">
                      {#each member.links as link}
                        {@const LinkIcon = link.icon}
                        <a
                          href={link.href}
                          class="social-link"
                          aria-label={link.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkIcon size={16} />
                        </a>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            {/snippet}
          </Card>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .team {
    padding: 88px 24px;
    background: var(--bg-base);
  }

  .team-inner {
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

  /* ---- Grid ---- */
  .members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }

  .member-card-wrap {
    animation: fade-up 0.45s ease both;
  }

  /* ---- Member card content ---- */
  .member-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
  }

  .member-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .member-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-heading);
  }

  .member-role {
    font-size: 13px;
    color: var(--primary);
    font-weight: 500;
  }

  .member-bio {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 8px 0 4px;
    max-width: 260px;
  }

  /* ---- Social links ---- */
  .member-links {
    display: flex;
    gap: 8px;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    color: var(--text-muted);
    text-decoration: none;
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast);
  }

  .social-link:hover {
    background: var(--primary-subtle);
    color: var(--primary);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
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

  @media (max-width: 640px) {
    .team {
      padding: 64px 20px;
    }

    .members-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  .withBackground { background: var(--bg-base); }
</style>
