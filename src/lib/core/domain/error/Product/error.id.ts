import { BaseError } from '$lib/core/domain/error/error.base';

export class ProductIdEmptyException extends BaseError {
	constructor() {
		super('Product ID must not be empty.', 1200);
	}
}

export class ProductIdTooShortException extends BaseError {
	constructor() {
		super('Product ID must be at least 10 characters long.', 1201);
	}
}
