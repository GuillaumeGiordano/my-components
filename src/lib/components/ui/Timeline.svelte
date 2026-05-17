<script lang="ts">
	import type { Component } from 'svelte';

	type TimelineItem = {
		title: string;
		description?: string;
		date?: string;
		icon?: Component;
		variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
	};

	let {
		items,
	}: {
		items: TimelineItem[];
	} = $props();

	const colors: Record<string, string> = {
		default: 'var(--border-strong)',
		primary: 'var(--primary)',
		success: 'var(--success, #22c55e)',
		warning: 'var(--warning, #f59e0b)',
		danger:  'var(--danger, #ef4444)',
	};
</script>

<ol class="timeline">
	{#each items as item, i}
		{@const v = item.variant ?? 'default'}
		{@const ItemIcon = item.icon}
		{@const isLast = i === items.length - 1}

		<li class="timeline-item">
			<!-- Left rail: icon + connector -->
			<div class="timeline-rail">
				<div class="timeline-dot" style:background={colors[v]} style:border-color={colors[v]}>
					{#if ItemIcon}
						<ItemIcon size={12} />
					{/if}
				</div>
				{#if !isLast}
					<div class="timeline-connector"></div>
				{/if}
			</div>

			<!-- Content -->
			<div class="timeline-content" class:timeline-content--last={isLast}>
				<div class="timeline-header">
					<span class="timeline-title">{item.title}</span>
					{#if item.date}
						<span class="timeline-date">{item.date}</span>
					{/if}
				</div>
				{#if item.description}
					<p class="timeline-desc">{item.description}</p>
				{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.timeline-item {
		display: flex;
		gap: 16px;
		align-items: flex-start;
	}

	/* ---- Rail ----------------------------------------------------------- */
	.timeline-rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 2px;
	}

	.timeline-dot {
		width: 28px;
		height: 28px;
		border-radius: var(--radius-full);
		border: 2px solid;
		background: var(--bg-base);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		flex-shrink: 0;
		z-index: 1;
	}

	.timeline-connector {
		width: 2px;
		flex: 1;
		min-height: 20px;
		background: var(--border);
		margin: 4px 0;
	}

	/* ---- Content -------------------------------------------------------- */
	.timeline-content {
		flex: 1;
		padding-bottom: 24px;
	}

	.timeline-content--last { padding-bottom: 0; }

	.timeline-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: 4px;
	}

	.timeline-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-heading);
	}

	.timeline-date {
		font-size: 12px;
		color: var(--text-subtle);
		white-space: nowrap;
	}

	.timeline-desc {
		font-size: 13px;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
