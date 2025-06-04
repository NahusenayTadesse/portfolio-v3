// src/hooks.server.ts
import { auth as adminAuth } from '$lib/firebase-admin';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (session) {
		try {
			const decoded = await adminAuth.verifySessionCookie(session, true); // `true` for checking revocation
			event.locals.user = decoded;
		} catch (err) {
			console.error('Invalid or expired session cookie:', err);
			event.locals.user = null;
			event.cookies.delete('session', { path: '/' });
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
