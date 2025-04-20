export class BaseError extends Error {
	public code: number;

	constructor(message: string, code: number = 0) {
		super(message);
		this.name = new.target.name;
		this.code = code;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
