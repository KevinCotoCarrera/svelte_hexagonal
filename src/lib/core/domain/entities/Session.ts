import { SessionIdValueObject } from '$lib/core/domain/value_objects/Session/session_id.value_object';

//in case of future edge cases change user id to a Session/user_id.value_object
import { UserIdValueObject } from '$lib/core/domain/value_objects/Session/user_id.value_object';

import { SessionExpiryDateValueObject } from '$lib/core/domain/value_objects/Session/session_expiry_date.value_object';

export class Session {
	private constructor(
		private readonly _id: SessionIdValueObject,
		private readonly _userId: UserIdValueObject,
		private readonly _expiresAt: SessionExpiryDateValueObject
	) {}

	static create(id: string, userId: string, expiresAt: Date): Session {
		const _id = new SessionIdValueObject(id);
		const _userId = new UserIdValueObject(userId);
		const _expiresAt = new SessionExpiryDateValueObject(expiresAt);

		return new Session(_id, _userId, _expiresAt);
	}

	get id(): string {
		return this._id.value;
	}

	get userId(): string {
		return this._userId.value;
	}

	get expiresAt(): Date {
		return this._expiresAt.value;
	}
}
