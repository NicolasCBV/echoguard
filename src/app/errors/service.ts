interface IProps {
	message: string;
}

export class ServiceError extends Error {
	constructor(input: IProps) {
		super();

		this.name = "Service Error";
		this.message = input.message;
	}
}
