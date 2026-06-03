<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';

	let {
		children,
		onLoadMore,
		loading    = false,
		hasMore    = true,
		rootMargin = '200px',
		endLabel   = 'Vous avez tout vu',
	}: {
		children:     Snippet;
		onLoadMore:   () => void | Promise<void>;
		loading?:     boolean;
		hasMore?:     boolean;
		rootMargin?:  string;
		endLabel?:    string;
	} = $props();

	let sentinel: HTMLDivElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading && hasMore) onLoadMore();
			},
			{ rootMargin }
		);
		observer.observe(sentinel);
	});

	onDestroy(() => observer?.disconnect());
</script>

<div class="is-wrap">
	{@render children()}

	<div bind:this={sentinel} class="is-sentinel" aria-live="polite">
		{#if loading}
			<span class="is-spinner" aria-label="Chargement…"></span>
		{:else if !hasMore}
			<span class="is-end">{endLabel}</span>
		{/if}
	</div>
</div>

<style>
	.is-sentinel {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 32px;
		min-height: 80px;
	}

	.is-spinner {
		display: inline-block;
		width: 28px;
		height: 28px;
		border: 2px solid var(--border);
		border-top-color: var(--primary);
		border-radius: 50%;
		animation: is-spin 0.7s linear infinite;
	}

	@keyframes is-spin { to { transform: rotate(360deg); } }

	.is-end {
		font-size: 13px;
		color: var(--text-subtle);
		padding: 6px 16px;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		user-select: none;
	}
</style>
