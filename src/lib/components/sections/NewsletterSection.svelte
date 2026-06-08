<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/buttons/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { CheckCircle2 } from '@lucide/svelte';

  let {
    badge,
    title,
    description,
    placeholder = 'votre@email.com',
    ctaLabel = "S'abonner",
    hint,
    onsubmit,
    variant = 'default',
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    placeholder?: string;
    ctaLabel?: string;
    hint?: string;
    onsubmit?: (email: string) => void;
    variant?: 'default' | 'card';
    withBackground?: "bg-base" | "";
  } = $props();


  let email = $state('');
  let submitted = $state(false);
  let loading = $state(false);
  let error = $state('');

  function validate(val: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = '';

    if (!validate(email)) {
      error = 'Veuillez entrer une adresse e-mail valide.';
      return;
    }

    loading = true;
    // Simulate async submission (real handler provided via onsubmit prop)
    await new Promise((r) => setTimeout(r, 600));
    onsubmit?.(email);
    loading = false;
    submitted = true;
  }
</script>

<section class="newsletter variant-{variant} {withBackground}">
  <div class="newsletter-inner">
    {#if variant === 'card'}
      <Card padding="lg">
        {#snippet children()}
          {@render inner()}
        {/snippet}
      </Card>
    {:else}
      {@render inner()}
    {/if}
  </div>
</section>

{#snippet inner()}
  {#if submitted}
    <!-- Success state -->
    <div class="success-state">
      <span class="success-icon">
        <CheckCircle2 size={40} />
      </span>
      <h3 class="success-title">Vous êtes abonné !</h3>
      <p class="success-message">
        Merci de votre intérêt. Vous recevrez bientôt nos prochaines actualités.
      </p>
    </div>
  {:else}
    <div class="content">
      {#if badge}
        <Badge label={badge} variant="primary" dot />
      {/if}
      <h2 class="nl-title">{title}</h2>
      {#if description}
        <p class="nl-description">{description}</p>
      {/if}

      <!-- Inline form -->
      <form class="nl-form" onsubmit={handleSubmit} novalidate>
        <div class="input-group" class:has-error={!!error}>
          <input
            type="email"
            class="email-input"
            bind:value={email}
            {placeholder}
            aria-label="Adresse e-mail"
            autocomplete="email"
            disabled={loading}
          />
          <Button variant="primary" size="md" {loading} onclick={() => {}}>
            {ctaLabel}
          </Button>
        </div>
        {#if error}
          <p class="error-msg" role="alert">{error}</p>
        {/if}
        {#if hint && !error}
          <p class="hint-msg">{hint}</p>
        {/if}
      </form>
    </div>
  {/if}
{/snippet}

<style>
  .newsletter {
    padding: 88px 24px;
    background: var(--bg-base);
  }

  .newsletter-inner {
    max-width: 620px;
    margin: 0 auto;
  }

  /* default variant: plain centered */
  .variant-default .newsletter-inner {
    text-align: center;
  }

  /* card variant: centered inside card */
  .variant-card .newsletter-inner {
    max-width: 640px;
  }

  /* ---- Content ---- */
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
    animation: fade-up 0.45s ease both;
  }

  .nl-title {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-heading);
    margin: 0;
  }

  .nl-description {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 480px;
    margin: 0;
  }

  /* ---- Form ---- */
  .nl-form {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }

  .input-group {
    display: flex;
    gap: 8px;
    align-items: stretch;
  }

  .email-input {
    flex: 1;
    height: 40px;
    padding: 0 14px;
    font-size: 14px;
    font-family: var(--font-sans);
    color: var(--text-base);
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    outline: none;
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
    min-width: 0;
  }

  .email-input::placeholder {
    color: var(--text-subtle);
  }

  .email-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
  }

  .email-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .input-group.has-error .email-input {
    border-color: #dc2626;
  }

  .input-group.has-error .email-input:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  }

  .error-msg {
    font-size: 13px;
    color: #dc2626;
    margin: 0;
    text-align: left;
  }

  .hint-msg {
    font-size: 12px;
    color: var(--text-subtle);
    margin: 0;
  }

  /* ---- Success state ---- */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
    padding: 16px 0;
    animation: fade-up 0.45s ease both;
  }

  .success-icon {
    color: #16a34a;
    display: flex;
  }

  .success-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .success-message {
    font-size: 15px;
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 400px;
    margin: 0;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 540px) {
    .newsletter {
      padding: 64px 20px;
    }

    .input-group {
      flex-direction: column;
    }

    .email-input {
      height: 44px;
    }

    .input-group :global(.btn) {
      width: 100%;
      justify-content: center;
    }
  }

  .withBackground { background: var(--bg-base); }
</style>
