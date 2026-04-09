export type ComponentEntry = {
	slug: string;
	label: string;
	description?: string;
};

export type ComponentCategory = {
	slug: string;
	label: string;
	components: ComponentEntry[];
};

// Add new categories and components here as you create them
export const categories: ComponentCategory[] = [
	{
		slug: 'forms',
		label: 'Formulaires',
		components: [
			{
				slug: 'input',
				label: 'Champs de base',
				description: 'Input, Textarea, Checkbox, RadioGroup — RGAA'
			},
			{
				slug: 'selects',
				label: 'Selects',
				description: 'Natif, multi-choix, recherche simple et recherche multi'
			},
			{
				slug: 'fichier',
				label: 'Fichier',
				description: 'Zone de dépôt avec glisser-déposer, simple et multiple'
			},
			{
				slug: 'switch',
				label: 'Switch',
				description: 'Bascule accessible avec role="switch"'
			},
			{
				slug: 'date',
				label: 'Date',
				description: 'Sélecteur de date simple et plage de dates (start–end)'
			}
		]
	},
	{
		slug: 'buttons',
		label: 'Buttons',
		components: [
			{
				slug: 'button',
				label: 'Button',
				description: '5 variants, 3 tailles, loading/disabled, icônes, rendu en lien'
			}
		]
	},
	{
		slug: 'ui',
		label: 'UI',
		components: [
			{
				slug: 'tooltip',
				label: 'Tooltip',
				description: 'Info-bulle accessible sur hover/focus, 4 positions, flèche CSS'
			}
		]
	},
	{
		slug: 'layout',
		label: 'Layout',
		components: [
			{ slug: 'navbar', label: 'Navbar', description: 'Barre de navigation responsive avec menu hamburger' },
			{ slug: 'sidebar', label: 'Sidebar', description: 'Navigation latérale collapsible avec groupes' },
			{ slug: 'footer', label: 'Footer', description: 'Pied de page avec colonnes de liens' },
			{ slug: 'standard-layout', label: 'Standard Layout', description: 'Combinaison Navbar + Sidebar + Main + Footer' }
		]
	}
];
