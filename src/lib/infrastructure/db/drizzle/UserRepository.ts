import type { UserRepositoryPort } from '$lib/core/ports/UserRepositoryPort';
import type { User } from '$lib/core/domain/entities/User';
import { user as userTable } from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { eq } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export class UserRepository implements UserRepositoryPort {
	async findByUsername(username: string): Promise<User | null> {
		const result = await db
			.select()
			.from(userTable)
			.where(eq(userTable.username, username))
			.limit(1);

		return result[0] ?? null;
	}

	async createUser(user: User): Promise<void> {
		await db.insert(userTable).values(user);
	}
}
