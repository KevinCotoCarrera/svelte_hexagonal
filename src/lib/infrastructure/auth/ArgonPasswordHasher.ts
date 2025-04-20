// ArgonPasswordHasher.ts
import { hash, verify } from '@node-rs/argon2';
import type { PasswordHasherPort } from "$lib/core/ports/PasswordHasherPort"

export class ArgonPasswordHasher implements PasswordHasherPort {
	private readonly memoryCost = 19456;
	private readonly timeCost = 2;
	private readonly outputLen = 32;
	private readonly parallelism = 1;

	async hash(password: string): Promise<string> {
		if (!password) throw new Error('No password provided to hash');

		return await hash(password, {
			memoryCost: this.memoryCost,
			timeCost: this.timeCost,
			outputLen: this.outputLen,
			parallelism: this.parallelism
		});
	}

	async compare(input: string, stored: string): Promise<boolean> {
		if (!input || !stored) return false;
		return await verify(stored, input);
	}
}
