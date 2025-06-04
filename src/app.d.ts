// src/app.d.ts
import type { DecodedIdToken } from 'firebase-admin/auth';

declare global {
	namespace App {
		interface Locals {
			user: DecodedIdToken | null;
		}
		// You can optionally define other interfaces here if needed:
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
