import {
	ImageUrlEmptyException,
	ImageUrlTooShortException,
	ImageUrlInvalidFormatException,
	ImageUrlNotSecureException
} from '$lib/core/domain/error/Product/error.image';

export class ImageUrlValueObject {
	constructor(private readonly _imageUrl: string) {
		this.validate();
	}

	private validate() {
		if (!this._imageUrl || this._imageUrl.trim().length === 0) {
			throw new ImageUrlEmptyException();
		}

		if (this._imageUrl.length < 10) {
			throw new ImageUrlTooShortException();
		}

		let url: URL;
		try {
			url = new URL(this._imageUrl);
		} catch {
			throw new ImageUrlInvalidFormatException();
		}

		if (url.protocol !== 'https:') {
			throw new ImageUrlNotSecureException();
		}
	}

	get value(): string {
		return this._imageUrl;
	}
}
