import {
	ProductPriceNotExistException,
	ProductPriceIsNotNumberException,
	ProductPriceLessThanZeroException
} from '$lib/core/domain/error/Product/error.price';

export class PriceValueObject {
	constructor(private readonly _price: number) {
		this.validate();
	}

	private validate(): void {
		const priceNotExist = this._price === null || this._price === undefined;
		const priceNotNumber = typeof this._price !== 'number' || Number.isNaN(this._price);
		const priceLessThanZero = this._price < 0;

		if (priceNotExist) throw new ProductPriceNotExistException();
		if (priceNotNumber) throw new ProductPriceIsNotNumberException();
		if (priceLessThanZero) throw new ProductPriceLessThanZeroException();
	}

	get value(): number {
		return this._price;
	}
}
