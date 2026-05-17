<script lang="ts">
	import { Copy, Check } from '@lucide/svelte';

	let {
		text,
		label = 'Copier',
		size = 'md',
		variant = 'outline',
	}: {
		text: string;
		label?: string;
		size?: 'sm' | 'md';
		variant?: 'outline' | 'ghost';
	} = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => { copied = false; }, 2000);
	}
</script>

<button
	class="copy-btn copy-btn--{size} copy-btn--{variant}"
	class:copy-btn--done={copied}
	onclick={copy}
	aria-label={copied ? 'Copié !' : label}
	title={copied ? 'Copié !' : label}
>
	{#if copied}
		<Check size={size === 'sm' ? 13 : 15} />
		<span>Copié</span>
	{:else}
		<Copy size={size === 'sm' ? 13 : 15} />
		<span>{label}</span>
	{/if}
</button>

<style>
	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border-radius: var(--radius-md);
		font-weight: 500;
		cursor: pointer;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			color var(--transition-fast);
		white-space: nowrap;
	}

	.copy-btn--md {
		height: 36px;
		padding: 0 12px;
		font-size: 13px;
	}

	.copy-btn--sm {
		height: 28px;
		padding: 0 8px;
		font-size: 12px;
	}

	.copy-btn--outline {
		border: 1px solid var(--border);
		background: var(--bg-base);
		color: var(--text-muted);
	}

	.copy-btn--outline:hover {
		border-color: var(--border-strong);
		color: var(--text-base);
		background: var(--bg-subtle);
	}

	.copy-btn--ghost {
		border: 1px solid transparent;
		background: none;
		color: var(--text-subtle);
	}

	.copy-btn--ghost:hover {
		background: var(--bg-hover);
		color: var(--text-base);
	}

	.copy-btn--done {
		color: var(--success, #059669) !important;
		border-color: color-mix(in srgb, var(--success, #059669) 30%, transparent) !important;
		background: color-mix(in srgb, var(--success, #059669) 8%, transparent) !important;
	}
</style>
