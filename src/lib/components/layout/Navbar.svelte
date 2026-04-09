<script lang="ts">
	import { Menu, X } from '@lucide/svelte';

	type NavLink = { label: string; href: string };

	let {
		brand = 'Brand',
		links = [] as NavLink[],
		ctaLabel = '',
		ctaHref = '#'
	}: {
		brand?: string;
		links?: NavLink[];
		ctaLabel?: string;
		ctaHref?: string;
	} = $props();

	let menuOpen = $state(false);
</script>

<header class="navbar">
	<div class="navbar-inner">
		<a href="/" class="navbar-brand">{brand}</a>

		<nav class="navbar-links" aria-label="Navigation principale">
			{#each links as link}
				<a href={link.href} class="nav-link">{link.label}</a>
			{/each}
		</nav>

		<div class="navbar-actions">
			{#if ctaLabel}
				<a href={ctaHref} class="btn-cta">{ctaLabel}</a>
			{/if}

			<button
				class="hamburger"
				aria-label="Toggle menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<X size={20} />
				{:else}
					<Menu size={20} />
				{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="mobile-menu" aria-label="Navigation mobile">
			{#each links as link}
				<a href={link.href} class="mobile-link" onclick={() => (menuOpen = false)}>{link.label}</a>
			{/each}
			{#if ctaLabel}
				<a href={ctaHref} class="mobile-cta">{ctaLabel}</a>
			{/if}
		</nav>
	{/if}
</header>

<style>
	.navbar {
		background: var(--bg-base);
		border-bottom: 1px solid var(--border);
		position: relative;
		transition:
			background var(--transition-base),
			border-color var(--transition-base);
	}

	.navbar-inner {
		display: flex;
		align-items: center;
		gap: 32px;
		padding: 0 24px;
		height: 60px;
	}

	.navbar-brand {
		font-size: 18px;
		font-weight: 700;
		color: var(--text-heading);
		text-decoration: none;
		flex-shrink: 0;
		transition: color var(--transition-fast);
	}

	.navbar-links {
		display: flex;
		gap: 4px;
		flex: 1;
	}

	.nav-link {
		padding: 6px 12px;
		font-size: 14px;
		color: var(--text-muted);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	.nav-link:hover {
		background: var(--bg-muted);
		color: var(--text-base);
	}

	.navbar-actions {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-left: auto;
	}

	.btn-cta {
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 500;
		color: var(--primary-fg);
		background: var(--primary);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: background var(--transition-fast);
	}

	.btn-cta:hover {
		background: var(--primary-hover);
	}

	.hamburger {
		display: none;
		align-items: center;
		justify-content: center;
		padding: 6px;
		background: transparent;
		border: none;
		cursor: pointer;
		border-radius: var(--radius-md);
		color: var(--text-muted);
		transition: color var(--transition-fast), background var(--transition-fast);
	}

	.hamburger:hover {
		color: var(--text-base);
		background: var(--bg-muted);
	}

	.mobile-menu {
		display: flex;
		flex-direction: column;
		padding: 8px 16px 16px;
		border-top: 1px solid var(--border);
		gap: 2px;
		background: var(--bg-base);
	}

	.mobile-link {
		padding: 10px 8px;
		font-size: 15px;
		color: var(--text-muted);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	.mobile-link:hover {
		background: var(--bg-muted);
		color: var(--text-base);
	}

	.mobile-cta {
		margin-top: 8px;
		padding: 10px;
		font-size: 15px;
		font-weight: 500;
		color: var(--primary-fg);
		background: var(--primary);
		text-decoration: none;
		border-radius: var(--radius-md);
		text-align: center;
		transition: background var(--transition-fast);
	}

	.mobile-cta:hover {
		background: var(--primary-hover);
	}

	@media (max-width: 640px) {
		.navbar-links,
		.btn-cta {
			display: none;
		}

		.hamburger {
			display: flex;
		}
	}
</style>
