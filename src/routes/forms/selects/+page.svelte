<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import SelectMulti from '$lib/components/forms/SelectMulti.svelte';
	import SelectSearch from '$lib/components/forms/SelectSearch.svelte';
	import SelectSearchMulti from '$lib/components/forms/SelectSearchMulti.svelte';
	import '$lib/styles/demo-page.css';

	const countries = [
		{ value: 'fr', label: 'France' },
		{ value: 'be', label: 'Belgique' },
		{ value: 'ch', label: 'Suisse' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'de', label: 'Allemagne' },
		{ value: 'es', label: 'Espagne' },
		{ value: 'it', label: 'Italie' },
		{ value: 'pt', label: 'Portugal' },
		{ value: 'nl', label: 'Pays-Bas' },
		{ value: 'uk', label: 'Royaume-Uni' }
	];

	const skills = [
		{ value: 'html', label: 'HTML' },
		{ value: 'css', label: 'CSS' },
		{ value: 'js', label: 'JavaScript' },
		{ value: 'ts', label: 'TypeScript' },
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'node', label: 'Node.js' },
		{ value: 'python', label: 'Python' },
		{ value: 'rust', label: 'Rust' }
	];

	let singleVal = $state('');
	let multiVal = $state<string[]>([]);
	let searchVal = $state('');
	let searchMultiVal = $state<string[]>([]);
</script>

<svelte:head><title>Selects — Formulaires — My Components</title></svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Selects</h1>
		<p>Quatre variantes du composant de sélection : natif simple, multi-choix, recherche simple et recherche multi.</p>
	</div>

	<!-- SELECT NATIF SIMPLE -->
	<section class="variant">
		<h2>Select natif — simple</h2>
		<ComponentPreview>
			<div class="demo-col">
				<Select label="Pays" options={countries} placeholder="Choisir un pays…" bind:value={singleVal} required />
				<Select label="Avec aide" options={countries} hint="Votre pays de résidence principale." />
				<Select label="En erreur" options={countries} error="Veuillez sélectionner un pays." />
				<Select label="Désactivé" options={countries} value="fr" disabled />
			</div>
		</ComponentPreview>
	</section>

	<!-- SELECT MULTI SANS RECHERCHE -->
	<section class="variant">
		<h2>Select multi — sans recherche</h2>
		<ComponentPreview>
			<div class="demo-col">
				<SelectMulti
					label="Pays visités"
					options={countries}
					placeholder="Sélectionner des pays…"
					bind:value={multiVal}
				/>
				<SelectMulti label="En erreur" options={countries} error="Sélectionnez au moins un élément." />
				<SelectMulti label="Désactivé" options={countries} disabled value={['fr', 'be']} />
			</div>
		</ComponentPreview>
	</section>

	<!-- SELECT RECHERCHE SIMPLE -->
	<section class="variant">
		<h2>Select avec recherche — simple</h2>
		<ComponentPreview>
			<div class="demo-col">
				<SelectSearch
					label="Pays"
					options={countries}
					placeholder="Rechercher un pays…"
					bind:value={searchVal}
					hint="Tapez pour filtrer la liste."
				/>
				<SelectSearch label="En erreur" options={countries} error="Veuillez sélectionner un pays." />
				<SelectSearch label="Désactivé" options={countries} value="fr" disabled />
			</div>
		</ComponentPreview>
	</section>

	<!-- SELECT RECHERCHE MULTI -->
	<section class="variant">
		<h2>Select avec recherche — multi</h2>
		<ComponentPreview>
			<div class="demo-col">
				<SelectSearchMulti
					label="Compétences"
					options={skills}
					placeholder="Rechercher et sélectionner…"
					bind:value={searchMultiVal}
					hint="Sélectionnez toutes les compétences applicables."
				/>
				<SelectSearchMulti
					label="En erreur"
					options={skills}
					error="Sélectionnez au moins une compétence."
				/>
			</div>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props communes</h2>
		<table>
			<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td>label</td><td>string</td><td>Libellé accessible</td></tr>
				<tr><td>options</td><td>Option[]</td><td>Liste des options <code>{'{ value, label, disabled? }'}</code></td></tr>
				<tr><td>value</td><td>string / string[]</td><td>Valeur(s) sélectionnée(s) (bindable)</td></tr>
				<tr><td>placeholder</td><td>string</td><td>Texte affiché quand aucune sélection</td></tr>
				<tr><td>hint</td><td>string</td><td>Texte d'aide sous le champ</td></tr>
				<tr><td>error</td><td>string</td><td>Message d'erreur (form action)</td></tr>
				<tr><td>required</td><td>boolean</td><td>Champ obligatoire (ARIA)</td></tr>
				<tr><td>disabled</td><td>boolean</td><td>Désactive le champ</td></tr>
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
		max-width: 380px;
	}

	code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 4px;
		border-radius: var(--radius-sm);
	}
</style>
