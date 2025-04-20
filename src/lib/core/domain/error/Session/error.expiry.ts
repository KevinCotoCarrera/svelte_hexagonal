import { BaseError } from '$lib/core/domain/error/error.base';

export class SessionExpiryDateInvalidException extends BaseError {
	constructor() {
		super('Session expiry date must be a valid Date.', 1330);
	}
}

export class SessionExpiryDatePastException extends BaseError {
	constructor() {
		super('Session expiry date cannot be in the past.', 1331);
	}
}
