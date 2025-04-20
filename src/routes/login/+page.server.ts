// src/routes/demo/lucia/login/+page.server.ts
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { LoginUserUseCase, RegisterUserUseCase } from '$lib/core/use-cases/AuthUseCase';
import { UserRepository } from '$lib/infrastructure/db/drizzle/UserRepository';
import { SessionManager } from '$lib/infrastructure/auth/SessionManager';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import type { Actions, PageServerLoad } from './$types';

const sessionManager = new SessionManager();

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	login: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username) || !validatePassword(password)) {
			return fail(400, { message: 'Invalid username or password format' });
		}

		try {
			const useCase = new LoginUserUseCase(new UserRepository());
			const user = await useCase.execute(username, password);

			const sessionToken = await sessionManager.create(user.id);
			sessionManager.setCookie(event, sessionToken, new Date(Date.now() + 30 * 86400000));

			throw redirect(302, '/');
		} catch (e) {
			const message =
				typeof e === 'string'
					? e
					: e instanceof Error
						? e.message
						: 'Incorrect username or password';

			console.error('❌ Login error:', e);
			return fail(400, { message });
		}
	},

	register: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username) || !validatePassword(password)) {
			return fail(400, { message: 'Invalid username or password format' });
		}

		const userId = generateUserId();

		try {
			const useCase = new RegisterUserUseCase(new UserRepository());
			await useCase.execute({ id: userId, username, passwordHash: password });

			const sessionToken = await sessionManager.create(userId);
			sessionManager.setCookie(event, sessionToken, new Date(Date.now() + 30 * 86400000));

			throw redirect(302, '/');
		} catch (e) {
			const message =
				typeof e === 'string' ? e : e instanceof Error ? e.message : 'Could not register user';

			console.error('❌ Register error:', e);
			return fail(500, { message });
		}
	}
};

function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
