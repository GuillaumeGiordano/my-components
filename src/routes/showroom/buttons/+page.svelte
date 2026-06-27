<script lang="ts">
	import { categories } from '$lib/registry';

	const category = categories.find((c) => c.slug === 'buttons');
</script>

<svelte:head>
	<title>Buttons — My Components</title>
</svelte:head>

<div class="category-page">
	<h1>Buttons</h1>
	<p class="subtitle">Composants de boutons interactifs.</p>

	<div class="component-grid">
		{#each category?.components ?? [] as component}
			<a href="/buttons/{component.slug}" class="component-card">
				<h2>{component.label}</h2>
				{#if component.description}
					<p>{component.description}</p>
				{/if}
			</a>
		{/each}
	</div>
</div>

<style>
	.category-page {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	h1 {
		font-size: 26px;
		font-weight: 700;
		color: var(--text-heading);
	}

	.subtitle {
		margin-top: -16px;
		color: var(--text-muted);
		font-size: 15px;
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}

	.component-card {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		text-decoration: none;
		color: inherit;
		background: var(--bg-base);
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			background var(--transition-base);
	}

	.component-card:hover {
		border-color: var(--primary);
		box-shadow: var(--shadow-md);
	}

	.component-card h2 {
		font-size: 15px;
		font-weight: 600;
		color: var(--text-base);
	}

	.component-card p {
		font-size: 13px;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
