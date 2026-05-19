<script lang="ts">
	let {
		label,
		orientation = 'horizontal',
		align = 'center',
	}: {
		label?: string;
		orientation?: 'horizontal' | 'vertical';
		align?: 'left' | 'center' | 'right';
	} = $props();
</script>

{#if orientation === 'vertical'}
	<div class="divider divider--vertical" role="separator" aria-orientation="vertical"></div>
{:else if label}
	<div class="divider divider--labeled divider--{align}" role="separator">
		<span class="divider__line"></span>
		<span class="divider__label">{label}</span>
		<span class="divider__line"></span>
	</div>
{:else}
	<hr class="divider" role="separator" />
{/if}

<style>
	.divider {
		border: none;
		border-top: 1px solid var(--border);
		margin: 0;
		width: 100%;
	}

	.divider--vertical {
		border-top: none;
		border-left: 1px solid var(--border);
		width: 1px;
		height: 100%;
		flex-shrink: 0;
		align-self: stretch;
	}

	/* Labeled variant */
	.divider--labeled {
		display: flex;
		align-items: center;
		gap: 12px;
		border: none;
		width: 100%;
	}

	.divider__line {
		flex: 1;
		height: 1px;
		background: var(--border);
	}

	.divider--left  .divider__line:first-child { flex: 0 0 24px; }
	.divider--right .divider__line:last-child  { flex: 0 0 24px; }

	.divider__label {
		font-size: 12px;
		color: var(--text-subtle);
		white-space: nowrap;
		font-weight: 500;
	}
</style>
