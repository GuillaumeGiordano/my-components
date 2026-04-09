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
				<a href="/{category.slug}" class="category-card">
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
		color: #0f172a;
	}

	.subtitle {
		color: #64748b;
		font-size: 15px;
		margin-top: -16px;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 64px 24px;
		border: 2px dashed #e2e8f0;
		border-radius: 12px;
		text-align: center;
		color: #64748b;
	}

	.empty-icon {
		font-size: 48px;
		margin-bottom: 8px;
	}

	.hint {
		font-size: 13px;
		color: #94a3b8;
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
		border: 1px solid #e2e8f0;
		border-radius: 10px;
		text-decoration: none;
		color: inherit;
		transition: box-shadow 0.15s ease, border-color 0.15s ease;
	}

	.category-card:hover {
		border-color: #93c5fd;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
	}

	.category-card h2 {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
	}

	.count {
		font-size: 12px;
		color: #94a3b8;
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
		color: #475569;
	}

	.more {
		color: #94a3b8;
		font-style: italic;
	}
</style>
