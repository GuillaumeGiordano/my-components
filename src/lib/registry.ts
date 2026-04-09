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
