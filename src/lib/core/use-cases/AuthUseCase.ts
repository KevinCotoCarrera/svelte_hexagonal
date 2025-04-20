// src/lib/core/use-cases/AuthUseCase.ts
import type { UserRepositoryPort } from '$lib/core/ports/UserRepositoryPort';
import type { User } from '$lib/core/domain/entities/User';
import type { PasswordHasherPort } from '../ports/PasswordHasherPort';

export class RegisterUserUseCase {
	constructor(
    private userRepo: UserRepositoryPort,
    private hasher: PasswordHasherPort


  ) {}

	async execute(user: User): Promise<void> {
		const existing = await this.userRepo.findByUsername(user.username);
		if (existing) throw new Error('User already exists');

		const passwordHash = await this.hasher.hash(user.passwordHash);
		await this.userRepo.createUser({ ...user, passwordHash });
	}
}

export class LoginUserUseCase {
	constructor(
    private userRepo: UserRepositoryPort,
    private hasher: PasswordHasherPort
  ) {}

	async execute(username: string, password: string): Promise<User> {
		const user = await this.userRepo.findByUsername(username);
		if (!user) throw new Error('Invalid username or password');
		console.log('🔐 Registering user:');
		console.log('  username:', user.username);
		console.log('  raw password:', user.passwordHash); // <- originally the plain password
		const passwordHash = await this.hasher.hash(user.passwordHash);
		console.log('  hashed:', passwordHash);
		const passwordValid = await this.hasher.compare(password, user.passwordHash);
		if (!passwordValid) throw new Error('Invalid username or password');

		return user;
	}
}
