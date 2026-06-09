<script lang="ts">
	import Button from '../buttons/Button.svelte';
	import Badge from '../ui/Badge.svelte';
	import { onMount, onDestroy } from 'svelte';

	let {
		badge = 'Bientôt disponible',
		title = 'Quelque chose de grand arrive',
		description = "Notre équipe travaille dur pour vous offrir une expérience exceptionnelle. Laissez-nous votre e-mail pour être parmi les premiers informés.",
		launchDate = new Date('2026-07-01'),
		emailPlaceholder = 'Votre e-mail…',
		ctaLabel = "M'inscrire",
		onsubmit,
		withBackground = "",
	}: {
		badge?: string;
		title?: string;
		description?: string;
		launchDate?: Date; // defaults to 2026-07-01
		emailPlaceholder?: string;
		ctaLabel?: string;
		onsubmit?: (email: string) => void;
		withBackground?: "bg-base" | "";
	} = $props();


	let email   = $state('');
	let sent    = $state(false);

	// Countdown
	type Countdown = { days: number; hours: number; minutes: number; seconds: number };
	let countdown = $state<Countdown | null>(null);
	let interval: ReturnType<typeof setInterval>;

	function computeCountdown() {
		if (!launchDate) return;
		const diff = launchDate.getTime() - Date.now();
		if (diff <= 0) { countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 }; return; }
		countdown = {
			days:    Math.floor(diff / 86400000),
			hours:   Math.floor((diff % 86400000) / 3600000),
			minutes: Math.floor((diff % 3600000)  / 60000),
			seconds: Math.floor((diff % 60000)    / 1000),
		};
	}

	onMount(() => {
		computeCountdown();
		if (launchDate) interval = setInterval(computeCountdown, 1000);
	});

	onDestroy(() => clearInterval(interval));

	function pad(n: number) { return String(n).padStart(2, '0'); }

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email) return;
		onsubmit?.(email);
		sent = true;
	}
</script>

<section class="cs-section {withBackground}">
	<div class="cs-inner">
		{#if badge}
			<Badge label={badge} variant="primary" dot />
		{/if}

		<h1 class="cs-title">{title}</h1>
		<p class="cs-desc">{description}</p>

		{#if countdown}
			<div class="countdown" aria-label="Compte à rebours">
				{#each [
					{ value: countdown.days,    label: 'Jours' },
					{ value: countdown.hours,   label: 'Heures' },
					{ value: countdown.minutes, label: 'Minutes' },
					{ value: countdown.seconds, label: 'Secondes' },
				] as unit, i}
					<div class="count-unit">
						<span class="count-value">{pad(unit.value)}</span>
						<span class="count-label">{unit.label}</span>
					</div>
					{#if i < 3}<span class="count-sep">:</span>{/if}
				{/each}
			</div>
		{/if}

		{#if !sent}
			<form class="cs-form" onsubmit={handleSubmit}>
				<input
					type="email"
					class="cs-email"
					bind:value={email}
					placeholder={emailPlaceholder}
					required
					aria-label="Adresse e-mail"
				/>
				<Button variant="primary" type="submit">{ctaLabel}</Button>
			</form>
		{:else}
			<p class="cs-sent">Merci ! Nous vous contacterons dès le lancement.</p>
		{/if}
	</div>
</section>

<style>
	.cs-section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 64px 24px;
		background: var(--bg-base);
	}

	.cs-inner {
		text-align: center;
		max-width: 560px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.cs-title {
		font-size: clamp(28px, 5vw, 48px);
		font-weight: 800;
		color: var(--text-heading);
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin: 0;
	}

	.cs-desc {
		font-size: 16px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0;
	}

	/* Countdown */
	.countdown {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.count-unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		min-width: 64px;
	}

	.count-value {
		font-size: clamp(28px, 5vw, 44px);
		font-weight: 800;
		color: var(--primary);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.count-label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-subtle);
	}

	.count-sep {
		font-size: 32px;
		font-weight: 700;
		color: var(--text-subtle);
		margin-bottom: 18px;
	}

	/* Form */
	.cs-form {
		display: flex;
		gap: 10px;
		width: 100%;
		max-width: 420px;
	}

	.cs-email {
		flex: 1;
		height: 42px;
		padding: 0 14px;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--bg-base);
		color: var(--text-base);
		font-size: 14px;
		outline: none;
		transition: border-color var(--transition-fast);
	}

	.cs-email:focus { border-color: var(--primary); }
	.cs-email::placeholder { color: var(--text-subtle); }

	.cs-sent {
		font-size: 14px;
		color: var(--success, #059669);
		font-weight: 500;
		margin: 0;
	}

	@media (max-width: 480px) {
		.cs-form { flex-direction: column; }
		.count-unit { min-width: 48px; }
	}

	.withBackground { background: var(--bg-base); }
</style>
