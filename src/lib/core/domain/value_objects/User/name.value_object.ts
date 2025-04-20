import {
	UserNameEmptyException,
	UserNameTooShortException,
	UserNameTooLongException
} from '$lib/core/domain/error/User/error.user_name';

export class UserNameValueObject {
	private readonly minLength = 3;
	private readonly maxLength = 32;

	constructor(private readonly _name: string) {
		this.validate();
	}

	private validate(): void {
		const isEmpty = !this._name || this._name.trim().length === 0;
		const isTooShort = this._name.length < this.minLength;
		const isTooLong = this._name.length > this.maxLength;

		if (isEmpty) throw new UserNameEmptyException();
		if (isTooShort) throw new UserNameTooShortException(this.minLength);
		if (isTooLong) throw new UserNameTooLongException(this.maxLength);
	}

	get value(): string {
		return this._name;
	}
}
