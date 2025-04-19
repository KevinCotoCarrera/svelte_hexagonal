import type { UserRepositoryPort } from '$lib/core/ports/UserRepositoryPort';
import type { User } from '$lib/infrastructure/db/drizzle/schema';
import { compare } from 'bcrypt';

export class RegisterUserUseCase {
  constructor(private userRepo: UserRepositoryPort) {}

  async execute(user: User): Promise<void> {
    const existing = await this.userRepo.findByUsername(user.username);
    if (existing) throw new Error('User already exists');
    await this.userRepo.createUser(user);
  }
}

export class LoginUserUseCase {
  constructor(private userRepo: UserRepositoryPort) {}

  async execute(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) throw new Error('Invalid username or password');

    const passwordValid = await compare(password, user.passwordHash);
    if (!passwordValid) throw new Error('Invalid username or password');

    return user;
  }
}