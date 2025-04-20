// src/lib/infrastructure/db/drizzle/ProductRepository.ts
import type { ProductRepositoryPort } from '$lib/core/ports/ProductRepositoryPort';
import { Product } from '$lib/core/domain/entities/Product';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import { product as productTable, type ProductRow } from './schema';
import { eq } from 'drizzle-orm';

const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export class ProductRepository implements ProductRepositoryPort {
	async findAll(): Promise<Product[]> {
		const results: ProductRow[] = await db.select().from(productTable);
		return results.map((row) =>
			Product.create(row.id, row.name, row.description, row.price, row.qty, row.imageUrl)
		);
	}

	async findById(id: string): Promise<Product | null> {
		const result = await db.select().from(productTable).where(eq(productTable.id, id)).limit(1);

		if (!result[0]) return null;

		const row: ProductRow = result[0];

		return Product.create(row.id, row.name, row.description, row.price, row.qty, row.imageUrl);
	}

	async create(product: Product): Promise<void> {
		await db.insert(productTable).values(product.toPrimitives());
	}

	async delete(id: string): Promise<void> {
		await db.delete(productTable).where(eq(productTable.id, id));
	}
}
