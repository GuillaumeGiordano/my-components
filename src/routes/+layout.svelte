<script lang="ts">
	import { page } from '$app/stores';
	import { categories } from '$lib/registry';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="/" class="logo">🧩 My Components</a>
		</div>

		<nav class="sidebar-nav">
			{#if categories.length === 0}
				<p class="empty-hint">Aucun composant encore.<br />Créons-en ensemble !</p>
			{:else}
				{#each categories as category}
					<div class="nav-group">
						<a
							href="/{category.slug}"
							class="nav-category"
							class:active={$page.url.pathname.startsWith(`/${category.slug}`)}
						>
							{category.label}
						</a>
						{#each category.components as component}
							<a
								href="/{category.slug}/{component.slug}"
								class="nav-component"
								class:active={$page.url.pathname === `/${category.slug}/${component.slug}`}
							>
								{component.label}
							</a>
						{/each}
					</div>
				{/each}
			{/if}
		</nav>
	</aside>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #1e293b;
		background: #fff;
	}

	.app {
		display: flex;
		min-height: 100vh;
	}

	.sidebar {
		width: 240px;
		flex-shrink: 0;
		border-right: 1px solid #e2e8f0;
		background: #f8fafc;
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;
	}

	.sidebar-header {
		padding: 20px 16px 16px;
		border-bottom: 1px solid #e2e8f0;
	}

	.logo {
		font-size: 16px;
		font-weight: 700;
		color: #1e293b;
		text-decoration: none;
		display: block;
	}

	.sidebar-nav {
		padding: 12px 8px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.empty-hint {
		padding: 16px 8px;
		font-size: 13px;
		color: #94a3b8;
		line-height: 1.6;
	}

	.nav-group {
		display: flex;
		flex-direction: column;
		gap: 1px;
		margin-bottom: 8px;
	}

	.nav-category {
		padding: 6px 8px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #64748b;
		text-decoration: none;
		border-radius: 4px;
		transition: background 0.1s;
	}

	.nav-category:hover,
	.nav-category.active {
		background: #e2e8f0;
		color: #1e293b;
	}

	.nav-component {
		padding: 5px 8px 5px 16px;
		font-size: 13px;
		color: #475569;
		text-decoration: none;
		border-radius: 4px;
		transition: background 0.1s;
	}

	.nav-component:hover {
		background: #e2e8f0;
		color: #1e293b;
	}

	.nav-component.active {
		background: #dbeafe;
		color: #1d4ed8;
		font-weight: 500;
	}

	.content {
		flex: 1;
		padding: 32px;
		max-width: 960px;
		overflow-x: hidden;
	}
</style>
