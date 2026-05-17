<script lang="ts">
	import { ChevronRight, Home } from '@lucide/svelte';

	type BreadcrumbItem = {
		label: string;
		href?: string;
	};

	let {
		items,
		showHome = false,
		maxItems,
	}: {
		items: BreadcrumbItem[];
		showHome?: boolean;
		maxItems?: number; // collapses middle items with "..." if exceeded
	} = $props();

	const visible = $derived(() => {
		if (!maxItems || items.length <= maxItems) return items;
		// Always show first + last (maxItems - 1), collapse the middle
		const keep = Math.max(1, maxItems - 1);
		return [
			...items.slice(0, 1),
			{ label: '…', href: undefined },
			...items.slice(-(keep - 1)),
		];
	});
</script>

<nav aria-label="Fil d'Ariane">
	<ol class="breadcrumb">
		{#if showHome}
			<li class="crumb">
				<a href="/" class="crumb-link crumb-home" aria-label="Accueil">
					<Home size={14} />
				</a>
				<ChevronRight size={14} class="separator" aria-hidden="true" />
			</li>
		{/if}

		{#each visible() as item, i}
			{@const isLast = i === visible().length - 1}
			<li class="crumb" aria-current={isLast ? 'page' : undefined}>
				{#if isLast || !item.href}
					<span class="crumb-current">{item.label}</span>
				{:else}
					<a href={item.href} class="crumb-link">{item.label}</a>
					<ChevronRight size={14} class="separator" aria-hidden="true" />
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumb {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 2px;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 13px;
	}

	.crumb {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.crumb-link {
		color: var(--text-muted);
		text-decoration: none;
		padding: 2px 4px;
		border-radius: var(--radius-sm);
		transition: color var(--transition-fast), background var(--transition-fast);
		display: flex;
		align-items: center;
	}

	.crumb-link:hover {
		color: var(--primary);
		background: var(--primary-subtle);
	}

	.crumb-home {
		padding: 3px 5px;
		color: var(--text-subtle);
	}

	.crumb-current {
		color: var(--text-base);
		font-weight: 500;
		padding: 2px 4px;
	}

	:global(.separator) {
		color: var(--text-subtle);
		flex-shrink: 0;
	}
</style>
