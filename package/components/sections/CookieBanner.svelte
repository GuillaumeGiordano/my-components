<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import { Cookie } from '@lucide/svelte';

	let {
		title = 'Ce site utilise des cookies',
		description = "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser les contenus. Vous pouvez accepter ou refuser les cookies non essentiels.",
		acceptLabel = 'Tout accepter',
		declineLabel = 'Refuser',
		customizeLabel = 'Personnaliser',
		privacyHref,
		cookieKey = 'cookie-consent',
		position = 'bottom',
		onaccept,
		ondecline,
		oncustomize,
	}: {
		title?: string;
		description?: string;
		acceptLabel?: string;
		declineLabel?: string;
		customizeLabel?: string;
		privacyHref?: string;
		cookieKey?: string;
		position?: 'bottom' | 'bottom-left' | 'bottom-right';
		onaccept?: () => void;
		ondecline?: () => void;
		oncustomize?: () => void;
	} = $props();

	// Read stored consent on mount
	let visible = $state(
		typeof localStorage !== 'undefined'
			? !localStorage.getItem(cookieKey)
			: false
	);
	let leaving = $state(false);

	function dismiss(choice: 'accepted' | 'declined') {
		leaving = true;
		setTimeout(() => {
			visible = false;
			localStorage.setItem(cookieKey, choice);
		}, 280);
	}

	function accept() {
		dismiss('accepted');
		onaccept?.();
	}

	function decline() {
		dismiss('declined');
		ondecline?.();
	}
</script>

{#if visible}
	<div class="cookie cookie--{position}" class:cookie--leaving={leaving} role="dialog" aria-label="Consentement aux cookies">
		<div class="cookie__inner">
			<div class="cookie__icon">
				<Cookie size={22} />
			</div>
			<div class="cookie__body">
				<p class="cookie__title">{title}</p>
				<p class="cookie__desc">
					{description}
					{#if privacyHref}
						<a href={privacyHref} class="cookie__link" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>
					{/if}
				</p>
			</div>
			<div class="cookie__actions">
				<Button variant="outline" size="sm" onclick={decline}>{declineLabel}</Button>
				{#if oncustomize}
					<Button variant="ghost" size="sm" onclick={oncustomize}>{customizeLabel}</Button>
				{/if}
				<Button variant="primary" size="sm" onclick={accept}>{acceptLabel}</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.cookie {
		position: fixed;
		z-index: 9998;
		left: 16px;
		right: 16px;
		bottom: 16px;
		max-width: 960px;
		margin: 0 auto;
		animation: cookie-in 0.28s cubic-bezier(0.34, 1.3, 0.64, 1) both;
	}

	.cookie--bottom-left  { right: auto; max-width: 480px; margin: 0; }
	.cookie--bottom-right { left: auto;  max-width: 480px; margin: 0; }

	.cookie--leaving {
		animation: cookie-out 0.24s ease forwards;
	}

	.cookie__inner {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 20px 24px;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-lg);
		flex-wrap: wrap;
	}

	.cookie__icon {
		color: var(--primary);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.cookie__body {
		flex: 1;
		min-width: 200px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.cookie__title {
		font-size: 14px;
		font-weight: 700;
		color: var(--text-heading);
		margin: 0;
	}

	.cookie__desc {
		font-size: 13px;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.cookie__link {
		color: var(--primary);
		text-decoration: underline;
		margin-left: 4px;
	}

	.cookie__actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
		flex-wrap: wrap;
	}

	@keyframes cookie-in {
		from { transform: translateY(calc(100% + 24px)); }
		to   { transform: none; }
	}

	@keyframes cookie-out {
		from { transform: none; }
		to   { transform: translateY(calc(100% + 24px)); }
	}

	@media (max-width: 640px) {
		.cookie__actions { width: 100%; justify-content: flex-end; }
	}
</style>
