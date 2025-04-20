import { integer, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const product = pgTable('product', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: real('price').notNull(),
	qty: integer('qty').notNull().default(1),
	imageUrl: text('image_url').notNull(),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow()
});

export const bundle = pgTable('bundle', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	resalePrice: real('resale_price').notNull(), // ✅ total sale price
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow()
});

export const bundleProduct = pgTable('bundle_product', {
	bundleId: text('bundle_id')
		.notNull()
		.references(() => bundle.id),
	productId: text('product_id')
		.notNull()
		.references(() => product.id)
});

export type SessionRow = typeof session.$inferSelect;
export type UserRow = typeof user.$inferSelect;
export type ProductRow = typeof product.$inferSelect;
