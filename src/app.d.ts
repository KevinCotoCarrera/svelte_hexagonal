declare namespace App {
	interface Locals {
		user: import('$lib/core/domain/entities/User').SafeUser | null;
		session: import('$lib/infrastructure/db/drizzle/schema').Session | null;
	}
}
