import { LogEntitie } from "@app/entities/log";
import { LogRepo } from "@app/repositories/logs";
import { LogsLevelEnum } from "@app/entities/log";

export interface ICreateLogServiceProps {
	name: string;
	layer?: string;
	level: LogsLevelEnum;
	description: string;
}

export class CreateLogService {
	constructor(private readonly logRepo: LogRepo) {}

	async exec(input: ICreateLogServiceProps) {
		const log = new LogEntitie({
			name: input.name,
			level: input.level,
			layer: input.layer,
			description: input.description,
		});
		await this.logRepo.create(log);
	}
}
