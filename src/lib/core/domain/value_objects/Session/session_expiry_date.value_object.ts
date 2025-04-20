import {
	SessionExpiryDateInvalidException,
	SessionExpiryDatePastException
} from '$lib/core/domain/error/Session/error.expiry';

export class SessionExpiryDateValueObject {
	constructor(private readonly _expiresAt: Date) {
		this.validate();
	}

	private validate(): void {
		const isInvalid = !(this._expiresAt instanceof Date) || isNaN(this._expiresAt.getTime());
		const isInPast = this._expiresAt.getTime() < Date.now();

		if (isInvalid) throw new SessionExpiryDateInvalidException();
		if (isInPast) throw new SessionExpiryDatePastException();
	}

	get value(): Date {
		return this._expiresAt;
	}
}
