<script lang="ts">
  import type { Component } from "svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import Textarea from "$lib/components/forms/Textarea.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import { Send, CheckCircle } from "@lucide/svelte";

  let {
    id,
    title,
    description,
    info,
    onsubmit,
    variant = "split",
    withBackground = "",
  }: {
    id?: string;
    title: string;
    description?: string;
    info?: Array<{
      icon: Component;
      label: string;
      value: string;
      href?: string;
    }>;
    onsubmit?: (data: {
      name: string;
      email: string;
      subject?: string;
      message: string;
    }) => Promise<void> | void;
    variant?: "split" | "centered";
    withBackground?: "bg-base" | "";
  } = $props();

  // Form state
  let name = $state("");
  let email = $state("");
  let subject = $state("");
  let message = $state("");
  let loading = $state(false);
  let success = $state(false);
  let errors = $state<{ name?: string; email?: string; message?: string }>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Le nom est requis.";
    if (!email.trim()) {
      next.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "L'adresse email n'est pas valide.";
    }
    if (!message.trim()) next.message = "Le message est requis.";
    errors = next;
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!validate()) return;

    loading = true;
    try {
      await onsubmit?.({ name, email, subject: subject || undefined, message });
      // Default: simulate success after a short delay if no handler
      if (!onsubmit) {
        await new Promise((r) => setTimeout(r, 800));
      }
      success = true;
    } finally {
      loading = false;
    }
  }

  function reset() {
    name = "";
    email = "";
    subject = "";
    message = "";
    errors = {};
    success = false;
  }
</script>

<section {id} class="section contact variant-{variant} {withBackground}">
  <div class="contact-inner">
    {#if variant === "split"}
      <!-- Split layout: info on the left, form on the right -->
      <div class="split-layout">
        <!-- Left column: title + info -->
        <div class="info-col">
          <h2 class="section-title">{title}</h2>
          {#if description}
            <p class="section-description">{description}</p>
          {/if}

          {#if info && info.length > 0}
            <ul class="info-list" role="list">
              {#each info as item}
                <li class="info-item">
                  <div class="info-icon">
                    <item.icon size={18} />
                  </div>
                  <div class="info-text">
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
        </div>

        <!-- Right column: form -->
        <div class="form-col">
          {@render contactForm()}
        </div>
      </div>
    {:else}
      <!-- Centered layout -->
      <div class="centered-layout">
        <div class="centered-header">
          <h2 class="section-title">{title}</h2>
          {#if description}
            <p class="section-description">{description}</p>
          {/if}
        </div>

        <div class="centered-form">
          {@render contactForm()}
        </div>
      </div>
    {/if}
  </div>
</section>

{#snippet contactForm()}
  <Card padding="lg">
    {#snippet children()}
      {#if success}
        <!-- Success state -->
        <div class="success-state">
          <div class="success-icon">
            <CheckCircle size={40} />
          </div>
          <h3 class="success-title">Message envoyé !</h3>
          <p class="success-text">
            Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs
            délais.
          </p>
          <Button variant="outline" size="sm" onclick={reset}>
            {#snippet children()}Envoyer un nouveau message{/snippet}
          </Button>
        </div>
      {:else}
        <!-- Contact form -->
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
            rows={5}
            disabled={loading}
          />

          <div class="form-footer">
            <Button variant="primary" size="md" icon={Send}>
              {#snippet children()}
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              {/snippet}
            </Button>
          </div>
        </form>
      {/if}
    {/snippet}
  </Card>
{/snippet}

<style>
  .contact {
    display: flex;
    min-height: calc(100vh - var(--header-height));
  }

  .bg-base {
    background: var(--bg-base);
  }

  .contact-inner {
    max-width: 1100px;
    margin: auto;
    padding: 60px 20px;
  }

  /* ---- Split layout ---- */
  .split-layout {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    align-items: start;
  }

  .info-col {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 8px;
  }

  .section-title {
    font-size: clamp(26px, 4vw, 40px);
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
    line-height: 1.2;
  }

  .section-description {
    font-size: 16px;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0;
  }

  /* Info items */
  .info-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 8px;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .info-icon {
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

  .info-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 4px;
  }

  .info-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-subtle);
  }

  .info-value {
    font-size: 15px;
    color: var(--text-base);
    font-weight: 500;
  }

  .info-value.link {
    color: var(--primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .info-value.link:hover {
    color: var(--primary-hover);
  }

  /* ---- Centered layout ---- */
  .centered-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
  }

  .centered-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    max-width: 560px;
  }

  .centered-form {
    width: 100%;
    max-width: 620px;
  }

  /* ---- Form ---- */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }

  /* ---- Success state ---- */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 24px 0;
  }

  .success-icon {
    color: #16a34a;
  }

  .success-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .success-text {
    font-size: 15px;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
    max-width: 360px;
  }

  /* ---- Responsive ---- */
  @media (max-width: 768px) {
    .split-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }

  @container (max-width: 768px) {
    .split-layout {
      grid-template-columns: 1fr;
      gap: 40px;
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

  @container (max-width: 480px) {
    .form-footer {
      justify-content: stretch;
    }

    .form-footer :global(button) {
      width: 100%;
    }
  }
</style>
