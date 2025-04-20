import {
	ProductDescriptionEmptyException,
	ProductDescriptionTooShortException,
	ProductDescriptionTooLongException
} from '$lib/core/domain/error/Product/error.description';

export class DescriptionValueObject {
	private readonly minLength: number = 30;
	private readonly maxLength: number = 1000;

	constructor(private readonly _description: string) {
		this.validate();
	}

	private validate(): void {
		const isEmpty = !this._description || this._description.trim().length === 0;
		const tooShort = this._description.length < this.minLength;
		const tooLong = this._description.length > this.maxLength;

		if (isEmpty) throw new ProductDescriptionEmptyException();
		if (tooShort) throw new ProductDescriptionTooShortException();
		if (tooLong) throw new ProductDescriptionTooLongException();
	}

	get value(): string {
		return this._description;
	}
}
