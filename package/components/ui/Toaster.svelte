<script lang="ts">
	import { toast, type Toast } from '../../stores/toast.svelte';
	import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from '@lucide/svelte';

	const icons = {
		success: CheckCircle,
		error: AlertCircle,
		warning: AlertTriangle,
		info: Info,
	};

	// Track which toasts are animating out
	let dismissing = $state<Set<string>>(new Set());

	function dismiss(t: Toast) {
		dismissing = new Set([...dismissing, t.id]);
	}

	function handleAnimationEnd(t: Toast) {
		if (dismissing.has(t.id)) {
			toast.remove(t.id);
			dismissing = new Set([...dismissing].filter((id) => id !== t.id));
		}
	}
</script>

<div class="toaster" aria-live="polite" aria-atomic="false">
	{#each toast.list as t (t.id)}
		{@const ToastIcon = icons[t.variant]}
		<div
			class="toast toast--{t.variant}"
			class:toast--dismissing={dismissing.has(t.id)}
			role={t.variant === 'error' ? 'alert' : 'status'}
			onanimationend={() => handleAnimationEnd(t)}
		>
			<div class="toast__icon">
				<ToastIcon size={18} />
			</div>
			<div class="toast__body">
				{#if t.title}
					<p class="toast__title">{t.title}</p>
				{/if}
				<p class="toast__message">{t.message}</p>
			</div>
			<button class="toast__close" onclick={() => dismiss(t)} aria-label="Fermer">
				<X size={15} />
			</button>
		</div>
	{/each}
</div>

<style>
	.toaster {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 360px;
		max-width: calc(100vw - 32px);
		pointer-events: none;
	}

	.toast {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 16px;
		border-radius: var(--radius-md);
		border: 1px solid transparent;
		box-shadow: var(--shadow-lg);
		background: var(--bg-base);
		pointer-events: all;
		animation: toast-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	.toast--dismissing {
		animation: toast-out 0.18s ease forwards;
	}

	/* Variant colors — left accent strip via border-left */
	.toast--info    { border-left: 4px solid var(--info);    color: var(--info-fg); }
	.toast--success { border-left: 4px solid var(--success); color: var(--success-fg); }
	.toast--warning { border-left: 4px solid var(--warning); color: var(--warning-fg); }
	.toast--error   { border-left: 4px solid var(--danger);  color: var(--danger-subtle-fg); }

	.toast__icon {
		flex-shrink: 0;
		margin-top: 1px;
		display: flex;
	}

	.toast__body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.toast__title {
		font-size: 14px;
		font-weight: 600;
		margin: 0;
		color: var(--text-heading);
	}

	.toast__message {
		font-size: 13px;
		color: var(--text-muted);
		margin: 0;
		line-height: 1.5;
	}

	.toast__close {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: var(--radius-sm);
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-subtle);
		padding: 0;
		transition: background var(--transition-fast);
		margin-top: 1px;
	}

	.toast__close:hover {
		background: var(--bg-hover);
		color: var(--text-base);
	}

	@keyframes toast-in {
		from { transform: translateX(calc(100% + 24px)); }
		to   { transform: none; }
	}

	@keyframes toast-out {
		from { transform: none; }
		to   { transform: translateX(calc(100% + 24px)); }
	}

	@media (max-width: 480px) {
		.toaster {
			bottom: 16px;
			right: 16px;
			left: 16px;
			width: auto;
		}

		@keyframes toast-in {
			from { transform: translateY(calc(100% + 16px)); }
			to   { transform: none; }
		}

		@keyframes toast-out {
			from { transform: none; }
			to   { transform: translateY(calc(100% + 16px)); }
		}
	}
</style>
