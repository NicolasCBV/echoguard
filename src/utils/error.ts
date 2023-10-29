interface IProps {
	message: string;
}

export class UtilError extends Error {
	constructor(input: IProps) {
		super();

		this.name = "Util Error";
		this.message = input.message;
	}
}
