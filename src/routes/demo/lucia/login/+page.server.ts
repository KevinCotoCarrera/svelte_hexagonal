import { fail, redirect } from '@sveltejs/kit';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/infrastructure/auth/SessionManager';
import { LoginUserUseCase, RegisterUserUseCase } from '$lib/core/use-cases/AuthUseCase';
import { UserRepository } from '$lib/infrastructure/db/drizzle/UserRepository';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username) || !validatePassword(password)) {
			return fail(400, { message: 'Invalid username or password format' });
		}

		try {
			const useCase = new LoginUserUseCase(new UserRepository());
			const user = await useCase.execute(username, password);

			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, user.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);

			throw redirect(302, '/dashboard');
		} catch (e) {
			return fail(400, { message: 'Incorrect username or password' });
		}
	},

	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username) || !validatePassword(password)) {
			return fail(400, { message: 'Invalid username or password format' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password.toString(), {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			const useCase = new RegisterUserUseCase(new UserRepository());
			await useCase.execute({ id: userId, username, passwordHash, age: 0 });

			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, userId);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);

			throw redirect(302, '/dashboard');
		} catch (e) {
			return fail(500, { message: 'Could not register user' });
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
