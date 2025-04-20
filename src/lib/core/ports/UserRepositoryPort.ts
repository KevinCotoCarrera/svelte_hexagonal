import type { User } from '$lib/core/domain/entities/User';

export interface UserRepositoryPort {
	findByUsername(username: string): Promise<User | null>;
	createUser(user: User): Promise<void>;
}
