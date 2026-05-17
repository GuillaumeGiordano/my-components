<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import Button from '$lib/components/buttons/Button.svelte';

	let {
		icon,
		title,
		description,
		cta,
		size = 'md',
		children,
	}: {
		icon?: Component;
		title: string;
		description?: string;
		cta?: { label: string; href?: string; onclick?: () => void };
		size?: 'sm' | 'md' | 'lg';
		children?: Snippet;
	} = $props();

	const IconComponent = $derived(icon);
</script>

<div class="empty empty--{size}">
	{#if IconComponent}
		<div class="empty__icon">
			<IconComponent size={size === 'sm' ? 24 : size === 'lg' ? 48 : 36} strokeWidth={1.5} />
		</div>
	{/if}

	<div class="empty__body">
		<p class="empty__title">{title}</p>
		{#if description}
			<p class="empty__description">{description}</p>
		{/if}
	</div>

	{#if children}
		{@render children()}
	{:else if cta}
		<Button
			variant="primary"
			size={size === 'lg' ? 'md' : 'sm'}
			href={cta.href}
			onclick={cta.onclick}
		>
			{cta.label}
		</Button>
	{/if}
</div>

<style>
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 16px;
		padding: 48px 24px;
		width: 100%;
	}

	.empty--sm { padding: 32px 16px; gap: 12px; }
	.empty--lg { padding: 80px 32px; gap: 20px; }

	.empty__icon {
		color: var(--text-subtle);
		display: flex;
	}

	.empty__body {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: 340px;
	}

	.empty__title {
		font-size: 15px;
		font-weight: 600;
		color: var(--text-heading);
		margin: 0;
	}

	.empty--sm .empty__title { font-size: 13px; }
	.empty--lg .empty__title { font-size: 18px; }

	.empty__description {
		font-size: 13px;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
