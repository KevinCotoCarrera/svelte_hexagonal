import { IdValueObject } from '$lib/core/domain/value_objects/Product/id.value_object';
import { UserNameValueObject } from '$lib/core/domain/value_objects/User/name.value_object';
import { PasswordHashValueObject } from '$lib/core/domain/value_objects/User/password_hash.value_object';

export class User {
	private constructor(
		private readonly _id: IdValueObject,
		private readonly _username: UserNameValueObject,
		private readonly _passwordHash: PasswordHashValueObject
	) {}

	static create(id: string, username: string, passwordHash: string): User {
		const _id = new IdValueObject(id);
		const _username = new UserNameValueObject(username);
		const _passwordHash = new PasswordHashValueObject(passwordHash);

		return new User(_id, _username, _passwordHash);
	}

	get id(): string {
		return this._id.value;
	}

	get username(): string {
		return this._username.value;
	}

	get passwordHash(): string {
		return this._passwordHash.value;
	}
}
