// src/lib/core/domain/entities/SafeUser.ts
import type { User } from './User';

export type SafeUser = Omit<User, 'passwordHash'>;
