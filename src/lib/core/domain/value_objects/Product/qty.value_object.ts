import {
	QuantityNotExistException,
	QuantityIsNotIntegerException,
	QuantityLessThanZeroException
} from '$lib/core/domain/error/Product/error.qty';

export class QtyValueObject {
	constructor(private readonly _qty: number) {
		this.validate();
	}

	private validate(): void {
		const qtyNotExist = this._qty === null || this._qty === undefined;
		const qtyNotInteger = !Number.isInteger(this._qty);
		const qtyLessThanZero = this._qty < 0;

		if (qtyNotExist) throw new QuantityNotExistException();
		if (qtyNotInteger) throw new QuantityIsNotIntegerException();
		if (qtyLessThanZero) throw new QuantityLessThanZeroException();
	}

	get value(): number {
		return this._qty;
	}
}
