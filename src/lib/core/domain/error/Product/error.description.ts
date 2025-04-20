import { BaseError } from '$lib/core/domain/error/error.base';

export class ProductDescriptionEmptyException extends BaseError {
	constructor() {
		super('Description must not be empty.', 1230);
	}
}

export class ProductDescriptionTooShortException extends BaseError {
	constructor() {
		super('Description is too short. Minimum 30 characters.', 1231);
	}
}

export class ProductDescriptionTooLongException extends BaseError {
	constructor() {
		super('Description is too long. Maximum 1000 characters.', 1232);
	}
}
