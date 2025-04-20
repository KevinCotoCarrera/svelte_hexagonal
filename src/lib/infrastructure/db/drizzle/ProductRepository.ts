// src/lib/infrastructure/db/drizzle/ProductRepository.ts
import type { ProductRepositoryPort } from '$lib/core/ports/ProductRepositoryPort';
import type { Product } from '$lib/core/domain/entities/Product';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import { product as productTable } from './schema';
import { eq } from 'drizzle-orm';

const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export class ProductRepository implements ProductRepositoryPort {
	async findAll(): Promise<Product[]> {
		return await db.select().from(productTable);
	}

	async findById(id: string): Promise<Product | null> {
		const result = await db.select().from(productTable).where(eq(productTable.id, id)).limit(1);
		return result[0] ?? null;
	}

	async create(product: Product): Promise<void> {
		await db.insert(productTable).values(product);
	}

	async delete(id: string): Promise<void> {
		await db.delete(productTable).where(eq(productTable.id, id));
	}
}
