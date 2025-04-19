import type { UserRepositoryPort } from '$lib/core/ports/UserRepositoryPort'
import type { User } from './schema';
import { user as userTable } from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
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