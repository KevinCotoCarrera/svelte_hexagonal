import { DescriptionValueObject } from '../value_objects/Product/description.value_object';
import { IdValueObject } from '../value_objects/Product/id.value_object';
import { ImageUrlValueObject } from '../value_objects/Product/imageUrl.value_object';
import { NameValueObject } from '../value_objects/Product/name.value_object';
import { PriceValueObject } from '../value_objects/Product/price.value_object';
import { QtyValueObject } from '../value_objects/Product/qty.value_object';

export class Product {
	private constructor(
		private readonly _id: IdValueObject,
		private readonly _name: NameValueObject,
		private readonly _description: DescriptionValueObject,
		private readonly _price: PriceValueObject,
		private readonly _qty: QtyValueObject,
		private readonly _imageUrl: ImageUrlValueObject
	) {}

	static create(
		id: string,
		name: string,
		description: string,
		price: number,
		qty: number,
		imageUrl: string
	): Product {
		const _id = new IdValueObject(id);
		const _name = new NameValueObject(name);
		const _description = new DescriptionValueObject(description);
		const _price = new PriceValueObject(price);
		const _qty = new QtyValueObject(qty);
		const _imageUrl = new ImageUrlValueObject(imageUrl);

		return new Product(_id, _name, _description, _price, _qty, _imageUrl);
	}

	public toPrimitives() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			price: this.price,
			qty: this.qty,
			imageUrl: this.imageUrl
		};
	}
	get id(): string {
		return this._id.value;
	}
	get name(): string {
		return this._name.value;
	}
	get description(): string {
		return this._description.value;
	}
	get price(): number {
		return this._price.value;
	}
	get qty(): number {
		return this._qty.value;
	}
	get imageUrl(): string {
		return this._imageUrl.value;
	}
}
