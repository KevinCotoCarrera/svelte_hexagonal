// src/lib/core/ports/BundleRepositoryPort.ts
import type { Bundle } from '$lib/core/domain/entities/Bundle';
import type { BundleWithProducts } from '$lib/core/domain/entities/BundleWithProducts';

export interface BundleRepositoryPort {
	findAll(): Promise<Bundle[]>;
	findById(id: string): Promise<Bundle | null>;
	findWithProductsById(id: string): Promise<BundleWithProducts | null>;
	create(bundle: Bundle): Promise<void>;
	delete(id: string): Promise<void>;
}
