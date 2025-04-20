import { BaseError } from '$lib/core/domain/error/error.base';

export class ProductPriceNotExistException extends BaseError {
	constructor() {
		super('Product price must be provided.', 1240);
	}
}

export class ProductPriceIsNotNumberException extends BaseError {
	constructor() {
		super('Product price must be a valid number.', 1241);
	}
}

export class ProductPriceLessThanZeroException extends BaseError {
	constructor() {
		super('Product price cannot be negative.', 1242);
	}
}
