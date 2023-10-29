import { LogRepo } from "@app/repositories/logs";

export class DeleteAllLogsService {
	constructor(private readonly logRepo: LogRepo) {}

	async exec() {
		await this.logRepo.deleteAll();
	}
}
