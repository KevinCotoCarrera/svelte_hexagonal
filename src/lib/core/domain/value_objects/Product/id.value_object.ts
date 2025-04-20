import {
	ProductIdEmptyException,
	ProductIdTooShortException
} from '$lib/core/domain/error/Product/error.id';

export class IdValueObject {
	private readonly minLength: number = 10;

	constructor(private readonly _id: string) {
		this.validate();
	}

	private validate(): void {
		const idIsEmpty = !this._id || this._id.trim().length === 0;
		const idTooShort = this._id.length < this.minLength;

		if (idIsEmpty) throw new ProductIdEmptyException();
		if (idTooShort) throw new ProductIdTooShortException();
	}

	get value(): string {
		return this._id;
	}
}
