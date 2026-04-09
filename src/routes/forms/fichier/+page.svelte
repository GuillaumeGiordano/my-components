<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import FileInput from '$lib/components/forms/FileInput.svelte';
	import '$lib/styles/demo-page.css';
</script>

<svelte:head><title>Fichier — Formulaires — My Components</title></svelte:head>

<div class="page">
	<div class="page-header">
		<h1>FileInput</h1>
		<p>Zone de dépôt de fichiers avec glisser-déposer, liste des fichiers sélectionnés et suppression individuelle.</p>
	</div>

	<section class="variant">
		<h2>Fichier unique</h2>
		<ComponentPreview>
			<div class="demo-pad">
				<FileInput label="Photo de profil" hint="JPG, PNG ou WebP. Max 2 Mo." accept=".jpg,.png,.webp" />
			</div>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Fichiers multiples</h2>
		<ComponentPreview>
			<div class="demo-pad">
				<FileInput label="Pièces jointes" multiple hint="PDF, DOC ou XLS. Max 10 Mo par fichier." accept=".pdf,.doc,.docx,.xls,.xlsx" />
			</div>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>État erreur</h2>
		<ComponentPreview>
			<div class="demo-pad">
				<FileInput label="Justificatif" error="Le fichier dépasse la taille maximale autorisée (2 Mo)." required />
			</div>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Désactivé</h2>
		<ComponentPreview>
			<div class="demo-pad">
				<FileInput label="Document" disabled />
			</div>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props</h2>
		<table>
			<thead><tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead>
			<tbody>
				<tr><td>label</td><td>string</td><td>—</td><td>Libellé du champ</td></tr>
				<tr><td>multiple</td><td>boolean</td><td>false</td><td>Autorise plusieurs fichiers</td></tr>
				<tr><td>accept</td><td>string</td><td>''</td><td>Types MIME ou extensions autorisés</td></tr>
				<tr><td>hint</td><td>string</td><td>''</td><td>Texte d'aide</td></tr>
				<tr><td>error</td><td>string</td><td>''</td><td>Message d'erreur</td></tr>
				<tr><td>required</td><td>boolean</td><td>false</td><td>Champ obligatoire (ARIA)</td></tr>
				<tr><td>disabled</td><td>boolean</td><td>false</td><td>Désactive le champ</td></tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.demo-pad { padding: 20px; max-width: 480px; }
</style>
