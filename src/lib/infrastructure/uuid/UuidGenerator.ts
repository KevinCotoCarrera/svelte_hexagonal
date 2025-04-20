// src/lib/infrastructure/uuid/UuidGenerator.ts
import { randomUUID } from 'crypto';
import type { IdGeneratorPort } from '$lib/core/ports/IdGeneratorPort';

export class UuidGenerator implements IdGeneratorPort {
	generate(): string {
		return randomUUID();
	}
}
