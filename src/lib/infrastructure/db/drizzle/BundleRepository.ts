// src/lib/infrastructure/db/drizzle/BundleRepository.ts
import type { BundleRepositoryPort } from '$lib/core/ports/BundleRepositoryPort';
import type { Bundle } from '$lib/core/domain/entities/Bundle';
import type { BundleWithProducts } from '$lib/core/domain/entities/BundleWithProducts';
import { bundle, bundleProduct, product } from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export class BundleRepository implements BundleRepositoryPort {
	async findAll(): Promise<Bundle[]> {
		const raw = await db.select().from(bundle);
		const relations = await db.select().from(bundleProduct);

		return raw.map((b) => ({
			...b,
			productIds: relations.filter((r) => r.bundleId === b.id).map((r) => r.productId)
		}));
	}

	async findById(id: string): Promise<Bundle | null> {
		const b = await db
			.select()
			.from(bundle)
			.where(eq(bundle.id, id))
			.then((r) => r[0]);
		if (!b) return null;

		const related = await db.select().from(bundleProduct).where(eq(bundleProduct.bundleId, id));
		return {
			...b,
			productIds: related.map((r) => r.productId)
		};
	}

	async findWithProductsById(id: string): Promise<BundleWithProducts | null> {
		const b = await db
			.select()
			.from(bundle)
			.where(eq(bundle.id, id))
			.then((r) => r[0]);
		if (!b) return null;

		const joins = await db
			.select()
			.from(bundleProduct)
			.innerJoin(product, eq(bundleProduct.productId, product.id))
			.where(eq(bundleProduct.bundleId, id));

		return {
			id: b.id,
			name: b.name,
			resalePrice: b.resalePrice,
			products: joins.map((j) => j.product)
		};
	}

	async create(bundleData: Bundle): Promise<void> {
		const id = bundleData.id ?? nanoid();

		await db.insert(bundle).values({
			id,
			name: bundleData.name,
			resalePrice: bundleData.resalePrice
		});

		await db.insert(bundleProduct).values(
			bundleData.productIds.map((productId) => ({
				bundleId: id,
				productId
			}))
		);
	}

	async delete(id: string): Promise<void> {
		await db.delete(bundleProduct).where(eq(bundleProduct.bundleId, id));
		await db.delete(bundle).where(eq(bundle.id, id));
	}
}
