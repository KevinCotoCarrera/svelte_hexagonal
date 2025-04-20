import { fail, redirect } from '@sveltejs/kit';
import { SessionManager } from '$lib/infrastructure/auth/SessionManager';
import type { Actions, PageServerLoad } from './demo/lucia/$types';

const sessionManager = new SessionManager();

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
		await sessionManager.invalidate(event.locals.session.id);
		sessionManager.deleteCookie(event);

		throw redirect(302, '/login');
	}
};
