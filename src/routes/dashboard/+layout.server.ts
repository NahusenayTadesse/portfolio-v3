// src/routes/protected/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return {
		user: locals.user
	};
}
