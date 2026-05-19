<script lang="ts">
	import type { Component } from 'svelte';
	import Badge from '../ui/Badge.svelte';
	import Card from '../ui/Card.svelte';
	import Button from '../buttons/Button.svelte';

	type IntegrationStatus = 'available' | 'coming-soon' | 'beta';

	type Integration = {
		name: string;
		description?: string;
		icon?: Component;
		logoSrc?: string;
		category?: string;
		href?: string;
		status?: IntegrationStatus;
	};

	let {
		badge,
		title,
		description,
		integrations,
		cta,
		columns = 4
	}: {
		badge?: string;
		title: string;
		description?: string;
		integrations: Integration[];
		cta?: { label: string; href: string };
		columns?: 2 | 3 | 4;
	} = $props();

	// Map status to Badge variant and label
	function statusBadge(status: IntegrationStatus): { variant: 'success' | 'warning' | 'default'; label: string } {
		if (status === 'available') return { variant: 'success', label: 'Disponible' };
		if (status === 'beta') return { variant: 'warning', label: 'Bêta' };
		return { variant: 'default', label: 'Bientôt' };
	}
</script>

<section class="integrations-section">
	<div class="container">
		<!-- Section header -->
		<div class="section-header">
			{#if badge}
				<Badge label={badge} variant="primary" />
			{/if}
			<h2 class="section-title">{title}</h2>
			{#if description}
				<p class="section-desc">{description}</p>
			{/if}
			{#if cta}
				<Button href={cta.href} variant="outline" size="md">{cta.label}</Button>
			{/if}
		</div>

		<!-- Integration grid -->
		<div class="grid cols-{columns}">
			{#each integrations as integration}
				{#if integration.href}
					<a href={integration.href} class="card-link">
						<Card hoverable padding="md">
							{#snippet children()}
								<div class="integration-card">
									<div class="icon-wrap">
										{#if integration.logoSrc}
											<img src={integration.logoSrc} alt={integration.name} class="logo-img" />
										{:else if integration.icon}
											{@const IntIcon = integration.icon}
											<IntIcon size={28} />
										{:else}
											<span class="icon-fallback">{integration.name[0]}</span>
										{/if}
									</div>
									<div class="info">
										<span class="name">{integration.name}</span>
										{#if integration.description}
											<span class="desc">{integration.description}</span>
										{/if}
									</div>
									{#if integration.status}
										{@const sb = statusBadge(integration.status)}
										<div class="status">
											<Badge label={sb.label} variant={sb.variant} size="sm" />
										</div>
									{/if}
								</div>
							{/snippet}
						</Card>
					</a>
				{:else}
					<Card hoverable padding="md">
						{#snippet children()}
							<div class="integration-card">
								<div class="icon-wrap">
									{#if integration.logoSrc}
										<img src={integration.logoSrc} alt={integration.name} class="logo-img" />
									{:else if integration.icon}
										{@const IntIcon = integration.icon}
										<IntIcon size={28} />
									{:else}
										<span class="icon-fallback">{integration.name[0]}</span>
									{/if}
								</div>
								<div class="info">
									<span class="name">{integration.name}</span>
									{#if integration.description}
										<span class="desc">{integration.description}</span>
									{/if}
								</div>
								{#if integration.status}
									{@const sb = statusBadge(integration.status)}
									<div class="status">
										<Badge label={sb.label} variant={sb.variant} size="sm" />
									</div>
								{/if}
							</div>
						{/snippet}
					</Card>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	.integrations-section {
		padding: 100px 24px;
		background: var(--bg-base);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 56px;
	}

	/* --- Header --- */
	.section-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
	}

	.section-title {
		font-size: clamp(26px, 4vw, 42px);
		font-weight: 700;
		color: var(--text-heading);
		line-height: 1.2;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.section-desc {
		font-size: 18px;
		color: var(--text-muted);
		line-height: 1.7;
		max-width: 580px;
		margin: 0;
	}

	/* --- Grid --- */
	.grid {
		display: grid;
		gap: 16px;
	}

	.cols-2 { grid-template-columns: repeat(2, 1fr); }
	.cols-3 { grid-template-columns: repeat(3, 1fr); }
	.cols-4 { grid-template-columns: repeat(4, 1fr); }

	/* --- Card link wrapper --- */
	.card-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	/* --- Integration card content --- */
	.integration-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 12px;
	}

	.icon-wrap {
		width: 52px;
		height: 52px;
		border-radius: var(--radius-md);
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
		flex-shrink: 0;
	}

	.logo-img {
		width: 32px;
		height: 32px;
		object-fit: contain;
	}

	.icon-fallback {
		font-size: 20px;
		font-weight: 700;
		color: var(--text-muted);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.name {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-heading);
	}

	.desc {
		font-size: 12px;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.status {
		margin-top: 2px;
	}

	/* --- Mobile: always 2 columns --- */
	@media (max-width: 768px) {
		.integrations-section {
			padding: 64px 16px;
		}

		.cols-3,
		.cols-4 {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.cols-2 {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
