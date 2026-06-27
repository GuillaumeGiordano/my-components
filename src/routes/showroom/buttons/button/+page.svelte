<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { Mail, ArrowRight, Trash2, Plus, Download } from '@lucide/svelte';
	import '$lib/styles/demo-page.css';
</script>

<svelte:head>
	<title>Button — Buttons — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Button</h1>
		<p>5 variants, 3 tailles, états loading/disabled, support d'icônes et rendu en lien.</p>
	</div>

	<!-- VARIANTS -->
	<section class="variant">
		<h2>Variants</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="danger">Danger</Button>
			</div>
		</ComponentPreview>
	</section>

	<!-- SIZES -->
	<section class="variant">
		<h2>Tailles</h2>
		<ComponentPreview>
			<div class="demo-row demo-row--align-center">
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
			</div>
		</ComponentPreview>
	</section>

	<!-- ICONS LEFT -->
	<section class="variant">
		<h2>Icône à gauche</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Button icon={Mail}>Envoyer</Button>
				<Button variant="secondary" icon={Download}>Télécharger</Button>
				<Button variant="outline" icon={Plus}>Nouveau</Button>
				<Button variant="danger" icon={Trash2}>Supprimer</Button>
			</div>
		</ComponentPreview>
	</section>

	<!-- ICONS RIGHT -->
	<section class="variant">
		<h2>Icône à droite</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Button iconRight={ArrowRight}>Continuer</Button>
				<Button variant="outline" iconRight={ArrowRight}>En savoir plus</Button>
			</div>
		</ComponentPreview>
	</section>

	<!-- ICON ONLY -->
	<section class="variant">
		<h2>Icône seule</h2>
		<ComponentPreview>
			<div class="demo-row demo-row--align-center">
				<Button variant="primary" icon={Plus} size="sm" />
				<Button variant="secondary" icon={Mail} size="md" />
				<Button variant="outline" icon={Download} size="lg" />
				<Button variant="ghost" icon={Trash2} size="md" />
				<Button variant="danger" icon={Trash2} size="md" />
			</div>
		</ComponentPreview>
	</section>

	<!-- LOADING -->
	<section class="variant">
		<h2>État loading</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Button loading>Chargement…</Button>
				<Button variant="secondary" loading>Enregistrement…</Button>
				<Button variant="outline" loading>Traitement…</Button>
			</div>
		</ComponentPreview>
	</section>

	<!-- DISABLED -->
	<section class="variant">
		<h2>État désactivé</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Button disabled>Primary</Button>
				<Button variant="secondary" disabled>Secondary</Button>
				<Button variant="outline" disabled>Outline</Button>
				<Button variant="ghost" disabled>Ghost</Button>
				<Button variant="danger" disabled>Danger</Button>
			</div>
		</ComponentPreview>
	</section>

	<!-- LINK -->
	<section class="variant">
		<h2>Rendu en lien (href)</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Button href="#" iconRight={ArrowRight}>Voir la doc</Button>
				<Button href="#" variant="outline">Page d'accueil</Button>
				<Button href="#" variant="ghost" icon={Download}>Télécharger</Button>
			</div>
		</ComponentPreview>
	</section>

	<!-- PROPS -->
	<div class="props-table">
		<h2>Props</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>variant</td><td>'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'</td><td>'primary'</td><td>Style visuel</td></tr>
				<tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>Taille du bouton</td></tr>
				<tr><td>disabled</td><td>boolean</td><td>false</td><td>Désactive l'interaction</td></tr>
				<tr><td>loading</td><td>boolean</td><td>false</td><td>Affiche un spinner, désactive le bouton</td></tr>
				<tr><td>href</td><td>string</td><td>—</td><td>Rend un &lt;a&gt; à la place d'un &lt;button&gt;</td></tr>
				<tr><td>icon</td><td>Component</td><td>—</td><td>Icône Lucide à gauche (ou seule)</td></tr>
				<tr><td>iconRight</td><td>Component</td><td>—</td><td>Icône Lucide à droite</td></tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.demo-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		padding: 20px;
		align-items: flex-start;
	}

	.demo-row--align-center {
		align-items: center;
	}
</style>
