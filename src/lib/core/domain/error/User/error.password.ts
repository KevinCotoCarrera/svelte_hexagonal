import { BaseError } from '$lib/core/domain/error/error.base';

export class PasswordHashEmptyException extends BaseError {
	constructor() {
		super('Password hash must not be empty.', 1120);
	}
}
