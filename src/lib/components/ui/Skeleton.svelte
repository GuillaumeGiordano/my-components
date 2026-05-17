<script lang="ts">
	let {
		variant = 'rect',
		width,
		height,
		lines = 3,
		circle = false,
	}: {
		variant?: 'rect' | 'text' | 'circle';
		width?: string;
		height?: string;
		lines?: number;  // only for variant="text"
		circle?: boolean; // shorthand for variant="circle"
	} = $props();

	const resolvedVariant = $derived(circle ? 'circle' : variant);
</script>

{#if resolvedVariant === 'text'}
	<div class="skeleton-lines">
		{#each { length: lines } as _, i}
			<div
				class="skeleton"
				style:width={i === lines - 1 ? '65%' : '100%'}
			></div>
		{/each}
	</div>
{:else if resolvedVariant === 'circle'}
	<div
		class="skeleton skeleton--circle"
		style:width={width ?? '40px'}
		style:height={width ?? '40px'}
	></div>
{:else}
	<div
		class="skeleton"
		style:width={width}
		style:height={height ?? '16px'}
		style:border-radius={height ? 'var(--radius-md)' : 'var(--radius-sm)'}
	></div>
{/if}

<style>
	.skeleton {
		background: linear-gradient(
			90deg,
			var(--bg-hover) 25%,
			var(--bg-muted) 50%,
			var(--bg-hover) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.4s ease infinite;
		border-radius: var(--radius-sm);
		flex-shrink: 0;
	}

	.skeleton--circle {
		border-radius: var(--radius-full);
	}

	.skeleton-lines {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	@keyframes shimmer {
		from { background-position: 200% 0; }
		to   { background-position: -200% 0; }
	}
</style>
