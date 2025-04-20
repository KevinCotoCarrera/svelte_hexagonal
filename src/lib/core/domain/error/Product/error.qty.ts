import { BaseError } from '$lib/core/domain/error/error.base';

export class QuantityNotExistException extends BaseError {
	constructor() {
		super('Quantity must exist.', 1251);
	}
}

export class QuantityLessThanZeroException extends BaseError {
	constructor() {
		super('Quantity must not be negative.', 1252);
	}
}

export class QuantityIsNotIntegerException extends BaseError {
	constructor() {
		super('Quantity must be an integer.', 1253);
	}
}
