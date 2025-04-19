import { fail, redirect } from '@sveltejs/kit';
import {
  invalidateSession,
  deleteSessionTokenCookie
} from '$lib/infrastructure/auth/SessionManager';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/login');
	}
	return { user: event.locals.user };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);

		throw redirect(302, '/login');
	}
};
