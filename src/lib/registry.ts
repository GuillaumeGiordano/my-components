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
export const categories: ComponentCategory[] = [];
