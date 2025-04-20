import { BaseError } from '$lib/core/domain/error/error.base';

export class UserIdEmptyException extends BaseError {
	constructor() {
		super('User ID must not be empty.', 1200);
	}
}

export class UserIdTooShortException extends BaseError {
	constructor() {
		super('User ID must be at least 10 characters long.', 1201);
	}
}
