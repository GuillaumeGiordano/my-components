<script lang="ts">
	import { categories } from '$lib/registry';

	const category = categories.find((c) => c.slug === 'layout');
</script>

<svelte:head>
	<title>Layout — My Components</title>
</svelte:head>

<div class="category-page">
	<h1>Layout</h1>
	<p class="subtitle">Composants structurels pour construire des mises en page.</p>

	<div class="component-grid">
		{#each category?.components ?? [] as component}
			<a href="/layout/{component.slug}" class="component-card">
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
		color: #0f172a;
	}

	.subtitle {
		margin-top: -16px;
		color: #64748b;
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
		border: 1px solid #e2e8f0;
		border-radius: 10px;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.component-card:hover {
		border-color: #93c5fd;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
	}

	.component-card h2 {
		font-size: 15px;
		font-weight: 600;
		color: #1e293b;
	}

	.component-card p {
		font-size: 13px;
		color: #64748b;
		line-height: 1.5;
	}
</style>
