import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const bio = data.get('bio') as string;
		const country = data.get('country') as string;
		const terms = data.get('terms');
		const plan = data.get('plan') as string;

		const errors: Record<string, string> = {};

		if (!name || name.trim().length < 2) {
			errors.name = 'Le nom doit contenir au moins 2 caractères.';
		}
		if (!email || !email.includes('@')) {
			errors.email = 'Veuillez saisir une adresse email valide.';
		}
		if (!password || password.length < 8) {
			errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
		}
		if (!country) {
			errors.country = 'Veuillez sélectionner un pays.';
		}
		if (!terms) {
			errors.terms = 'Vous devez accepter les conditions d\'utilisation.';
		}
		if (!plan) {
			errors.plan = 'Veuillez choisir un forfait.';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				values: { name, email, bio, country, plan }
			});
		}

		// Simulate success
		return { success: true };
	}
};
