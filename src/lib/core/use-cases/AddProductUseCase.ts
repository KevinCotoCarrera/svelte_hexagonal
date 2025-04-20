import { Product } from '$lib/core/domain/entities/Product';
import type { ImageUploaderPort } from '$lib/core/ports/ImageUploaderPort';
import type { ProductRepositoryPort } from '$lib/core/ports/ProductRepositoryPort';
import type { IdGeneratorPort } from '$lib/core/ports/IdGeneratorPort';

export class AddProductUseCase {
	constructor(
		private imageUploader: ImageUploaderPort,
		private productRepo: ProductRepositoryPort,
		private idGenerator: IdGeneratorPort
	) {}

	async execute(input: {
		name: string;
		description: string;
		price: number;
		qty: number;
		image: File;
	}): Promise<Product> {
		const imageUrl = await this.imageUploader.uploadImage(input.image);

		const product = Product.create(
			this.idGenerator.generate(),
			input.name,
			input.description,
			input.price,
			input.qty,
			imageUrl
		);

		await this.productRepo.create(product);
		return product;
	}
}
