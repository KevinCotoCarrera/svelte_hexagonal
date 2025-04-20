import { fail, type RequestEvent } from '@sveltejs/kit';
import { AddProductUseCase } from '$lib/core/use-cases/AddProductUseCase';
import { CloudinaryImageUploader } from '$lib/adapters/cloudinary/CloudinaryImageUploader';
import { listAllImages } from '$lib/adapters/cloudinary/CloudinaryAdminClient';
import { ProductRepository } from '$lib/infrastructure/db/drizzle/ProductRepository.js';

//Setup

const uploader = new CloudinaryImageUploader('kekay_assets');

const productRepo = new ProductRepository();

const addProductUseCase = new AddProductUseCase(uploader, productRepo);

//Load and Actions

export async function load() {
	const images = await listAllImages('');
	const products = await productRepo.findAll();

	return {
		images,
		products
	};
}

export const actions = {
	default: async ({ request }: RequestEvent) => {
		const formData = await request.formData();
		console.log('Actions');
		const name = formData.get('name')?.toString();
		const description = formData.get('description')?.toString() ?? '';
		const price = parseFloat(formData.get('price')?.toString() ?? '0');
		const qty = parseFloat(formData.get('qty')?.toString() ?? '0');

		const image = formData.get('image');

		if (!name || !image || isNaN(price)) {
			return fail(400, { message: 'Missing required fields' });
		}

		try {
			const product = await addProductUseCase.execute({
				name,
				description,
				price,
				image: image as File,
				qty: qty
			});

			console.log('✅ Product created:', product);
			return { success: true, product };
		} catch (error) {
			console.error('❌ Product creation failed:', error);
			return fail(500, { message: 'Failed to create product' });
		}
	}
};
