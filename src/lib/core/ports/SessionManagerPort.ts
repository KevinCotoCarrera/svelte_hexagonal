// src/lib/core/ports/SessionManagerPort.ts
import type { RequestEvent } from '@sveltejs/kit';

export interface SessionManagerPort {
	create(userId: string): Promise<string>;
	validate(token: string): Promise<{ session: unknown; user: unknown }>;
	invalidate(sessionId: string): Promise<void>;
	setCookie(event: RequestEvent, token: string, expiresAt: Date): void;
	deleteCookie(event: RequestEvent): void;
}
