<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { theme } from '$lib/theme.svelte';
</script>

<button
	class="toggle"
	aria-label={theme.isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
	onclick={theme.toggle}
>
	{#if theme.isDark}
		<Sun size={18} />
	{:else}
		<Moon size={18} />
	{/if}
</button>

<style>
	.toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--bg-base);
		color: var(--text-muted);
		cursor: pointer;
		transition:
			background var(--transition-fast),
			color var(--transition-fast),
			border-color var(--transition-fast);
	}

	.toggle:hover {
		background: var(--bg-hover);
		color: var(--text-base);
	}
</style>
