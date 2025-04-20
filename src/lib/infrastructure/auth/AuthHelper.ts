// src/lib/infrastructure/auth/AuthHelper.ts
import { hash, verify } from '@node-rs/argon2';

export async function hashPassword(password: string): Promise<string> {
	if (!password) throw new Error('No password provided to hash');

	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

export async function comparePasswords(input: string, stored: string): Promise<boolean> {
	if (!input || !stored) return false;
	return await verify(stored, input);
}
