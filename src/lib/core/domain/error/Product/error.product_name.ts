import { BaseError } from '../error.base';

export class ProductNameEmptyException extends BaseError {
	constructor() {
		super('Product name must not be empty.', 1270);
	}
}

export class ProductNameTooShortException extends BaseError {
	constructor(public readonly minLength: number) {
		super(`Product name is too short (min ${minLength} characters).`, 1271);
	}
}

export class ProductNameTooLongException extends BaseError {
	constructor(public readonly maxLength: number) {
		super(`Product name is too long (max ${maxLength} characters)`, 1272);
	}
}
