import type { Product } from './Product';

export interface BundleWithProducts {
	id: string;
	name: string;
	resalePrice: number;
	products: Product[]; // full product objects
}
