// src/lib/core/use-cases/AddProductUseCase.ts
import type { Product } from '$lib/core/domain/entities/Product';
import type { ImageUploaderPort } from '$lib/core/ports/ImageUploaderPort';
import type { ProductRepositoryPort } from '$lib/core/ports/ProductRepositoryPort';

export class AddProductUseCase {
	constructor(
		private imageUploader: ImageUploaderPort,
		private productRepo: ProductRepositoryPort
	) {}

	async execute(input: {
		name: string;
		description: string;
		price: number;
		qty: number;
		image: File;
	}): Promise<Product> {
		const imageUrl = await this.imageUploader.uploadImage(input.image);

		const newProduct: Product = {
			id: crypto.randomUUID(),
			name: input.name,
			description: input.description,
			price: input.price,
			qty: input.qty,
			imageUrl
		};

		await this.productRepo.create(newProduct);

		return newProduct;
	}
}
