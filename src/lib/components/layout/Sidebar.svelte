<script lang="ts">
	import type { Component } from 'svelte';
	import { ChevronLeft } from '@lucide/svelte';

	type SidebarItem = { label: string; href: string; icon?: Component };
	type SidebarGroup = { label: string; items: SidebarItem[] };

	let {
		groups = [] as SidebarGroup[],
		collapsed = $bindable(false),
		activeHref = ''
	}: {
		groups?: SidebarGroup[];
		collapsed?: boolean;
		activeHref?: string;
	} = $props();
</script>

<aside class="sidebar" class:collapsed>
	<button
		class="collapse-btn"
		aria-label={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
		onclick={() => (collapsed = !collapsed)}
	>
		<ChevronLeft size={14} class={collapsed ? 'rotated' : ''} />
	</button>

	<nav class="sidebar-nav">
		{#each groups as group}
			<div class="group">
				{#if !collapsed}
					<span class="group-label">{group.label}</span>
				{/if}

				{#each group.items as item}
					<a
						href={item.href}
						class="sidebar-link"
						class:active={activeHref === item.href}
						title={collapsed ? item.label : undefined}
					>
						{#if item.icon}
							<span class="item-icon">
								<svelte:component this={item.icon} size={16} />
							</span>
						{/if}
						{#if !collapsed}
							<span class="item-label">{item.label}</span>
						{/if}
					</a>
				{/each}
			</div>
		{/each}
	</nav>
</aside>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		width: 220px;
		background: #f8fafc;
		border-right: 1px solid #e2e8f0;
		padding: 16px 0;
		transition: width 0.25s ease;
		position: relative;
		min-height: 300px;
	}

	.sidebar.collapsed {
		width: 56px;
	}

	.collapse-btn {
		position: absolute;
		top: 12px;
		right: -12px;
		width: 24px;
		height: 24px;
		background: #fff;
		border: 1px solid #e2e8f0;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #64748b;
		z-index: 1;
		transition: color 0.15s, box-shadow 0.15s;
		padding: 0;
	}

	.collapse-btn:hover {
		color: #1e293b;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}

	.collapse-btn :global(svg) {
		transition: transform 0.25s ease;
	}

	.sidebar.collapsed .collapse-btn :global(svg) {
		transform: rotate(180deg);
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 8px 8px;
		overflow: hidden;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.group-label {
		padding: 4px 8px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #94a3b8;
		white-space: nowrap;
	}

	.sidebar-link {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px;
		font-size: 14px;
		color: #475569;
		text-decoration: none;
		border-radius: 6px;
		white-space: nowrap;
		transition: background 0.15s, color 0.15s;
		min-width: 0;
	}

	.sidebar-link:hover {
		background: #e2e8f0;
		color: #1e293b;
	}

	.sidebar-link.active {
		background: #dbeafe;
		color: #1d4ed8;
		font-weight: 500;
	}

	.item-icon {
		flex-shrink: 0;
		width: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item-label {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
