<script lang="ts">
	import { categories } from '$lib/registry';
</script>

<svelte:head>
	<title>My Components</title>
</svelte:head>

<div class="home">
	<h1>Ma bibliothèque de composants</h1>
	<p class="subtitle">Sélectionne une catégorie dans la barre latérale pour explorer les composants.</p>

	{#if categories.length === 0}
		<div class="empty-state">
			<span class="empty-icon">🧩</span>
			<p>Aucun composant pour l'instant.</p>
			<p class="hint">Les composants apparaîtront ici au fur et à mesure qu'on les crée ensemble.</p>
		</div>
	{:else}
		<div class="category-grid">
			{#each categories as category}
				<a href="/showroom/{category.baseSlug ?? category.slug}" class="category-card">
					<h2>{category.label}</h2>
					<span class="count">{category.components.length} composant{category.components.length > 1 ? 's' : ''}</span>
					<ul>
						{#each category.components.slice(0, 4) as component}
							<li>{component.label}</li>
						{/each}
						{#if category.components.length > 4}
							<li class="more">+{category.components.length - 4} autres</li>
						{/if}
					</ul>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	h1 {
		font-size: 28px;
		font-weight: 700;
		color: var(--text-heading);
	}

	.subtitle {
		color: var(--text-muted);
		font-size: 15px;
		margin-top: -16px;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 64px 24px;
		border: 2px dashed var(--border);
		border-radius: var(--radius-xl);
		text-align: center;
		color: var(--text-muted);
	}

	.empty-icon {
		font-size: 48px;
		margin-bottom: 8px;
	}

	.hint {
		font-size: 13px;
		color: var(--text-subtle);
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
	}

	.category-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		text-decoration: none;
		color: inherit;
		background: var(--bg-base);
		transition:
			box-shadow var(--transition-fast),
			border-color var(--transition-fast),
			background var(--transition-base);
	}

	.category-card:hover {
		border-color: var(--primary);
		box-shadow: var(--shadow-md);
	}

	.category-card h2 {
		font-size: 16px;
		font-weight: 600;
		color: var(--text-base);
	}

	.count {
		font-size: 12px;
		color: var(--text-subtle);
	}

	.category-card ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: 4px;
	}

	.category-card li {
		font-size: 13px;
		color: var(--text-muted);
	}

	.more {
		color: var(--text-subtle);
		font-style: italic;
	}
</style>
