import { BaseError } from '../error.base';

export class UserNameEmptyException extends BaseError {
	constructor() {
		super('User name must not be empty.', 1270);
	}
}

export class UserNameTooShortException extends BaseError {
	constructor(public readonly minLength: number) {
		super(`User name is too short (min ${minLength} characters).`, 1271);
	}
}

export class UserNameTooLongException extends BaseError {
	constructor(public readonly maxLength: number) {
		super(`User name is too long (max ${maxLength} characters)`, 1272);
	}
}
