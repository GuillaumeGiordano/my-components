<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Switch from '$lib/components/forms/Switch.svelte';
	import '$lib/styles/demo-page.css';

	let notifications = $state(true);
	let marketing = $state(false);
</script>

<svelte:head><title>Switch — Formulaires — My Components</title></svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Switch</h1>
		<p>Bouton bascule utilisant <code>role="switch"</code> pour une sémantique ARIA correcte.</p>
	</div>

	<section class="variant">
		<h2>États de base</h2>
		<ComponentPreview>
			<div class="demo-col">
				<Switch label="Activer les notifications" bind:checked={notifications} />
				<Switch label="Emails marketing" bind:checked={marketing} hint="Recevez nos offres et actualités." />
				<Switch label="Mode maintenance" />
			</div>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Label à gauche</h2>
		<ComponentPreview>
			<div class="demo-col">
				<Switch label="Notifications push" labelPosition="left" bind:checked={notifications} />
				<Switch label="Synchronisation auto" labelPosition="left" />
			</div>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>États spéciaux</h2>
		<ComponentPreview>
			<div class="demo-col">
				<Switch label="Champ obligatoire" required />
				<Switch label="Avec erreur" error="Ce paramètre est requis pour continuer." />
				<Switch label="Désactivé (inactif)" disabled />
				<Switch label="Désactivé (actif)" disabled checked />
			</div>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props</h2>
		<table>
			<thead><tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td>label</td><td>string</td><td>—</td><td>Libellé du switch</td></tr>
				<tr><td>checked</td><td>boolean</td><td>false</td><td>État coché (bindable)</td></tr>
				<tr><td>labelPosition</td><td>'left' | 'right'</td><td>'right'</td><td>Position du libellé</td></tr>
				<tr><td>hint</td><td>string</td><td>''</td><td>Texte d'aide</td></tr>
				<tr><td>error</td><td>string</td><td>''</td><td>Message d'erreur</td></tr>
				<tr><td>required</td><td>boolean</td><td>false</td><td>Champ obligatoire (ARIA)</td></tr>
				<tr><td>disabled</td><td>boolean</td><td>false</td><td>Désactive le switch</td></tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.demo-col {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		max-width: 400px;
	}

	code {
		font-family: var(--font-mono);
		font-size: 13px;
		background: var(--bg-muted);
		padding: 1px 5px;
		border-radius: var(--radius-sm);
	}
</style>
