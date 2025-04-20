import {
	SessionIdEmptyException,
	SessionIdTooShortException
} from '$lib/core/domain/error/Session/error.session_id';

export class SessionIdValueObject {
	private readonly minLength: number = 10;

	constructor(private readonly _id: string) {
		this.validate();
	}

	private validate(): void {
		const idIsEmpty = !this._id || this._id.trim().length === 0;
		const idTooShort = this._id.length < this.minLength;

		if (idIsEmpty) throw new SessionIdEmptyException();
		if (idTooShort) throw new SessionIdTooShortException();
	}

	get value(): string {
		return this._id;
	}
}
