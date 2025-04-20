import {
	ProductNameEmptyException,
	ProductNameTooShortException,
	ProductNameTooLongException
} from '$lib/core/domain/error/Product/error.product_name';

export class NameValueObject {
	private readonly minLength: number = 3;
	private readonly maxLength: number = 120;

	constructor(private readonly _name: string) {
		this.validate();
	}

	private validate(): void {
		const nameIsEmpty = !this._name || this._name.trim().length === 0;
		const nameTooShort = this._name.length < this.minLength;
		const nameTooLong = this._name.length > this.maxLength;

		if (nameIsEmpty) throw new ProductNameEmptyException();
		if (nameTooShort) throw new ProductNameTooShortException(this.minLength);
		if (nameTooLong) throw new ProductNameTooLongException(this.maxLength);
	}

	get value(): string {
		return this._name;
	}
}
