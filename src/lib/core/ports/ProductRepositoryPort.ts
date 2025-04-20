// src/lib/core/ports/ProductRepositoryPort.ts
import type { Product } from '$lib/core/domain/entities/Product';

export interface ProductRepositoryPort {
	findAll(): Promise<Product[]>;
	findById(id: string): Promise<Product | null>;
	create(product: Product): Promise<void>;
	delete(id: string): Promise<void>;
	// update(id: string): Promise<void>;
}
