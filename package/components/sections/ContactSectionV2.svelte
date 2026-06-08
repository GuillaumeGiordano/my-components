<script lang="ts">
  import type { Component } from 'svelte';
  import Badge from '../ui/Badge.svelte';
  import Card from '../ui/Card.svelte';
  import Input from '../forms/Input.svelte';
  import Textarea from '../forms/Textarea.svelte';
  import Button from '../buttons/Button.svelte';
  import { Send, CheckCircle, MapPin } from '@lucide/svelte';

  let {
    badge,
    title,
    description,
    info,
    mapSrc,
    mapLabel = 'Notre localisation',
    onsubmit,
    withBackground = "",
  }: {
    badge?: string;
    title: string;
    description?: string;
    info?: Array<{
      icon: Component;
      label: string;
      value: string;
      href?: string;
    }>;
    /** iframe src copiée depuis Google Maps > Partager > Intégrer une carte */
    mapSrc?: string;
    mapLabel?: string;
    onsubmit?: (data: {
      name: string;
      email: string;
      subject?: string;
      message: string;
    }) => Promise<void> | void;
    withBackground?: "bg-base" | "";
  } = $props();


  let name    = $state('');
  let email   = $state('');
  let subject = $state('');
  let message = $state('');
  let loading = $state(false);
  let success = $state(false);
  let errors  = $state<{ name?: string; email?: string; message?: string }>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Le nom est requis.';
    if (!email.trim()) {
      next.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "L'adresse email n'est pas valide.";
    }
    if (!message.trim()) next.message = 'Le message est requis.';
    errors = next;
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!validate()) return;
    loading = true;
    try {
      await onsubmit?.({ name, email, subject: subject || undefined, message });
      if (!onsubmit) await new Promise((r) => setTimeout(r, 900));
      success = true;
    } finally {
      loading = false;
    }
  }

  function reset() {
    name = email = subject = message = '';
    errors = {};
    success = false;
  }
</script>

<section class="contact-v2 {withBackground}">
  <div class="contact-grid">

    <!-- ── Left column : header + infos + form ── -->
    <div class="content-col">

      <div class="content-header">
        {#if badge}
          <Badge label={badge} variant="primary" dot />
        {/if}
        <h2 class="section-title">{title}</h2>
        {#if description}
          <p class="section-description">{description}</p>
        {/if}
      </div>

      {#if info && info.length > 0}
        <ul class="info-list" role="list">
          {#each info as item}
            <li class="info-item">
              <div class="info-icon" aria-hidden="true">
                <item.icon size={16} strokeWidth={2} />
              </div>
              <div class="info-body">
                <span class="info-label">{item.label}</span>
                {#if item.href}
                  <a href={item.href} class="info-value link">{item.value}</a>
                {:else}
                  <span class="info-value">{item.value}</span>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      {/if}

      <div class="form-wrapper">
        <Card padding="lg">
          {#snippet children()}
            {#if success}
              <div class="success-state">
                <div class="success-icon"><CheckCircle size={38} /></div>
                <h3 class="success-title">Message envoyé !</h3>
                <p class="success-text">
                  Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures ouvrées.
                </p>
                <Button variant="outline" size="sm" onclick={reset}>
                  {#snippet children()}Envoyer un autre message{/snippet}
                </Button>
              </div>
            {:else}
              <form class="contact-form" onsubmit={handleSubmit} novalidate>
                <div class="form-row">
                  <Input
                    label="Nom complet"
                    placeholder="Jean Dupont"
                    bind:value={name}
                    error={errors.name}
                    disabled={loading}
                  />
                  <Input
                    label="Adresse email"
                    type="email"
                    placeholder="jean@exemple.fr"
                    bind:value={email}
                    error={errors.email}
                    disabled={loading}
                  />
                </div>

                <Input
                  label="Sujet (optionnel)"
                  placeholder="Demande de démonstration"
                  bind:value={subject}
                  disabled={loading}
                />

                <Textarea
                  label="Message"
                  placeholder="Décrivez votre projet ou votre question..."
                  bind:value={message}
                  error={errors.message}
                  rows={4}
                  disabled={loading}
                />

                <div class="form-footer">
                  <Button variant="primary" size="md" icon={Send}>
                    {#snippet children()}
                      {loading ? 'Envoi en cours…' : 'Envoyer le message'}
                    {/snippet}
                  </Button>
                </div>
              </form>
            {/if}
          {/snippet}
        </Card>
      </div>
    </div>

    <!-- ── Right column : Google Maps ── -->
    <div class="map-col">
      {#if mapSrc}
        <iframe
          src={mapSrc}
          title={mapLabel}
          class="map-iframe"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      {:else}
        <div class="map-placeholder">
          <div class="map-placeholder-icon"><MapPin size={28} strokeWidth={1.5} /></div>
          <p class="map-placeholder-title">Carte non configurée</p>
          <p class="map-placeholder-hint">
            Passez un <code>mapSrc</code> — copiez l'URL depuis<br />
            Google Maps › Partager › Intégrer une carte.
          </p>
        </div>
      {/if}
    </div>

  </div>
</section>

<style>
  /* ── Outer section ── */
  .contact-v2 {
    background: var(--bg-base);
    overflow: hidden;
  }

  /* ── Two-column grid ── */
  .contact-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    min-height: 720px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ── Left column ── */
  .content-col {
    padding: 80px 56px 80px 48px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    border-right: 1px solid var(--border);
  }

  /* Header */
  .content-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section-title {
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.2;
    color: var(--text-heading);
    margin: 0;
  }

  .section-description {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0;
    max-width: 480px;
  }

  /* Info list */
  .info-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    background: var(--bg-base);
    transition: background var(--transition-fast);
  }

  .info-item + .info-item {
    border-top: 1px solid var(--border);
  }

  .info-item:hover {
    background: var(--bg-subtle);
  }

  .info-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: var(--primary-subtle);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .info-body {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .info-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-subtle);
  }

  .info-value {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-base);
  }

  .info-value.link {
    color: var(--primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .info-value.link:hover {
    color: var(--primary-hover);
  }

  /* Form */
  .form-wrapper {
    flex: 1;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }

  /* Success state */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 14px;
    padding: 20px 0;
  }

  .success-icon {
    color: #16a34a;
  }

  .success-title {
    font-size: 19px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .success-text {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.65;
    margin: 0;
    max-width: 320px;
  }

  /* ── Right column : map ── */
  .map-col {
    position: relative;
    background: var(--bg-muted);
    min-height: 480px;
  }

  .map-iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    /* Invert map in dark mode for a cohesive look */
    filter: none;
  }

  :global(.dark) .map-iframe {
    filter: invert(0.9) hue-rotate(180deg) saturate(0.8);
  }

  /* Placeholder when no mapSrc */
  .map-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
    padding: 32px;
  }

  .map-placeholder-icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-full);
    background: var(--bg-hover);
    color: var(--text-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .map-placeholder-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-muted);
    margin: 0;
  }

  .map-placeholder-hint {
    font-size: 13px;
    color: var(--text-subtle);
    line-height: 1.6;
    margin: 0;
  }

  .map-placeholder-hint code {
    font-family: var(--font-mono);
    font-size: 12px;
    background: var(--bg-hover);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }

    .content-col {
      padding: 56px 24px;
      border-right: none;
      border-bottom: 1px solid var(--border);
    }

    .map-col {
      min-height: 360px;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .form-footer {
      justify-content: stretch;
    }

    .form-footer :global(button) {
      width: 100%;
    }
  }

  .withBackground { background: var(--bg-base); }
</style>
