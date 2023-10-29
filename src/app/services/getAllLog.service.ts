import { LogMapper } from "@app/mapper/log";
import { LogRepo } from "@app/repositories/logs";

export class GetAllLogService {
	constructor(private readonly logRepo: LogRepo) {}

	async exec() {
		const log = await this.logRepo.getAll();

		return log.map((item) => LogMapper.toObject(item));
	}
}
