import { PasswordHashEmptyException } from '$lib/core/domain/error/User/error.password';

export class PasswordHashValueObject {
	constructor(private readonly _hash: string) {
		this.validate();
	}

	private validate(): void {
		const isEmpty = !this._hash || this._hash.trim().length === 0;
		if (isEmpty) throw new PasswordHashEmptyException();
	}

	get value(): string {
		return this._hash;
	}
}
