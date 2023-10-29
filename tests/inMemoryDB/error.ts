import { EntitiesEnum } from "@app/entities/entitiesEnum";

interface IProps {
	message: string;
	entitie: EntitiesEnum;
}

export class InMemoryError extends Error {
	public readonly entitie: EntitiesEnum;

	constructor(input: IProps) {
		super();

		this.entitie = input.entitie;
		this.name = `In Memory Entitie Error - ${input.entitie}`;
		this.message = input.message;
	}
}
