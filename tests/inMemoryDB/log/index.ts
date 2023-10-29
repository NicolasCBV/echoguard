import { LogEntitie } from "@app/entities/log";
import { InMemoryError } from "../error";
import { EntitiesEnum } from "@app/entities/entitiesEnum";
import { LogRepo } from "@app/repositories/logs";

export class InMemoryLogDB implements LogRepo {
	public readonly logs: LogEntitie[] = [];

	async create(input: LogEntitie): Promise<void> {
		const existentLog = this.logs.find((item) => item.id === input.id);

		if (existentLog)
			throw new InMemoryError({
				message: "Entitie already exist",
				entitie: EntitiesEnum.log,
			});

		this.logs.push(input);
	}

	async delete(key: string): Promise<void> {
		const existentIndexLog = this.logs.findIndex((item) => item.id === key);

		if (existentIndexLog < 0)
			throw new InMemoryError({
				message: "Entitie doesn't exist",
				entitie: EntitiesEnum.log,
			});

		this.logs.splice(existentIndexLog, 1);
	}

	async deleteAll(): Promise<void> {
		this.logs.splice(0, this.logs.length - 1);
	}

	async getAll(): Promise<LogEntitie[]> {
		return this.logs;
	}
}
