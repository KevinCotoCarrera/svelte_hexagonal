<<<<<<< HEAD
import { sequence } from '@sveltejs/kit/hooks';
import * as auth from '$lib/server/auth.js';
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
=======
// src/hooks.server.ts
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { SessionManager, sessionCookieName } from '$lib/infrastructure/auth/SessionManager';

const sessionManager = new SessionManager();
>>>>>>> bundles/master

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
<<<<<<< HEAD

=======
>>>>>>> bundles/master
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handleAuth: Handle = async ({ event, resolve }) => {
<<<<<<< HEAD
	const sessionToken = event.cookies.get(auth.sessionCookieName);
=======
	const sessionToken = event.cookies.get(sessionCookieName);
>>>>>>> bundles/master

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

<<<<<<< HEAD
	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
=======
	const { session, user } = await sessionManager.validate(sessionToken);

	if (session) {
		sessionManager.setCookie(event, sessionToken, session.expiresAt);
	} else {
		sessionManager.deleteCookie(event);
>>>>>>> bundles/master
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth);
