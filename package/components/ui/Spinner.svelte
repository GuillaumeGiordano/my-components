<script lang="ts">
	let {
		size = 'md',
		color = 'primary',
	}: {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		color?: 'primary' | 'white' | 'muted';
	} = $props();
</script>

<span
	class="spinner spinner--{size} spinner--{color}"
	role="status"
	aria-label="Chargement"
>
	<span class="sr-only">Chargement…</span>
</span>

<style>
	.spinner {
		display: inline-block;
		border-radius: 50%;
		border-style: solid;
		border-color: transparent;
		border-top-color: currentColor;
		animation: spin 0.65s linear infinite;
		flex-shrink: 0;
	}

	.spinner--xs { width: 12px; height: 12px; border-width: 1.5px; }
	.spinner--sm { width: 16px; height: 16px; border-width: 2px; }
	.spinner--md { width: 24px; height: 24px; border-width: 2px; }
	.spinner--lg { width: 36px; height: 36px; border-width: 3px; }
	.spinner--xl { width: 48px; height: 48px; border-width: 3px; }

	.spinner--primary { color: var(--primary); }
	.spinner--white   { color: #fff; }
	.spinner--muted   { color: var(--text-subtle); }

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		/* margin:-1px + clip-path are what actually keep the box out of the
		   layout: clip:rect() alone hides the text but the 1px box could still
		   widen the document on mobile (visually-hidden pattern). */
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

	@keyframes spin { to { transform: rotate(360deg); } }
</style>
