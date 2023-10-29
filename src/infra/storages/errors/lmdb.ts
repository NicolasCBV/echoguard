interface IProps {
	message: string;
}

export class LMDBLogicError extends Error {
	constructor(input: IProps) {
		super();

		this.name = "LMDB Logic Error";
		this.message = input.message;
	}
}
