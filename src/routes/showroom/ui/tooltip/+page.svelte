<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { Info, Settings, Trash2, Copy } from '@lucide/svelte';
	import '$lib/styles/demo-page.css';
</script>

<svelte:head><title>Tooltip — UI — My Components</title></svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Tooltip</h1>
		<p>Info-bulle accessible déclenchée au survol ou au focus clavier. Flèche CSS, 4 positions, compatible avec n'importe quel élément déclencheur.</p>
	</div>

	<!-- POSITIONS -->
	<section class="variant">
		<h2>Positions</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Tooltip tip="Tooltip en haut" position="top">
					<Button variant="outline">Top</Button>
				</Tooltip>
				<Tooltip tip="Tooltip en bas" position="bottom">
					<Button variant="outline">Bottom</Button>
				</Tooltip>
				<Tooltip tip="Tooltip à gauche" position="left">
					<Button variant="outline">Left</Button>
				</Tooltip>
				<Tooltip tip="Tooltip à droite" position="right">
					<Button variant="outline">Right</Button>
				</Tooltip>
			</div>
		</ComponentPreview>
	</section>

	<!-- SUR ICÔNES -->
	<section class="variant">
		<h2>Sur boutons icône</h2>
		<ComponentPreview>
			<div class="demo-row">
				<Tooltip tip="Informations" position="top">
					<Button variant="ghost" icon={Info} />
				</Tooltip>
				<Tooltip tip="Paramètres" position="top">
					<Button variant="ghost" icon={Settings} />
				</Tooltip>
				<Tooltip tip="Copier" position="top">
					<Button variant="ghost" icon={Copy} />
				</Tooltip>
				<Tooltip tip="Supprimer" position="top">
					<Button variant="danger" icon={Trash2} />
				</Tooltip>
			</div>
		</ComponentPreview>
	</section>

	<!-- SUR TEXTE -->
	<section class="variant">
		<h2>Sur texte / lien</h2>
		<ComponentPreview>
			<div class="demo-prose">
				<p>
					Ce composant est conforme au
					<Tooltip tip="Référentiel Général d'Amélioration de l'Accessibilité" position="top">
						<span class="underline-dotted" tabindex="0">RGAA</span>
					</Tooltip>
					et utilise le pattern
					<Tooltip tip="Accessible Rich Internet Applications" position="top">
						<span class="underline-dotted" tabindex="0">ARIA</span>
					</Tooltip>
					pour les lecteurs d'écran.
				</p>
			</div>
		</ComponentPreview>
	</section>

	<!-- VARIANTES VISUELLES -->
	<section class="variant">
		<h2>Sur éléments disabled</h2>
		<ComponentPreview>
			<div class="demo-row">
				<!-- Wrapping disabled button in a span so hover still fires -->
				<Tooltip tip="Action indisponible pour ce rôle" position="top">
					<span class="disabled-wrap">
						<Button disabled>Action</Button>
					</span>
				</Tooltip>
			</div>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props</h2>
		<table>
			<thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td>tip</td><td>string</td><td>Texte affiché dans l'info-bulle</td></tr>
				<tr><td>position</td><td>'top' | 'bottom' | 'left' | 'right'</td><td>Côté d'apparition (défaut : <code>top</code>)</td></tr>
				<tr><td>children</td><td>Snippet</td><td>Élément déclencheur (bouton, texte, icône…)</td></tr>
			</tbody>
		</table>
	</div>

	<div class="props-table">
		<h2>Accessibilité</h2>
		<table>
			<thead><tr><th>Attribut</th><th>Valeur</th><th>Rôle</th></tr></thead>
			<tbody>
				<tr><td>role</td><td>tooltip</td><td>Identifie la bulle comme info-bulle ARIA</td></tr>
				<tr><td>aria-describedby</td><td>id généré</td><td>Lie le déclencheur à la bulle pour les lecteurs d'écran</td></tr>
				<tr><td>:focus-within</td><td>CSS</td><td>Affiche la bulle au focus clavier sans JS</td></tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.demo-row {
		display: flex;
		align-items: center;
		gap: 24px;
		padding: 48px 32px;
		flex-wrap: wrap;
	}

	.demo-prose {
		padding: 32px;
		max-width: 520px;
		font-size: 15px;
		line-height: 1.7;
		color: var(--text-base);
	}

	.underline-dotted {
		border-bottom: 1.5px dotted var(--text-muted);
		cursor: help;
	}

	.disabled-wrap {
		display: inline-flex;
	}

	code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 4px;
		border-radius: var(--radius-sm);
	}
</style>
