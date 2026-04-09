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

		<!-- Desktop nav -->
		<nav class="navbar-links" aria-label="Navigation principale">
			{#each links as link}
				<a href={link.href} class="nav-link">{link.label}</a>
			{/each}
		</nav>

		<div class="navbar-actions">
			{#if ctaLabel}
				<a href={ctaHref} class="btn-cta">{ctaLabel}</a>
			{/if}

			<!-- Hamburger (mobile) -->
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

	<!-- Mobile menu -->
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
		background: #fff;
		border-bottom: 1px solid #e2e8f0;
		position: relative;
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
		color: #1e293b;
		text-decoration: none;
		flex-shrink: 0;
	}

	.navbar-links {
		display: flex;
		gap: 4px;
		flex: 1;
	}

	.nav-link {
		padding: 6px 12px;
		font-size: 14px;
		color: #475569;
		text-decoration: none;
		border-radius: 6px;
		transition: background 0.15s, color 0.15s;
	}

	.nav-link:hover {
		background: #f1f5f9;
		color: #1e293b;
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
		color: #fff;
		background: #2563eb;
		text-decoration: none;
		border-radius: 6px;
		transition: background 0.15s;
	}

	.btn-cta:hover {
		background: #1d4ed8;
	}

	.hamburger {
		display: none;
		align-items: center;
		justify-content: center;
		padding: 6px;
		background: transparent;
		border: none;
		cursor: pointer;
		border-radius: 4px;
		color: #475569;
		transition: color 0.15s, background 0.15s;
	}

	.hamburger:hover {
		color: #1e293b;
		background: #f1f5f9;
	}

	.mobile-menu {
		display: flex;
		flex-direction: column;
		padding: 8px 16px 16px;
		border-top: 1px solid #f1f5f9;
		gap: 2px;
	}

	.mobile-link {
		padding: 10px 8px;
		font-size: 15px;
		color: #475569;
		text-decoration: none;
		border-radius: 6px;
		transition: background 0.15s;
	}

	.mobile-link:hover {
		background: #f1f5f9;
		color: #1e293b;
	}

	.mobile-cta {
		margin-top: 8px;
		padding: 10px;
		font-size: 15px;
		font-weight: 500;
		color: #fff;
		background: #2563eb;
		text-decoration: none;
		border-radius: 6px;
		text-align: center;
	}

	@media (max-width: 640px) {
		.navbar-links {
			display: none;
		}

		.btn-cta {
			display: none;
		}

		.hamburger {
			display: flex;
		}
	}
</style>
