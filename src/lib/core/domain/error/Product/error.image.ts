import { BaseError } from '$lib/core/domain/error/error.base';

export class ImageUrlEmptyException extends BaseError {
	constructor() {
		super('Image URL must not be empty.', 1260);
	}
}

export class ImageUrlTooShortException extends BaseError {
	constructor() {
		super('Image URL must be at least 10 characters.', 1261);
	}
}

export class ImageUrlInvalidFormatException extends BaseError {
	constructor() {
		super('Image URL must be a valid URL format.', 1262);
	}
}

export class ImageUrlNotSecureException extends BaseError {
	constructor() {
		super('Image URL must use HTTPS protocol.', 1263);
	}
}
