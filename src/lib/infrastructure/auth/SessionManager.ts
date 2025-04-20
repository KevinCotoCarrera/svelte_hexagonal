// src/lib/infrastructure/auth/SessionManager.ts
import type { SessionManagerPort } from '$lib/core/ports/SessionManagerPort';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import * as table from '$lib/infrastructure/db/drizzle/schema';
import type { Session } from '$lib/core/domain/entities/Session';
import type { SafeUser } from '$lib/core/domain/entities/SafeUser';
import 'dotenv/config';
console.log('🌐 Connecting to:', process.env.DATABASE_URL);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
console.log('ENV → DATABASE_URL:', process.env.DATABASE_URL);

const db = drizzle(pool);

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	return encodeBase64url(bytes);
}

export class SessionManager implements SessionManagerPort {
	create = async (userId: string): Promise<string> => {
		const token = generateSessionToken();
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
		const session = {
			id: sessionId,
			userId,
			expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
		};
		await db.insert(table.session).values(session);
		return token;
	};

	validate = async (token: string): Promise<{ session: Session | null; user: SafeUser | null }> => {
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

		const [result] = await db
			.select({
				user: { id: table.user.id, username: table.user.username },
				session: table.session
			})
			.from(table.session)
			.innerJoin(table.user, eq(table.session.userId, table.user.id))
			.where(eq(table.session.id, sessionId));

		if (!result) return { session: null, user: null };

		const { session, user } = result;

		if (Date.now() >= session.expiresAt.getTime()) {
			await db.delete(table.session).where(eq(table.session.id, session.id));
			return { session: null, user: null };
		}

		if (Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15) {
			session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
			await db
				.update(table.session)
				.set({ expiresAt: session.expiresAt })
				.where(eq(table.session.id, session.id));
		}

		return { session, user };
	};

	invalidate = async (sessionId: string): Promise<void> => {
		await db.delete(table.session).where(eq(table.session.id, sessionId));
	};

	setCookie = (event: RequestEvent, token: string, expiresAt: Date): void => {
		event.cookies.set(sessionCookieName, token, {
			expires: expiresAt,
			path: '/'
		});
	};

	deleteCookie = (event: RequestEvent): void => {
		event.cookies.delete(sessionCookieName, {
			path: '/'
		});
	};
}
