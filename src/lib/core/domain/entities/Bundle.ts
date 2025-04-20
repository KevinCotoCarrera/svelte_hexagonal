// src/lib/core/domain/entities/Bundle.ts

export interface Bundle {
	id: string;
	name: string;
	resalePrice: number;
	productIds: string[]; // references product IDs
}
