import { BaseError } from '$lib/core/domain/error/error.base';

export class SessionIdEmptyException extends BaseError {
	constructor() {
		super('Session ID must not be empty.', 1200);
	}
}

export class SessionIdTooShortException extends BaseError {
	constructor() {
		super('Session ID must be at least 10 characters long.', 1201);
	}
}
