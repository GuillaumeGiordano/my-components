<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';

	let {
		code = '404',
		title = 'Page introuvable',
		description = "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
		cta = { label: "Retour à l'accueil", href: '/' },
		secondaryCta,
	}: {
		code?: string;
		title?: string;
		description?: string;
		cta?: { label: string; href?: string; onclick?: () => void };
		secondaryCta?: { label: string; href?: string; onclick?: () => void };
	} = $props();
</script>

<section class="error-section">
	<div class="error-inner">
		<p class="error-code" aria-hidden="true">{code}</p>
		<h1 class="error-title">{title}</h1>
		<p class="error-desc">{description}</p>
		<div class="error-actions">
			<Button variant="primary" href={cta.href} onclick={cta.onclick}>{cta.label}</Button>
			{#if secondaryCta}
				<Button variant="outline" href={secondaryCta.href} onclick={secondaryCta.onclick}>
					{secondaryCta.label}
				</Button>
			{/if}
		</div>
	</div>
</section>

<style>
	.error-section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 64px 24px;
		background: var(--bg-base);
	}

	.error-inner {
		text-align: center;
		max-width: 480px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.error-code {
		font-size: clamp(80px, 20vw, 160px);
		font-weight: 900;
		line-height: 1;
		margin: 0;
		background: linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 50%, transparent) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.04em;
	}

	.error-title {
		font-size: clamp(22px, 4vw, 32px);
		font-weight: 700;
		color: var(--text-heading);
		margin: 0;
		letter-spacing: -0.02em;
	}

	.error-desc {
		font-size: 16px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0;
	}

	.error-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 4px;
	}
</style>
