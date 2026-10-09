<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Grid from '$lib/components/layout/Grid.svelte';
	import GridItem from '$lib/components/layout/GridItem.svelte';
	import '$lib/styles/demo-page.css';
</script>

<svelte:head>
	<title>Grid — Layout — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Grid</h1>
		<p>
			Grille responsive : chaque <code>GridItem</code> choisit sa largeur (<code>span</code>), sa hauteur
			(<code>rows</code>) et éventuellement sa position. Les paliers se basent sur la largeur de la grille
			(container queries) : essayez les vues Mobile / Tablette / Desktop.
		</p>
	</div>

	<section class="variant">
		<h2>Tableau de bord (5 colonnes par défaut)</h2>
		<ComponentPreview>
			<Grid>
				<GridItem span={3}><Card>{#snippet header()}Ventes{/snippet}span 3</Card></GridItem>
				<GridItem span={2}><Card>{#snippet header()}Contrats{/snippet}span 2</Card></GridItem>
				<GridItem span={2} rows={2}><Card>{#snippet header()}À traiter{/snippet}span 2 · rows 2</Card></GridItem>
				<GridItem span={3}><Card>{#snippet header()}Clôture{/snippet}span 3</Card></GridItem>
				<GridItem span={3}><Card>{#snippet header()}Frais CB{/snippet}span 3</Card></GridItem>
			</Grid>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Valeurs par palier, position forcée, masquage</h2>
		<ComponentPreview>
			<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="12px" rowHeight="120px">
				<GridItem span={{ sm: 2, lg: 1 }}><Card>span sm:2 → lg:1</Card></GridItem>
				<GridItem col={4}><Card>col 4 (forcée en lg)</Card></GridItem>
				<GridItem hideBelow="lg"><Card>hideBelow="lg"</Card></GridItem>
				<GridItem span={4}><Card>span 4 (réduit à la largeur disponible)</Card></GridItem>
			</Grid>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props — Grid</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>cols</td><td>number | Responsive&lt;number&gt;</td><td>{'{ base: 1, md: 2, lg: 5 }'}</td><td>Nombre de colonnes, global ou par palier</td></tr>
				<tr><td>gap</td><td>string</td><td>'20px'</td><td>Espacement entre les items</td></tr>
				<tr><td>rowHeight</td><td>string | 'auto'</td><td>'180px'</td><td>Hauteur minimale d'une ligne (unité de <code>rows</code>) ; grandit avec le contenu</td></tr>
				<tr><td>dense</td><td>boolean</td><td>true</td><td>Comble les trous avec les items suivants</td></tr>
				<tr><td>class</td><td>string</td><td>''</td><td>Classe ajoutée au conteneur</td></tr>
			</tbody>
		</table>

		<h2>Props — GridItem</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>span</td><td>number | Responsive&lt;number&gt;</td><td>1</td><td>Largeur en colonnes (réduite au nombre de colonnes du palier)</td></tr>
				<tr><td>rows</td><td>number | Responsive&lt;number&gt;</td><td>1</td><td>Hauteur en lignes (ignorée sur 1 colonne)</td></tr>
				<tr><td>col</td><td>number | Responsive&lt;number&gt;</td><td>auto</td><td>Colonne de départ (ignorée si l'item ne tient pas)</td></tr>
				<tr><td>row</td><td>number | Responsive&lt;number&gt;</td><td>auto</td><td>Ligne de départ</td></tr>
				<tr><td>fill</td><td>boolean</td><td>true</td><td>L'enfant prend toute la hauteur de la cellule</td></tr>
				<tr><td>hideBelow</td><td>'sm' | 'md' | 'lg' | 'xl'</td><td>—</td><td>Masqué sous ce palier</td></tr>
				<tr><td>class</td><td>string</td><td>''</td><td>Classe ajoutée à l'item</td></tr>
			</tbody>
		</table>

		<p>
			Paliers (largeur de la grille, fixes) : <code>base</code> 0 · <code>sm</code> 480 · <code>md</code> 640 ·
			<code>lg</code> 1000 · <code>xl</code> 1280px. Un palier non renseigné reprend la valeur du palier
			inférieur.
		</p>
	</div>
</div>
