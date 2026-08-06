<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import DatePicker from '$lib/components/forms/DatePicker.svelte';
	import DateRangePicker from '$lib/components/forms/DateRangePicker.svelte';
	import '$lib/styles/demo-page.css';

	let singleVal   = $state('');
	let prefilled   = $state('2025-06-15');
	let rangeStart  = $state('');
	let rangeEnd    = $state('');
	let rangePreStart = $state('2025-06-10');
	let rangePreEnd   = $state('2025-06-20');

	const today = new Date();
	const minISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
	const maxDate = new Date(today);
	maxDate.setDate(today.getDate() + 30);
	const maxISO = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, '0')}-${String(maxDate.getDate()).padStart(2, '0')}`;
</script>

<svelte:head><title>Date — Formulaires — My Components</title></svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Date</h1>
		<p>Sélecteur de date simple et plage de dates (start–end) avec calendrier visuel, navigation mensuelle et raccourci "Aujourd'hui".</p>
	</div>

	<!-- DATE PICKER SIMPLE -->
	<section class="variant">
		<h2>DatePicker — simple</h2>
		<ComponentPreview>
			<div class="demo-col">
				<DatePicker label="Date de naissance" bind:value={singleVal} placeholder="Sélectionner une date" />
				<DatePicker label="Avec valeur" bind:value={prefilled} />
				<DatePicker label="Avec aide" hint="Choisissez une date dans les 30 prochains jours." min={minISO} max={maxISO} />
				<DatePicker label="En erreur" error="La date sélectionnée est invalide." />
				<DatePicker label="Obligatoire" required />
				<DatePicker label="Désactivé" value="2025-03-10" disabled />
			</div>
		</ComponentPreview>
	</section>

	<!-- DATE PICKER AVEC MIN / MAX -->
	<section class="variant">
		<h2>DatePicker — avec min / max</h2>
		<ComponentPreview>
			<div class="demo-col">
				<DatePicker
					label="Disponibilité (30 jours)"
					hint="Seules les dates dans les 30 prochains jours sont disponibles."
					min={minISO}
					max={maxISO}
				/>
			</div>
		</ComponentPreview>
	</section>

	<!-- DATE RANGE PICKER -->
	<section class="variant">
		<h2>DateRangePicker — plage de dates</h2>
		<ComponentPreview>
			<div class="demo-wide">
				<DateRangePicker
					label="Période de séjour"
					bind:startValue={rangeStart}
					bind:endValue={rangeEnd}
				/>
				<p class="range-info">
					Début&nbsp;: <strong>{rangeStart || '—'}</strong>
					&nbsp;·&nbsp;
					Fin&nbsp;: <strong>{rangeEnd || '—'}</strong>
				</p>
			</div>
		</ComponentPreview>
	</section>

	<!-- DATE RANGE PICKER PRÉREMPLI -->
	<section class="variant">
		<h2>DateRangePicker — avec valeurs initiales</h2>
		<ComponentPreview>
			<div class="demo-wide">
				<DateRangePicker
					label="Période de formation"
					bind:startValue={rangePreStart}
					bind:endValue={rangePreEnd}
					hint="Modifiez le début ou la fin de la plage."
				/>
			</div>
		</ComponentPreview>
	</section>

	<!-- DATE RANGE PICKER EN ERREUR -->
	<section class="variant">
		<h2>DateRangePicker — état d'erreur</h2>
		<ComponentPreview>
			<div class="demo-wide">
				<DateRangePicker
					label="Période de location"
					error="Veuillez sélectionner une plage de dates valide."
				/>
			</div>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props — DatePicker</h2>
		<table>
			<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td>label</td><td>string</td><td>Libellé visible et accessible</td></tr>
				<tr><td>value</td><td>string</td><td>Date ISO <code>YYYY-MM-DD</code> (bindable)</td></tr>
				<tr><td>min / max</td><td>string</td><td>Bornes ISO — désactive les dates hors plage</td></tr>
				<tr><td>placeholder</td><td>string</td><td>Texte affiché quand aucune date sélectionnée</td></tr>
				<tr><td>hint</td><td>string</td><td>Texte d'aide sous le champ</td></tr>
				<tr><td>error</td><td>string</td><td>Message d'erreur (form action)</td></tr>
				<tr><td>required</td><td>boolean</td><td>Champ obligatoire (ARIA)</td></tr>
				<tr><td>disabled</td><td>boolean</td><td>Désactive le champ</td></tr>
				<tr><td>name</td><td>string</td><td>Nom du champ pour la soumission du formulaire</td></tr>
			</tbody>
		</table>
	</div>

	<div class="props-table">
		<h2>Props — DateRangePicker</h2>
		<table>
			<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td>label</td><td>string</td><td>Libellé global de la plage</td></tr>
				<tr><td>start / end</td><td>string</td><td>Dates ISO de début et fin (bindables)</td></tr>
				<tr><td>min / max</td><td>string</td><td>Bornes ISO — désactive les dates hors plage</td></tr>
				<tr><td>hint</td><td>string</td><td>Texte d'aide sous le champ</td></tr>
				<tr><td>error</td><td>string</td><td>Message d'erreur (form action)</td></tr>
				<tr><td>required</td><td>boolean</td><td>Champ obligatoire (ARIA)</td></tr>
				<tr><td>disabled</td><td>boolean</td><td>Désactive le champ</td></tr>
				<tr><td>name</td><td>string</td><td>Préfixe — génère <code>name[start]</code> et <code>name[end]</code></td></tr>
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
		max-width: 320px;
	}

	.demo-wide {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 20px;
		max-width: 680px;
	}

	.range-info {
		font-size: 13px;
		color: var(--text-subtle);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 4px;
		border-radius: var(--radius-sm);
	}
</style>
