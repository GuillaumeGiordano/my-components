<script lang="ts">
	import { Star } from '@lucide/svelte';

	let {
		value = $bindable(0),
		max = 5,
		readonly = false,
		size = 'md',
		onchange,
	}: {
		value?: number;
		max?: number;
		readonly?: boolean;
		size?: 'sm' | 'md' | 'lg';
		onchange?: (v: number) => void;
	} = $props();

	let hovered = $state(0);

	const sizes = { sm: 16, md: 20, lg: 28 };
	const px = $derived(sizes[size]);

	function set(v: number) {
		if (readonly) return;
		value = v;
		onchange?.(v);
	}
</script>

<div
	class="rating rating--{size}"
	class:rating--readonly={readonly}
	role={readonly ? 'img' : 'radiogroup'}
	aria-label={readonly ? `Note : ${value} sur ${max}` : 'Choisir une note'}
>
	{#each { length: max } as _, i}
		{@const star = i + 1}
		{@const filled = star <= (hovered || value)}
		<button
			class="star"
			class:star--filled={filled}
			onclick={() => set(star)}
			onmouseenter={() => { if (!readonly) hovered = star; }}
			onmouseleave={() => { hovered = 0; }}
			disabled={readonly}
			aria-label="{star} étoile{star > 1 ? 's' : ''}"
			tabindex={readonly ? -1 : 0}
		>
			<Star
				size={px}
				fill={filled ? 'currentColor' : 'none'}
				stroke-width={1.8}
			/>
		</button>
	{/each}
</div>

<style>
	.rating {
		display: inline-flex;
		align-items: center;
		gap: 2px;
	}

	.star {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		padding: 2px;
		cursor: pointer;
		color: var(--text-subtle);
		transition: color var(--transition-fast), transform var(--transition-fast);
		border-radius: var(--radius-sm);
	}

	.star:hover, .star--filled {
		color: #f59e0b;
	}

	.star:hover {
		transform: scale(1.15);
	}

	.star:disabled {
		cursor: default;
	}

	.star:disabled:hover {
		transform: none;
	}

	.rating--readonly { gap: 1px; }
</style>
