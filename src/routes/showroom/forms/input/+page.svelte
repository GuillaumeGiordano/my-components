<script lang="ts">
	import { enhance } from '$app/forms';
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import Checkbox from '$lib/components/forms/Checkbox.svelte';
	import RadioGroup from '$lib/components/forms/RadioGroup.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { Mail, User, Search } from '@lucide/svelte';
	import '$lib/styles/demo-page.css';

	let { form } = $props();

	const countryOptions = [
		{ value: 'fr', label: 'France' },
		{ value: 'be', label: 'Belgique' },
		{ value: 'ch', label: 'Suisse' },
		{ value: 'ca', label: 'Canada' }
	];

	const planOptions = [
		{ value: 'free', label: 'Gratuit', hint: 'Jusqu\'à 3 projets' },
		{ value: 'pro', label: 'Pro', hint: '10 € / mois — projets illimités' },
		{ value: 'enterprise', label: 'Entreprise', hint: 'Sur devis — SLA garanti' }
	];

	let bioValue = $state(form?.values?.bio ?? '');
	let termsChecked = $state(false);
	let selectedPlan = $state(form?.values?.plan ?? '');
</script>

<svelte:head>
	<title>Champs de formulaire — Formulaires — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Champs de formulaire</h1>
		<p>Input, Textarea, Select, Checkbox, RadioGroup — conformes RGAA. Validation via form actions SvelteKit.</p>
	</div>

	<!-- INPUT -->
	<section class="variant">
		<h2>Input — états</h2>
		<ComponentPreview>
			<div class="demo-form">
				<Input label="Nom complet" placeholder="Jean Dupont" icon={User} />
				<Input label="Email" type="email" placeholder="jean@exemple.fr" icon={Mail} required />
				<Input label="Recherche" type="search" placeholder="Rechercher…" iconRight={Search} />
				<Input label="Mot de passe" type="password" required />
				<Input label="Champ avec aide" hint="Le nom sera affiché publiquement." placeholder="Votre nom" />
				<Input label="Champ en erreur" error="Cette adresse email est déjà utilisée." value="jean@" />
				<Input label="Champ désactivé" disabled value="Valeur non modifiable" />
				<Input label="Champ lecture seule" readonly value="Lecture seulement" />
			</div>
		</ComponentPreview>
	</section>

	<!-- TEXTAREA -->
	<section class="variant">
		<h2>Textarea</h2>
		<ComponentPreview>
			<div class="demo-form">
				<Textarea label="Biographie" placeholder="Parlez-nous de vous…" hint="Max. 300 caractères." maxlength={300} bind:value={bioValue} />
				<Textarea label="Message" placeholder="Votre message…" required rows={3} />
				<Textarea label="Champ en erreur" error="Le message est trop court (min. 10 caractères)." value="Salut" />
			</div>
		</ComponentPreview>
	</section>

	<!-- SELECT -->
	<section class="variant">
		<h2>Select</h2>
		<ComponentPreview>
			<div class="demo-form">
				<Select label="Pays" options={countryOptions} required />
				<Select label="Langue" options={[{value:'fr',label:'Français'},{value:'en',label:'English'}]} hint="Langue de l'interface" />
				<Select label="Champ en erreur" options={countryOptions} error="Veuillez sélectionner un pays." />
				<Select label="Désactivé" options={countryOptions} disabled value="fr" />
			</div>
		</ComponentPreview>
	</section>

	<!-- CHECKBOX -->
	<section class="variant">
		<h2>Checkbox</h2>
		<ComponentPreview>
			<div class="demo-form">
				<Checkbox label="Recevoir les notifications par email" />
				<Checkbox label="J'accepte les conditions d'utilisation" required hint="Lisez les CGU avant d'accepter." />
				<Checkbox label="Champ en erreur" error="Vous devez accepter les conditions." />
				<Checkbox label="Désactivé (coché)" disabled checked />
				<Checkbox label="Indéterminé" indeterminate />
			</div>
		</ComponentPreview>
	</section>

	<!-- RADIO GROUP -->
	<section class="variant">
		<h2>RadioGroup</h2>
		<ComponentPreview>
			<div class="demo-form">
				<RadioGroup legend="Forfait" options={planOptions} required bind:value={selectedPlan} />
				<RadioGroup
					legend="Orientation horizontale"
					options={[{value:'m',label:'Masculin'},{value:'f',label:'Féminin'},{value:'n',label:'Non précisé'}]}
					orientation="horizontal"
				/>
				<RadioGroup legend="Avec erreur" options={planOptions.slice(0,2)} error="Veuillez choisir un forfait." />
			</div>
		</ComponentPreview>
	</section>

	<!-- FORMULAIRE COMPLET AVEC ACTION SVELTEKIT -->
	<section class="variant">
		<h2>Formulaire complet — validation server (form actions)</h2>
		<ComponentPreview>
			<div class="demo-form-full">
				{#if form?.success}
					<div class="success-banner" role="alert">
						✅ Formulaire soumis avec succès !
					</div>
				{:else}
					<form method="POST" use:enhance novalidate class="server-form">
						<Input
							name="name"
							label="Nom complet"
							icon={User}
							required
							error={form?.errors?.name}
							value={form?.values?.name ?? ''}
						/>
						<Input
							name="email"
							label="Email"
							type="email"
							icon={Mail}
							required
							error={form?.errors?.email}
							value={form?.values?.email ?? ''}
						/>
						<Input
							name="password"
							label="Mot de passe"
							type="password"
							required
							error={form?.errors?.password}
						/>
						<Textarea
							name="bio"
							label="Biographie"
							hint="Optionnel."
							maxlength={300}
							bind:value={bioValue}
						/>
						<Select
							name="country"
							label="Pays"
							options={countryOptions}
							required
							error={form?.errors?.country}
							value={form?.values?.country ?? ''}
						/>
						<RadioGroup
							name="plan"
							legend="Forfait"
							options={planOptions}
							required
							error={form?.errors?.plan}
							bind:value={selectedPlan}
						/>
						<Checkbox
							name="terms"
							label="J'accepte les conditions d'utilisation"
							required
							error={form?.errors?.terms}
							bind:checked={termsChecked}
						/>
						<Button type="submit" size="md">Créer le compte</Button>
					</form>
				{/if}
			</div>
		</ComponentPreview>
	</section>

	<!-- PROPS -->
	<div class="props-table">
		<h2>Props communes</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>label / legend</td><td>string</td><td>Libellé visible et accessible</td></tr>
				<tr><td>name</td><td>string</td><td>Nom du champ (FormData)</td></tr>
				<tr><td>error</td><td>string</td><td>Message d'erreur (depuis form action ou état local)</td></tr>
				<tr><td>hint</td><td>string</td><td>Texte d'aide associé via aria-describedby</td></tr>
				<tr><td>required</td><td>boolean</td><td>Ajoute * visuel + aria-required</td></tr>
				<tr><td>disabled</td><td>boolean</td><td>Désactive l'interaction</td></tr>
				<tr><td>value</td><td>string</td><td>Valeur bindable</td></tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.demo-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		max-width: 480px;
	}

	.demo-form-full {
		padding: 24px;
	}

	.server-form {
		display: flex;
		flex-direction: column;
		gap: 18px;
		max-width: 480px;
	}

	.success-banner {
		padding: 16px 20px;
		background: #dcfce7;
		color: #166534;
		border-radius: var(--radius-md);
		font-weight: 500;
		font-size: 14px;
	}
</style>
