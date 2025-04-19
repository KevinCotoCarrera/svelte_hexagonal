import type { User } from '../../infrastructure/db/drizzle/schema';

export interface UserRepositoryPort {
  findByUsername(username: string): Promise<User | null>;
  createUser(user: User): Promise<void>;
}